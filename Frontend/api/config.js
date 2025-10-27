import axios from "axios";
import * as SecureStore from 'expo-secure-store';


const Local = "http://10.51.6.234:8000";

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || Local;


const api = axios.create({
  baseURL: API_BASE_URL,
});


api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.error("Error attaching auth token to request:", e);
  }
  return config;
});


export default api;