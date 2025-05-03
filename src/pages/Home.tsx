import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Watch, Activity, Brain, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ShortsModel } from '../components/ShortsModel';

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

const Home = () => {
  const navigate = useNavigate();
  const [modelError, setModelError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Memoize the scroll handler with useCallback
  const handleScroll = useCallback(throttle(() => {
    const scrollPosition = window.scrollY;
    
    // Simple calculation rather than using IntersectionObserver
    // which can be performance-intensive on scroll
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
      
    }, 50); // Reduced from 100ms to 50ms
    
    // Add scroll event listener with throttled handler
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Use simpler function to scroll to section without changing active state
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-b from-primary-50 to-white text-gray-900">
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center section-animation">
        {/* Simplified background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-100/50 to-white">
          <div className={`absolute inset-0 bg-[linear-gradient(rgba(29,78,216,0.01)_2px,transparent_2px),linear-gradient(90deg,rgba(29,78,216,0.01)_2px,transparent_2px)] bg-[size:40px_40px] opacity-0 ${isLoaded ? 'opacity-100' : ''} transition-opacity duration-1000 ease-in-out`}></div>
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <div className={`inline-block mb-6 px-6 py-3 rounded-2xl bg-primary-50 border border-primary-200 text-primary-700 text-lg font-medium transform transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Next Generation Athletic Wear
          </div>
          <h1 className={`text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-primary-800 transform transition-all duration-700 ease-out delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Smart Performance
            <span className="block text-4xl sm:text-5xl lg:text-6xl mt-4 text-primary-600">
              AI-Powered Protection
            </span>
          </h1>
          <p className={`text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 transform transition-all duration-700 ease-out delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Experience the future of athletic wear with built-in AI injury prediction and performance tracking.
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transform transition-all duration-700 ease-out delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button 
              onClick={() => navigate('/products')}
              className="px-8 py-4 rounded-2xl bg-primary-600 text-white font-medium flex items-center space-x-2 hover:bg-primary-700 transition-all shadow-sm hover:shadow-md"
            >
              <span>Explore Products</span>
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="px-8 py-4 rounded-2xl border border-primary-300 text-primary-600 font-medium hover:bg-primary-50 transition-all"
            >
              Learn More
            </button>
          </div>
          <ChevronDown 
            className={`w-12 h-12 mx-auto mt-12 cursor-pointer text-primary-600 hover:text-primary-700 transition-colors ${isLoaded ? 'animate-bounce opacity-100' : 'opacity-0'}`}
            onClick={() => scrollToSection('product')}
          />
        </div>
      </section>

      {/* Product Showcase Section */}
      <section id="product" className="py-24 relative bg-gradient-to-b from-white to-primary-50 section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-800 mb-4">Introducing</h2>
            <div className="text-4xl sm:text-5xl font-bold text-primary-700 inline-block px-6 py-2 rounded-2xl bg-primary-50/50 border border-primary-100">
              AI Performance Shorts
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Enhanced 3D Model Container */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl bg-white">
                {/* Simplified shadow effect for better performance */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-accent-200 opacity-30 blur-xl rounded-2xl"></div>
                
                {/* Main container */}
                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-primary-100 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-primary-50 opacity-80"></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-accent-400"></div>
                  
                  {/* Content */}
                  <div className="relative h-full w-full">
                    {modelError ? (
                      <div className="h-full w-full flex items-center justify-center p-8">
                        <img 
                          src="/shorts-3d.png" 
                          alt="AI Performance Shorts" 
                          className="w-full max-w-md mx-auto drop-shadow-lg hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <ErrorBoundary 
                        fallback={
                          <div 
                            className="h-full w-full flex items-center justify-center text-primary-600 cursor-pointer bg-white transition-colors hover:bg-primary-50"
                            onClick={() => setModelError(true)}
                          >
                            <div className="text-center">
                              <p className="text-lg font-medium">3D model loading error</p>
                              <p className="text-sm mt-2 text-primary-500">Click to view static image</p>
                            </div>
                          </div>
                        }
                      >
                        <ShortsModel />
                      </ErrorBoundary>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product info */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-primary-800">
                  Next-Generation Performance Technology
                </h3>
                <p className="text-lg text-gray-700">
                  Our AI Performance Shorts integrate cutting-edge sensors with advanced AI algorithms to monitor movement patterns, provide real-time feedback, and help prevent injuries before they happen.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <FeatureCard 
                    icon={<Brain className="text-primary-600" size={24} />} 
                    title="AI Injury Prevention"
                    description="Predicts potential injuries before they happen"
                  />
                  <FeatureCard 
                    icon={<Activity className="text-primary-600" size={24} />} 
                    title="Performance Tracking"
                    description="Monitors metrics for optimal training"
                  />
                  <FeatureCard 
                    icon={<Watch className="text-primary-600" size={24} />} 
                    title="Device Integration"
                    description="Connects with your favorite smart devices"
                  />
                  <FeatureCard 
                    icon={<Star className="text-accent-500" size={24} />} 
                    title="Advanced Materials"
                    description="Comfortable, durable, high-performance fabric"
                  />
                </div>
                
                <div className="mt-8">
                  <button 
                    onClick={() => navigate('/products')}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary-600 text-white font-medium flex items-center justify-center space-x-2 hover:bg-primary-700 transition-all shadow-sm hover:shadow-md"
                  >
                    <span>Pre-order Now</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-white section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
              Why Choose NoLimit?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our technology doesn't just track performance—it helps you reach your full potential while keeping you safe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              number="01"
              title="Prevent Injuries"
              description="AI algorithms detect movement patterns that could lead to injuries, providing real-time alerts."
            />
            <BenefitCard 
              number="02"
              title="Optimize Training"
              description="Track performance metrics and receive personalized recommendations to improve your training."
            />
            <BenefitCard 
              number="03"
              title="Extend Your Career"
              description="By preventing injuries and optimizing training, NoLimit helps extend your athletic career."
            />
          </div>
          
          <div className="mt-16 text-center">
            <button 
              onClick={() => navigate('/about')}
              className="px-8 py-4 rounded-2xl bg-white text-primary-600 font-medium border border-primary-300 hover:bg-primary-50 transition-all"
            >
              Learn More About Our Technology
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-4 group p-4 rounded-2xl transition-all hover:bg-primary-50/50">
      <div className="flex-shrink-0 p-3 rounded-2xl bg-primary-50 border border-primary-200 group-hover:bg-white transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-1 text-primary-700">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function BenefitCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-primary-200">
      <div className="text-4xl font-bold text-primary-100 group-hover:text-primary-200 transition-colors mb-4">{number}</div>
      <h3 className="text-xl font-bold text-primary-700 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <div className="mt-4 h-1 w-16 bg-accent-400 group-hover:w-24 transition-all duration-300"></div>
    </div>
  );
}

export default Home; 