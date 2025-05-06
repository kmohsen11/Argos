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
    <div className="bg-base text-textPrimary">
      {/* Header Section */}
      <section id="products-header" className="pt-24 pb-12 section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <h1 className={`font-bold mb-8 text-center transform transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Our Products</h1>
        </div>
      </section>
      
      {/* Products Grid Section */}
      <section id="products-grid" className="py-20 bg-surface section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <ProductCard 
              title="AI Performance Shorts"
              description="Our flagship product featuring AI-powered injury prevention and performance tracking. Built with advanced materials and embedded smart sensors."
              features={[
                "Real-time movement analysis",
                "Injury prevention alerts",
                "Performance metrics tracking",
                "Smart device integration"
              ]}
            />
            
            <ProductCard 
              title="Coming Soon"
              description="We're working on expanding our product line with more AI-powered athletic wear. Stay tuned for updates!"
              features={[]}
              comingSoon
            />
          </div>
        </div>
      </section>
      
      {/* Pre-order Section */}
      <section id="pre-order" className="py-16 bg-surface section-animation">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pb-16">
          <div className="card max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-textPrimary">Pre-order Now</h2>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-900/20 text-red-400 p-4 rounded-lg">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-textSecondary mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surfaceAlt text-textPrimary"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-textSecondary mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surfaceAlt text-textPrimary"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surfaceAlt text-textPrimary"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium text-textSecondary mb-2">
                      Size
                    </label>
                    <select
                      id="size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surfaceAlt text-textPrimary"
                      required
                    >
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="deviceType" className="block text-sm font-medium text-textSecondary mb-2">
                      Device Type
                    </label>
                    <select
                      id="deviceType"
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surfaceAlt text-textPrimary"
                      required
                    >
                      <option value="apple_watch">Apple Watch</option>
                      <option value="fitbit">Fitbit</option>
                      <option value="garmin">Garmin</option>
                      <option value="samsung">Samsung</option>
                      <option value="none">No Device</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {loading ? 'Processing...' : 'Pre-order Now'}
                    {!loading && <ShoppingBag size={20} />}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center bg-accent/10 text-accent rounded-full">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-textPrimary">Pre-order Submitted</h3>
                <p className="text-textSecondary mb-6">
                  Thank you for your pre-order! We'll contact you with more information soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                >
                  Submit Another Pre-order
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

function ProductCard({ 
  title, 
  description, 
  features, 
  comingSoon = false 
}: { 
  title: string; 
  description: string; 
  features: string[];
  comingSoon?: boolean;
}) {
  return (
    <div className="card flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-textPrimary">{title}</h2>
      <p className="text-textSecondary mb-6">{description}</p>
      
      {!comingSoon && features.length > 0 && (
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="text-accent mr-2">✓</span>
              <span className="text-textSecondary">{feature}</span>
            </li>
          ))}
        </ul>
      )}
      
      {comingSoon && (
        <div className="h-40 flex items-center justify-center bg-surfaceAlt rounded-lg mt-auto">
          <p className="text-textSecondary">More products coming soon</p>
        </div>
      )}
    </div>
  );
}

export default Products; 