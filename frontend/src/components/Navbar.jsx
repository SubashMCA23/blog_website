import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem('token'); 
    navigate('/');
  };

  return (
    <nav className="w-[100%] mx-auto flex justify-between items-center px-10 py-2 border-b-[1px] border-black sticky top-0 bg-[#f2e7dc] z-10">
      <h1 className="text-2xl font-bold">BLOG</h1>

      <div className="space-x-4 font-semibold">
        <Link to="/create-post">
          <button className="px-6 py-2 rounded-full bg-black text-white font-semibold ">
            Write
          </button>
        </Link>
        <button
          className="px-6 py-2 rounded-full bg-black text-white font-semibold "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
