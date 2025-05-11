import React, { useState, useEffect, useCallback } from 'react';
import { Activity, Brain, Watch, Zap, BarChart2, Shield } from 'lucide-react';

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

const Features = () => {
  // UI state
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('features-header');

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
      <section id="features-header" className="relative min-h-[50vh] flex items-center pt-24 overflow-hidden section-animation" 
        style={{ background: 'linear-gradient(145deg, #0b0c10, #111214)' }}>
        {/* Diagonal line accents */}
        <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="80" height="80" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="80" stroke="#0061FF" strokeWidth="0.5" strokeOpacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diagonalLines)" />
            </svg>
          </div>
        </div>
        
        {/* Ghosted background text */}
        <div className="ghost-text top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-[0.05] text-[15vw]">
          FEATURES
        </div>
        
        <div className="max-w-1280 mx-auto px-4 md:px-4rem w-full relative z-10">
          <div className="text-center">
            <h1 className={`font-bold text-white leading-none tracking-wider text-5xl md:text-6xl transform transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              CUTTING-EDGE <span className="text-accent block">FEATURES</span>
            </h1>
            
            <p className="text-xl mt-5 leading-relaxed text-gray-300 tracking-wide max-w-3xl mx-auto">
              Our advanced technology revolutionizes the way you train and recover.
              Experience the future of athletic performance with NoLimit wearables.
            </p>
          </div>
        </div>
      </section>
      
      {/* Core Features Section */}
      <section id="core-features" className="py-24 bg-base section-animation">
        <div className="max-w-1280 mx-auto px-4 md:px-4rem">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide">Core Technology</h2>
            <p className="text-textSecondary max-w-2xl mx-auto">
              Our EMG sensors and AI algorithms work together to deliver unprecedented insights into your athletic performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Activity className="text-accent" size={32} />}
              title="Real-Time Tracking" 
              description="Monitor muscle activation and movement patterns as you perform, with immediate feedback delivered to your device."
            />
            <FeatureCard 
              icon={<Brain className="text-accent" size={32} />}
              title="AI Injury Prediction" 
              description="Our machine learning algorithms identify potential injury risks before they happen, helping you train smarter and safer."
            />
            <FeatureCard 
              icon={<Watch className="text-accent" size={32} />}
              title="Device Integration" 
              description="Seamlessly connects with your smartphone, smartwatch, and other fitness devices for a unified experience."
            />
            <FeatureCard 
              icon={<Zap className="text-accent" size={32} />}
              title="Long Battery Life" 
              description="Train for hours without interruption thanks to our energy-efficient sensors and optimized power management."
            />
            <FeatureCard 
              icon={<BarChart2 className="text-accent" size={32} />}
              title="Performance Analytics" 
              description="Detailed insights and trend analysis to help you understand your progress and optimize your training regimen."
            />
            <FeatureCard 
              icon={<Shield className="text-accent" size={32} />}
              title="Recovery Monitoring" 
              description="Track recovery metrics to prevent overtraining and ensure you're ready for your next session."
            />
          </div>
        </div>
      </section>
      
      {/* Product Features Section */}
      <section id="product-features" className="py-24 bg-surface section-animation">
        <div className="max-w-1280 mx-auto px-4 md:px-4rem">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide">Our Products</h2>
            <p className="text-textSecondary max-w-2xl mx-auto">
              Advanced wearable technology engineered for elite performance and injury prediction.
            </p>
          </div>
          
          {/* EMG Shirt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">EMG Performance Shirts</h3>
              <ul className="space-y-4 mb-6">
                <FeatureListItem text="Integrated EMG sensors for real-time muscle activation monitoring" />
                <FeatureListItem text="Breathable, moisture-wicking fabric for comfort during intense workouts" />
                <FeatureListItem text="Machine washable design with removable sensor modules" />
                <FeatureListItem text="Available in multiple sizes and colors to match your style" />
                <FeatureListItem text="Bluetooth connectivity with 30+ hour battery life" />
              </ul>
            </div>
            <div className="order-1 md:order-2 product-image">
              <div className="product-glow"></div>
              <img 
                src="/shirts.png" 
                alt="EMG Performance Shirt" 
                className="max-w-full h-auto object-contain max-h-[400px] mx-auto transparent-bg-image" 
              />
            </div>
          </div>
          
          {/* EMG Shorts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="product-image">
              <div className="product-glow"></div>
              <img 
                src="/shorts.png" 
                alt="EMG Performance Shorts" 
                className="max-w-full h-auto object-contain max-h-[400px] mx-auto transparent-bg-image" 
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">EMG Performance Shorts</h3>
              <ul className="space-y-4 mb-6">
                <FeatureListItem text="Strategically placed sensors to monitor lower body mechanics" />
                <FeatureListItem text="Compression fit for optimal muscle support and sensor contact" />
                <FeatureListItem text="Reinforced stitching for durability during high-intensity activities" />
                <FeatureListItem text="Quick-dry, four-way stretch fabric for unrestricted movement" />
                <FeatureListItem text="Smartphone app integration with personalized feedback" />
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Section */}
      <section id="technology" className="py-24 bg-base section-animation">
        <div className="max-w-1280 mx-auto px-4 md:px-4rem">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide">The Technology</h2>
            <p className="text-textSecondary max-w-2xl mx-auto">
              Powered by cutting-edge EMG sensors and proprietary AI algorithms developed by sports scientists and engineers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-surfaceAlt rounded-xl p-8 border border-accent/10">
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide">How It Works</h3>
              <ol className="space-y-6">
                <li className="flex">
                  <span className="text-accent font-bold text-xl mr-4">1.</span>
                  <div>
                    <h4 className="font-bold mb-2">Data Collection</h4>
                    <p className="text-textSecondary">EMG sensors detect electrical activity produced by muscle contractions in real-time.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="text-accent font-bold text-xl mr-4">2.</span>
                  <div>
                    <h4 className="font-bold mb-2">Signal Processing</h4>
                    <p className="text-textSecondary">Our proprietary algorithms filter and analyze the raw EMG signals to extract meaningful data.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="text-accent font-bold text-xl mr-4">3.</span>
                  <div>
                    <h4 className="font-bold mb-2">Pattern Recognition</h4>
                    <p className="text-textSecondary">Machine learning models identify movement patterns and compare them to optimal form.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="text-accent font-bold text-xl mr-4">4.</span>
                  <div>
                    <h4 className="font-bold mb-2">Immediate Feedback</h4>
                    <p className="text-textSecondary">Real-time alerts and guidance are delivered to your connected device.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="text-accent font-bold text-xl mr-4">5.</span>
                  <div>
                    <h4 className="font-bold mb-2">Personalized Insights</h4>
                    <p className="text-textSecondary">Your data builds over time, creating a personalized profile that adapts to your progress.</p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="bg-surfaceAlt rounded-xl p-8 border border-accent/10">
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide">Technical Specifications</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2">Sensors</h4>
                  <ul className="space-y-2 text-textSecondary">
                    <li>• Military-grade EMG sensors with 1,000Hz sampling rate</li>
                    <li>• 9-axis motion sensors (accelerometer, gyroscope, magnetometer)</li>
                    <li>• Temperature and humidity sensors for environmental context</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Connectivity</h4>
                  <ul className="space-y-2 text-textSecondary">
                    <li>• Bluetooth 5.2 low energy</li>
                    <li>• Wi-Fi direct sync capability</li>
                    <li>• NFC pairing with compatible devices</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Battery</h4>
                  <ul className="space-y-2 text-textSecondary">
                    <li>• Rechargeable lithium polymer</li>
                    <li>• 30+ hours of continuous use</li>
                    <li>• 2-hour quick charge</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Materials</h4>
                  <ul className="space-y-2 text-textSecondary">
                    <li>• 78% nylon, 22% spandex, antibacterial treated</li>
                    <li>• Waterproof sensor housing (IPX7 rated)</li>
                    <li>• Machine washable (with sensors removed)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section id="cta" className="py-20 bg-accent text-base section-animation">
        <div className="max-w-1280 mx-auto px-4 md:px-4rem text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wide">Ready to Transform Your Training?</h2>
          <p className="text-base/neutral-900 max-w-2xl mx-auto mb-10 text-black/80">
            Join thousands of athletes who've elevated their performance with NoLimit technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-black text-white font-semibold px-8 py-4 rounded-lg hover:bg-black/90 transition-all duration-300 hover:scale-105 uppercase tracking-wider">
              Get Started
            </button>
            <button className="bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 uppercase tracking-wider">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-surfaceAlt rounded-xl p-6 hover:bg-surfaceAlt/70 transition-all duration-300 hover:translate-y-[-8px] group border border-accent/10 h-full">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">{title}</h3>
      <p className="text-textSecondary">{description}</p>
    </div>
  );
};

const FeatureListItem = ({ text }: { text: string }) => {
  return (
    <li className="flex items-start">
      <div className="text-accent mr-3 mt-1">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="text-textSecondary">{text}</span>
    </li>
  );
};

export default Features; 