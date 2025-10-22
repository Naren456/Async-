import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useSelector } from "react-redux";
import { CreateAssignment, UpdateAssignment } from "../../api/apiCall";

const AssignmentForm = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);
  const params = useLocalSearchParams();

  // If id exists, it's edit mode
  const isEdit = !!params.id;

  const [form, setForm] = useState({
    id: params.id as string || "",
    title: params.title as string || "",
    dueDate: params.dueDate as string || "",
    cohortNo: params.cohortNo as string || "",
    subjectCode: params.subjectCode as string || "",
    link: params.link as string || "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const { id, title, dueDate, cohortNo, subjectCode, link } = form;
    if (!title || !dueDate || !cohortNo || !subjectCode || !link) {
      Alert.alert("Missing Fields", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await UpdateAssignment(user.token, id, { ...form });
        Alert.alert("Success", "Assignment updated successfully", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        await CreateAssignment(user.token, { ...form });
        Alert.alert("Success", "Assignment created successfully", [
          { text: "OK", onPress: () => router.back() },
        ]);
      }
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Failed to save assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0f172b]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-white/10">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ArrowLeft size={24} color="#60A5FA" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">{isEdit ? "Edit Assignment" : "Create Assignment"}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Form */}
      <View className="p-4">
        {["title", "dueDate", "cohortNo", "subjectCode", "link"].map((key) => (
          <View key={key} className="mb-3">
            <Text className="text-gray-300 mb-1 capitalize">{key}</Text>
            <TextInput
              value={(form as any)[key]}
              onChangeText={(t) => setForm((f) => ({ ...f, [key]: t }))}
              className="bg-[#1e293b] text-white rounded-lg px-4 py-3 border border-white/10"
              placeholder={`Enter ${key}`}
              placeholderTextColor="#6B7280"
            />
          </View>
        ))}

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className={`py-3 rounded-xl ${loading ? "bg-gray-600" : "bg-blue-600"}`}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold">
              {isEdit ? "Update Assignment" : "Create Assignment"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AssignmentForm;
