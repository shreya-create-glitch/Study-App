import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";
const DropDown = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-md mx-4 sm:mx-auto bg-white rounded-2xl shadow-2xl p-6 animate-slide-down border border-gray-200">
        
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition-colors text-xl font-semibold"
          aria-label="Close modal"
        >
          <IoIosCloseCircle />
        </button>

        {children}
      </div>
    </div>
  );
};

export default DropDown;
