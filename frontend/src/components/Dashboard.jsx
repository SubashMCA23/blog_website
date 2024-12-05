import React from 'react';
import { Link } from 'react-router-dom';
import images from '../constants/images';

const Dashboard = () => {
  return (
    <div className="bg-[#f2e7dc] min-h-screen flex flex-col px-4 sm:px-8">

      {/* Navigation Bar */}
      <nav className="flex justify-between items-center py-5">
        <div className="text-4xl font-bold text-black">BLOG</div>
        
        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-8 text-lg text-gray-600 font-semibold">
          <Link to="/login" className="hover:text-black">Our Story</Link>
          <Link to="/login" className="hover:text-black">Membership</Link>
          <Link to="/login" className="hover:text-black">Write</Link>
          <Link to="/login" className="hover:text-black">Sign in</Link>
          <Link to="/signup">
            <button className="bg-black text-white py-2 px-4 rounded-full">Get started</button>
          </Link>
        </div>

        {/* Mobile Navigation (Hamburger) */}
        <div className="sm:hidden">
          <button className="text-xl text-gray-600 hover:text-black">
            <i className="fas fa-bars"></i> {/* Add a hamburger icon here if needed */}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center py-16 sm:py-32 gap-8">
        {/* Main Content */}
        <main className="text-center sm:text-left w-full sm:w-[50%]">
          <h1 className="text-4xl sm:text-6xl font-bold text-black mb-4">
            Human stories & ideas
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A place to read, write, and deepen your understanding
          </p>
          <Link to="/login">
            <button className="bg-black text-white py-3 px-8 font-semibold rounded-full text-lg">
              Start reading
            </button>
          </Link>
        </main>

        {/* Image */}
        <div className="w-full sm:w-[50%] flex justify-center">
          <img 
            src={images.dashboardImage} 
            alt="Dashboard Visual" 
            className="w-full sm:w-[650px] h-auto max-w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
