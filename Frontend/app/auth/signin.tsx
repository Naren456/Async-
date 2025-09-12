import React from "react";
import { Text, View, TouchableOpacity, Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { AuthsignIn } from "@/api/apiCall";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async (
    values: { email: string; password: string },
    setErrors: (errors: { [key: string]: string }) => void
  ) => {
    console.log("Form values:", values);

    try {
      const result = await AuthsignIn(values);
      console.log("SignIn Success:", result);

      router.push("/home");
    } catch (e: any) {
      const errorMsg = e.response?.data?.message || e.message || "Something went wrong";

      // Assign the server error to a Formik field (you can also use a general form error)
      setErrors({ general: errorMsg });
      console.log("SignIn Error:", errorMsg);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-900">
      <StatusBar style="light" />
      <LinearGradient colors={["#1E3A8A", "#3B82F6"]} style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center px-5">
          <View className="justify-center items-center mb-10">
            <Text className="text-5xl font-semibold text-white">PortSync</Text>
          </View>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setErrors }) => handleSignIn(values, setErrors)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View className="w-3/4">
                <Text className="text-white mb-5 text-xl">Email</Text>
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  className="bg-white rounded-lg mb-5 px-3 py-2"
                />

                <Text className="text-white mb-5 text-xl">Password</Text>
                <TextInput
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  className="bg-white rounded-lg mb-5 px-3 py-2"
                />

                {/* Show server error using Formik errors */}
                {errors.general && (
                  <Text className="text-red-400 text-sm mb-3">{errors.general}</Text>
                )}

                <Button onPress={() => handleSubmit()} title="Sign In" />
              </View>
            )}
          </Formik>

          <View className="w-80 mt-5">
            <TouchableOpacity onPress={() => router.push("./signup")} activeOpacity={0.7}>
              <Text className="text-base font-medium text-white text-center">
                Don’t have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
