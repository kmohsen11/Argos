import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black shadow-md py-3' : 'bg-black py-4'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-textPrimary">
            NoLimit
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          
          {/* Call to Action */}
          <div className="hidden md:block">
            <Link to="/products" className="btn-primary">
              Get Started
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg text-textPrimary hover:bg-accent/10 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        aria-hidden={!isOpen}
      >
        <div className="px-4 py-5 bg-black shadow-md space-y-3">
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/products" onClick={() => setIsOpen(false)}>Products</MobileNavLink>
          <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
          <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
          <div className="pt-2">
            <Link to="/products" className="btn-primary block text-center" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link 
      to={to} 
      className="font-medium text-textSecondary hover:text-accent transition-colors"
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) => {
  return (
    <Link 
      to={to} 
      className="block py-3 px-4 rounded-xl font-medium text-textSecondary hover:bg-accent/10 hover:text-accent transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar; 