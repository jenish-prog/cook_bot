// src/services/authService.jsx
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8088/api/v1/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for sending cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor to include the token in requests
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 Unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Store user data in local storage
const setUserInStorage = (userData) => {
  if (userData?.token) {
    localStorage.setItem('user', JSON.stringify(userData));
  }
  return userData;
};

// Get current user from local storage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// User registration
export const signup = async (name, email, password) => {
  try {
    const response = await api.post('/signup', { 
      name, 
      email, 
      password 
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
    throw new Error(errorMessage);
  }
};

// User login
export const signin = async (email, password) => {
  try {
    const response = await api.post('/signin', { 
      email, 
      password 
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
    throw new Error(errorMessage);
  }
};

// Get current user's profile
export const getProfile = async () => {
  try {
    const response = await api.get('profile');
    return response.data;
  } catch (error) {
    console.error('Get profile error:', error.response?.data || error.message);
    throw error;
  }
};

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const response = await api.put('profile', userData);
    return setUserInStorage({ ...getCurrentUser(), ...response.data });
  } catch (error) {
    console.error('Update profile error:', error.response?.data || error.message);
    throw error;
  }
};

// Change password
export const changePassword = async (currentPassword, newPassword) => {
  try {
    await api.post('change-password', { currentPassword, newPassword });
    return true;
  } catch (error) {
    console.error('Change password error:', error.response?.data || error.message);
    throw error;
  }
};

// Logout
const logout = async () => {
  try {
    await api.post('signout');
  } catch (error) {
    console.error('Logout error:', error.response?.data || error.message);
  } finally {
    localStorage.removeItem('user');
  }
};

const authService = {
  signup,
  signin,
  logout,
  getCurrentUser,
  getProfile,
  updateProfile,
  changePassword
};

export default authService;