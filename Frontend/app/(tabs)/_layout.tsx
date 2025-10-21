import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons , Feather , MaterialCommunityIcons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3B82F6", // Bright Blue
        tabBarInactiveTintColor: "#94A3B8", // Slate gray
        tabBarStyle: {
          backgroundColor: "#0f172a", // Navy background
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          overflow: "hidden",
          height: 70,
           borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="book-open-page-variant" size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-sharp" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: "Admin",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
