import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'Home', path: '/' },
      { label: 'About Us', path: '/about' },
      { label: 'Collection', path: '/collection' },
      { label: 'Contact', path: '/contact' },
    ],
    support: [
      { label: 'Delivery Info', path: '/delivery' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'FAQ', path: '/faq' },
    ],
    social: [
      { 
        label: 'Instagram', 
        icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
        url: '#'
      },
      { 
        label: 'Twitter', 
        icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
        url: '#'
      },
      { 
        label: 'Facebook', 
        icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
        url: '#'
      },
    ]
  };

  return (
    <footer className="w-full">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Brand Column */}
        <div className="lg:col-span-5 space-y-6">
          <Link to="/" className="inline-block group">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={assets.logo} 
                alt="Logo" 
                className="w-32 relative z-10 brightness-0 invert opacity-90" 
              />
            </div>
          </Link>
          
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            We are committed to providing our customers with the best shopping experience possible. Our team is dedicated to ensuring that you find the perfect products for your needs.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {footerLinks.social.map((social) => (
              <a
                key={social.label}
                href={social.url}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                aria-label={social.label}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div className="lg:col-span-2 lg:col-start-7">
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
          <ul className="space-y-3">
            {footerLinks.company.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-300 inline-flex items-center group"
                >
                  <span className="w-0 h-px bg-white mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
          <ul className="space-y-3">
            {footerLinks.support.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-300 inline-flex items-center group"
                >
                  <span className="w-0 h-px bg-white mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-3">
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Get In Touch</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">+1 (123) 456-7890</p>
                <p className="text-gray-600 text-xs mt-0.5">Mon-Fri 9am-6pm</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">example@gmail.com</p>
                <p className="text-gray-600 text-xs mt-0.5">24/7 Support</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">123 Fashion Street</p>
                <p className="text-gray-600 text-xs mt-0.5">New York, NY 10001</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 pt-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {currentYear} Forever. All rights reserved. Crafted with precision.
          </p>
          
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-white transition-colors">Terms</Link>
            <Link to="/cookies" className="text-gray-500 text-sm hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;