// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition-colors duration-200">
          Quiz App
        </Link>
        <ul className="flex items-center space-x-6">
          {user ? (
            <>
              <li>
                <Link to="/" className="hover:text-gray-200 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/knowledge" className="hover:text-gray-200 transition-colors duration-200">
                  Knowledge
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-gray-200 transition-colors duration-200">
                  History
                </Link>
              </li>
              <li>
                <button 
                  onClick={logout} 
                  className="bg-red-500 py-1 px-3 rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
              <li className="text-sm font-semibold hidden md:block">
                Welcome, {user.username}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-200 transition-colors duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="bg-green-500 py-1 px-3 rounded-lg hover:bg-green-600 transition-colors duration-200">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
