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
         
        </div>
      </section>
      
     
      {/* Contact Methods */}
      <section id="contact-methods" className="py-16 bg-surface section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-textSecondary mb-8">
                Have questions about our products or want to learn more? We'd love to hear from you.
                Reach out to our team directly using the contact information below.
              </p>
              
              <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Team</h3>
                    <div className="space-y-4">
                    <div className="bg-surfaceAlt p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-accent">Fernando Silva - CEO</h4>
                      <a href="mailto:fernando@nolimit.pro" className="text-textSecondary hover:text-accent transition-colors">
                          fernando@nolimit.pro
                        </a>
                      </div>
                    <div className="bg-surfaceAlt p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-accent">Sadri Dridi - CTO</h4>
                      <a href="mailto:sadri@nolimit.pro" className="text-textSecondary hover:text-accent transition-colors">
                          sadri@nolimit.pro
                        </a>
                      </div>
                    <div className="bg-surfaceAlt p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-accent">Khaled Ahmed - CPO</h4>
                      <a href="mailto:khaled@nolimit.pro" className="text-textSecondary hover:text-accent transition-colors">
                          khaled@nolimit.pro
                        </a>
                    </div>
                  </div>
                </div>
                
                  <div>
                    <h3 className="font-bold text-lg mb-2">Our Location</h3>
                  <div className="bg-surfaceAlt p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
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
                      placeholder="Amazing Athlete"
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