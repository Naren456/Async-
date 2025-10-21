import { Stack } from "expo-router";
import React from "react";

export default function AdminLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="assignments" />
      <Stack.Screen name="subjects" />
      <Stack.Screen name="users" />
    </Stack>
  );
}
