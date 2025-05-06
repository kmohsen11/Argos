import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Watch, Activity, Brain, ArrowRight } from 'lucide-react';
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
    <div className="text-textPrimary">
      {/* Hero Section */}
      <section id="hero" className="bg-base relative pt-24 pb-16 md:py-24 section-animation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left column: Text content */}
            <div className={`md:min-w-[45%] space-y-8 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-700 ease-out`}>
              <div className="inline-block px-6 py-3 rounded-xl bg-accent/10 border border-accent/20 text-accent font-medium">
                Next Generation Athletic Wear
              </div>
              
              <h1 className="font-bold tracking-tight">
                Smart Performance
                <span className="block text-accent mt-2">
                  AI-Powered Protection
                </span>
              </h1>
              
              <p className="text-textSecondary text-lg max-w-xl">
                Experience the future of athletic wear with built-in AI injury prediction and performance tracking.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/products')}
                  className="btn-primary flex items-center gap-2"
                >
                  <span>Explore Products</span>
                  <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className="btn-secondary"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Right column: Hero image */}
            <div className={`${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-700 ease-out delay-300`}>
              <div className="relative rounded-card overflow-hidden">
                <img
                  src="../short.png"
                  alt="AI Performance Shorts"
                  className="w-full h-auto max-h-[650px] object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
          
          <ChevronDown 
            className={`w-12 h-12 mx-auto mt-12 cursor-pointer text-accent hover:text-accent/80 transition-colors ${isLoaded ? 'animate-bounce opacity-100' : 'opacity-0'}`}
            onClick={() => scrollToSection('product')}
          />
        </div>
      </section>

      {/* Product Showcase Section */}
      <section id="product" className="py-24 relative bg-surface section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-base mb-4">Introducing</h2>
            <div className="text-4xl sm:text-5xl font-bold text-base inline-block px-6 py-2 rounded-2xl bg-surface shadow-card">
              AI Performance Shorts
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Enhanced 3D Model Container */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-card overflow-hidden transition-all duration-500 hover:shadow-xl bg-surface">
                {/* Main container */}
                <div className="relative aspect-square md:aspect-[4/3] rounded-card overflow-hidden bg-surface border border-gray-200 shadow-card">
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
                            className="h-full w-full flex items-center justify-center text-accent cursor-pointer bg-white transition-colors hover:bg-surfaceAlt"
                            onClick={() => setModelError(true)}
                          >
                            <div className="text-center">
                              <p className="text-lg font-medium">3D model loading error</p>
                              <p className="text-sm mt-2 text-base">Click to view static image</p>
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
                <h3 className="text-2xl sm:text-3xl font-bold text-base">
                  Next-Generation Performance Technology
                </h3>
                <p className="text-base/relaxed text-textSecondary">
                  Our AI Performance Shorts integrate cutting-edge sensors with advanced AI algorithms to monitor movement patterns, provide real-time feedback, and help prevent injuries before they happen.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <FeatureCard 
                    icon={<Brain className="text-accent" size={24} />} 
                    title="AI Injury Prevention"
                    description="Predicts potential injuries before they happen"
                  />
                  <FeatureCard 
                    icon={<Activity className="text-accent" size={24} />} 
                    title="Performance Tracking"
                    description="Monitors metrics for optimal training"
                  />
                  <FeatureCard 
                    icon={<Watch className="text-accent" size={24} />} 
                    title="Device Integration"
                    description="Connects with your favorite smart devices"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-surface section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Why Choose NoLimit?
            </h2>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto">
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
              className="btn-secondary"
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
    <div className="card flex items-center gap-6 hover:cursor-pointer">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-base mb-1">{title}</h4>
        <p className="text-sm text-textSecondary">{description}</p>
      </div>
    </div>
  );
}

function BenefitCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="card">
      <div className="inline-block w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2 text-base">{title}</h3>
      <p className="text-textSecondary">{description}</p>
    </div>
  );
}

export default Home; 