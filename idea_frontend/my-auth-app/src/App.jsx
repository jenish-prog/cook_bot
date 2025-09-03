// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import Dashboard from './pages/DashboardPage';
import authService from './services/authService';

const PrivateRoute = ({ children }) => {
  const currentUser = authService.getCurrentUser();
  return currentUser ? children : <Navigate to="/signin" />;
};

const App = () => {
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  return (
    <Router>
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-white">AuthApp</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
              {currentUser ? (
                <>
                  <Link 
                    to="/" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/signin" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-md hover:bg-gray-100"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;