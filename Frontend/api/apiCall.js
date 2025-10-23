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

export const GetSubjects = async () =>{
  try{
    const response = await api.get('/api/subjects');
    return response.data;
  }
  catch(error){
    console.error('GetSubjects Error:', error);
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    }
    throw error.response?.data || { message: 'Something went wrong' };
  }
}

export const GetUserSubjectsWithNotes = async (token,userId, opts = {}) => {
  try {
    const params = new URLSearchParams();
    if (opts.semester !== undefined && opts.term !== undefined) {
      params.set('semester', String(opts.semester));
      params.set('term', String(opts.term));
    }
    const qs = params.toString();
    const url = qs ? `/api/subjects/user/${userId}?${qs}` : `/api/subjects/user/${userId}`;
    const response = await api.get(url , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });;
    return response.data; // { subjects: [{ code, name, notes: [...] }...] }
  } catch (error) {
    console.error('GetUserSubjectsWithNotes Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
}

export const GetSubjectById = async (subjectId) => {
  try {
    const response = await api.get(`/api/subjects/${subjectId}`,{
            headers: { Authorization: `Bearer ${token}` },
        });
    return response.data; // { subject }
  } catch (error) {
    console.error('GetSubjectById Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
}

// Admin API functions
export const CreateAssignment = async (token, assignmentData) => {
  try {
    const response = await api.post('/api/assignments', assignmentData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('CreateAssignment Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const GetAdminStats = async (token) => {
  try {
    const response = await api.get('/api/admin/stats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('GetAdminStats Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

// Subjects (Admin)
export const CreateSubject = async (token, subject) => {
  try {
    const response = await api.post('/api/subjects', subject, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('CreateSubject Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const UpdateSubject = async (token, code, updates) => {
  try {
    const response = await api.put(`/api/subjects/${code}`, updates, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('UpdateSubject Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const DeleteSubject = async (token, subjectId) => {
  try {
    const response = await api.delete(`/api/subjects/${subjectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('DeleteSubject Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

// Get assignments by cohort, grouped by date (server-side)
export const GetAssignmentsByCohort = async (cohortNo) => {
  try {
    const response = await api.get(`/api/assignments/by-cohort/${cohortNo}`);
    return response.data; // { success, cohortNo, grouped }
  } catch (error) {
    console.error('GetAssignmentsByCohort Error:', error);
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    }
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

// Update current user's profile
export const UpdateProfile = async (token, payload) => {
  try {
    const response = await api.put('/api/auth/me', payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // { user }
  } catch (error) {
    console.error('UpdateProfile Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};



