import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const SignupForm = ({ onToggleForm, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const submitData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      phone: formData.phone || undefined,
      address: Object.values(formData.address).some(val => val.trim())
        ? formData.address
        : undefined
    };

    const result = await signup(submitData);
    setLoading(false);

    if (result.success) {
      onClose();
    } else if (result.details) {
      const serverErrors = {};
      result.details.forEach(error => {
        serverErrors[error.param] = error.msg;
      });
      setErrors(serverErrors);
    }
  };

  return (
    <motion.div 
      className="w-full px-2 py-2"
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
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          Create Account
        </motion.h2>
        <motion.p 
          className="text-chocolate-600 mt-2 text-sm sm:text-base"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          Join D's Choco Bliss family
        </motion.p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        {/* Name */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.3 }}>
          <motion.label htmlFor="name" className="block text-sm font-medium text-chocolate-700 mb-1" whileHover={{ scale: 1.02 }}>
            Full Name *
          </motion.label>
          <motion.input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500 input-field transition-all duration-300 text-sm sm:text-base ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your full name"
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Email */}
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.3 }}>
          <motion.label htmlFor="email" className="block text-sm font-medium text-chocolate-700 mb-1" whileHover={{ scale: 1.02 }}>
            Email Address *
          </motion.label>
          <motion.input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500 input-field transition-all duration-300 text-sm sm:text-base ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your email"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Phone */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 0.3 }}>
          <motion.label htmlFor="phone" className="block text-sm font-medium text-chocolate-700 mb-1" whileHover={{ scale: 1.02 }}>
            Phone Number
          </motion.label>
          <motion.input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500 input-field transition-all duration-300 text-sm sm:text-base ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="10-digit phone number"
          />
          <AnimatePresence>
            {errors.phone && (
              <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Passwords */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9, duration: 0.3 }}>
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.0, duration: 0.3 }}>
            <motion.label htmlFor="password" className="block text-sm sm:text-base font-medium text-chocolate-700 mb-1" whileHover={{ scale: 1.02 }}>
              Password *
            </motion.label>
            <motion.input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500 input-field transition-all duration-300 text-sm sm:text-base ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Min 6 characters"
            />
            <AnimatePresence>
              {errors.password && (
                <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                  {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.1, duration: 0.3 }}>
            <motion.label htmlFor="confirmPassword" className="block text-sm sm:text-base font-medium text-chocolate-700 mb-1" whileHover={{ scale: 1.02 }}>
              Confirm Password *
            </motion.label>
            <motion.input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500 input-field transition-all duration-300 text-sm sm:text-base ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Confirm password"
            />
            <AnimatePresence>
              {errors.confirmPassword && (
                <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                  {errors.confirmPassword}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Address (optional) */}
        <motion.div className="border-t pt-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 0.3 }}>
          <motion.h3 className="text-sm sm:text-base font-medium text-chocolate-700 mb-3" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 1.3, duration: 0.2 }}>
            Address (Optional)
          </motion.h3>
          <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.3 }}>
            <motion.input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500 input-field transition-all duration-300 text-sm sm:text-base"
              placeholder="Street Address"
            />
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3" initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ delay: 1.5, duration: 0.2 }}>
              <motion.input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500 input-field transition-all duration-300 text-sm sm:text-base"
                placeholder="City"
              />
              <motion.input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500 input-field transition-all duration-300 text-sm sm:text-base"
                placeholder="State"
              />
            </motion.div>
            <motion.input
              type="text"
              name="address.zipCode"
              value={formData.address.zipCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500 input-field transition-all duration-300 text-sm sm:text-base"
              placeholder="ZIP Code"
            />
          </motion.div>
        </motion.div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-chocolate-600 text-white py-2 px-4 rounded-lg hover:bg-chocolate-700 focus:outline-none focus:ring-2 focus:ring-chocolate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors btn-primary shadow-lg text-sm sm:text-base"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? <LoadingSpinner size="sm" /> : 'Create Account'}
        </motion.button>
      </motion.form>

      <motion.div className="mt-6 text-center" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.7, duration: 0.3 }}>
        <p className="text-chocolate-600 text-sm sm:text-base">
          Already have an account?{' '}
          <motion.button onClick={onToggleForm} className="text-chocolate-800 font-medium hover:underline text-sm sm:text-base" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            Sign in
          </motion.button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignupForm;