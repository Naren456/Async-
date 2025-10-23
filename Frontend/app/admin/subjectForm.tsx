import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

type SubjectFormProps = {
  form: { code: string; name: string; semester: string; term: string };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
  loading: boolean;
  editMode: boolean;
  onCancel?: () => void;
};

const SubjectForm: React.FC<SubjectFormProps> = ({ form, setForm, onSubmit, loading, editMode, onCancel}) => {
  const fields = ['code', 'name', 'semester', 'term'];

  return (
    <View className="py-4">
      <Text className="text-white text-base font-semibold mb-2">
        {editMode ? 'Update Subject' : 'Create Subject'}
      </Text>
      <View className="bg-[#1e293b] rounded-xl p-4 border border-white/10">
        {/* {fields.map((key) => (
          <View key={key} className="mb-3">
            <Text className="text-gray-300 mb-1 capitalize">{key}</Text>
            <TextInput
              value={(form as any)[key]}
              onChangeText={(t) => setForm((f) => ({ ...f, [key]: t }))}
              className="bg-[#0f172b] text-white rounded-lg px-4 py-3 border border-white/10"
              placeholder={`Enter ${key}`}
              placeholderTextColor="#6B7280"
              editable={!editMode || key !== 'code'} // code can't be changed in edit
            />
          </View>
        ))} */}

        <TouchableOpacity
          onPress={onSubmit}
          disabled={loading}
          className={`py-3 rounded-xl ${loading ? 'bg-gray-600' : 'bg-blue-600'}`}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-semibold">
            {loading ? (editMode ? 'Updating...' : 'Creating...') : editMode ? 'Update' : 'Create'}
          </Text>
        </TouchableOpacity>

        {editMode && onCancel && (
          <TouchableOpacity
            onPress={onCancel}
            className="py-3 mt-3 rounded-xl bg-gray-700"
          >
            <Text className="text-white text-center font-semibold">Cancel Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SubjectForm;
