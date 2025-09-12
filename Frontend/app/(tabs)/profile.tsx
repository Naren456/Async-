import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
const profile = () => {
  return (
   <SafeAreaView className="flex-1 bg-[#0f172b] justify-center items-center">
        <Text className="text-white text-lg font-bold">profile</Text>
      </SafeAreaView>
  )
}

export default profile
