import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, ActivityIndicator, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import * as Yup from "yup";
import { BookOpen, User, Mail, Lock, Users, Eye, EyeOff } from "lucide-react-native";
import { AuthsignUp } from "../../api/apiCall";

// Validation Schema - Updated for assignment app context
const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must contain at least one letter and one number")
    .required("Password is required"),
  cohortNo: Yup.string()
    .matches(/^\d+$/, "Cohort must be a number")
    .required("Cohort number is required"),
});

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (
    values: {
      name: string;
      email: string;
      password: string;
      cohortNo: string;
    },
    setErrors: (errors: { [key: string]: string }) => void
  ) => {
    console.log("Raw Form Values:", values);
    setIsLoading(true);

    // Convert numeric fields
    const payload = {
      ...values,
      cohortNo: parseInt(values.cohortNo, 10),
    };

    try {
      const result = await AuthsignUp(payload);
      console.log("SignUp Success:", result);
      
      // Store user data in the store
      const userData = {
        id: result.user?.id || '',
        email: values.email,
        name: values.name,
        cohortNo: parseInt(values.cohortNo, 10),
      };
     
      // Show success message
      Alert.alert(
        "Account Created!", 
        "Welcome to ASync! You can now start managing your assignments.",
        [{ text: "Get Started", onPress: () => router.push("/(tabs)/home") }]
      );
      
    } catch (e: any) {
      console.log("SignUp Error:", e);
      const errorMsg = e.response?.data?.message || e.message || "Failed to create account";
      
      Alert.alert("Sign Up Failed", errorMsg);
      setErrors({ general: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-900">
      <StatusBar style="light" />
      <LinearGradient 
        colors={["#1E3A8A", "#3B82F6", "#60A5FA"]} 
        locations={[0, 0.5, 1]}
        style={{ flex: 1 }}
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 items-center justify-center px-8 py-8">
            {/* Header */}
            <View className="justify-center items-center mb-8">
              <View className="mb-4 p-4 rounded-full bg-white/15 backdrop-blur-sm">
                <View className="w-12 h-12 rounded-full bg-white/25 items-center justify-center">
                  <BookOpen size={24} color="white" strokeWidth={2} />
                </View>
              </View>
              <Text className="text-4xl font-bold text-white mb-2">Join ASync</Text>
              <Text className="text-base text-white/80 text-center">
                Start organizing your assignments today
              </Text>
            </View>

            <Formik
              initialValues={{ email: "", name: "", password: "", cohortNo: "" }}
              validationSchema={SignUpSchema}
              onSubmit={(values, { setErrors }) => handleSignUp(values, setErrors)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View className="w-full max-w-sm">
                  {/* Full Name Input */}
                  <View className="mb-4">
                    <Text className="text-white mb-2 text-base font-medium">Full Name</Text>
                    <View className="relative">
                      <View className="absolute left-3 top-3 z-10">
                        <User size={20} color="rgba(0,0,0,0.4)" strokeWidth={2} />
                      </View>
                      <TextInput
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        placeholder="Enter your full name"
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        className="bg-white rounded-xl px-12 py-4 text-gray-800 text-base"
                        autoCapitalize="words"
                        autoComplete="name"
                      />
                    </View>
                    {errors.name && touched.name && (
                      <Text className="text-red-300 text-sm mt-1 ml-1">{errors.name}</Text>
                    )}
                  </View>

                  {/* Email Input */}
                  <View className="mb-4">
                    <Text className="text-white mb-2 text-base font-medium">Email Address</Text>
                    <View className="relative">
                      <View className="absolute left-3 top-3 z-10">
                        <Mail size={20} color="rgba(0,0,0,0.4)" strokeWidth={2} />
                      </View>
                      <TextInput
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        placeholder="Enter your email"
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        className="bg-white rounded-xl px-12 py-4 text-gray-800 text-base"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                      />
                    </View>
                    {errors.email && touched.email && (
                      <Text className="text-red-300 text-sm mt-1 ml-1">{errors.email}</Text>
                    )}
                  </View>

                  {/* Password Input */}
                  <View className="mb-4">
                    <Text className="text-white mb-2 text-base font-medium">Password</Text>
                    <View className="relative">
                      <View className="absolute left-3 top-3 z-10">
                        <Lock size={20} color="rgba(0,0,0,0.4)" strokeWidth={2} />
                      </View>
                      <TextInput
                        secureTextEntry={!showPassword}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        placeholder="Create a password"
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        className="bg-white rounded-xl px-12 py-4 text-gray-800 text-base pr-12"
                        autoComplete="password-new"
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3"
                        activeOpacity={0.7}
                      >
                        {showPassword ? (
                          <EyeOff size={20} color="rgba(0,0,0,0.4)" strokeWidth={2} />
                        ) : (
                          <Eye size={20} color="rgba(0,0,0,0.4)" strokeWidth={2} />
                        )}
                      </TouchableOpacity>
                    </View>
                    {errors.password && touched.password && (
                      <Text className="text-red-300 text-sm mt-1 ml-1">{errors.password}</Text>
                    )}
                  </View>

                  {/* Cohort Input */}
                  <View className="mb-6">
                    <Text className="text-white mb-2 text-base font-medium">Cohort Number</Text>
                    <View className="relative">
                      <View className="absolute left-3 top-3 z-10">
                        <Users size={20} color="rgba(0,0,0,0.4)" strokeWidth={2} />
                      </View>
                      <TextInput
                        onChangeText={handleChange("cohortNo")}
                        onBlur={handleBlur("cohortNo")}
                        value={values.cohortNo}
                        placeholder="Enter your cohort number"
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        className="bg-white rounded-xl px-12 py-4 text-gray-800 text-base"
                        keyboardType="numeric"
                        maxLength={4}
                      />
                    </View>
                    {errors.cohortNo && touched.cohortNo && (
                      <Text className="text-red-300 text-sm mt-1 ml-1">{errors.cohortNo}</Text>
                    )}
                  </View>

                  {/* Password Requirements */}
                  <View className="mb-6 px-1">
                    <Text className="text-white/60 text-xs leading-4">
                      Password must be at least 6 characters with letters and numbers
                    </Text>
                  </View>

                  {/* Sign Up Button */}
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    disabled={isLoading}
                    className={`py-4 rounded-xl mb-6 ${
                      isLoading ? 'bg-white/50' : 'bg-white'
                    }`}
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 8,
                    }}
                    activeOpacity={0.8}
                  >
                    {isLoading ? (
                      <View className="flex-row items-center justify-center">
                        <ActivityIndicator size="small" color="#3B82F6" />
                        <Text className="text-blue-600 ml-2 font-bold text-lg">Creating Account...</Text>
                      </View>
                    ) : (
                      <Text className="text-blue-600 text-center font-bold text-lg">Create Account</Text>
                    )}
                  </TouchableOpacity>

                  {/* Sign In Link */}
                  <TouchableOpacity 
                    onPress={() => router.push("/auth/signin")} 
                    activeOpacity={0.7}
                    className="items-center"
                  >
                    <Text className="text-base font-medium text-white/90 text-center">
                      Already have an account?{" "}
                      <Text className="font-bold underline">Sign In</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>

        {/* Decorative Elements */}
        <View className="absolute top-20 right-10 w-16 h-16 rounded-full bg-white/5" />
        <View className="absolute top-40 left-8 w-10 h-10 rounded-full bg-white/5" />
        <View className="absolute bottom-32 right-6 w-12 h-12 rounded-full bg-white/5" />
      </LinearGradient>
    </SafeAreaView>
  );
}