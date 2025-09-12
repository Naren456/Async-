import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AssignmentCard from "../../components/AssignmentCard";

import { GetAssignments } from "@/api/apiCall";
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
const Home = () => {
  const [groupedAssignments, setGroupedAssignments] = useState<GroupedAssignments>({});
  const [cohort, setCohort] = useState(4);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        // console.log("Loading assignments...");
        const grouped = await GetAssignments();
        // console.log("Grouped assignments in Home:", grouped);
        setGroupedAssignments(grouped);
      } catch (err) {
        console.error("Error loading ICS in Home:", err);
      }
    };

    loadAssignments();
  }, [cohort]);

  return (
    <SafeAreaView className="flex-1 bg-[#0f172b] px-2">
     
        {/* Header */}
        <View className="px-2 py-3 flex-row justify-between items-center">
          <Text className="text-xl font-bold text-gray-100 tracking-wide">
           Upcoming Deadline
          </Text>
        </View>
         <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        {/* Assignment List */}
        {Object.keys(groupedAssignments).length === 0 ? (
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

export default Home;
