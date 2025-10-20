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
import {
  scheduleAssignmentNotifications,
  registerForNotifications,
} from "../../utils/notifications";

// ----- Types -----
type Assignment = {
  id: string;
  title: string;
  subject: string;
  link: string;
  isoDate: string;
  displayDate: string;
};

type GroupedAssignments = Record<string, Assignment[]>;

// AsyncStorage key
const ASSIGNMENTS_KEY = "assignments";

// ----- Component -----
const Home = () => {
  const cohortNo = useSelector((state: any) => state.user?.cohortNo);
  const [groupedAssignments, setGroupedAssignments] = useState<GroupedAssignments>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Transform API data to Assignment[]
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
          link: a.link || "",
          isoDate: iso,
          displayDate: display,
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

      // Store in AsyncStorage
      await AsyncStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(grouped));

      // Schedule notifications only for future assignments
      const futureAssignments = Object.values(grouped)
        .flat()
        .filter(a => new Date(a.isoDate) > new Date());

      futureAssignments.forEach(a => scheduleAssignmentNotifications(a));

    } catch (err) {
      console.error("Error loading assignments:", err);
      setError("Failed to load assignments. Pull down to refresh.");

      // Load from AsyncStorage if API fails
      const cached = await AsyncStorage.getItem(ASSIGNMENTS_KEY);
      if (cached) {
        setGroupedAssignments(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  };

  // Load assignments when cohort changes
  useEffect(() => {
    if (cohortNo != null) loadAssignments();
  }, [cohortNo]);

  // Register for notifications once on app start
  useEffect(() => {
    registerForNotifications();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadAssignments();
    setRefreshing(false);
  }, [cohortNo]);

  return (
    <SafeAreaView className="flex-1 bg-[#0f172b] px-2">
      {/* Header */}
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

              {(assignments as Assignment[]).map((assignment) => (
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
