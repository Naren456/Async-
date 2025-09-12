import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { GroupedAssignments } from "./icsParser";

/** Initialize permissions and channel (call this once in App.tsx) */
export const initNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    console.warn("Notification permissions not granted");
    return;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
};

/** Clear all scheduled notifications */
export const clearAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

/** Schedule notifications for each assignment */
export const scheduleNotifications = async (
  assignments: GroupedAssignments
) => {
  for (const [date, items] of Object.entries(assignments)) {
    for (const assign of items) {
      try {
        // ⚠️ Make sure you have `dueDateRaw` or an ISO date string in assignment
        const dueDate = new Date(assign.displayDate);

        // Trigger at 9 AM on due date
        const trigger = new Date(dueDate);
        trigger.setHours(9, 0, 0);

        await Notifications.scheduleNotificationAsync({
          content: {
            title: "📌 Assignment Due Today",
            body: `${assign.title} (${assign.subject}) is due today.`,
            data: { link: assign.link },
          },
          trigger,
        });
      } catch (err) {
        console.error("Error scheduling notification:", err);
      }
    }
  }
};

/** Listen for notification taps (call once in App.tsx) */
export const setupNotificationResponseListener = () => {
  return Notifications.addNotificationResponseReceivedListener((response) => {
    const link = response.notification.request.content.data.link;
    if (link) {
      // open the assignment link (import Linking from react-native)
      console.log("User tapped notification for link:", link);
    }
  });
};
