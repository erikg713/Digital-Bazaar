import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-purple-700">Pi Item Store</Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-purple-600">Home</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-purple-600">Dashboard</Link>
        <Link to="/create" className="text-gray-700 hover:text-purple-600">Create Item</Link>
        <Link to="/login" className="text-gray-700 hover:text-purple-600">Login</Link>
      </div>
    </nav>
  );
}
