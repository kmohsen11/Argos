import React, { useState } from 'react';
import { ShoppingBag, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Products = () => {
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

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center">Our Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">AI Performance Shorts</h2>
            <p className="text-gray-300 mb-6">
              Our flagship product featuring AI-powered injury prevention and performance tracking.
              Built with advanced materials and embedded smart sensors.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-purple-400 mr-2">✓</span>
                Real-time movement analysis
              </li>
              <li className="flex items-center">
                <span className="text-purple-400 mr-2">✓</span>
                Injury prevention alerts
              </li>
              <li className="flex items-center">
                <span className="text-purple-400 mr-2">✓</span>
                Performance metrics tracking
              </li>
              <li className="flex items-center">
                <span className="text-purple-400 mr-2">✓</span>
                Smart device integration
              </li>
            </ul>
  
          </div>
          
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-300 mb-6">
              We're working on expanding our product line with more AI-powered athletic wear.
              Stay tuned for updates!
            </p>
            <div className="h-40 flex items-center justify-center bg-gray-800 rounded-lg">
              <p className="text-gray-400">More products coming soon</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white text-black rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Pre-order Now</h2>
          
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
    </div>
  );
};

export default Products; 