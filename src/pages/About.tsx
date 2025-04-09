import React from 'react';
import { Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center">About Argos</h1>
        
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-xl text-gray-300 mb-8 text-center">
            Argos is revolutionizing athletic wear with AI-powered technology designed to enhance performance and prevent injuries.
          </p>
          
          <div className="bg-gray-900 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              At Argos, we believe that every athlete deserves access to professional-grade performance technology. 
              Our mission is to democratize sports science by making advanced AI-powered athletic wear accessible to everyone.
            </p>
            <p className="text-gray-300">
              By combining cutting-edge AI with innovative textile engineering, we're creating the future of athletic wear 
              that not only enhances performance but also helps prevent injuries and prolong athletic careers.
            </p>
          </div>
          
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Target className="text-purple-400 mr-3" size={24} />
                <h3 className="text-xl font-bold">Innovation</h3>
              </div>
              <p className="text-gray-300">
                We constantly push the boundaries of what's possible in athletic wear, 
                exploring new technologies and materials to enhance performance.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Users className="text-purple-400 mr-3" size={24} />
                <h3 className="text-xl font-bold">Community</h3>
              </div>
              <p className="text-gray-300">
                We believe in building a community of athletes who support and inspire each other 
                to reach their full potential.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Award className="text-purple-400 mr-3" size={24} />
                <h3 className="text-xl font-bold">Excellence</h3>
              </div>
              <p className="text-gray-300">
                We're committed to delivering the highest quality products that meet the demanding 
                needs of athletes at all levels.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Heart className="text-purple-400 mr-3" size={24} />
                <h3 className="text-xl font-bold">Wellness</h3>
              </div>
              <p className="text-gray-300">
                We prioritize the long-term health and wellness of athletes, designing products 
                that help prevent injuries and promote sustainable training practices.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Argos was founded by a team of athletes, engineers, and AI researchers who share a passion 
              for improving athletic performance through technology. Our diverse team brings together 
              expertise in sports science, machine learning, textile engineering, and product design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 