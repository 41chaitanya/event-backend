import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-primary-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">EventSphere</Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-primary-200 transition">Home</Link>
          
          {isAuthenticated() ? (
            <>
              <Link to="/dashboard" className="hover:text-primary-200 transition">Dashboard</Link>
              <Link to="/new-event" className="hover:text-primary-200 transition">Create Event</Link>
              <div className="group relative">
                <button className="flex items-center hover:text-primary-200 transition">
                  <span className="mr-1">{currentUser?.name || 'User'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="hidden group-hover:block absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-primary-100 hover:text-primary-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary-200 transition">Login</Link>
              <Link 
                to="/signup" 
                className="bg-white text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-100 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;