import { CalendarDays, ChevronRight } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface AssignmentCardProps {
  title: string;
  subject: string;
  dueDate: string;
  link: string;
  onPress?: () => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  title,
  subject,
  dueDate,
  onPress,
}) => {
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

      {/* Due Date + Chevron */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <CalendarDays size={16} color="#60A5FA" />
          <Text className="ml-2 text-sm text-gray-300">Due: {dueDate}</Text>
        </View>

        {onPress && <ChevronRight size={18} color="#60A5FA" />}
      </View>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{CardContent}</Pressable>;
  }

  return CardContent;
};

export default AssignmentCard;
