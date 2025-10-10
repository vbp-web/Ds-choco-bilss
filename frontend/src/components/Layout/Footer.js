import React from 'react';
import { FaInstagram, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-chocolate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold mb-4">D's Choco Bliss</h3>
            <p className="text-chocolate-200 mb-4">
              Premium homemade chocolates crafted with love and delivered to your doorstep.
            </p>
            <p className="text-chocolate-200 text-sm">
              One Bite & You'll Melt into Bliss!
            </p>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start">
                <FaPhone className="mr-3 text-gold-400" />
                <a 
                  href="tel:+919023974421" 
                  className="hover:text-gold-400 transition-colors"
                >
                  +91 90239 74421
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <FaInstagram className="mr-3 text-gold-400" />
                <a 
                  href="https://instagram.com/D_CHOCO_BLISS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-400 transition-colors"
                >
                  @D_CHOCO_BLISS
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="mr-3 text-gold-400" />
                <span className="text-chocolate-200">
                  Made with ❤️ in India
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <div>
                <a 
                  href="/products" 
                  className="text-chocolate-200 hover:text-gold-400 transition-colors"
                >
                  Our Products
                </a>
              </div>
              <div>
                <a 
                  href="https://instagram.com/D_CHOCO_BLISS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chocolate-200 hover:text-gold-400 transition-colors"
                >
                  Follow Us
                </a>
              </div>
              <div>
                <a 
                  href="tel:+919023974421" 
                  className="text-chocolate-200 hover:text-gold-400 transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-chocolate-700 mt-8 pt-8 text-center">
          <p className="text-chocolate-200 text-sm">
            © 2025 D's Choco Bliss. All rights reserved. | Made with ❤️ and lots of chocolate!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;







