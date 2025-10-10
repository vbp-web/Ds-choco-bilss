import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleClose = () => {
    setIsLogin(true); // Reset to login form when closing
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ 
              opacity: 0, 
              scale: 0.95, 
              y: 30 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.95, 
              y: 30 
            }}
            transition={{ 
              duration: 0.4, 
              type: "spring", 
              damping: 20,
              stiffness: 300 
            }}
            whileHover={{ 
              scale: 1.01,
              transition: { duration: 0.15 }
            }}
          >
            <motion.div 
              className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <motion.h2 
                className="text-lg font-semibold text-chocolate-800"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </motion.h2>
              <motion.button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold transition-colors"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 90,
                  color: "#dc2626"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                ×
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <LoginForm onToggleForm={toggleForm} onClose={handleClose} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <SignupForm onToggleForm={toggleForm} onClose={handleClose} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
