// app/(tabs)/home.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AssignmentCard from "../../components/AssignmentCard";
import { GetAssignmentsByCohort } from "../../api/apiCall";
import { Assignment as BaseAssignment, syncAssignment } from "../../utils/notifications";

// Extend Assignment type for local display
export type Assignment = BaseAssignment & {
  displayDate: string;
  link: string;
};

// AsyncStorage key
const ASSIGNMENTS_KEY = "assignments";

// Grouped assignments type
type GroupedAssignments = Record<string, Assignment[]>;

const Home = () => {
  const cohortNo = useSelector((state: any) => state.user?.cohortNo);
  const [groupedAssignments, setGroupedAssignments] = useState<GroupedAssignments>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Transform API response to local Assignment type
  const transformGrouped = (grouped: any): GroupedAssignments => {
    const result: GroupedAssignments = {};
    Object.entries(grouped || {}).forEach(([date, items]: any) => {
      result[date] = (items as any[]).map((a: any) => {
        const iso = a.dueDate ? new Date(a.dueDate).toISOString() : "";
        const display = a.dueDate
          ? new Date(a.dueDate).toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "No due date";

        return {
          id: a.id,
          title: a.title,
          subject: a.subject?.name || a.subject?.code || "Subject",
          isoDate: iso,
          displayDate: display,
          link: a.link || "",
        } as Assignment;
      });
    });
    return result;
  };

  // Fetch assignments
  const loadAssignments = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await GetAssignmentsByCohort(cohortNo);
      const grouped = transformGrouped(data.grouped);
      setGroupedAssignments(grouped);

      // Cache locally
      await AsyncStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(grouped));

      // Schedule notifications
      Object.values(grouped)
        .flat()
        .filter(a => new Date(a.isoDate) > new Date())
        .forEach(a => syncAssignment(a));

    } catch (err) {
      console.error("Error loading assignments:", err);
      setError("Failed to load assignments. Pull down to refresh.");

      const cached = await AsyncStorage.getItem(ASSIGNMENTS_KEY);
      if (cached) setGroupedAssignments(JSON.parse(cached));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cohortNo != null) loadAssignments();
  }, [cohortNo]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadAssignments();
    setRefreshing(false);
  }, [cohortNo]);

  return (
    <SafeAreaView className="flex-1 bg-[#0f172b] px-2">
      <View className="px-2 py-3 flex-row justify-between items-center">
        <Text className="text-xl font-bold text-gray-100 tracking-wide">
          Upcoming Deadlines
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3B82F6"]}
            tintColor="#3B82F6"
          />
        }
      >
        {loading ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="text-gray-400 mt-4 text-base">
              Loading assignments...
            </Text>
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-red-400 text-base text-center mb-4">{error}</Text>
            <Text className="text-gray-400 text-sm text-center">
              Pull down to refresh
            </Text>
          </View>
        ) : Object.keys(groupedAssignments).length === 0 ? (
          <Text className="text-gray-400 px-5 text-base">
            No upcoming assignments
          </Text>
        ) : (
          Object.entries(groupedAssignments).map(([date, assignments]) => (
            <View
              key={date}
              className="mb-6 rounded-xl bg-[#1e293b]/60 border border-white/10 p-4"
            >
              <Text className="text-lg font-semibold text-blue-300 mb-3">
                {(() => {
                  const d = new Date(date);
                  const day = d.getDate().toString().padStart(2, "0");
                  const month = d.toLocaleString("en-GB", { month: "short" });
                  const year = d.getFullYear();
                  return `${day}-${month}-${year}`;
                })()}
              </Text>

              {assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  title={assignment.title}
                  subject={assignment.subject}
                  dueDate={assignment.displayDate}
                  link={assignment.link}
                />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
