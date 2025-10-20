import AsyncStorage from "@react-native-async-storage/async-storage";

const ASSIGNMENTS_KEY = "assignments";

/** Save assignments locally */
export async function saveAssignments(assignments: any[]) {
  try {
    await AsyncStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
  } catch (err) {
    console.error("Error saving assignments:", err);
  }
}

/** Load assignments from local storage */
export async function loadAssignments() {
  try {
    const data = await AsyncStorage.getItem(ASSIGNMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error loading assignments:", err);
    return [];
  }
}
