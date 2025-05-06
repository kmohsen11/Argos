import React, { useState, useEffect, useCallback } from 'react';

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
    <div className="bg-base text-textPrimary">
      {/* Header Section */}
      <section id="contact-header" className="pt-24 pb-12 section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <h1 className={`font-bold mb-8 text-center transform transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Contact Us
          </h1>
          <p className="text-textSecondary mb-8 text-center max-w-3xl mx-auto">
            Have questions about our products or technology? Our team is here to help. Reach out to us using any of the methods below.
          </p>
        </div>
      </section>
      
      {/* Contact Methods */}
      <section id="contact-methods" className="py-16 bg-surface section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <div className="space-y-1">
                      <div>
                        <p className="text-sm text-textSecondary">Product Inquiries:</p>
                        <a href="mailto:fpmmsilva@gmail.com" className="text-textSecondary hover:text-accent transition-colors">
                          info@nolimit.tech
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-textSecondary">Support:</p>
                        <a href="mailto:sadri.dridi@uni.minerva.edu" className="text-textSecondary hover:text-accent transition-colors">
                          support@nolimit.tech
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-textSecondary">Press:</p>
                        <a href="mailto:Khaled@uni.minerva.edu" className="text-textSecondary hover:text-accent transition-colors">
                          press@nolimit.tech
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Office</h3>
                    <p className="text-textSecondary">2 Marina Boulevard<br />San Francisco, CA 94123</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-textSecondary mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surfaceAlt text-textPrimary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surfaceAlt text-textPrimary"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-textSecondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surfaceAlt text-textPrimary"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-textSecondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surfaceAlt text-textPrimary"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 