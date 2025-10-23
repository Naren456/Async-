import { Stack } from "expo-router";
import React from "react";

export default function AdminAppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="assignments" />
      <Stack.Screen name="subjects" />
      <Stack.Screen name="users" />
      <Stack.Screen name="analytics" />
      <Stack.Screen name="subjectForm" /> {/* Keep if separate */}
      <Stack.Screen name="assignmentForm" /> {/* Keep if separate */}
      <Stack.Screen name="uploadNotes" /> {/* Add the new screen */}
    </Stack>
  );
}