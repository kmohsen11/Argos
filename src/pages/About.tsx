import React, { useState, useEffect, useCallback } from 'react';
import { Users, Target, Award, Heart } from 'lucide-react';

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

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('about-header');

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
      <section id="about-header" className="pt-24 pb-12 section-animation">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-100/50 to-white">
          <div className={`absolute inset-0 bg-[linear-gradient(rgba(29,78,216,0.01)_2px,transparent_2px),linear-gradient(90deg,rgba(29,78,216,0.01)_2px,transparent_2px)] bg-[size:40px_40px] opacity-0 ${isLoaded ? 'opacity-100' : ''} transition-opacity duration-1000 ease-in-out`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-8 text-center text-primary-700 transform transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>About NoLimit</h1>
          
          <div className="max-w-3xl mx-auto mb-16">
            <p className={`text-xl text-gray-700 mb-8 text-center transform transition-all duration-700 ease-out delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              NoLimit is revolutionizing athletic wear with AI-powered technology designed to enhance performance and prevent injuries.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section id="mission" className="py-12 bg-white section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-12 border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-primary-600">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                At NoLimit, we believe that every athlete deserves access to professional-grade performance technology. 
                Our mission is to democratize sports science by making advanced AI-powered athletic wear accessible to everyone.
              </p>
              <p className="text-gray-700">
                By combining cutting-edge AI with innovative textile engineering, we're creating the future of athletic wear 
                that not only enhances performance but also helps prevent injuries and prolong athletic careers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section id="values" className="py-16 bg-gradient-to-b from-white to-primary-50 section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary-700">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-primary-50 p-4 rounded-2xl inline-block mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-600">Community</h3>
                <p className="text-gray-700">
                  We believe in the power of community to drive innovation and push boundaries. 
                  Our solutions are built with and for athletes of all levels.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-primary-50 p-4 rounded-2xl inline-block mb-4">
                  <Target className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-600">Innovation</h3>
                <p className="text-gray-700">
                  We're constantly pushing the boundaries of what's possible at the intersection of AI,
                  fitness technology, and performance analysis.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-primary-50 p-4 rounded-2xl inline-block mb-4">
                  <Award className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-600">Excellence</h3>
                <p className="text-gray-700">
                  We hold ourselves to the highest standards in everything we do, from product quality
                  to customer service and beyond.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-primary-50 p-4 rounded-2xl inline-block mb-4">
                  <Heart className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-600">Health</h3>
                <p className="text-gray-700">
                  We're committed to improving athletes' health and longevity by providing tools that 
                  help prevent injuries and optimize performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Journey Section */}
      <section id="journey" className="py-16 bg-white section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-8 rounded-2xl text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Join Us on Our Journey</h2>
              <p className="mb-4">
                At NoLimit, we're just getting started. Our vision goes beyond creating products – we're building a future where 
                technology enhances human athletic potential while protecting health and longevity.
              </p>
              <p>
                Whether you're a professional athlete, a weekend warrior, or someone who's just starting their fitness journey,
                we're building NoLimit for you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 