import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Plus,
  Calendar,
  BookOpen,
  Users,
  Link,
  ArrowLeft,
  Save,
} from 'lucide-react-native';

const AssignmentSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  dueDate: Yup.string().required('Due date is required'),
  cohortNo: Yup.number().required('Cohort is required'),
  subjectCode: Yup.string().required('Subject is required'),
  link: Yup.string().url('Must be a valid URL').required('Link is required'),
});

const AdminAssignments = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user?.role !== 'TEACHER') {
      Alert.alert('Access Denied', 'Admin access required');
      router.replace('/(tabs)/home');
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      // TODO: Load subjects and assignments from API
      setSubjects([
        { code: 'CS101', name: 'Programming Fundamentals' },
        { code: 'CS102', name: 'Data Structures' },
        { code: 'CS103', name: 'Algorithms' },
      ]);
      setAssignments([]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (values: any, { resetForm }: any) => {
    setLoading(true);
    try {
      // TODO: Call API to create assignment
      console.log('Creating assignment:', values);
      Alert.alert('Success', 'Assignment created successfully');
      setShowForm(false);
      resetForm();
      loadData();
    } catch (error) {
      Alert.alert('Error', 'Failed to create assignment');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !showForm) {
    return (
      <SafeAreaView className="flex-1 bg-[#0f172b] items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-400 mt-4">Loading assignments...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0f172b]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-white/10">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ArrowLeft size={24} color="#60A5FA" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">Manage Assignments</Text>
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          className="p-2 bg-blue-600 rounded-full"
        >
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Assignment List */}
        <View className="py-4">
          {assignments.length === 0 ? (
            <View className="bg-[#1e293b] rounded-xl p-6 border border-white/10">
              <Text className="text-gray-400 text-center">No assignments created yet</Text>
            </View>
          ) : (
            assignments.map((assignment: any) => (
              <View key={assignment.id} className="bg-[#1e293b] rounded-xl p-4 mb-3 border border-white/10">
                <Text className="text-white text-lg font-semibold">{assignment.title}</Text>
                <Text className="text-gray-400 text-sm mt-1">{assignment.description}</Text>
                <View className="flex-row items-center mt-3">
                  <Calendar size={16} color="#60A5FA" />
                  <Text className="text-gray-300 text-sm ml-2">Due: {assignment.dueDate}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Create Assignment Modal */}
      <Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView className="flex-1 bg-[#0f172b]">
          <View className="flex-row items-center justify-between p-4 border-b border-white/10">
            <TouchableOpacity onPress={() => setShowForm(false)}>
              <Text className="text-blue-400 text-base">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold">Create Assignment</Text>
            <View style={{ width: 60 }} />
          </View>

          <ScrollView className="flex-1 p-4">
            <Formik
              initialValues={{
                title: '',
                description: '',
                dueDate: '',
                cohortNo: '',
                subjectCode: '',
                link: '',
              }}
              validationSchema={AssignmentSchema}
              onSubmit={handleCreateAssignment}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                  {/* Title */}
                  <View className="mb-4">
                    <Text className="text-white text-base font-medium mb-2">Title</Text>
                    <TextInput
                      value={values.title}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      className="bg-[#1e293b] text-white rounded-lg px-4 py-3 border border-white/10"
                      placeholder="Assignment title"
                      placeholderTextColor="#6B7280"
                    />
                    {errors.title && touched.title && (
                      <Text className="text-red-400 text-sm mt-1">{errors.title}</Text>
                    )}
                  </View>

                  {/* Description */}
                  <View className="mb-4">
                    <Text className="text-white text-base font-medium mb-2">Description</Text>
                    <TextInput
                      value={values.description}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      className="bg-[#1e293b] text-white rounded-lg px-4 py-3 border border-white/10"
                      placeholder="Assignment description"
                      placeholderTextColor="#6B7280"
                      multiline
                      numberOfLines={3}
                    />
                    {errors.description && touched.description && (
                      <Text className="text-red-400 text-sm mt-1">{errors.description}</Text>
                    )}
                  </View>

                  {/* Due Date */}
                  <View className="mb-4">
                    <Text className="text-white text-base font-medium mb-2">Due Date</Text>
                    <TextInput
                      value={values.dueDate}
                      onChangeText={handleChange('dueDate')}
                      onBlur={handleBlur('dueDate')}
                      className="bg-[#1e293b] text-white rounded-lg px-4 py-3 border border-white/10"
                      placeholder="YYYY-MM-DD"
                      placeholderTextColor="#6B7280"
                    />
                    {errors.dueDate && touched.dueDate && (
                      <Text className="text-red-400 text-sm mt-1">{errors.dueDate}</Text>
                    )}
                  </View>

                  {/* Cohort */}
                  <View className="mb-4">
                    <Text className="text-white text-base font-medium mb-2">Cohort Number</Text>
                    <TextInput
                      value={values.cohortNo}
                      onChangeText={handleChange('cohortNo')}
                      onBlur={handleBlur('cohortNo')}
                      className="bg-[#1e293b] text-white rounded-lg px-4 py-3 border border-white/10"
                      placeholder="Cohort number"
                      placeholderTextColor="#6B7280"
                      keyboardType="numeric"
                    />
                    {errors.cohortNo && touched.cohortNo && (
                      <Text className="text-red-400 text-sm mt-1">{errors.cohortNo}</Text>
                    )}
                  </View>

                  {/* Subject */}
                  <View className="mb-4">
                    <Text className="text-white text-base font-medium mb-2">Subject</Text>
                    <TextInput
                      value={values.subjectCode}
                      onChangeText={handleChange('subjectCode')}
                      onBlur={handleBlur('subjectCode')}
                      className="bg-[#1e293b] text-white rounded-lg px-4 py-3 border border-white/10"
                      placeholder="Subject code (e.g., CS101)"
                      placeholderTextColor="#6B7280"
                    />
                    {errors.subjectCode && touched.subjectCode && (
                      <Text className="text-red-400 text-sm mt-1">{errors.subjectCode}</Text>
                    )}
                  </View>

                  {/* Link */}
                  <View className="mb-6">
                    <Text className="text-white text-base font-medium mb-2">Assignment Link</Text>
                    <TextInput
                      value={values.link}
                      onChangeText={handleChange('link')}
                      onBlur={handleBlur('link')}
                      className="bg-[#1e293b] text-white rounded-lg px-4 py-3 border border-white/10"
                      placeholder="https://example.com/assignment"
                      placeholderTextColor="#6B7280"
                      keyboardType="url"
                    />
                    {errors.link && touched.link && (
                      <Text className="text-red-400 text-sm mt-1">{errors.link}</Text>
                    )}
                  </View>

                  {/* Submit Button */}
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    disabled={loading}
                    className={`py-4 rounded-xl ${
                      loading ? 'bg-gray-600' : 'bg-blue-600'
                    }`}
                    activeOpacity={0.8}
                  >
                    <View className="flex-row items-center justify-center">
                      <Save size={20} color="white" />
                      <Text className="text-white font-semibold ml-2">
                        {loading ? 'Creating...' : 'Create Assignment'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminAssignments;
