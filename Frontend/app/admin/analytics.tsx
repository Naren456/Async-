import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const AdminAnalytics = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#0f172b]">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-white/10">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ArrowLeft size={24} color="#60A5FA" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">Analytics</Text>
        <View style={{ width: 24 }} />
      </View>
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-gray-400">Analytics dashboard coming soon</Text>
      </View>
    </SafeAreaView>
  );
};

export default AdminAnalytics;


