// src/App.jsx
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

const App = () => {
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
        <nav className="bg-indigo-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-white">AuthApp</Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/" 
                      className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
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
                      className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-700"
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
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
    </div>
  );
};

export default App;