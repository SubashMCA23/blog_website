import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Article from './components/Article'; 
import ProtectedRoute from './components/ProtectedRoute';
import CreatePost from './components/CreatePost';

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/login', '/signup'];

  return (
    <div className='bg-[#f2e7dc] min-h-screen'>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Protecting the following routes */}
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/article/:id" element={<ProtectedRoute element={<Article />} />} />
        <Route path="/create-post" element={<ProtectedRoute element={<CreatePost />} />} />
        
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;
