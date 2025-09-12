import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // always send cookies/credentials
});

// Sign Up
export const AuthsignUp = async (userData) => {
  try {
    const response = await api.post("/api/auth/signup", userData, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Signup API Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};


// Sign In //
export const AuthsignIn = async (userData) => {
  try {
    const response = await api.post("/api/auth/signin", userData,{
       headers: { "Content-Type": "application/json" }
  }); 
    return response.data;
  } catch (error) {
    console.error("SignIn API Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
}


// Fetch Assignment //
export const GetAssignments = async () => {
  try {
    const response = await api.get("/api/coursera/assignments")
    return response.data;
  } catch (error) {
    console.error("Error in GetAssignments:", error);
    return {};
  }
};
