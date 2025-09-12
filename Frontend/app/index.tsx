import React from 'react';
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';



export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-blue-900">
      <StatusBar style="light" />
      <LinearGradient
        // Background Linear Gradient
        colors={['#1E3A8A', '#3B82F6']}
        style={{ flex: 1 }}
      >
        <View className="flex-1 items-center justify-center px-10">
          <View className=" justify-center items-center mb-10">
           

            
            <Text className="text-5xl font-semibold text-white ">PortSync</Text>
            
       
         
          </View>
          
          {/* Action Buttons Container */}
          <View className="w-80 ">
            {/* Sign Up Button */}
            <TouchableOpacity 
              className="bg-white w-full py-4 rounded-full shadow-lg mb-5"
              onPress={() => router.push('./auth/signup')} // Navigate to Sign Up page
              activeOpacity={0.7}
            >
              <Text className="text-lg font-bold text-blue-500 text-center">Create Account</Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <TouchableOpacity
              onPress={() => router.push('./auth/signin')} // Navigate to Sign In page
              activeOpacity={0.7}
            >
              <Text className="text-base font-medium text-white text-center">
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

