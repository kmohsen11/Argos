import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, ArrowRight, Star, ChevronDown, Watch, Activity, Brain, Mail } from 'lucide-react';
import { supabase } from './lib/supabase';
import shortImage from './short.png';

function App() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [size, setSize] = useState('M');
  const [deviceType, setDeviceType] = useState('apple_watch');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('preorders')
        .insert([
          {
            email,
            first_name: firstName,
            last_name: lastName,
            size,
            device_type: deviceType,
            status: 'pending'
          }
        ]);

      if (supabaseError) throw supabaseError;
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit pre-order. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
            style={{ filter: 'brightness(0.6)' }}
          >
            <source src="https://cdn.coverr.co/videos/coverr-person-working-out-in-the-gym-5244/1080p.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-fade-in">
            Smart Performance
            <span className="block text-4xl sm:text-5xl lg:text-6xl mt-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              AI-Powered Protection
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Experience the future of athletic wear with built-in AI injury prevention and performance tracking.
          </p>
          <ChevronDown 
            className="animate-bounce w-12 h-12 mx-auto mt-12 cursor-pointer"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src={shortImage}
                alt="Smart Sports Shorts"
                className="rounded-2xl shadow-2xl animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
            </div>
            
            <div className="space-y-8 scroll-reveal">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                AI Performance Shorts
                <span className="block text-2xl sm:text-3xl mt-2 text-gray-400">Smart Protection</span>
              </h2>
              
              <div className="space-y-6">
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

              <div className="pt-8">
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-order Section */}
      <section className="py-24 bg-white text-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Pre-order Now</h2>
            <p className="text-gray-600 text-lg">Be among the first to experience AI-powered athletic wear</p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 scroll-reveal">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Size
                  </label>
                  <select
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="device" className="block text-sm font-medium text-gray-700 mb-2">
                    Smart Device
                  </label>
                  <select
                    id="device"
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="apple_watch">Apple Watch</option>
                    <option value="samsung_watch">Samsung Watch</option>
                    <option value="whoop">Whoop</option>
                    <option value="fitbit">Fitbit</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-lg bg-black text-white font-medium flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{loading ? 'Processing...' : 'Pre-order Now'}</span>
                  <ShoppingBag size={20} />
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
                <p className="text-gray-600">
                  Your pre-order has been confirmed. We'll notify you when your AI-powered Performance Shorts are ready.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black opacity-50" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 scroll-reveal">
            Contact Us
          </h2>
          <div className="flex flex-col items-center space-y-4 mb-12 scroll-reveal">
            <div className="flex items-center space-x-2">
              <Mail className="text-purple-400" size={24} />
              <a href="mailto:Khaled@uni.minerva.edu" className="text-xl text-gray-300 hover:text-white transition-colors">
                Khaled@uni.minerva.edu
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="text-purple-400" size={24} />
              <a href="mailto:sadri.dridi@uni.minerva.edu" className="text-xl text-gray-300 hover:text-white transition-colors">
                sadri.dridi@uni.minerva.edu
              </a>
            </div>
          </div>
          <a
            href="mailto:Khaled@uni.minerva.edu"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-colors scroll-reveal"
          >
            Contact Us <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}

export default App;