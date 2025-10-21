// import notifee, {
//   AndroidImportance,
//   TimestampTrigger,
//   TriggerType,
//   AuthorizationStatus,
// } from "@notifee/react-native";
// import * as BackgroundFetch from "expo-background-fetch";
// import * as TaskManager from "expo-task-manager";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export type Assignment = {
//   id: string;
//   title: string;
//   subject: string;
//   isoDate: string;
//   displayDate?: string;
// };

// const CHANNEL_ID = "alarm";
// const ASSIGNMENTS_KEY = "assignments";
// const TASK_NAME = "REFRESH_ASSIGNMENTS_TASK";

// /* ------------------ Create Notification Channel ------------------ */
// export async function createAndroidChannel() {
//   await notifee.createChannel({
//     id: CHANNEL_ID,
//     name: "Assignment Reminders",
//     importance: AndroidImportance.HIGH,
//     vibration: true,
//   });
// }

// /* ------------------ Ask Notification Permission ------------------ */
// export async function requestNotificationPermission() {
//   const settings = await notifee.requestPermission();
//   if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
//     console.log("✅ Notification permission granted");
//   } else {
//     console.warn("⚠️ Notification permission denied");
//   }
// }

// /* ------------------ Schedule a Timed Notification ------------------ */
// export async function scheduleReminder(
//   assignment: Assignment,
//   hoursBefore: number
// ) {
//   const dueDate = new Date(assignment.isoDate);
//   const triggerTime = new Date(dueDate.getTime() - hoursBefore * 60 * 60 * 1000);

//   if (triggerTime <= new Date()) return;

//   const trigger: TimestampTrigger = {
//     type: TriggerType.TIMESTAMP,
//     timestamp: triggerTime.getTime(),
//     alarmManager: true,
//   };

//   await notifee.createTriggerNotification(
//     {
//       id: `${assignment.id}-${hoursBefore}`,
//       title: `📘 ${assignment.title}`,
//       body: `${assignment.subject} due at ${dueDate.toLocaleTimeString("en-IN")}`,
//       android: {
//         channelId: CHANNEL_ID,
//         sound: "default",
//         importance: AndroidImportance.HIGH,
//       },
//     },
//     trigger
//   );
// }

// /* ------------------ Schedule Full-Screen Alarm ------------------ */
// export async function scheduleFullScreenAlarm(assignment: Assignment) {
//   const dueDate = new Date(assignment.isoDate);
//   const triggerTime = new Date(dueDate.getTime() - 10 * 60 * 1000); // 10 mins before

//   if (triggerTime <= new Date()) return;

//   const trigger: TimestampTrigger = {
//     type: TriggerType.TIMESTAMP,
//     timestamp: triggerTime.getTime(),
//     alarmManager: true,
//   };

//   await notifee.createTriggerNotification(
//     {
//       id: `${assignment.id}-alarm`,
//       title: `🚨 Due Soon: ${assignment.title}`,
//       body: `${assignment.subject} is due at ${dueDate.toLocaleTimeString("en-IN")}`,
//       android: {
//         channelId: CHANNEL_ID,
//         sound: "default",
//         importance: AndroidImportance.HIGH,
//         fullScreenAction: { id: "alarm_fullscreen" },
//         pressAction: { id: "default" },
//       },
//     },
//     trigger
//   );
// }

// /* ------------------ Safe Scheduling: Within 7 Days ------------------ */
// export async function syncAssignment(assignment: Assignment) {
//   const now = new Date();
//   const limit = new Date();
//   limit.setDate(now.getDate() + 7);

//   const dueDate = new Date(assignment.isoDate);
//   if (dueDate < now || dueDate > limit) return;

//   await scheduleReminder(assignment, 6);
//   await scheduleReminder(assignment, 3);
//   await scheduleReminder(assignment, 1);
//   await scheduleFullScreenAlarm(assignment);
// }

// /* ------------------ Schedule All ------------------ */
// export async function scheduleAllAssignments(assignments: Assignment[]) {
//   try {
//     await createAndroidChannel();
//     const existing = await notifee.getTriggerNotificationIds();

//     for (const a of assignments) {
//       if (new Date(a.isoDate) > new Date() && !existing.includes(a.id)) {
//         await syncAssignment(a);
//       }
//     }
//   } catch (err) {
//     console.error("❌ Error scheduling:", err);
//   }
// }

// /* ------------------ Background Task (Auto Refresh Daily) ------------------ */
// TaskManager.defineTask(TASK_NAME, async () => {
//   try {
//     console.log("⏰ Background reminder refresh...");
//     const cached = await AsyncStorage.getItem(ASSIGNMENTS_KEY);
//     if (!cached) return BackgroundFetch.BackgroundFetchResult.NoData;

//     const grouped = JSON.parse(cached);
//     const all = Object.values(grouped).flat() as Assignment[];

//     await scheduleAllAssignments(all);
//     return BackgroundFetch.BackgroundFetchResult.NewData;
//   } catch (err) {
//     console.error("❌ Background task error:", err);
//     return BackgroundFetch.BackgroundFetchResult.Failed;
//   }
// });

// export async function registerBackgroundTask() {
//   const status = await BackgroundFetch.getStatusAsync();
//   if (status === BackgroundFetch.Status.Available) {
//     await BackgroundFetch.registerTaskAsync(TASK_NAME, {
//       minimumInterval: 60 * 60 * 24, // 24h
//       stopOnTerminate: false,
//       startOnBoot: true,
//     });
//     console.log("✅ Background refresh task registered");
//   } else {
//     console.warn("⚠️ Background fetch not available");
//   }
// }
