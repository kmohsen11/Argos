import React, { useState } from 'react';
import { ChevronDown, Watch, Activity, Brain, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ShortsModel } from '../components/ShortsModel';

const Home = () => {
  const navigate = useNavigate();
  const [modelError, setModelError] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/80 mix-blend-overlay" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
            style={{ filter: 'brightness(0.7)' }}
          >
            <source src="https://cdn.coverr.co/videos/coverr-person-working-out-in-the-gym-5244/1080p.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <div className="inline-block mb-6 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-lg font-medium">
            Next Generation Athletic Wear
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-fade-in">
            Smart Performance
            <span className="block text-4xl sm:text-5xl lg:text-6xl mt-4 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text animate-gradient">
              AI-Powered Protection
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Experience the future of athletic wear with built-in AI injury prediction and performance tracking.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={() => navigate('/products')}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium flex items-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              <span>Explore Products</span>
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="px-8 py-4 rounded-lg border border-purple-500/30 text-purple-400 font-medium hover:bg-purple-500/10 transition-all"
            >
              Learn More
            </button>
          </div>
          <ChevronDown 
            className="animate-bounce w-12 h-12 mx-auto mt-12 cursor-pointer text-purple-400 hover:text-purple-300 transition-colors"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Floating 3D Model or Fallback Image */}
            <div className="w-full max-w-3xl mb-16 flex items-center justify-center relative">
              {/* Outer glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-purple-600/20 via-purple-900/5 to-transparent rounded-3xl blur-2xl"></div>
              
              {/* Main container */}
              <div className="relative z-10 w-full">
                <div className="relative w-full aspect-[16/9] group">
                  {/* Inner glow and border effects */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-purple-600/50 rounded-2xl blur-sm group-hover:blur opacity-75"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-black rounded-2xl backdrop-blur-sm"></div>
                  
                  {/* Content container */}
                  <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-black/50 to-purple-900/20 border border-purple-500/20">
                    {/* Grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]"></div>
                    
                    {/* 3D Model or Fallback */}
                    {modelError ? (
                      <div className="h-full w-full flex items-center justify-center p-8">
                        <img 
                          src="/shorts-3d.png" 
                          alt="AI Performance Shorts" 
                          className="w-full max-w-md mx-auto drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <ErrorBoundary 
                        fallback={
                          <div 
                            className="h-full w-full flex items-center justify-center text-purple-400 cursor-pointer bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/50"
                            onClick={() => setModelError(true)}
                          >
                            <div className="text-center">
                              <p className="text-lg font-medium">3D model loading error</p>
                              <p className="text-sm mt-2 text-purple-300">Click to view static image</p>
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
            
            {/* Features Content */}
            <div className="w-full max-w-3xl space-y-8 scroll-reveal">
              <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
                Advanced Features
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-center">
                AI Performance Shorts
                <span className="block text-2xl sm:text-3xl mt-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Smart Protection</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <Feature 
                  icon={<Brain className="text-purple-400" size={24} />} 
                  title="AI Injury Prevention"
                  description="Real-time analysis of movement patterns to prevent potential injuries"
                />
                <Feature 
                  icon={<Activity className="text-purple-400" size={24} />} 
                  title="Performance Metrics"
                  description="Track your performance metrics and receive AI-powered insights"
                />
                <Feature 
                  icon={<Watch className="text-purple-400" size={24} />} 
                  title="Smart Device Integration"
                  description="Seamlessly connects with your favorite fitness devices"
                />
                <Feature 
                  icon={<Star className="text-purple-400" size={24} />} 
                  title="Advanced Materials"
                  description="4-way stretch fabric with embedded smart sensors"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-4 group">
      <div className="flex-shrink-0 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-1 text-purple-300">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}

export default Home; 