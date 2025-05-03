import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

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

const Products = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [size, setSize] = useState('M');
  const [deviceType, setDeviceType] = useState('apple_watch');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // UI state
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('products-header');

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

  return (
    <div className="bg-gradient-to-b from-primary-50 to-white text-gray-900">
      {/* Header Section */}
      <section id="products-header" className="pt-24 pb-12 section-animation">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-100/50 to-white">
          <div className={`absolute inset-0 bg-[linear-gradient(rgba(29,78,216,0.01)_2px,transparent_2px),linear-gradient(90deg,rgba(29,78,216,0.01)_2px,transparent_2px)] bg-[size:40px_40px] opacity-0 ${isLoaded ? 'opacity-100' : ''} transition-opacity duration-1000 ease-in-out`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-8 text-center text-primary-700 transform transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Our Products</h1>
        </div>
      </section>
      
      {/* Products Grid Section */}
      <section id="products-grid" className="py-12 bg-gradient-to-b from-white to-primary-50 section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-primary-600">AI Performance Shorts</h2>
              <p className="text-gray-700 mb-6">
                Our flagship product featuring AI-powered injury prevention and performance tracking.
                Built with advanced materials and embedded smart sensors.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-accent-500 mr-2">✓</span>
                  <span className="text-gray-700">Real-time movement analysis</span>
                </li>
                <li className="flex items-center">
                  <span className="text-accent-500 mr-2">✓</span>
                  <span className="text-gray-700">Injury prevention alerts</span>
                </li>
                <li className="flex items-center">
                  <span className="text-accent-500 mr-2">✓</span>
                  <span className="text-gray-700">Performance metrics tracking</span>
                </li>
                <li className="flex items-center">
                  <span className="text-accent-500 mr-2">✓</span>
                  <span className="text-gray-700">Smart device integration</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-primary-600">Coming Soon</h2>
              <p className="text-gray-700 mb-6">
                We're working on expanding our product line with more AI-powered athletic wear.
                Stay tuned for updates!
              </p>
              <div className="h-40 flex items-center justify-center bg-gray-50 rounded-2xl">
                <p className="text-gray-500">More products coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pre-order Section */}
      <section id="pre-order" className="py-12 bg-white section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary-700">Pre-order Now</h2>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-500 p-4 rounded-2xl">
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
                      className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                  className="w-full py-4 px-6 rounded-2xl bg-primary-600 text-white font-medium flex items-center justify-center space-x-2 hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  <span>{loading ? 'Processing...' : 'Pre-order Now'}</span>
                  <ShoppingBag size={20} />
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <CheckCircle className="mx-auto h-16 w-16 text-accent-500" />
                <h3 className="text-2xl font-bold text-primary-700">Thank You!</h3>
                <p className="text-gray-700">
                  Your pre-order has been confirmed. We'll notify you when your AI-powered Performance Shorts are ready.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products; 