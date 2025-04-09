import React from 'react';
import { Mail, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Contact Us
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Get in Touch</h2>
            <p className="text-gray-300 mb-8">
              Have questions about our products or want to learn more? We'd love to hear from you.
              Reach out to our team directly using the contact information below.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-purple-900/30 p-3 rounded-lg mr-4">
                  <Mail className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Team</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="font-bold text-purple-300">Fernando Silva - CEO</h4>
                      <a href="mailto:fpmmsilva@gmail.com" className="text-gray-300 hover:text-purple-400 transition-colors">
                        fpmmsilva@gmail.com
                      </a>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="font-bold text-purple-300">Sadri Dridi - CTO</h4>
                      <a href="mailto:sadri.dridi@uni.minerva.edu" className="text-gray-300 hover:text-purple-400 transition-colors">
                        sadri.dridi@uni.minerva.edu
                      </a>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="font-bold text-purple-300">Khaled Ahmed - CPO</h4>
                      <a href="mailto:Khaled@uni.minerva.edu" className="text-gray-300 hover:text-purple-400 transition-colors">
                        Khaled@uni.minerva.edu
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-900/30 p-3 rounded-lg mr-4">
                  <MapPin className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Our Location</h3>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-300">2 Marina Boulevard<br />San Francisco, CA 94123</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-800/50 p-3 rounded-lg hover:bg-purple-900/30 transition-colors">
                    <Linkedin className="text-purple-400" size={20} />
                  </a>
                  <a href="#" className="bg-gray-800/50 p-3 rounded-lg hover:bg-purple-900/30 transition-colors">
                    <Twitter className="text-purple-400" size={20} />
                  </a>
                  <a href="#" className="bg-gray-800/50 p-3 rounded-lg hover:bg-purple-900/30 transition-colors">
                    <Instagram className="text-purple-400" size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 