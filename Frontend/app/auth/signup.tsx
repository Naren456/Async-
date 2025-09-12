import React from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthsignUp } from "../../api/apiCall";

// Validation Schema
const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
  cohortNo: Yup.string().required("Cohort is required"), // ✅ match form
  semester: Yup.string().required("Semester is required"),
  term: Yup.string().required("Term is required"),
});


export default function SignUp() {
  const router = useRouter();

const handleSignUp = async (values: {
  name: string;
  email: string;
  password: string;
  cohortNo: string;
  semester: string;
  term: string;
}) => {
  console.log("Raw Form Values:", values);

  // Convert numeric fields
  const payload = {
    ...values,
    cohortNo: parseInt(values.cohortNo, 10),
    semester: parseInt(values.semester, 10),
    term: parseInt(values.term, 10),
  };

  try {
    const result = await AuthsignUp(payload);
    console.log("SignUp Success:", result); // remove `.data`
    router.push("/home");
  } catch (e) {
    console.log("Error", e);
  }
};


  return (
    <SafeAreaView className="flex-1 bg-blue-900">
      <StatusBar style="light" />
      <LinearGradient colors={["#1E3A8A", "#3B82F6"]} style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center px-5">
          {/* Title */}
          <View className="justify-center items-center mb-10">
            <Text className="text-5xl font-semibold text-white">PortSync</Text>
          </View>

          {/* Formik Form */}
          <Formik
            initialValues={{ email: "", name: "", password: "", cohortNo: "", semester: "", term: "" }}
            validationSchema={SignUpSchema}
            onSubmit={(values) => handleSignUp(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View className="w-3/4">
                {/* Name */}
                <Text className="text-white mb-2 text-xl">Name</Text>
                <TextInput
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  className="bg-white rounded-lg px-3 py-2 mb-2"
                />
                {touched.name && errors.name && (
                  <Text className="text-red-500 text-xs mb-2">{errors.name}</Text>
                )}

                {/* Email */}
                <Text className="text-white mb-2 text-xl">Email</Text>
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-white rounded-lg px-3 py-2 mb-2"
                />
                {touched.email && errors.email && (
                  <Text className="text-red-500 text-xs mb-2">{errors.email}</Text>
                )}

                {/* Password */}
                <Text className="text-white mb-2 text-xl">Password</Text>
                <TextInput
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  className="bg-white rounded-lg px-3 py-2 mb-2"
                />
                {touched.password && errors.password && (
                  <Text className="text-red-500 text-xs mb-2">{errors.password}</Text>
                )}

                {/* Cohort */}
                <Text className="text-white mb-2 text-xl">Cohort</Text>
                <TextInput
                  onChangeText={handleChange("cohortNo")}
                  onBlur={handleBlur("cohortNo")}
                  value={values.cohortNo}
                  className="bg-white rounded-lg px-3 py-2 mb-4"
                />
                {touched.cohortNo && errors.cohortNo && (
                  <Text className="text-red-500 text-xs mb-2">{errors.cohortNo}</Text>
                )}

                <Text className="text-white mb-2 text-xl">Semester</Text>
                 <TextInput
                  onChangeText={handleChange("semester")}
                  onBlur={handleBlur("semester")}
                  value={values.semester}
                  className="bg-white rounded-lg px-3 py-2 mb-4"
                />
                {touched.semester && errors.semester && (
                  <Text className="text-red-500 text-xs mb-2">{errors.semester}</Text>
                )}
                
                <Text className="text-white mb-2 text-xl">Term</Text>
                 <TextInput
                  onChangeText={handleChange("term")}
                  onBlur={handleBlur("term")}
                  value={values.term}
                  className="bg-white rounded-lg px-3 py-2 mb-4"
                />
                {touched.term && errors.term && (
                  <Text className="text-red-500 text-xs mb-2">{errors.term}</Text>
                )}    
                {/* Custom Button */}
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  className="bg-yellow-400 rounded-lg py-3"
                  activeOpacity={0.7}
                >
                  <Text className="text-center text-lg font-semibold text-black">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          {/* Action Buttons */}
          <View className="w-80 mt-5">
            <TouchableOpacity onPress={() => router.push("./signin")} activeOpacity={0.7}>
              <Text className="text-base font-medium text-white text-center">
                 Don`t have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
