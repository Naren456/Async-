// utils/notifications.ts
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// --- Type Definitions ---
export type Assignment = {
  id: string;
  title: string;
  subject: string;
  isoDate: string; // ISO datetime string
};

// --- Notification Handler ---
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// --- Request Permissions & Setup Channel ---
export async function registerForNotifications(): Promise<boolean> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      sound: "default",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
}

// --- Schedule Multiple Reminders for an Assignment ---
export async function scheduleAssignmentNotifications(assignment: Assignment) {
  const dueDate = new Date(assignment.isoDate);

  // Reminders: 6h, 3h, 1h before due date
  const reminders = [6, 3, 1];

  for (const hrs of reminders) {
    const notifyTime = new Date(dueDate);
    notifyTime.setHours(dueDate.getHours() - hrs);

    if (notifyTime > new Date()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Upcoming Assignment: ${assignment.title}`,
          body: `Subject: ${assignment.subject}\nDue: ${dueDate.toLocaleString()}`,
          data: { assignmentId: assignment.id },
        },
        trigger: {
          type: "date",
          date: notifyTime,
        },
      });
    }
  }
}

// --- Save Assignments Locally ---
export async function saveAssignmentsLocally(assignments: Assignment[]) {
  try {
    await AsyncStorage.setItem("@assignments", JSON.stringify(assignments));
  } catch (err) {
    console.error("Error saving assignments locally:", err);
  }
}

// --- Load Assignments from Local Storage ---
export async function loadAssignmentsFromLocal(): Promise<Assignment[]> {
  try {
    const data = await AsyncStorage.getItem("@assignments");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error loading assignments from local storage:", err);
    return [];
  }
}

// --- Sync Assignments & Schedule Notifications ---
export async function syncAssignments(assignments: Assignment[]) {
  // Save to local storage
  await saveAssignmentsLocally(assignments);

  // Schedule notifications for each assignment
  for (const assignment of assignments) {
    await scheduleAssignmentNotifications(assignment);
  }
}

export async function showLoginNotification(username?: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🎉 Welcome Back!",
      body: username
        ? `Hey ${username}, glad to see you again!`
        : "Glad to see you back in the app!",
      sound: "default",
    },
    trigger: null, // immediate notification
  });
}
