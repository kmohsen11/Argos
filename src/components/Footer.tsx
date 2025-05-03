import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">© NoLimit 2025 - All rights reserved</p>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-6">
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/products">Products</FooterLink>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Innovative athletic wear powered by AI technology</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link 
      to={to} 
      className="text-gray-600 text-sm hover:text-primary-600 transition-colors"
    >
      {children}
    </Link>
  );
};

export default Footer; 