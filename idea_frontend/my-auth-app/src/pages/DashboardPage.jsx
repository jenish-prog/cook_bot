import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService.jsx';

const DashboardPage = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    navigate('/signin');
    return null;
  }

  const handleLogout = () => {
    authService.logout();
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Welcome, {currentUser.name || currentUser.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Your Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800">Profile Information</h3>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Name:</span> {currentUser.name || 'Not provided'}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {currentUser.email}
                    </p>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-green-800">Account Status</h3>
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-purple-800">Quick Actions</h3>
                  <div className="mt-4 space-y-2">
                    <button className="block w-full text-left text-sm text-purple-600 hover:text-purple-800">
                      Edit Profile
                    </button>
                    <button className="block w-full text-left text-sm text-purple-600 hover:text-purple-800">
                      Change Password
                    </button>
                    <button className="block w-full text-left text-sm text-purple-600 hover:text-purple-800">
                      View Activity
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-yellow-50 p-4 rounded-md">
                <h3 className="text-lg font-medium text-yellow-800">Your Token</h3>
                <p className="mt-2 text-sm text-yellow-700 break-all bg-white p-2 rounded border border-yellow-200">
                  {currentUser.token}
                </p>
                <p className="mt-2 text-xs text-yellow-600">Keep this token secure and don't share it with anyone.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
