import { TouchableOpacity, Text, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';

type Props = {
  name: string;
  skill?: string;  // Optional skill tag
};

const SubjectCard = ({ name, skill }: Props) => {
  const router = useRouter();
  const isDarkMode = useColorScheme() === 'dark';

  const bgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-100';
  const textClass = isDarkMode ? 'text-blue-400' : 'text-blue-600';
  const badgeBg = isDarkMode ? 'bg-blue-900' : 'bg-blue-50';
  const badgeText = isDarkMode ? 'text-blue-400' : 'text-blue-600';

  return (
    <TouchableOpacity
      onPress={() => router.push("/(tabs)/subject")}
      className={`mb-3 rounded-2xl p-4 shadow border-2 ${bgClass} ${borderClass}`}
    >
      {/* Skill tag badge */}
      {skill && (
        <View className={`self-start px-3 py-1 rounded-full mb-2 ${badgeBg}`}>
          <Text className={`text-xs font-medium ${badgeText}`}>{skill}</Text>
        </View>
      )}

      {/* Subject name */}
      <Text className={`text-lg font-semibold ${textClass}`}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default SubjectCard;
