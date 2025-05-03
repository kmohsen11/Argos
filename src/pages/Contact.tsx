import React, { useState, useEffect, useCallback } from 'react';
import { Mail, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

// Throttle function to limit how often a function can be called
const throttle = <T extends (...args: unknown[]) => unknown>(func: T, limit: number): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const Contact = () => {
  // UI state
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('contact-header');

  // Memoize the scroll handler with useCallback
  const handleScroll = useCallback(throttle(() => {
    const scrollPosition = window.scrollY;
    
    // Simple calculation rather than using IntersectionObserver
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop - 300; // Increased offset to detect sections earlier
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id') || '';
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        if (activeSection !== sectionId) {
          setActiveSection(sectionId);
        }
        // Always add visible class when in viewport
        section.classList.add('section-visible');
      }
    });
  }, 100), [activeSection]);

  useEffect(() => {
    // Mark as loaded after a smaller delay to enable smooth transitions
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Make all sections visible with staggered timing
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section, index) => {
        setTimeout(() => {
          section.classList.add('section-visible');
        }, 100 + index * 100);
      });
      
    }, 50);

    // Add scroll event listener with throttled handler
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="bg-gradient-to-b from-primary-50 to-white text-gray-900">
      {/* Header Section */}
      <section id="contact-header" className="pt-24 pb-12 section-animation">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-100/50 to-white">
          <div className={`absolute inset-0 bg-[linear-gradient(rgba(29,78,216,0.01)_2px,transparent_2px),linear-gradient(90deg,rgba(29,78,216,0.01)_2px,transparent_2px)] bg-[size:40px_40px] opacity-0 ${isLoaded ? 'opacity-100' : ''} transition-opacity duration-1000 ease-in-out`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-8 text-center text-primary-700 transform transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Contact Us</h1>
        </div>
      </section>
      
      {/* Contact Info Section */}
      <section id="contact-info" className="py-12 bg-white section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-primary-600">Get in Touch</h2>
              <p className="text-gray-700 mb-8">
                Have questions about our products or want to learn more? We'd love to hear from you.
                Reach out to our team directly using the contact information below.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-primary-50 p-4 rounded-2xl mr-4">
                    <Mail className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Team</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary-600">Fernando Silva - CEO</h4>
                        <a href="mailto:fpmmsilva@gmail.com" className="text-gray-700 hover:text-primary-600 transition-colors">
                          fernando@nolimit.com
                        </a>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary-600">Sadri Dridi - CTO</h4>
                        <a href="mailto:sadri.dridi@uni.minerva.edu" className="text-gray-700 hover:text-primary-600 transition-colors">
                          sadri@nolimit.com
                        </a>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary-600">Khaled Ahmed - CPO</h4>
                        <a href="mailto:Khaled@uni.minerva.edu" className="text-gray-700 hover:text-primary-600 transition-colors">
                          khaled@nolimit.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-50 p-4 rounded-2xl mr-4">
                    <MapPin className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Our Location</h3>
                    <div className="bg-gray-50 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-gray-700">2 Marina Boulevard<br />San Francisco, CA 94123</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-primary-50 p-4 rounded-2xl hover:bg-primary-100 transition-colors shadow-sm hover:shadow-md">
                      <Linkedin className="text-primary-600" size={20} />
                    </a>
                    <a href="https://x.com/trynolimit" className="bg-primary-50 p-4 rounded-2xl hover:bg-primary-100 transition-colors shadow-sm hover:shadow-md">
                      <Twitter className="text-primary-600" size={20} />
                    </a>
                    <a href="#" className="bg-primary-50 p-4 rounded-2xl hover:bg-primary-100 transition-colors shadow-sm hover:shadow-md">
                      <Instagram className="text-primary-600" size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Info Section */}
      <section id="contact-additional" className="py-12 bg-gradient-to-b from-white to-primary-50 section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-primary-600">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="bg-primary-50 p-5 rounded-2xl border border-primary-100">
                <h3 className="text-xl font-bold mb-3 text-primary-600">Headquarters</h3>
                <p className="text-gray-700">
                  2 Marina Boulevard<br />
                  San Francisco, CA 94123<br />
                  United States
                </p>
              </div>
              
              <div className="bg-primary-50 p-5 rounded-2xl border border-primary-100">
                <h3 className="text-xl font-bold mb-3 text-primary-600">Email & Phone</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">General Inquiries:</span> info@nolimit.com
                </p>
              </div>
              
              <div className="bg-primary-50 p-5 rounded-2xl border border-primary-100">
                <h3 className="text-xl font-bold mb-3 text-primary-600">Office Hours</h3>
                <p className="text-gray-700">
                  Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 