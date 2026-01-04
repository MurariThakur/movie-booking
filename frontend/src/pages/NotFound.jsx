import React from 'react';
import { Link } from 'react-router-dom';
import BlurCircle from '../components/BlurCircle';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dull-50 relative">
      <BlurCircle top="-100px" left="-100px" />
      <BlurCircle top="100px" right="0px" />
      <div className="text-center">
        <h1 className="text-9xl font-bold bg-primary text-white px-8 py-4 rounded-lg mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-300 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;