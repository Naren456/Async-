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
import * as SecureStore from 'expo-secure-store';
// Validation Schema
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
  semester: Yup.string()
    .matches(/^\d+$/, "Semester must be a number")
    .required("Semester is required"),
  term: Yup.string()
    .matches(/^\d+$/, "Term must be a number")
    .required("Term is required"),
});

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (values: any, setErrors: any) => {
    setIsLoading(true);

    const payload = {
      ...values,
      cohortNo: parseInt(values.cohortNo, 10),
      semester: parseInt(values.semester, 10),
      term: parseInt(values.term, 10),
    };

    try {
      const result = await AuthsignUp(payload);
      console.log("SignUp Success:", result);

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
    <SafeAreaView className="flex-1 bg-[#0f172b]">
      <StatusBar style="dark" />
      <LinearGradient
        colors={["#1e3a8a", "#2563eb", "#60a5fa"]}
        locations={[0, 0.5, 1]}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
              initialValues={{ name: "", email: "", password: "", cohortNo: "", semester: "", term: "" }}
              validationSchema={SignUpSchema}
              onSubmit={(values, { setErrors }) => handleSignUp(values, setErrors)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View className="w-full max-w-sm">
                  {/* Full Name */}
                  <View className="mb-4">
                    <Text className="text-white mb-2 text-base font-medium">Full Name</Text>
                    <TextInput
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      placeholder="Enter your full name"
                      placeholderTextColor="rgba(0,0,0,0.4)"
                      className="bg-white rounded-xl px-4 py-4 text-gray-800 text-base"
                    />
                    {errors.name && touched.name && (
                      <Text className="text-red-300 text-sm mt-1 ml-1">{errors.name}</Text>
                    )}
                  </View>

                  {/* Email */}
                  <View className="mb-4">
                    <Text className="text-white mb-2 text-base font-medium">Email Address</Text>
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Enter your email"
                      placeholderTextColor="rgba(0,0,0,0.4)"
                      className="bg-white rounded-xl px-4 py-4 text-gray-800 text-base"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    {errors.email && touched.email && (
                      <Text className="text-red-300 text-sm mt-1 ml-1">{errors.email}</Text>
                    )}
                  </View>

                  {/* Password */}
                  <View className="mb-4">
                    <Text className="text-white mb-2 text-base font-medium">Password</Text>
                    <TextInput
                      secureTextEntry={!showPassword}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      placeholder="Create a password"
                      placeholderTextColor="rgba(0,0,0,0.4)"
                      className="bg-white rounded-xl px-4 py-4 text-gray-800 text-base"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff /> : <Eye />}
                    </TouchableOpacity>
                    {errors.password && touched.password && (
                      <Text className="text-red-300 text-sm mt-1 ml-1">{errors.password}</Text>
                    )}
                  </View>

                  {/* Cohort Number */}
                  <View className="mb-4">
                    <Text className="text-white mb-2 text-base font-medium">Cohort Number</Text>
                    <TextInput
                      onChangeText={handleChange("cohortNo")}
                      onBlur={handleBlur("cohortNo")}
                      value={values.cohortNo}
                      placeholder="Enter your cohort number"
                      placeholderTextColor="rgba(0,0,0,0.4)"
                      className="bg-white rounded-xl px-4 py-4 text-gray-800 text-base"
                      keyboardType="numeric"
                    />
                    {errors.cohortNo && touched.cohortNo && (
                      <Text className="text-red-300 text-sm mt-1 ml-1">{errors.cohortNo}</Text>
                    )}
                  </View>

                  {/* Semester */}
                  <View className="mb-4">
                    <Text className="text-white mb-2 text-base font-medium">Semester</Text>
                    <TextInput
                      onChangeText={handleChange("semester")}
                      onBlur={handleBlur("semester")}
                      value={values.semester}
                      placeholder="Enter your semester"
                      placeholderTextColor="rgba(0,0,0,0.4)"
                      className="bg-white rounded-xl px-4 py-4 text-gray-800 text-base"
                      keyboardType="numeric"
                    />
                    {errors.semester && touched.semester && (
                      <Text className="text-red-300 text-sm mt-1 ml-1">{errors.semester}</Text>
                    )}
                  </View>

                  {/* Term */}
                  <View className="mb-6">
                    <Text className="text-white mb-2 text-base font-medium">Term</Text>
                    <TextInput
                      onChangeText={handleChange("term")}
                      onBlur={handleBlur("term")}
                      value={values.term}
                      placeholder="Enter your term"
                      placeholderTextColor="rgba(0,0,0,0.4)"
                      className="bg-white rounded-xl px-4 py-4 text-gray-800 text-base"
                      keyboardType="numeric"
                    />
                    {errors.term && touched.term && (
                      <Text className="text-red-300 text-sm mt-1 ml-1">{errors.term}</Text>
                    )}
                  </View>

                  {/* Sign Up Button */}
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    disabled={isLoading}
                    className={`py-4 rounded-xl mb-6 bg-white`}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#3B82F6" />
                    ) : (
                      <Text className="text-blue-600 text-center font-bold text-lg">Create Account</Text>
                    )}
                  </TouchableOpacity>

                  {/* Sign In Link */}
                  <TouchableOpacity onPress={() => router.push("/auth/signin")} className="items-center">
                    <Text className="text-base font-medium text-white/90 text-center">
                      Already have an account? <Text className="font-bold underline">Sign In</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
