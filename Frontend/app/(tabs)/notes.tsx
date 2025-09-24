import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'


// Mock API call – replace with your backend fetch
const fetchNotes = async () => {
  return [
    { 
      id: '1', 
      title: 'Lecture 1 Notes', 
      pdfUrl: 'https://res.cloudinary.com/dz2meki1x/raw/upload/v1758294561/CLI_SGA_-_2_f9plhb.docx' 
    },
    { 
      id: '2', 
      title: 'Lecture 2 Notes', 
      pdfUrl: 'https://www.mbit.edu.in/wp-content/uploads/2020/05/Operating_System_Concepts_8th_EditionA4.pdf' 
    },
  ]
}

const Notes = () => {
  const [notes, setNotes] = useState<{id: string, title: string, pdfUrl: string}[]>([])
  const router = useRouter()

  useEffect(() => {
    const loadNotes = async () => {
      const data = await fetchNotes()
      setNotes(data)
    }
    loadNotes()
  }, [])

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Cohort Notes</Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <TouchableOpacity 
  className="p-4 mb-3 bg-white rounded-2xl shadow"
  onPress={() => 
    router.push({
      pathname: '/pdf/[id]', // use dynamic route pattern
      params: { id: item.id, url: item.pdfUrl },
    })
  }
>
            <Text className="text-lg text-gray-700">{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Notes
