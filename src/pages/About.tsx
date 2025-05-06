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
    <div className="bg-base text-textPrimary">
      {/* Header Section */}
      <section id="about-header" className="pt-24 pb-12 section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <h1 className={`font-bold mb-4 text-center transform transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            About NoLimit
          </h1>
          <p className={`text-xl text-textSecondary mb-8 text-center transform transition-all duration-700 ease-out delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Revolutionizing athletic wear with AI-powered technology
          </p>
        </div>
      </section>
      
      {/* Content Sections */}
      <section id="about-content" className="py-16 bg-surface section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-textSecondary mb-6">
                At NoLimit, we believe that every athlete deserves access to professional-grade performance technology. 
                Our mission is to democratize sports science by making advanced AI-powered athletic wear accessible to everyone.
              </p>
              <p className="text-textSecondary">
                By combining cutting-edge AI with innovative textile engineering, we're creating the future of athletic wear 
                that not only enhances performance but also helps prevent injuries and prolong athletic careers.
              </p>
            </div>
            
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Community</h3>
                    <p className="text-textSecondary text-sm">Building products with and for athletes at all levels.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Innovation</h3>
                    <p className="text-textSecondary text-sm">Constantly pushing boundaries of what's possible.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Excellence</h3>
                    <p className="text-textSecondary text-sm">Holding ourselves to the highest standards in everything we do.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Health</h3>
                    <p className="text-textSecondary text-sm">Improving athletes' health and performance longevity.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="card text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Join Us on Our Journey</h2>
            <p className="text-textSecondary mb-4 max-w-2xl mx-auto">
              We're just getting started. Our vision goes beyond creating products – we're building a future where 
              technology enhances human athletic potential while protecting health and longevity.
            </p>
            <p className="text-textSecondary max-w-2xl mx-auto">
              Whether you're a professional athlete, a weekend warrior, or someone who's just starting their fitness journey,
              we're building NoLimit for you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 