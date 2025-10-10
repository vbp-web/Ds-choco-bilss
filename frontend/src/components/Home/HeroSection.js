import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-7xl font-serif font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          D's Choco Bliss
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          One Bite & You'll Melt into Bliss!
        </motion.p>
        
        <motion.p 
          className="text-lg md:text-xl mb-12 text-chocolate-100 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          Premium homemade chocolates crafted with love, delivered to your doorstep. 
          Experience the perfect blend of tradition and innovation in every bite.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30, rotateZ: -5 }}
          animate={{ opacity: 1, y: 0, rotateZ: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <Link
            to="/products"
            className="btn-secondary text-lg py-4 px-8 animate-pulse-3d hover:animate-wiggle-3d"
          >
            Shop Now
          </Link>
          <a
            href="tel:+919023974421"
            className="border-2 border-white text-white hover:bg-white hover:text-chocolate-800 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:rotate-1 hover:shadow-3d"
          >
            Call Us: +91 90239 74421
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center animate-bounce-3d"
          animate={{ 
            y: [0, 10, 0],
            rotateX: [0, 10, 0],
            rotateY: [0, 5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ 
              opacity: [0, 1, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

















