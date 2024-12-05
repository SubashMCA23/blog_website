import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; 

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const { login } = useAuth(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      const { token } = response.data;

      login(token);
      navigate('/home'); 
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Something went wrong, please try again.');
      }
    }
  };

  return (
    <div className="bg-[#f2e7dc] min-h-screen flex justify-center items-center px-4">
      {/* Fixed width and height */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] h-[350px]">
        <h2 className="text-4xl font-bold text-center text-black mb-8">Sign In</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg font-bold text-lg hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-black hover:underline">
            Get started
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
