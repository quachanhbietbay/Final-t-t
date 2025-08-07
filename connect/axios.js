import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

const ins = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Function to get teachers with pagination
export const getTeachers = async (page = 1, pageSize = 10) => {
  try {
    const response = await ins.get(`/teachers?page=${page}&limit=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
};

// Function to create a new teacher
export const createTeacher = async (teacherData) => {
  try {
    const response = await ins.post('/teachers', teacherData);
    return response.data;
  } catch (error) {
    console.error('Error creating teacher:', error);
    throw error;
  }
};

// Function to update a teacher
export const updateTeacher = async (id, teacherData) => {
  try {
    const response = await ins.put(`/teachers/${id}`, teacherData);
    return response.data;
  } catch (error) {
    console.error('Error updating teacher:', error);
    throw error;
  }
};

// Function to delete a teacher
export const deleteTeacher = async (id) => {
  try {
    const response = await ins.delete(`/teachers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};

// Function to get positions
export const getPositions = async () => {
  try {
    const response = await ins.get('/teacher-positions');
    return response.data;
  } catch (error) {
    console.error('Error fetching positions:', error);
    throw error;
  }
};

// Function to create a new position
export const createPosition = async (positionData) => {
  try {
    const response = await ins.post('/teacher-positions', positionData);
    return response.data;
  } catch (error) {
    console.error('Error creating position:', error);
    throw error;
  }
};

// Function to update a position
export const updatePosition = async (id, positionData) => {
  try {
    const response = await ins.put(`/teacher-positions/${id}`, positionData);
    return response.data;
  } catch (error) {
    console.error('Error updating position:', error);
    throw error;
  }
};

// Function to delete a position
export const deletePosition = async (id) => {
  try {
    const response = await ins.delete(`/teacher-positions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting position:', error);
    throw error;
  }
};

export default getTeachers;
export { ins };