import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, Watch, Activity, Brain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Remove the ErrorBoundary and lazy loading for ShortsModel
// Remove const ShortsModel = lazy(() => import('../components/ShortsModel').then(module => ({ default: module.ShortsModel })));

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
  // Remove modelError state since we're not using 3D model anymore
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  // Use useMemo for product images to prevent unnecessary re-renders
  const productImages = useMemo(() => ['/shorts.png', '/shirts.png'], []);
  const [productImageIndex, setProductImageIndex] = useState(0);

  // Toggle between product images when clicked
  const toggleProductImage = useCallback(() => {
    setProductImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  }, [productImages]);

  // Memoize the scroll handler with useCallback
  const handleScroll = useCallback(throttle(() => {
    const scrollPosition = window.scrollY;
    
    // Check fewer elements on scroll for better performance
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop - 300;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id') || '';
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        if (activeSection !== sectionId) {
          setActiveSection(sectionId);
        }
        if (!section.classList.contains('section-visible')) {
          section.classList.add('section-visible');
        }
      }
    });
  }, 200), [activeSection]); // Increased throttle time for better performance

  // Use simpler function to scroll to section without changing active state
  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Debug function to check if sections are visible
    const checkSectionsVisibility = () => {
      const sections = document.querySelectorAll('section[id]');
      console.log(`Found ${sections.length} sections`);
      
      sections.forEach(section => {
        const isVisible = section.classList.contains('section-visible');
        const computedStyle = window.getComputedStyle(section);
        const opacity = computedStyle.getPropertyValue('opacity');
        console.log(`Section #${section.id}: visible class=${isVisible}, opacity=${opacity}`);
        
        // Force visibility after a short delay
        setTimeout(() => {
          section.classList.add('section-visible');
          (section as HTMLElement).style.opacity = '1';
          (section as HTMLElement).style.transform = 'translateY(0)';
        }, 100);
      });
    };

    // Mark page as loaded and make ALL sections visible immediately
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
      
      // Make ALL sections visible immediately
      document.querySelectorAll('section[id]').forEach(section => {
        section.classList.add('section-visible');
        // Apply inline styles to override any CSS
        (section as HTMLElement).style.opacity = '1';
        (section as HTMLElement).style.transform = 'translateY(0)';
      });
      
      // Check visibility after a short delay
      setTimeout(checkSectionsVisibility, 500);
    }, 10);
    
    // Add scroll event listener with throttled handler for active section tracking
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="text-textPrimary">
      {/* Hero Section - with smooth transition to next section */}
      <section id="hero" className="bg-base relative pt-24 pb-32 md:py-24 md:pb-32 section-visible">
        {/* Add a subtle gradient pattern that blends with next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base to-surface"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left column: Text content */}
            <div className={`md:min-w-[45%] space-y-8 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 ease-out`}>
              <div className="inline-block px-6 py-3 rounded-xl bg-accent/10 border border-accent/20 text-accent font-medium">
                Next Generation Athletic Wear
              </div>
              
              <h1 className="font-bold tracking-tight">
                Smart Performance
                <span className="block text-accent mt-2">
                  AI-Powered Wearables
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
            
            {/* Right column: Hero image with decoding async for better performance */}
            <div className={`${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 ease-out delay-100`}>
              <div className="relative rounded-card overflow-hidden" style={{ minHeight: '300px' }}>
                <img
                  src="/short.png"
                  alt="AI Performance Shorts"
                  className="w-full h-auto max-h-[650px] object-cover rounded-lg shadow-xl"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
          
          <ChevronDown 
            className={`w-12 h-12 mx-auto mt-12 cursor-pointer text-accent hover:text-accent/80 transition-colors ${isLoaded ? 'animate-bounce opacity-100' : 'opacity-0'}`}
            onClick={() => scrollToSection('product')}
          />
        </div>
        {/* Smooth section divider */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-surface z-0"></div>
      </section>

      {/* Product Showcase Section - smoother transition */}
      <section id="product" className="py-24 pt-16 relative bg-gradient-to-b from-surface via-surface to-surfaceAlt/90 section-visible -mt-8">
        {/* Smoother transition at top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-surface z-0"></div>
        {/* Background pattern for more visual interest */}
        <div className="absolute inset-0 opacity-30 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl"></div>
          <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-accent/20 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-4">Introducing</h2>
            <div className="text-4xl sm:text-5xl font-bold text-accent inline-block px-6 py-2 rounded-2xl bg-surfaceAlt shadow-card">
              AI Performance Wear
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image Container - with performance optimizations */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-card overflow-hidden transition-all duration-500 hover:shadow-xl bg-surfaceAlt">
                {/* Main container with fixed height for layout stability */}
                <div className="relative aspect-square md:aspect-[4/3] rounded-card overflow-hidden bg-surfaceAlt border border-gray-700 shadow-card">
                  {/* Content */}
                  <div 
                    className="relative h-full w-full flex items-center justify-center p-8 cursor-pointer"
                    onClick={toggleProductImage}
                  >
                    <img 
                      src={productImages[productImageIndex]} 
                      alt={productImageIndex === 0 ? "AI Performance Shorts" : "AI Performance Shirts"} 
                      className="w-full max-w-md mx-auto drop-shadow-lg hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-accent font-medium">
                      Click to see {productImageIndex === 0 ? "shirts" : "shorts"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product info */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-textPrimary">
                  Next-Generation Performance Technology
                </h3>
                <p className="text-base/relaxed text-textSecondary">
                  Our AI Performance Wearables integrate cutting-edge sensors with advanced AI algorithms to monitor movement patterns, provide real-time feedback, and help prevent injuries before they happen.
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
        {/* Smooth section divider */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-surfaceAlt z-0"></div>
      </section>

      {/* Benefits Section - smoother transition */}
      <section id="benefits" className="py-24 pt-16 bg-gradient-to-b from-surfaceAlt via-surfaceAlt to-base section-visible relative overflow-hidden -mt-8">
        {/* Smoother transition at top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-surfaceAlt z-0"></div>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border-b border-r border-accent/5"></div>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-accent mb-6">
              Why Choose NoLimit?
            </h2>
            <p className="text-xl text-textPrimary max-w-3xl mx-auto">
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
              className="btn-primary"
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
    <div className="card flex items-center gap-6 hover:cursor-pointer bg-surfaceAlt border border-gray-700">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-textPrimary mb-1">{title}</h4>
        <p className="text-sm text-textSecondary">{description}</p>
      </div>
    </div>
  );
}

function BenefitCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="card bg-surface border border-gray-800">
      <div className="inline-block w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2 text-textPrimary">{title}</h3>
      <p className="text-textSecondary">{description}</p>
    </div>
  );
}

export default Home; 