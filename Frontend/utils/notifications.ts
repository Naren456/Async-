import notifee, { AndroidImportance } from '@notifee/react-native';

export type Assignment = {
  id: string;
  title: string;
  subject: string;
  isoDate: string;
  displayDate?: string; // optional, can be set later
};

// --- Create Android Notification Channel ---
export async function createAndroidChannel() {
  await notifee.createChannel({
    id: 'alarm',
    name: 'Assignment Alarm',
    importance: AndroidImportance.HIGH,
    vibration: true,
  });
}

// --- Schedule normal reminder ---
export async function scheduleReminder(assignment: Assignment, hoursBefore: number) {
  const dueDate = new Date(assignment.isoDate);
  const triggerTime = new Date(dueDate.getTime() - hoursBefore * 60 * 60 * 1000);

  if (triggerTime < new Date()) return;

  await notifee.displayNotification({
    title: `📚 Reminder: ${assignment.title}`,
    body: `${assignment.subject} due at ${dueDate.toLocaleTimeString('en-IN')}`,
    android: {
      channelId: 'alarm',
      importance: AndroidImportance.HIGH,
      sound: 'default',
    },
    ios: { sound: 'default' },
  });
}

// --- Schedule full-screen alarm 10 min before due ---
export async function scheduleFullScreenAlarm(assignment: Assignment) {
  const dueDate = new Date(assignment.isoDate);
  const triggerTime = new Date(dueDate.getTime() - 10 * 60 * 1000);

  if (triggerTime < new Date()) return;

  await createAndroidChannel();

  await notifee.displayNotification({
    title: `🚨 Assignment Due Soon: ${assignment.title}`,
    body: `${assignment.subject} is due at ${dueDate.toLocaleTimeString('en-IN')}`,
    android: {
      channelId: 'alarm',
      autoCancel: false,
      importance: AndroidImportance.HIGH,
      fullScreenAction: { id: 'alarm_fullscreen' },
      pressAction: { id: 'default' },
      sound: 'default',
    },
    ios: { sound: 'default', critical: true },
  });
}

// --- Sync assignment: schedule reminders + full-screen alarm ---
export async function syncAssignment(assignment: Assignment) {
  await scheduleReminder(assignment, 6);
  await scheduleReminder(assignment, 3);
  await scheduleReminder(assignment, 1);
  await scheduleFullScreenAlarm(assignment);
}
