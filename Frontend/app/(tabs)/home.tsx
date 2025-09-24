import React, { useEffect, useState, useCallback } from "react";
import { Text, View, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AssignmentCard from "../../components/AssignmentCard";
import { GetAssignments } from "../../api/apiCall";
 type Assignment = {
  id: string;
  title: string;
  subject: string;
  link: string;
  isoDate: string;      // ISO datetime string (used for sorting/filtering)
  displayDate: string;  // Formatted date for UI: "dd-MMM-yyyy hh:mm AM/PM"
};

/** Grouped assignments type */
type GroupedAssignments = Record<string, Assignment[]>;
const   Assignment = () => {
  const [groupedAssignments, setGroupedAssignments] = useState<GroupedAssignments>({});
 
  const [cohort, setCohort] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
useEffect(() => {
  const loadAssignments = async () => {
    setLoading(true);
    setCohort(4);
    setError(null);
    try {
      const data = await GetAssignments(cohort);
      setGroupedAssignments(data.Assignments || {});

      // Schedule notifications for all assignments
      // Object.values(data.Assignments || {}).forEach((assignments: any) => {
      //   assignments.forEach((assignment: any) => {
      //     scheduleAssignmentNotification(assignment);
      //   });
      // });

      console.log("Assignments scheduled for notifications ✅");
    } catch (err) {
      console.error("Error loading assignments:", err);
      setError("Failed to load assignments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  loadAssignments();
}, [cohort]);

  const onRefresh = useCallback (async () => {
    setRefreshing(true);
    setError(null);
    try {
      const data = await GetAssignments(cohort);
      setGroupedAssignments(data.Assignments || {});
    } catch (err) {
      console.error("Error refreshing assignments:", err);
      setError("Failed to refresh assignments. Please try again.");
    } finally {
      setRefreshing(false);
    }
  }, [cohort]);

  return (
    <SafeAreaView className="flex-1 bg-[#0f172b] px-2">
     
        {/* Header */}
        <View className="px-2 py-3 flex-row justify-between items-center">
          <Text className="text-xl font-bold text-gray-100 tracking-wide">
           Upcoming Deadline
          </Text>
        </View>
         <ScrollView 
           showsVerticalScrollIndicator={false} 
           className="px-4"
           refreshControl={
             <RefreshControl
               refreshing={refreshing}
               onRefresh={onRefresh}
               colors={['#3B82F6']}
               tintColor="#3B82F6"
             />
           }
         >
        {/* Loading State */}
        {loading ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="text-gray-400 mt-4 text-base">Loading assignments...</Text>
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-red-400 text-base text-center mb-4">{error}</Text>
            <Text className="text-gray-400 text-sm text-center">Pull down to refresh</Text>
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
                {date}
              </Text>
              {assignments.map((assign: Assignment) => (
                <AssignmentCard
                  key={assign.id}
                  title={assign.title}
                  subject={assign.subject}
                  dueDate={assign.displayDate}
                  link={assign.link}
                />
              ))}
            </View>
          ))
        )}
      </ScrollView >
    </SafeAreaView>
  );
};

export default Assignment;