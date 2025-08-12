// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12 shadow-inner">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Quiz App. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Designed and Built with MERN Stack
        </p>
      </div>
    </footer>
  );
};

export default Footer;
