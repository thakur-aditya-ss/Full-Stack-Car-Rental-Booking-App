import React from 'react';
import { motion } from 'motion/react';

const Logo = ({ className = "" }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-1.5 cursor-pointer select-none ${className}`}
    >
      <div className="flex flex-col items-start leading-none">
        <span className="text-2xl md:text-3xl font-black tracking-tighter flex items-center">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-primary bg-clip-text text-transparent">
            Car
          </span>
          <span className="text-dark ml-1">Rental</span>
          <span className="ml-1 w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mt-0.5 ml-0.5">
          Premium Service
        </span>
      </div>
    </motion.div>
  );
};

export default Logo;
