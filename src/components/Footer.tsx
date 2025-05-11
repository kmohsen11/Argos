import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-gray-800">
      <div className="max-w-1280 mx-auto px-4 md:px-4rem py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white font-oxanium">
              NoLimit
            </Link>
            <p className="mt-4 text-textSecondary">
              Revolutionizing athletic performance with cutting-edge wearable technology.
            </p>
            <div className="flex space-x-4 mt-6">
              <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} />
              <SocialLink href="https://twitter.com" icon={<Twitter size={20} />} />
              <SocialLink href="https://facebook.com" icon={<Facebook size={20} />} />
              <SocialLink href="https://youtube.com" icon={<Youtube size={20} />} />
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li><FooterLink to="/">Home</FooterLink></li>
              <li><FooterLink to="/features">Features</FooterLink></li>
              <li><FooterLink to="/contact">Contact</FooterLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Connect With Us</h4>
            <p className="text-textSecondary mb-4">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <Link 
              to="/contact" 
              className="text-accent flex items-center hover:underline"
            >
              <span>Contact us</span>
              <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-textSecondary text-sm">
            © NoLimit 2025 - All rights reserved
          </p>
          <div className="mt-4 md:mt-0">
            <a 
              href="#" 
              className="text-accent flex items-center hover:underline"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <span>Back to top</span>
              <ArrowUpRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link 
      to={to} 
      className="text-textSecondary hover:text-accent transition-colors"
    >
      {children}
    </Link>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-surfaceAlt rounded-full w-10 h-10 flex items-center justify-center text-textSecondary hover:text-accent hover:bg-surface transition-colors"
    >
      {icon}
    </a>
  );
};

export default Footer; 