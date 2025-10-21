import AsyncStorage from "@react-native-async-storage/async-storage";

export type Assignment = {
  id: string;
  title: string;
  subject: string;
  isoDate: string;
  displayDate?: string; // optional, can be set later
};

const ASSIGNMENTS_KEY = "assignments";

/** Save all assignments */
export async function saveAssignments(assignments: Assignment[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
  } catch (err) {
    console.error("Error saving assignments:", err);
  }
}

/** Load all assignments */
export async function loadAssignments(): Promise<Assignment[]> {
  try {
    const data = await AsyncStorage.getItem(ASSIGNMENTS_KEY);
    return data ? (JSON.parse(data) as Assignment[]) : [];
  } catch (err) {
    console.error("Error loading assignments:", err);
    return [];
  }
}

/** Add single assignment */
export async function addAssignment(assignment: Assignment): Promise<void> {
  const assignments = await loadAssignments();
  assignments.push(assignment);
  await saveAssignments(assignments);
}

/** Remove assignment by id */
export async function removeAssignment(id: string): Promise<void> {
  const assignments = await loadAssignments();
  const filtered = assignments.filter(a => a.id !== id);
  await saveAssignments(filtered);
}
