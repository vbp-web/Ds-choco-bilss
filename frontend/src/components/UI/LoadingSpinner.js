import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-chocolate-200 border-t-chocolate-700 rounded-full`}
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      {text && (
        <motion.p 
          className="mt-4 text-chocolate-600 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            delay: 0.2,
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;










