import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';

// Navigation links configuration
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-base shadow-md py-3' : 'bg-base bg-opacity-80 backdrop-blur-md py-4'}`}>
      <div className="max-w-1280 mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-textPrimary font-oxanium">
            NoLimit
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-10">
            {NAV_LINKS.map((link) => (
              <NavLink 
                key={link.href}
                to={link.href} 
                isActive={isActive(link.href)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          
          {/* Action Icons */}
          
          
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
        <div className="px-4 py-5 bg-base shadow-md space-y-3">
          {NAV_LINKS.map((link) => (
            <MobileNavLink 
              key={link.href}
              to={link.href} 
              onClick={() => setIsOpen(false)} 
              isActive={isActive(link.href)}
            >
              {link.name}
            </MobileNavLink>
          ))}
          
          
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, isActive, children }: { to: string; isActive: boolean; children: React.ReactNode }) => {
  return (
    <Link 
      to={to} 
      className={`nav-link ${isActive ? 'active' : ''}`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, onClick, isActive, children }: { to: string; onClick: () => void; isActive: boolean; children: React.ReactNode }) => {
  return (
    <Link 
      to={to} 
      className={`block py-3 px-4 rounded-xl font-medium ${isActive ? 'text-accent' : 'text-textSecondary'} hover:bg-accent/10 hover:text-accent transition-colors`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar; 