import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { ArrowLeft, FileUp } from 'lucide-react-native';
import { GetSubjects, DeleteSubject } from '@/api/apiCall';

type Subject = {
  code: string;
  name: string;
  semester: number;
  term: number;
};

const AdminSubjects = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);
  const [form, setForm] = useState({
  code: '',
  name: '',
  semester: '',
  term: ''
});
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [semModalVisible, setSemModalVisible] = useState(false);
  const [termModalVisible, setTermModalVisible] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<number | undefined>();
  const [selectedTerm, setSelectedTerm] = useState<number | undefined>();

  useEffect(() => {
    if (!user?.id) return;
    if (user?.role !== 'TEACHER') {
      Alert.alert('Access Denied', 'Admin access required');
      router.replace('/');
      return;
    }
    loadSubjects();
  }, [user?.id, user?.role]);

  const handleAddNote = (subject: Subject) => {
    router.push({
      pathname: '/admin/uploadNotes',
      params: {
        subjectCode: subject.code,
        subjectName: subject.name,
      },
    });
  };

  const loadSubjects = async () => {
    setLoading(true);
    try {
      const data = await GetSubjects(user.token);
      setSubjects(data.subjects || []);
    } catch (e) {
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (code: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this subject?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          try {
            await DeleteSubject(user.token, code);
            Alert.alert('Deleted', 'Subject deleted successfully');
            loadSubjects();
          } catch (e: any) {
            Alert.alert('Error', e?.message || 'Failed to delete');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const handleEdit = (subject: Subject) => {
    router.push({
      pathname: '/admin/subjectForm',
      params: {
        code: subject.code,
        name: subject.name,
        semester: String(subject.semester),
        term: String(subject.term),
        editMode: 'true',
      },
    });
  };

  const handleAddNew = () => {
    router.push('/admin/subjectForm');
  };

  const filteredSubjects = subjects.filter((s) => {
    if (selectedSemester && s.semester !== selectedSemester) return false;
    if (selectedTerm && s.term !== selectedTerm) return false;
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-[#0f172b] px-5">
      {/* Header */}
      <View className="flex-row items-center justify-between py-5 border-b border-white/10">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ArrowLeft size={24} color="#60A5FA" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">Subjects</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Add New */}
      <TouchableOpacity
        onPress={handleAddNew}
        className="py-3 my-5 bg-blue-600 rounded-xl shadow-md active:opacity-80"
      >
        <Text className="text-white text-center font-semibold text-base">+ Add New Subject</Text>
      </TouchableOpacity>

      {/* Filters */}
      <View className="flex-row mb-5 space-x-3">
        <TouchableOpacity
          className="flex-1 py-3 px-4 rounded-xl bg-[#1e293b] border border-white/10"
          onPress={() => setSemModalVisible(true)}
        >
          <Text className="text-gray-400 text-sm">Semester</Text>
          <Text className="text-white text-base mt-1 font-medium">
            {selectedSemester ?? 'All'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 py-3 px-4 rounded-xl bg-[#1e293b] border border-white/10"
          onPress={() => setTermModalVisible(true)}
        >
          <Text className="text-gray-400 text-sm">Term</Text>
          <Text className="text-white text-base mt-1 font-medium">
            {selectedTerm ?? 'All'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Subjects List */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <FlatList
          data={filteredSubjects}
          keyExtractor={(item) => item.code}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <View className="p-4 mb-4 bg-[#1e293b] rounded-2xl border border-white/10 shadow-sm">
              <Text className="text-white font-semibold text-lg">{item.name}</Text>
              <Text className="text-gray-400 text-xs mt-1">
                Semester {item.semester} • Term {item.term} • Code: {item.code}
              </Text>

              <View className="flex-row mt-4 space-x-2">
                <TouchableOpacity
                  className="flex-1 bg-blue-600 py-2 rounded-lg active:opacity-80"
                  onPress={() => handleEdit(item)}
                >
                  <Text className="text-white text-center font-medium">Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 bg-red-600 py-2 rounded-lg active:opacity-80"
                  onPress={() => handleDelete(item.code)}
                >
                  <Text className="text-white text-center font-medium">Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 flex-row items-center justify-center bg-green-600 py-2 rounded-lg active:opacity-80"
                  onPress={() => handleAddNote(item)}
                >
                  <FileUp size={16} color="white" />
                  <Text className="text-white text-center font-medium ml-1">Add Note</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-gray-400 text-center mt-10 text-base">
              No subjects found
            </Text>
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Semester Modal */}
      <Modal
        visible={semModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setSemModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-[#1e293b] p-6 rounded-t-3xl border-t border-white/10 max-h-[60%]">
            <Text className="text-white text-lg font-semibold mb-4">Select Semester</Text>
            <ScrollView>
              <TouchableOpacity
                className="py-3 border-b border-white/10"
                onPress={() => {
                  setSelectedSemester(undefined);
                  setSemModalVisible(false);
                }}
              >
                <Text className="text-gray-200">All</Text>
              </TouchableOpacity>
              {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                <TouchableOpacity
                  key={n}
                  className="py-3 border-b border-white/10"
                  onPress={() => {
                    setSelectedSemester(n);
                    setSemModalVisible(false);
                  }}
                >
                  <Text className="text-gray-200">Semester {n}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Term Modal */}
      <Modal
        visible={termModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setTermModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-[#1e293b] p-6 rounded-t-3xl border-t border-white/10 max-h-[40%]">
            <Text className="text-white text-lg font-semibold mb-4">Select Term</Text>
            <ScrollView>
              <TouchableOpacity
                className="py-3 border-b border-white/10"
                onPress={() => {
                  setSelectedTerm(undefined);
                  setTermModalVisible(false);
                }}
              >
                <Text className="text-gray-200">All</Text>
              </TouchableOpacity>
              {[1, 2].map((n) => (
                <TouchableOpacity
                  key={n}
                  className="py-3 border-b border-white/10"
                  onPress={() => {
                    setSelectedTerm(n);
                    setTermModalVisible(false);
                  }}
                >
                  <Text className="text-gray-200">Term {n}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminSubjects;
