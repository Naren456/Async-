import axios from "axios";
import { API_BASE_URL } from "./config";
import Assignment from "@/app/user/assignment";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // always send cookies/credentials
});

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

export const GetAllUsers = async (token) => {
  try {
    const response = await api.get(`/api/admin/Users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('GetAllUsers Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};






// Frontend/api/apiCall.js
// ... other functions ...

export const UploadNote = async (token, formData) => {
  try {
    const response = await api.post('/api/notes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // { note }
  } catch (error) {
    console.error('UploadNote Error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Failed to upload note' };
  }
};

 // Add DeleteNote API call
 export const DeleteNote = async (token, noteId) => {
    try {
        const response = await api.delete(`/api/notes/${noteId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // { message }
    } catch (error) {
        console.error('DeleteNote Error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Failed to delete note' };
    }
};

export const DeleteAssignment =  async (token,AssignmentId) =>{
  try{
     const response = await api.delete(`/api/assignments/${AssignmentId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // { message }
  }
  catch(error){
    console.error('DeleteAssignment Error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Failed to delete note' };
  }

}
