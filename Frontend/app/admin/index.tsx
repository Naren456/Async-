import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import {
  Settings,
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react-native';

const AdminDashboard = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSubjects: 0,
    totalAssignments: 0,
    activeCohorts: 0,
  });

  useEffect(() => {
    if (user?.role !== 'TEACHER') {
      Alert.alert('Access Denied', 'Admin access required');
      router.replace('/(tabs)/home');
      return;
    }
    loadStats();
  }, [user]);

  const loadStats = async () => {
    setLoading(true);
    try {
      // TODO: Add API calls to get stats
      setStats({
        totalUsers: 150,
        totalSubjects: 25,
        totalAssignments: 45,
        activeCohorts: 8,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color }: any) => (
    <View className="bg-[#1e293b] rounded-xl p-4 mb-4 border border-white/10">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-gray-400 text-sm">{title}</Text>
          <Text className="text-white text-2xl font-bold mt-1">{value}</Text>
        </View>
        <View className="w-12 h-12 rounded-full items-center justify-center" style={{ backgroundColor: color + '20' }}>
          {icon}
        </View>
      </View>
    </View>
  );

  const ActionButton = ({ title, description, icon, onPress, color = '#3B82F6' }: any) => (
    <TouchableOpacity
      className="bg-[#1e293b] rounded-xl p-4 mb-3 border border-white/10"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-full items-center justify-center mr-4" style={{ backgroundColor: color + '20' }}>
          {icon}
        </View>
        <View className="flex-1">
          <Text className="text-white text-lg font-semibold">{title}</Text>
          <Text className="text-gray-400 text-sm mt-1">{description}</Text>
        </View>
        <Settings size={20} color="#6B7280" />
      </View>
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
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="py-6">
          <Text className="text-3xl font-bold text-white">Admin Dashboard</Text>
          <Text className="text-gray-400 mt-2">Manage assignments, subjects, and users</Text>
        </View>

        {/* Stats Grid */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-white mb-4">Overview</Text>
          <View className="flex-row flex-wrap justify-between">
            <View className="w-[48%]">
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon={<Users size={24} color="#3B82F6" />}
                color="#3B82F6"
              />
            </View>
            <View className="w-[48%]">
              <StatCard
                title="Subjects"
                value={stats.totalSubjects}
                icon={<BookOpen size={24} color="#10B981" />}
                color="#10B981"
              />
            </View>
            <View className="w-[48%]">
              <StatCard
                title="Assignments"
                value={stats.totalAssignments}
                icon={<Calendar size={24} color="#F59E0B" />}
                color="#F59E0B"
              />
            </View>
            <View className="w-[48%]">
              <StatCard
                title="Active Cohorts"
                value={stats.activeCohorts}
                icon={<BarChart3 size={24} color="#EF4444" />}
                color="#EF4444"
              />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-white mb-4">Quick Actions</Text>
          
          <ActionButton
            title="Create Assignment"
            description="Add new assignment with deadline"
            icon={<Plus size={20} color="#3B82F6" />}
            onPress={() => router.push('/admin/assignments')}
            color="#3B82F6"
          />
          
          <ActionButton
            title="Manage Subjects"
            description="Add, edit, or remove subjects"
            icon={<BookOpen size={20} color="#10B981" />}
            onPress={() => router.push('/admin/subjects')}
            color="#10B981"
          />
          
          <ActionButton
            title="User Management"
            description="View and manage user accounts"
            icon={<Users size={20} color="#F59E0B" />}
            onPress={() => router.push('/admin/users')}
            color="#F59E0B"
          />
        </View>

        {/* Recent Activity */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-white mb-4">Recent Activity</Text>
          <View className="bg-[#1e293b] rounded-xl p-4 border border-white/10">
            <Text className="text-gray-400 text-sm">No recent activity</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboard;
