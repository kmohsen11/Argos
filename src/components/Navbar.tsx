import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full z-50">
      {/* Top border with gradient */}
      <div className="h-[2px] w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"></div>
      
      <div className="bg-black/90 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text hover:from-purple-500 hover:to-pink-700 transition-all"
              >
                ARGOS
              </Link>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  to="/" 
                  className="px-4 py-2 rounded-md text-sm font-medium text-purple-300 hover:text-white hover:bg-purple-500/10 border border-transparent hover:border-purple-500/50 transition-all duration-300"
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  className="px-4 py-2 rounded-md text-sm font-medium text-purple-300 hover:text-white hover:bg-purple-500/10 border border-transparent hover:border-purple-500/50 transition-all duration-300"
                >
                  Products
                </Link>
                <Link 
                  to="/about" 
                  className="px-4 py-2 rounded-md text-sm font-medium text-purple-300 hover:text-white hover:bg-purple-500/10 border border-transparent hover:border-purple-500/50 transition-all duration-300"
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="px-4 py-2 rounded-md text-sm font-medium text-purple-300 hover:text-white hover:bg-purple-500/10 border border-transparent hover:border-purple-500/50 transition-all duration-300"
                >
                  Contact
                </Link>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-purple-400 hover:text-white hover:bg-purple-500/20 border border-transparent hover:border-purple-500/50 transition-all duration-300 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-purple-500/20">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/" 
                className="block px-4 py-2 rounded-md text-base font-medium text-purple-300 hover:text-white hover:bg-purple-500/10 border border-transparent hover:border-purple-500/50 transition-all duration-300"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="block px-4 py-2 rounded-md text-base font-medium text-purple-300 hover:text-white hover:bg-purple-500/10 border border-transparent hover:border-purple-500/50 transition-all duration-300"
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className="block px-4 py-2 rounded-md text-base font-medium text-purple-300 hover:text-white hover:bg-purple-500/10 border border-transparent hover:border-purple-500/50 transition-all duration-300"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block px-4 py-2 rounded-md text-base font-medium text-purple-300 hover:text-white hover:bg-purple-500/10 border border-transparent hover:border-purple-500/50 transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom shadow/glow effect */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
    </nav>
  );
};

export default Navbar; 