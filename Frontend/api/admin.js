import api from "./config";

export const GetAdminStats = async () => {
  try {
    const response = await api.get('/api/admin/stats')
    return response.data;
  } catch (error) {
    console.error('GetAdminStats Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const CreateSubject = async (token, subject) => {
  try {
    const response = await api.post('/api/subjects', subject)
    return response.data;
  } catch (error) {
    console.error('CreateSubject Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const UpdateSubject = async (token, code, updates) => {
  try {
    const response = await api.put(`/api/subjects/${code}`, updates)
  
    return response.data;
  } catch (error) {
    console.error('UpdateSubject Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const DeleteSubject = async (token, subjectId) => {
  try {
    const response = await api.delete(`/api/subjects/${subjectId}`)
    return response.data;
  } catch (error) {
    console.error('DeleteSubject Error:', error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const GetAllUsers = async (token) => {
  try {
    const response = await api.get(`/api/admin/Users`)
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
    const response = await api.post('/api/notes/upload', formData,)
    return response.data; // { note }
  } catch (error) {
    console.error('UploadNote Error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Failed to upload note' };
  }
};

 // Add DeleteNote API call
 export const DeleteNote = async (token, noteId) => {
    try {
        const response = await api.delete(`/api/notes/${noteId}`)
        return response.data; // { message }
    } catch (error) {
        console.error('DeleteNote Error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Failed to delete note' };
    }
};

export const DeleteAssignment =  async (token,AssignmentId) =>{
  try{
     const response = await api.delete(`/api/assignments/${AssignmentId}`)
        return response.data; // { message }
  }
  catch(error){
    console.error('DeleteAssignment Error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Failed to delete note' };
  }

}
