import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../Auth/AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-white shadow-3d-lg sticky top-0 z-50 gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.img 
              src="/logo.jpg" 
              alt="D's Choco Bliss Logo" 
              className="h-10 w-10 object-contain"
              whileHover={{ 
                rotateY: 360,
                scale: 1.1
              }}
              transition={{ duration: 0.6 }}
            />
            <motion.div 
              className="text-2xl font-serif font-bold text-chocolate-700"
              whileHover={{ 
                scale: 1.05,
                textShadow: "2px 2px 4px rgba(139, 69, 19, 0.3)"
              }}
              transition={{ duration: 0.2 }}
            >
              D's Choco Bliss
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="nav-link-3d"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="nav-link-3d"
            >
              Products
            </Link>
            <a
              href="https://instagram.com/D_CHOCO_BLISS"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link-3d"
            >
              Instagram
            </a>
            <a
              href="tel:+919023974421"
              className="nav-link-3d"
            >
              Contact
            </a>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Authentication */}
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-chocolate-700 hover:text-chocolate-900 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    rotateX: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ 
                      rotateY: showUserMenu ? 180 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaUser className="h-5 w-5" />
                  </motion.div>
                  <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
                </motion.button>
                
                {showUserMenu && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-3d-lg py-1 z-50 modal-3d"
                    initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateX: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-gray-500">{user?.email}</div>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200 hover:translate-x-2"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Profile
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200 hover:translate-x-2"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200 hover:translate-x-2"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.button
                onClick={openAuthModal}
                className="btn-primary text-sm"
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5
                }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            )}

            {/* Cart Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                to="/cart"
                className="relative p-2 text-chocolate-700 hover:text-chocolate-900 transition-all duration-300"
              >
                <motion.div
                  animate={{ 
                    rotateY: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaShoppingCart className="h-6 w-6" />
                </motion.div>
                {getTotalItems() > 0 && (
                  <motion.span 
                    className="cart-badge-3d"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 500,
                      damping: 15
                    }}
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="text-chocolate-700 hover:text-chocolate-900 p-2"
              whileHover={{ scale: 1.1, rotateZ: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ 
                  rotate: isMenuOpen ? 90 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="text-chocolate-700 hover:text-chocolate-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-chocolate-700 hover:text-chocolate-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <a
                href="https://instagram.com/D_CHOCO_BLISS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-chocolate-700 hover:text-chocolate-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Instagram
              </a>
              <a
                href="tel:+919023974421"
                className="text-chocolate-700 hover:text-chocolate-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Contact
              </a>
              
              {/* Mobile Auth */}
              {isAuthenticated ? (
                <div className="border-t pt-2">
                  <div className="px-3 py-2 text-sm text-gray-700">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-gray-500">{user?.email}</div>
                  </div>
                  <Link
                    to="/profile"
                    className="text-chocolate-700 hover:text-chocolate-900 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={toggleMenu}
                  >
                    My Profile
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="text-chocolate-700 hover:text-chocolate-900 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={toggleMenu}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="text-chocolate-700 hover:text-chocolate-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  >
                    <FaSignOutAlt className="inline mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t pt-2">
                  <button
                    onClick={() => {
                      openAuthModal();
                      toggleMenu();
                    }}
                    className="bg-chocolate-600 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-center"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </nav>
  );
};

export default Navbar;







