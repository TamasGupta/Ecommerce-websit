import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-rose-50 to-pink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Discover Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-600">
                {' '}Natural Beauty
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Explore our curated collection of premium cosmetics and skincare products. 
              Enhance your natural beauty with our carefully selected, high-quality formulations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-3 bg-rose-500 text-white font-medium rounded-lg hover:bg-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 group"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-pink-200 rounded-3xl transform rotate-6"></div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3373725/pexels-photo-3373725.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Beauty Products"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-rose-100 rounded-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-24 h-24 bg-pink-100 rounded-full opacity-50"></div>
    </div>
  );
};

export default Hero;