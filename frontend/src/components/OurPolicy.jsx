import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange",
      description: "Hassle-free exchange within 30 days of purchase. No questions asked.",
      color: "blue"
    },
    {
      icon: assets.quality_icon,
      title: "7-Day Returns",
      description: "Not satisfied? Return within 7 days for a full refund.",
      color: "green"
    },
    {
      icon: assets.support_img,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your queries.",
      color: "purple"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      green: "bg-green-500/10 text-green-400 border-green-500/20",
      purple: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {policies.map((policy, index) => (
          <div 
            key={index}
            className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Icon Container */}
            <div className={`w-16 h-16 rounded-2xl ${getColorClasses(policy.color)} flex items-center justify-center mb-6 border`}>
              <img 
                src={policy.icon} 
                className="w-8 h-8 object-contain filter brightness-0 invert opacity-80" 
                alt={policy.title} 
              />
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-200 transition-colors">
              {policy.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {policy.description}
            </p>

            {/* Hover Arrow */}
            <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* Decorative Gradient */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Secure Payments
        </div>
        <div className="w-px h-4 bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Quality Guaranteed
        </div>
        <div className="w-px h-4 bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Fast Delivery
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;