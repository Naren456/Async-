import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  Modal,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, updateUser, setUser } from '@/store/reducer';
import { UpdateProfile } from '@/api/apiCall';
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  LogOut, 
  Bell, 
  Shield, 
  HelpCircle,
  ChevronRight,
  Edit3
} from 'lucide-react-native';

const UserProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState( '');
  const [editEmail, setEditEmail] = useState( '');

  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditEmail(user.email || '');
    }
  }, [user]);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            setIsLoading(true);
            try {
              dispatch(clearUser());
              router.replace('/');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            } finally {
              setIsLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');
    setEditModalVisible(true);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim() || !editEmail.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const updatedData = {
        name: editName.trim(),
        email: editEmail.trim(),
      };
      const response = await UpdateProfile(user.token, updatedData);
      dispatch(setUser(response.user));
      setEditModalVisible(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (e: any) {
      console.error("Error updating profile:", e);
      Alert.alert("Error", e.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const ProfileSection = ({ title, children }: any) => (
    <View className="mb-6">
      <Text className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">
        {title}
      </Text>
      {children}
    </View>
  );

  const ProfileItem = ({ icon, label, value, onPress }: any) => (
    <TouchableOpacity
      className="flex-row items-center py-4 border-b border-white/5"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="w-8 h-8 rounded-full bg-blue-600/20 items-center justify-center mr-4">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-gray-400 text-sm">{label}</Text>
        <Text className="text-white text-base mt-1">{value}</Text>
      </View>
      {onPress && <ChevronRight size={20} color="#6B7280" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0f172b]">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="py-6">
          <Text className="text-3xl font-bold text-white">Profile</Text>
          <Text className="text-gray-400 mt-2">Manage your account settings</Text>
        </View>

        {/* User Info Section */}
        <ProfileSection title="ACCOUNT">
          <View className="p-4">
            <View className="flex-row items-center mb-4">
              <View className="w-16 h-16 rounded-full bg-blue-600/20 items-center justify-center mr-4">
                <User size={32} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="text-white text-xl font-semibold">
                  {user?.name || 'Guest User'}
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                  {user?.email || 'N/A'}
                </Text>
              </View>
              <TouchableOpacity
                className="p-2 rounded-full bg-blue-600/20"
                onPress={handleEditProfile}
                activeOpacity={0.7}
              >
                <Edit3 size={20} color="#3B82F6" />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center py-3 border-t border-white/10">
              <View className="flex-row items-center">
                <Calendar size={16} color="#6B7280" />
                <Text className="text-gray-400 text-sm ml-2">
                  Cohort {user?.cohortNo || 'N/A'}
                </Text>
              </View>
              <View className="bg-green-600/20 px-3 py-1 rounded-full">
                <Text className="text-green-400 text-xs font-medium">Active</Text>
              </View>
            </View>
          </View>
        </ProfileSection>

        {/* Settings Section */}
        <ProfileSection title="SETTINGS">
          <View className="bg-[#1e293b] rounded-xl">
            <ProfileItem
              icon={<Bell size={16} color="#3B82F6" />}
              label="Notifications"
              value={notificationsEnabled ? "Enabled" : "Disabled"}
              onPress={() => setNotificationsEnabled(!notificationsEnabled)}
            />
            <ProfileItem
              icon={<Settings size={16} color="#3B82F6" />}
              label="Dark Mode"
              value={darkModeEnabled ? "Enabled" : "Disabled"}
              onPress={() => setDarkModeEnabled(!darkModeEnabled)}
            />
            <ProfileItem
              icon={<Shield size={16} color="#3B82F6" />}
              label="Privacy"
              value="Manage your privacy settings"
              onPress={() => Alert.alert('Coming Soon', 'Privacy settings will be available soon')}
            />
          </View>
        </ProfileSection>


        {/* Logout Button */}
        <TouchableOpacity
          className="bg-red-600/20 border border-red-600/30 rounded-xl p-4 mb-8"
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <View className="flex-row items-center justify-center">
            <LogOut size={20} color="#EF4444" />
            <Text className="text-red-400 font-semibold ml-2">
              {isLoading ? 'Logging out...' : 'Logout'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-[#0f172b]">
          <View className="flex-row items-center justify-between p-4 border-b border-white/10">
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Text className="text-blue-400 text-base">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold">Edit Profile</Text>
            <TouchableOpacity onPress={handleSaveProfile} disabled={isLoading}>
              <Text className="text-blue-400 text-base font-semibold">
                {isLoading ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 p-4">
            <View className="mb-6">
              <Text className="text-white text-base font-medium mb-2">Name</Text>
              <TextInput
                value={editName}
                onChangeText={setEditName}
                className="bg-[#1e293b] text-white rounded-lg px-4 py-3 border border-white/10"
                placeholder="Enter your name"
                placeholderTextColor="#6B7280"
              />
            </View>

            <View className="mb-6">
              <Text className="text-white text-base font-medium mb-2">Email</Text>
              <TextInput
                value={editEmail}
                onChangeText={setEditEmail}
                className="bg-[#1e293b] text-white rounded-lg px-4 py-3 border border-white/10"
                placeholder="Enter your email"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default UserProfile;
