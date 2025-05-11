import React, { useState, useCallback } from 'react';
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [activeProduct, setActiveProduct] = useState('shirt');
  
  const toggleProduct = useCallback(() => {
    setActiveProduct(prev => prev === 'shirt' ? 'shorts' : 'shirt');
  }, []);

  return (
    <div className="bg-base text-white">
      {/* Hero Section - Full Viewport Height */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden" 
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
        
        {/* Ghosted background text - positioned higher */}
        <div className="ghost-text top-1/4 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-[0.05] text-[15vw]">
          NoLimit
        </div>
        
        <div className="max-w-1280 mx-auto px-4 md:px-4rem w-full relative z-10 pt-20 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-between">
            {/* Text Content - adjusted for better positioning */}
            <div className="z-10 space-y-10 lg:pb-16 pt-10">
              <div>
                <h1 className="font-bold text-white leading-none tracking-wider text-5xl md:text-6xl">
                  REAL-TIME <span className="text-accent block">INSIGHTS</span>
                </h1>
                
                <p className="text-xl mt-5 leading-relaxed text-gray-300 tracking-wide">
                  Train smarter. Prevent injury. Elevate performance.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-5 mt-10">
                <button className="bg-gray-800 text-white px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 font-medium">
                  <span>LEARN MORE</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
            
            {/* Product Image - adjusted position */}
            <div className="relative lg:mt-20 mt-12 z-10 product-image transform lg:rotate-12 lg:translate-y-10">
              <div className="product-glow opacity-70"></div>
              
              <img 
                src={activeProduct === 'shirt' ? '/shirts.png' : '/shorts.png'} 
                alt={activeProduct === 'shirt' ? "EMG Performance Shirt" : "EMG Performance Shorts"} 
                className="max-w-full h-auto object-contain max-h-[500px] transparent-bg-image"
                onClick={toggleProduct}
              />
              
              {/* Product toggle hint */}
              <div className="text-center mt-6 text-gray-400 uppercase tracking-wider text-xs">
                Tap to view {activeProduct === 'shirt' ? 'shorts' : 'shirt'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom scroll indicator */}
        
      </section>
      
      {/* Product Showcase Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-1280 mx-auto px-4 md:px-4rem">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wide">Our Products</h2>
            <p className="text-textSecondary max-w-2xl mx-auto">
              Advanced wearable technology for elite performance and injury prediction.
            </p>
          </div>
          
          {/* Product Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">EMG Performance Shirts</h3>
              <p className="text-textSecondary mb-6">
                Our shirts feature integrated sensors that monitor muscle activity in real-time, providing immediate feedback to optimize your training.
              </p>
              <button 
                onClick={() => navigate('/features')}
                className="btn-secondary uppercase tracking-wider"
              >
                Learn More
              </button>
            </div>
            <div className="order-first md:order-last mb-8 md:mb-0 product-image">
              <div className="product-glow"></div>
              <img 
                src="/shirts.png" 
                alt="EMG Performance Shirt" 
                className="max-w-full h-auto object-contain max-h-[400px] mx-auto transparent-bg-image" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16">
            <div className="order-first mb-8 md:mb-0 product-image">
              <div className="product-glow"></div>
              <img 
                src="/shorts.png" 
                alt="EMG Performance Shorts" 
                className="max-w-full h-auto object-contain max-h-[400px] mx-auto transparent-bg-image" 
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">EMG Performance Shorts</h3>
              <p className="text-textSecondary mb-6">
                Our shorts track lower body mechanics and muscle activation patterns to prevent injuries and enhance power output.
              </p>
              <button 
                onClick={() => navigate('/features')}
                className="btn-secondary uppercase tracking-wider"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-base">
        <div className="max-w-1280 mx-auto px-4 md:px-4rem">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wide">Cutting-Edge Features</h2>
            <p className="text-textSecondary max-w-2xl mx-auto">
              Our advanced technology revolutionizes the way you train and recover.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              number="01" 
              title="Real-Time Tracking" 
              description="Monitor muscle activation and movement patterns as you perform."
            />
            <FeatureCard 
              number="02" 
              title="AI Injury Prediction" 
              description="Predictive algorithms warn you before injuries occur."
            />
            <FeatureCard 
              number="03" 
              title="Performance Insights" 
              description="Get actionable data to optimize your training routine."
            />
            <FeatureCard 
              number="04" 
              title="Wireless Connectivity" 
              description="Seamlessly sync with your mobile device or smartwatch."
            />
            <FeatureCard 
              number="05" 
              title="Long Battery Life" 
              description="Train for hours with our energy-efficient sensors."
            />
            <FeatureCard 
              number="06" 
              title="Recovery Tracking" 
              description="Monitor your recovery to prevent overtraining."
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-1280 mx-auto px-4 md:px-4rem text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wide">Ready to Transform Your Training?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10">
            Join thousands of athletes who've elevated their performance with NoLimit technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-black text-white font-semibold px-8 py-4 rounded-lg hover:bg-black/90 transition-all duration-300 hover:scale-105 uppercase tracking-wider"
                  onClick={() => navigate('/features')}>
              Learn More
            </button>
            <button className="bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 uppercase tracking-wider"
                   onClick={() => navigate('/contact')}>
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ number, title, description }: { number: string; title: string; description: string }) => {
  return (
    <div className="bg-surfaceAlt rounded-xl p-6 hover:bg-surfaceAlt/70 transition-all duration-300 hover:translate-y-[-8px] group border border-accent/10">
      <div className="text-accent font-mono text-xl mb-4 font-bold">{number}</div>
      <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">{title}</h3>
      <p className="text-textSecondary">{description}</p>
      <div className="mt-6 text-accent flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-sm font-medium">Learn more</span>
        <ChevronRight size={16} />
      </div>
    </div>
  );
};

export default Home; 