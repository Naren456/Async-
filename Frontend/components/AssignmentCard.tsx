import { CalendarDays, ChevronRight, Plus } from "lucide-react-native";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import RNCalendarEvents from "react-native-calendar-events";

interface AssignmentCardProps {
  title: string;
  subject: string;
  dueDate: string; // should be in ISO format for calendar
  link: string;
  onPress?: () => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  title,
  subject,
  dueDate,
  onPress,
}) => {
  const addToCalendar = async () => {
    try {
      const permission = await RNCalendarEvents.requestPermissions();
      if (permission === "authorized") {
        await RNCalendarEvents.saveEvent(title, {
          startDate: new Date(dueDate).toISOString(),
          endDate: new Date(new Date(dueDate).getTime() + 60 * 60 * 1000).toISOString(), // default 1 hour
          notes: `Assignment for ${subject}`,
        });
        Alert.alert("Success", "Assignment added to your calendar!");
      } else {
        Alert.alert("Permission Denied", "Cannot access calendar.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add to calendar.");
      console.error(error);
    }
  };

  const CardContent = (
    <View className="rounded-2xl border border-white/10 bg-[#334155]/70 shadow-md p-5 mb-4">
      {/* Subject badge */}
      <View className="self-start bg-blue-600/30 px-3 py-1 rounded-full mb-3">
        <Text className="text-xs font-medium text-blue-300">{subject}</Text>
      </View>

      {/* Title */}
      <Text className="text-lg font-semibold mb-3 text-gray-100 leading-6">
        {title}
      </Text>

      {/* Due Date + Chevron + Add to Calendar */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <CalendarDays size={16} color="#60A5FA" />
          <Text className="ml-2 text-sm text-gray-300">Due: {dueDate}</Text>
        </View>

        <View className="flex-row items-center">
          {onPress && <ChevronRight size={18} color="#60A5FA" />}
          <Pressable onPress={addToCalendar} className="ml-3 p-1 rounded-full bg-blue-600/30">
            <Plus size={18} color="#60A5FA" />
          </Pressable>
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{CardContent}</Pressable>;
  }

  return CardContent;
};

export default AssignmentCard;
