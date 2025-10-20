import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { GetSubjectById } from '@/api/apiCall'

export default function SubjectNotes() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const [subject, setSubject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const data = await GetSubjectById(id)
        setSubject(data.subject)
      } catch (e: any) {
        setError(e?.message || 'Failed to load subject')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#0f172b]">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    )
  }

  if (error || !subject) {
    return (
      <View className="flex-1 items-center justify-center bg-[#0f172b] p-4">
        <Text className="text-red-400">{error || 'Subject not found'}</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-[#0f172b] p-4">
      <Text className="text-2xl font-bold text-white mb-4">{subject.name} ({subject.code})</Text>
      <FlatList
        data={subject.notes || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-4 mb-3 bg-[#1e293b]/60 rounded-2xl border border-white/10"
            onPress={() => router.push({ pathname: '/pdf/[id]', params: { id: item.id, url: item.pdfUrl } })}
          >
            <Text className="text-gray-100">{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text className="text-gray-400">No notes for this subject</Text>}
      />
    </View>
  )
}


