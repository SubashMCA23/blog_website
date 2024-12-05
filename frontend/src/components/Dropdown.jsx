import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dropdown = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md z-50 shadow-md border border-gray-200">
      <div className="py-2">
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          onClick={() => {
            onClose();
            // Add your profile navigation logic here
            alert('Profile Clicked');
          }}
        >
          Profile
        </button>
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          onClick={() => {
            onClose();
            handleLogout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
