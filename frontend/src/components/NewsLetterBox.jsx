import React, { useState } from 'react';

const NewsLetterBox = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <section className="py-20">
        <div className="max-w-2xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Club!</h3>
          <p className="text-gray-400">Check your inbox for your 20% off discount code.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-12 lg:p-16">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-2xl mx-auto text-center space-y-6">
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-gray-300">
            Limited Time Offer
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">20% Off</span> Your First Order
          </h2>
          
          <p className="text-gray-400 text-lg">
            Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and style tips.
          </p>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="mt-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email address' 
                  className='w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all'
                  required 
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <button 
                type='submit' 
                disabled={isLoading}
                className='px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-white/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]'
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <>
                    Subscribe
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Trust Text */}
          <p className="text-xs text-gray-600 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsLetterBox;