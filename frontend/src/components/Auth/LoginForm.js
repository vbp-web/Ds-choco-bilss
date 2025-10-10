import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const LoginForm = ({ onToggleForm, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      onClose();
    }
  };

  return (
    <motion.div 
      className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto px-4 py-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center mb-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.h2 
          className="text-xl sm:text-2xl md:text-3xl font-bold text-chocolate-800"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          Welcome Back
        </motion.h2>
        <motion.p 
          className="text-chocolate-600 mt-2 text-base sm:text-lg"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          Sign in to your account
        </motion.p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <motion.label 
            htmlFor="email" 
            className="block text-sm font-medium text-chocolate-700 mb-1"
            whileHover={{ scale: 1.02 }}
          >
            Email Address
          </motion.label>
          <motion.input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500 input-field transition-all duration-300 text-base sm:text-lg ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p 
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <motion.label 
            htmlFor="password" 
            className="block text-sm font-medium text-chocolate-700 mb-1"
            whileHover={{ scale: 1.02 }}
          >
            Password
          </motion.label>
          <motion.input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500 input-field transition-all duration-300 text-base sm:text-lg ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
          />
          <AnimatePresence>
            {errors.password && (
              <motion.p 
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {errors.password}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-chocolate-600 text-white py-2 px-4 rounded-lg hover:bg-chocolate-700 focus:outline-none focus:ring-2 focus:ring-chocolate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors btn-primary shadow-lg text-base sm:text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? <LoadingSpinner size="sm" /> : 'Sign In'}
        </motion.button>
      </motion.form>

      <motion.div 
        className="mt-6 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}
      >
        <p className="text-chocolate-600 text-base sm:text-lg">
          Don't have an account?{' '}
          <motion.button
            onClick={onToggleForm}
            className="text-chocolate-800 font-medium hover:underline text-base sm:text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Sign up
          </motion.button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
