import React, { useState } from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  Image,
  Switch,
  ActivityIndicator,
  Modal,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
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


const Profile = () => {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState( '');
  const [editEmail, setEditEmail] = useState( '');

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            setIsLoading(true);
            try {
              // Clear user data
            
              // Navigate to login screen
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
    setEditName( '');
    setEditEmail( '');
    setEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    if (!editName.trim() || !editEmail.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Update user data in store
    // if (user) {
    //   setUser({
    //     ...user,
    //     name: editName.trim(),
    //     email: editEmail.trim(),
    //   });
    // }

    setEditModalVisible(false);
    Alert.alert("Success", "Profile updated successfully");
  };

  const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View className="mb-6">
      <Text className="text-gray-400 text-sm font-medium mb-3 px-1">{title}</Text>
      <View className="bg-[#1e293b]/60 rounded-xl border border-white/10">
        {children}
      </View>
    </View>
  );

  const ProfileItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement,
    showChevron = true 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    showChevron?: boolean;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      className={`flex-row items-center py-4 px-4 ${
        onPress ? 'active:bg-white/5' : ''
      }`}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View className="w-10 h-10 rounded-full bg-blue-600/20 items-center justify-center mr-4">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-white text-base font-medium">{title}</Text>
        {subtitle && (
          <Text className="text-gray-400 text-sm mt-1">{subtitle}</Text>
        )}
      </View>
      {rightElement || (showChevron && onPress && (
        <ChevronRight size={20} color="#6B7280" />
      ))}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0f172b]">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="py-6">
          <Text className="text-2xl font-bold text-white">Profile</Text>
          <Text className="text-gray-400 mt-1">Manage your account settings</Text>
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
                  { 'User'}
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                  { 'user@example.com'}
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
                  Cohort { 4}
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
          <ProfileItem
            icon={<Bell size={20} color="#3B82F6" />}
            title="Notifications"
            subtitle="Assignment reminders and updates"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#374151', true: '#3B82F6' }}
                thumbColor={notificationsEnabled ? '#ffffff' : '#9CA3AF'}
              />
            }
            showChevron={false}
          />
          
          <View className="h-px bg-white/10 mx-4" />
          
          <ProfileItem
            icon={<Settings size={20} color="#3B82F6" />}
            title="Appearance"
            subtitle="Dark mode and theme settings"
            rightElement={
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#374151', true: '#3B82F6' }}
                thumbColor={darkModeEnabled ? '#ffffff' : '#9CA3AF'}
              />
            }
            showChevron={false}
          />
        </ProfileSection>

       

        {/* App Info Section */}
        <ProfileSection title="ABOUT">
          <ProfileItem
            icon={<Settings size={20} color="#3B82F6" />}
            title="App Version"
            subtitle="1.0.0"
            showChevron={false}
          />
          
          <View className="h-px bg-white/10 mx-4" />
          
       
        </ProfileSection>

        {/* Logout Button */}
        <View className="mt-6 mb-8">
          <TouchableOpacity
            onPress={handleLogout}
            disabled={isLoading}
            className={`py-4 px-6 rounded-xl border-2 ${
              isLoading 
                ? 'bg-gray-600/20 border-gray-600' 
                : 'bg-red-600/20 border-red-600 active:bg-red-600/30'
            }`}
            activeOpacity={0.7}
          >
            {isLoading ? (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator size="small" color="#EF4444" />
                <Text className="text-red-400 ml-2 font-semibold">Logging out...</Text>
              </View>
            ) : (
              <View className="flex-row items-center justify-center">
                <LogOut size={20} color="#EF4444" />
                <Text className="text-red-400 ml-2 font-semibold">Logout</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-[#0f172b]">
          <View className="flex-row items-center justify-between p-4 border-b border-white/10">
            <TouchableOpacity
              onPress={() => setEditModalVisible(false)}
              className="p-2"
            >
              <Text className="text-blue-400 text-base">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold">Edit Profile</Text>
            <TouchableOpacity
              onPress={handleSaveProfile}
              className="p-2"
            >
              <Text className="text-blue-400 text-base font-semibold">Save</Text>
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

            <View className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
              <Text className="text-yellow-400 text-sm">
                Note: Changes are saved locally. To update your account on the server, 
                please contact support or re-register with your new information.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;