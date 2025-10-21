import React, { useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { Settings } from 'lucide-react-native';

const AdminTab = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user?.role !== 'TEACHER') {
      Alert.alert('Access Denied', 'Admin access required');
      router.replace('/(tabs)/home');
      return;
    }
    // Redirect to admin dashboard
    router.replace('/admin');
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-[#0f172b] items-center justify-center">
      <Settings size={48} color="#60A5FA" />
      <Text className="text-white text-lg mt-4">Redirecting to Admin...</Text>
    </SafeAreaView>
  );
};

export default AdminTab;
