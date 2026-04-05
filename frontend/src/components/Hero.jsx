import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center overflow-hidden rounded-3xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
       <div className="flex w-full h-full items-end justify-end">
         <video autoPlay muted loop
          src={assets.herovid} 
          className="h-full w-auto object-cover object-center opacity-60" 
          alt="Hero Background" 
        >
        <source src={assets.herovid} type="video/mp4" />
      </video>  
      </div>  
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 py-20">
        <div className="max-w-2xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-gray-300 tracking-wider uppercase">New Season 2025</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
              <span className="block">Discover</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Your Style
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-lg leading-relaxed">
              Explore our curated collection of premium fashion pieces designed for the modern individual.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/collection"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-white/25 hover:-translate-y-0.5"
            >
              Shop Now
              <svg 
                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <Link 
              to="/about"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              Our Story
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center md:gap-8 gap-4.5 pt-8 border-t border-white/18">
            <div>
              <p className="text-3xl font-bold text-white">50K+</p>
              <p className="text-sm text-gray-500">Happy Customers</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-3xl font-bold text-white">200+</p>
              <p className="text-sm text-gray-500">Premium Products</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-3xl font-bold text-white">4.9</p>
              <p className="text-sm text-gray-500">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;