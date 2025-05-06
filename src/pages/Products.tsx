import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, CheckCircle, Heart, Zap, Shield, Smartphone, AlertTriangle } from 'lucide-react';
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

// Toast notification component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 rounded-lg shadow-lg p-4 max-w-md flex items-center gap-3 ${
      type === 'success' ? 'bg-accent/20 text-accent' : 'bg-red-500/20 text-red-400'
    }`}>
      <div className="flex-shrink-0">
        {type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
      </div>
      <div>{message}</div>
      <button onClick={onClose} className="ml-auto text-textSecondary hover:text-textPrimary">
        &times;
      </button>
    </div>
  );
}

const Products = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [size, setSize] = useState('M');
  const [deviceType, setDeviceType] = useState('apple_watch');
  const [productType, setProductType] = useState('shorts');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
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

    // Mark page as loaded immediately and make ALL sections visible
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
      
      // Make all sections visible immediately
      document.querySelectorAll('section[id]').forEach(section => {
        section.classList.add('section-visible');
        // Apply inline styles to override any CSS
        (section as HTMLElement).style.opacity = '1';
        (section as HTMLElement).style.transform = 'translateY(0)';
      });
      
      // Check visibility after a short delay
      setTimeout(checkSectionsVisibility, 500);
    }, 10);

    // Add scroll event listener with throttled handler
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Function to send email notification
  const sendEmailNotification = async () => {
    try {
      const response = await fetch('/api/sendPreorderEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          productType,
          size,
          deviceType,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send email notification');
      }

      return true;
    } catch (err) {
      console.error('Email notification error:', err);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate email with basic regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // First, save to Supabase
      const { error: supabaseError } = await supabase
        .from('preorders')
        .insert([
          {
            email,
            first_name: firstName,
            last_name: lastName,
            size,
            device_type: deviceType,
            product_type: productType,
            status: 'pending'
          }
        ]);

      if (supabaseError) throw new Error(supabaseError.message);
      
      // Then, send email notification
      await sendEmailNotification();
      
      setSubmitted(true);
      
      // Show success toast
      setToast({
        message: "We've received your pre-order! We'll be in touch soon.",
        type: 'success'
      });
      
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit pre-order. Please try again.';
      setError(errorMessage);
      
      // Show error toast
      setToast({
        message: "Something went wrong. Please try again or email us directly.",
        type: 'error'
      });
      
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`text-textPrimary ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      {/* Header Section */}
      <section id="products-header" className="bg-base relative pt-24 pb-32 md:py-32 md:pb-40 section-visible">
        {/* Add a subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base to-surface"></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-3 rounded-xl bg-accent/10 border border-accent/20 text-accent font-medium mb-6">
              Advanced Technology
            </div>
            <h1 className="font-bold mb-8 text-center">
              AI-Powered Athletic Wear
              <span className="block text-accent mt-2">
                Performance & Protection
              </span>
            </h1>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto mb-8">
              Cutting-edge wearables that monitor, analyze, and improve your athletic performance
            </p>
          </div>
        </div>
        
        {/* Smooth section divider */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-surface z-0"></div>
      </section>
      
      {/* Featured Product: Shorts */}
      <section id="product-shorts" className="py-24 pt-16 relative bg-gradient-to-b from-surface via-surface to-surfaceAlt/90 section-visible -mt-8">
        {/* Smoother transition at top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-surface z-0"></div>
        
        {/* Background pattern for more visual interest */}
        <div className="absolute inset-0 opacity-30 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl"></div>
          <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-accent/20 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent font-medium">
                  Featured Product
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary">
                  AI Performance Shorts
                </h2>
                <p className="text-base/relaxed text-textSecondary">
                  Our flagship product featuring AI-powered injury prevention and performance tracking. Built with advanced materials and embedded smart sensors.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <FeatureItem 
                    icon={<Zap className="text-accent" size={20} />} 
                    text="Real-time movement analysis"
                  />
                  <FeatureItem 
                    icon={<Shield className="text-accent" size={20} />} 
                    text="Injury prevention alerts"
                  />
                  <FeatureItem 
                    icon={<Heart className="text-accent" size={20} />} 
                    text="Performance metrics tracking"
                  />
                  <FeatureItem 
                    icon={<Smartphone className="text-accent" size={20} />} 
                    text="Smart device integration"
                  />
                </div>
                
                <button 
                  onClick={() => {
                    setProductType('shorts');
                    document.getElementById('pre-order')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary inline-flex items-center gap-2 mt-4"
                >
                  <span>Pre-order Now</span>
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-card overflow-hidden transition-all duration-500 hover:shadow-xl bg-surfaceAlt">
                <div className="relative aspect-square md:aspect-[4/3] rounded-card overflow-hidden bg-surfaceAlt border border-gray-700 shadow-card">
                  <div className="relative h-full w-full flex items-center justify-center p-8">
                    <img 
                      src="/shorts.png" 
                      alt="AI Performance Shorts" 
                      className="w-full max-w-md mx-auto drop-shadow-lg hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Smooth section divider */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-surfaceAlt z-0"></div>
      </section>
      
      {/* Featured Product: Shirts */}
      <section id="product-shirts" className="py-24 pt-16 bg-gradient-to-b from-surfaceAlt via-surfaceAlt to-surface section-visible relative overflow-hidden -mt-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="relative rounded-card overflow-hidden transition-all duration-500 hover:shadow-xl bg-surface">
                <div className="relative aspect-square md:aspect-[4/3] rounded-card overflow-hidden bg-surface border border-gray-700 shadow-card">
                  <div className="relative h-full w-full flex items-center justify-center p-8">
                    <img 
                      src="/shirts.png" 
                      alt="AI Performance Shirts" 
                      className="w-full max-w-md mx-auto drop-shadow-lg hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-2">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent font-medium">
                  Coming Soon 
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary">
                  AI Performance Shirts
                </h2>
                <p className="text-base/relaxed text-textSecondary">
                  Our newest addition to the AI-powered lineup. Advanced fabric with integrated sensors monitors upper body movement, breathing patterns, and heart rate.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <FeatureItem 
                    icon={<Heart className="text-accent" size={20} />} 
                    text="Heart rate monitoring"
                  />
                  <FeatureItem 
                    icon={<Zap className="text-accent" size={20} />} 
                    text="Breathing pattern analysis"
                  />
                  <FeatureItem 
                    icon={<Shield className="text-accent" size={20} />} 
                    text="Form correction feedback"
                  />
                  <FeatureItem 
                    icon={<Smartphone className="text-accent" size={20} />} 
                    text="Seamless app integration"
                  />
                </div>
                
                <button 
                  onClick={() => {
                    setProductType('shirts');
                    document.getElementById('pre-order')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary inline-flex items-center gap-2 mt-4"
                >
                  <span>Pre-order Now</span>
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pre-order Section */}
      <section id="pre-order" className="py-24 bg-gradient-to-b from-surface to-base section-visible">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-3 rounded-xl bg-accent/10 border border-accent/20 text-accent font-medium mb-6">
              Limited Release
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-4">
              Pre-order Now
            </h2>
            <p className="text-xl text-textSecondary max-w-2xl mx-auto mb-12">
              Be among the first to experience our groundbreaking AI-powered athletic wear
            </p>
          </div>
          
          <div className="bg-surfaceAlt rounded-card p-8 border border-gray-700 shadow-lg max-w-3xl mx-auto">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-900/20 text-red-400 p-4 rounded-lg">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 p-4 bg-surface rounded-lg mb-6">
                  <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${productType === 'shorts' ? 'bg-accent/20 border border-accent/30' : 'bg-surfaceAlt hover:bg-surface/80'}`}
                    onClick={() => setProductType('shorts')}
                  >
                    <div className="font-medium text-center">AI Performance Shorts</div>
                  </div>
                  <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${productType === 'shirts' ? 'bg-accent/20 border border-accent/30' : 'bg-surfaceAlt hover:bg-surface/80'}`}
                    onClick={() => setProductType('shirts')}
                  >
                    <div className="font-medium text-center">AI Performance Shirts</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-textSecondary mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surface text-textPrimary"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-textSecondary mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surface text-textPrimary"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surface text-textPrimary"
                    placeholder="you@example.com"
                    required
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    title="Please enter a valid email address"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium text-textSecondary mb-2">
                      Size *
                    </label>
                    <select
                      id="size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surface text-textPrimary"
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
                      Device Type *
                    </label>
                    <select
                      id="deviceType"
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-surface text-textPrimary"
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
                    className="btn-primary w-full flex items-center justify-center gap-2 relative"
                  >
                    {loading ? (
                      <>
                        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]"></span>
                        <span className="ml-2">Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>{`Pre-order ${productType === 'shorts' ? 'Shorts' : 'Shirts'} Now`}</span>
                        <ShoppingBag size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center bg-accent/20 text-accent rounded-full">
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

// Simplified feature item component
function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 bg-surfaceAlt p-3 rounded-lg border border-gray-700 hover:border-accent/50 transition-colors">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="text-sm text-textSecondary">{text}</div>
    </div>
  );
}

export default Products; 