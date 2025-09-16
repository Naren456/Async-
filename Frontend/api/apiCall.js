import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // always send cookies/credentials
});

// Sign Up
export const AuthsignUp = async (userData) => {
  try {
    console.log("Attempting to sign up with API URL:", API_BASE_URL);
    const response = await api.post("/api/auth/signup", userData, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Signup API Error:", error);
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      throw { message: "Cannot connect to server. Please check your internet connection." };
    }
    throw error.response?.data || { message: "Something went wrong" };
  }
};


// Sign In //
export const AuthsignIn = async (userData) => {
  try {
    console.log("Attempting to sign in with API URL:", API_BASE_URL);
    const response = await api.post("/api/auth/signin", userData,{
       headers: { "Content-Type": "application/json" }
  }); 
    return response.data;
  } catch (error) {
    console.error("SignIn API Error:", error);
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      throw { message: "Cannot connect to server. Please check your internet connection." };
    }
    throw error.response?.data || { message: "Something went wrong" };
  }
}


// Fetch Assignment //
export const GetAssignments = async (cohort) => {
  try {
    console.log("Fetching assignments from API URL:", API_BASE_URL);
    const response = await api.get(`/api/coursera/assignments?cohort=${cohort}`)
    return response.data;
  } catch (error) {
    console.error("Error in GetAssignments:", error);
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      throw new Error("Cannot connect to server. Please check your internet connection.");
    }
    return {};
  }
};

//

export async function GetSubjects(cohort) {
  // simulate delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // return dummy subjects based on cohort
  return [
    { id: "cs101", name: "Data Structures & Algorithms", code: "CS101", professor: "Dr. Sharma" },
    { id: "ma102", name: "Linear Algebra", code: "MA102", professor: "Prof. Mehta" },
    { id: "ph103", name: "Physics II", code: "PH103", professor: "Dr. Rao" },
    { id: "hs104", name: "Professional Communication", code: "HS104", professor: "Ms. Iyer" },
    { id: "ee105", name: "Electrical Circuits", code: "EE105", professor: "Dr. Verma" },
  ];
}
