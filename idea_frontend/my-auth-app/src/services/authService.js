// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8088/api/v1/auth/';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const signup = async (name, email, password) => {
  try {
    console.log('Sending signup request with:', { name, email });
    const response = await api.post('signup', {
      name,
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    console.log('Signup response:', response);
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || error.message;
    console.error('Signup error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      config: error.config
    });
    throw new Error(errorData?.message || 'Registration failed. Please try again.');
  }
};

const signin = async (email, password) => {
  try {
    const response = await api.post('signin', {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  signup,
  signin,
  logout,
  getCurrentUser,
};

export default authService;