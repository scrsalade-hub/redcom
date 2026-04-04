import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "200+", label: "Products" },
    { number: "15+", label: "Years Experience" },
    { number: "99%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="pt-6 pb-20 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16 flex items-center justify-center gap-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
          Our Story
        </span>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-3xl transform rotate-3 group-hover:rotate-2 transition-transform" />
          <img
            className="w-full rounded-3xl relative z-10"
            src={assets.about_img}
            alt="About Us"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
            Crafting Quality Fashion for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Modern Individual
            </span>
          </h2>
          
          <p className="text-gray-400 leading-relaxed text-lg">
            Founded with a passion for exceptional quality and timeless design, we have 
            grown from a small boutique to a global fashion destination. Our commitment 
            to excellence drives every decision we make.
          </p>
          
          <p className="text-gray-400 leading-relaxed">
            We believe that great style should be accessible to everyone. That's why we 
            work tirelessly to source the finest materials and partner with skilled 
            artisans who share our vision for quality craftsmanship.
          </p>

          <div className="pt-4">
            <h3 className="text-xl font-semibold text-white mb-3">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To empower individuals through fashion that combines comfort, style, and 
              sustainability. We strive to create pieces that not only look good but 
              feel good to wear, while minimizing our environmental footprint.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-white/20 transition-all hover:-translate-y-1"
          >
            <p className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Quality Assurance",
              desc: "Every product undergoes rigorous quality checks to ensure it meets our premium standards. We never compromise on quality.",
              icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "Customer First",
              desc: "Your satisfaction is our priority. Our dedicated support team is available 24/7 to assist you with any questions or concerns.",
              icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "Exceptional Service",
              desc: "From browsing to delivery, we ensure a seamless shopping experience. Fast shipping, easy returns, and personalized support.",
              icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <span className="text-gray-400 text-sm uppercase tracking-wider">Meet the Team</span>
          <h2 className="text-3xl font-bold text-white mt-2">The People Behind Our Brand</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="text-center group">
              <div className="w-full aspect-square rounded-3xl bg-white/5 mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-white font-semibold">Team Member</h4>
              <p className="text-gray-500 text-sm">Position</p>
            </div>
          ))}
        </div>
      </div>

      <NewsLetterBox />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;