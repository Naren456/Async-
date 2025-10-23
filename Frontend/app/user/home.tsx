import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {
  BookOpen,
  Calendar,
  ClipboardList,
  CheckCircle,
  Clock,
  Plus,
} from "lucide-react-native";
import { useRouter } from "expo-router";

const UserDashboard = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalSubjects: 0,
    totalAssignments: 0,
    upcomingDeadlines: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      // replace with real API call
      setStats({
        totalSubjects: 5,
        totalAssignments: 12,
        upcomingDeadlines: 3,
      });
    } catch (e) {
      console.error("Error loading stats:", e);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  };

  const StatCard = ({ title, value, icon, color }: any) => (
    <View className="bg-[#1e293b]/60 rounded-xl p-4 mb-4 w-full border border-white/10">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-gray-400 text-sm mb-1">{title}</Text>
          <Text className="text-white text-2xl font-bold">{value}</Text>
        </View>
        <View className={`w-12 h-12 rounded-xl items-center justify-center`} style={{ backgroundColor: color + "22" }}>
          {icon}
        </View>
      </View>
    </View>
  );

  const ActionButton = ({ title, description, icon, onPress, color = "#3B82F6" }: any) => (
    <TouchableOpacity
      className="bg-[#1e293b]/60 rounded-xl p-4 mb-4 border border-white/10 flex-row items-center"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="w-12 h-12 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: color + "22" }}>
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-white text-lg font-semibold">{title}</Text>
        <Text className="text-gray-400 text-sm mt-1">{description}</Text>
      </View>
      <Plus size={16} color={color} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#0f172b] items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-400 mt-4">Loading dashboard...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0f172b]">
      {/* Header */}
      <View className="px-5 py-4 border-b border-white/10 bg-[#1e293b]/80">
        <Text className="text-2xl font-bold text-white">Hello, {user?.name}</Text>
        <View className="flex-row items-center mt-1">
          <Clock size={14} color="#60A5FA" />
          <Text className="text-gray-400 text-sm ml-2">Welcome back!</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-5"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#3B82F6"]} tintColor="#3B82F6" />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Stats */}
        <View className="py-6">
          <Text className="text-2xl font-bold text-white mb-4">Your Stats</Text>
          <View className="flex-row flex-wrap justify-between">
            <View className="w-[48%]">
              <StatCard
                title="Subjects"
                value={stats.totalSubjects}
                icon={<BookOpen size={26} color="#10B981" />}
                color="#10B981"
              />
            </View>
            <View className="w-[48%]">
              <StatCard
                title="Assignments"
                value={stats.totalAssignments}
                icon={<ClipboardList size={26} color="#F59E0B" />}
                color="#F59E0B"
              />
            </View>
            <View className="w-[48%]">
              <StatCard
                title="Upcoming Deadlines"
                value={stats.upcomingDeadlines}
                icon={<Calendar size={26} color="#3B82F6" />}
                color="#3B82F6"
              />
            </View>
          </View>
        </View>

       
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDashboard;
