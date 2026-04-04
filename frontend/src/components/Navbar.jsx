import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setVisible(false);
  }, [location]);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    setProfileOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/collection', label: 'Collection' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="flex items-center justify-between w-full">
      {/* Logo with Glow Effect */}
      <Link to="/" className="relative group">
        <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img 
          src={assets.logo} 
          alt="Logo" 
          className="w-32 sm:w-36 relative z-10 brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" 
        />
      </Link>

      {/* Desktop Navigation - Pill Style */}
      <nav className="hidden sm:flex items-center">
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${isActive 
                  ? 'text-black bg-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <span className="absolute inset-0 bg-white rounded-full animate-pulse-slow" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Search */}
        <button 
          onClick={() => setShowSearch(true)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors group"
          aria-label="Search"
        >
          <img 
            src={assets.search_icon} 
            className="w-5 h-5 invert opacity-70 group-hover:opacity-100 transition-opacity" 
            alt="Search" 
          />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => token ? setProfileOpen(!profileOpen) : navigate('/login')}
            className="p-2 rounded-full hover:bg-white/10 transition-colors group"
            aria-label="Profile"
          >
            <img 
              src={assets.profile_icon} 
              className="w-5 h-5 invert opacity-70 group-hover:opacity-100 transition-opacity" 
              alt="Profile" 
            />
          </button>

          {/* Glassmorphism Dropdown */}
          {token && profileOpen && (
            <div className="absolute right-0 top-full mt-3 w-48 py-2 rounded-2xl bg-gray-900/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 animate-fade-in">
              <div className="px-1">
                <button 
                  onClick={() => { navigate('/profile'); setProfileOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </button>
                <button 
                  onClick={() => { navigate('/orders'); setProfileOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Orders
                </button>
                <div className="mx-2 my-1 h-px bg-white/10" />
                <button 
                  onClick={logout}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative p-2 rounded-full hover:bg-white/10 transition-colors group">
          <img 
            src={assets.cart_icon} 
            className="w-5 h-5 invert opacity-70 group-hover:opacity-100 transition-opacity" 
            alt="Cart" 
          />
          {getCartCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg animate-bounce-slight">
              {getCartCount()}
            </span>
          )}
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setVisible(true)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors sm:hidden"
          aria-label="Menu"
        >
          <img 
            src={assets.menu_icon} 
            className="w-5 h-5 invert opacity-70" 
            alt="Menu" 
          />
        </button>
      </div>

      {/* Mobile Sidebar - Dark Glassmorphism */}
      <div 
        className={`
          fixed inset-0 z-50 sm:hidden transition-visibility duration-300
          ${visible ? 'visible' : 'invisible'}
        `}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setVisible(false)}
        />
        
        {/* Drawer */}
        <div 
          className={`
            absolute top-0 right-0 bottom-0 w-[80%] max-w-sm
            bg-gray-900/95 backdrop-blur-2xl border-l border-white/10
            transform transition-transform duration-300 ease-out
            ${visible ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-lg font-semibold text-white">Menu</span>
            <button 
              onClick={() => setVisible(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-6 space-y-2">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setVisible(false)}
                className={({ isActive }) => `
                  block py-4 px-4 rounded-xl text-lg font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-white text-black' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Profile Section */}
          {token && (
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-black/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">My Account</p>
                  <p className="text-gray-500 text-sm">View profile & orders</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes bounce-slight {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animate-bounce-slight {
          animation: bounce-slight 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Navbar;