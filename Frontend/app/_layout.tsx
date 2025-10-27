import { Stack } from "expo-router";
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="auth/signin"/> 
        <Stack.Screen name="auth/signup"/> 
        <Stack.Screen name="user"/>
        <Stack.Screen name="admin" options={{ presentation: 'modal' }}/> 
        <Stack.Screen name="note/[id]"/>
        <Stack.Screen name="pdf/[id]"/>
      </Stack>
    </Provider>
  )
}