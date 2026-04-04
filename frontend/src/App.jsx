import React, { useState, useEffect, useContext } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Verify from './pages/Verify'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// IMPORT YOUR AUTH CONTEXT
import { ShopContext } from './context/ShopContext'

// SVG Icon Components (No external library needed)
const XIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

const UserPlusIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <line x1="20" y1="8" x2="20" y2="14"></line>
    <line x1="23" y1="11" x2="17" y2="11"></line>
  </svg>
)

const LogInIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
    <polyline points="10 17 15 12 10 7"></polyline>
    <line x1="15" y1="12" x2="3" y2="12"></line>
  </svg>
)

const ShoppingBagIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
)

// Auth Modal Component
const AuthModal = ({ isOpen, onClose, isDarkMode }) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with blur - clicking outside won't close it */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      />
      
      {/* Modal Container */}
      <div className={`
        relative w-full max-w-md transform transition-all duration-500 scale-100
        ${isDarkMode 
          ? 'bg-gray-900/95 border border-white/10' 
          : 'bg-white/95 border border-black/10'
        }
        rounded-2xl shadow-2xl overflow-hidden
      `}>

        {/* Modal Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className={`
            mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6
            ${isDarkMode 
              ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25' 
              : 'bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25'
            }
          `}>
            <ShoppingBagIcon size={28} className="text-white" />
          </div>

          {/* Title */}
          <h2 className={`
            text-2xl font-bold mb-3
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}>
            Login Required
          </h2>

          {/* Description */}
          <p className={`
            mb-8 leading-relaxed
            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
          `}>
            Please login or create an account to place orders and enjoy a personalized shopping experience.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Login Button */}
            <button
              onClick={() => {
                onClose()
                navigate('/login')
              }}
              className={`
                w-full py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2
                transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                ${isDarkMode 
                  ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-white/10' 
                  : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-black/20'
                }
              `}
            >
              <LogInIcon size={20} />
              Login to Your Account
            </button>

            {/* Sign Up Button */}
            <button
              onClick={() => {
                onClose()
                navigate('/login')
              }}
              className={`
                w-full py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2
                border-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                ${isDarkMode 
                  ? 'border-white/20 text-white hover:bg-white/10 hover:border-white/40' 
                  : 'border-gray-900/20 text-gray-900 hover:bg-gray-900/5 hover:border-gray-900/40'
                }
              `}
            >
              <UserPlusIcon size={20} />
              Create New Account
            </button>
          </div>

          {/* Skip Option - Only way to close without logging in */}
          <button
            onClick={onClose}
            className={`
              mt-6 text-sm font-medium transition-colors duration-200 underline underline-offset-4
              ${isDarkMode 
                ? 'text-gray-500 hover:text-gray-300' 
                : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            Continue browsing without login
          </button>
        </div>

        {/* Decorative Elements */}
        <div className={`
          absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none
          ${isDarkMode ? 'bg-violet-500' : 'bg-violet-400'}
        `} />
        <div className={`
          absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none
          ${isDarkMode ? 'bg-fuchsia-500' : 'bg-fuchsia-400'}
        `} />
      </div>
    </div>
  )
}

const App = () => {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)

  // GET AUTH STATE FROM YOUR CONTEXT - REPLACE WITH YOUR ACTUAL AUTH LOGIC
  const { token } = useContext(ShopContext) || {}
  const isLoggedIn = !!token // Convert to boolean - true if token exists

  // Check if current page is login page
  const isLoginPage = location.pathname === '/login'

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  // Show auth modal only if NOT logged in and NOT on login page
  useEffect(() => {
    // If logged in, ensure modal is always closed
    if (isLoggedIn) {
      setShowAuthModal(false)
      return
    }
    
    // Only show if not logged in and not on login page
    if (!isLoginPage) {
      const timer = setTimeout(() => {
        setShowAuthModal(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoggedIn, isLoginPage])

  // Show modal when trying to access protected routes while logged out
  useEffect(() => {
    const protectedRoutes = ['/place-order', '/orders', '/cart']
    if (protectedRoutes.includes(location.pathname) && !isLoggedIn && !isLoginPage) {
      setShowAuthModal(true)
    }
  }, [location.pathname, isLoggedIn, isLoginPage])

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ease-in-out ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
      }`}
      data-theme={isDarkMode ? 'dark' : 'light'}
    >
      {/* Global CSS Variables for Seamless Theming */}
      <style>{`
        :root {
          --glass-bg: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'};
          --glass-border: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          --glass-backdrop: ${isDarkMode ? 'blur(20px)' : 'blur(12px)'};
          --shadow-glow: ${isDarkMode ? '0 0 40px rgba(255,255,255,0.1)' : '0 0 40px rgba(0,0,0,0.1)'};
        }
        
        /* Smooth transitions for all theme changes */
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        
        /* Custom scrollbar for dark theme */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#0f172a' : '#f1f5f9'};
        }
        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#334155' : '#cbd5e1'};
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#475569' : '#94a3b8'};
        }
        
        /* Hide scrollbar for horizontal scroll areas but keep functionality */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Auth Modal - Only show when NOT logged in and NOT on login page */}
      {!isLoggedIn && !isLoginPage && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Toast Container with Dark Mode Styling */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
        toastClassName={`
          ${isDarkMode 
            ? '!bg-gray-800/90 !backdrop-blur-md !border !border-white/10' 
            : '!bg-white/90 !backdrop-blur-md !border !border-black/10'
          } !rounded-xl !shadow-2xl
        `}
      />

      {/* Glassmorphism Navigation Container - Hidden on login page */}
      {!isLoginPage && (
        <div 
          className={`
            fixed top-0 left-0 right-0 z-50 transition-all duration-500
            ${scrolled 
              ? 'py-2' 
              : 'py-4'
            }
          `}
        >
          {/* Backdrop blur layer */}
          <div 
            className={`
              absolute inset-0 transition-all duration-500
              ${scrolled 
                ? 'bg-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20' 
                : 'bg-transparent'
              }
            `}
          />
          
          {/* Navigation Content */}
          <div className="relative z-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <div className="flex items-center justify-between">
              <Navbar />
            </div>
            
            {/* SearchBar Integration */}
            <div className={`
              mt-4 transition-all duration-300 overflow-hidden
              ${scrolled ? 'opacity-0 h-0 mt-0' : 'opacity-100 h-auto'}
            `}>
              <SearchBar />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area - Centered for login page, normal for others */}
      <main className={`
        min-h-screen flex flex-col
        ${isLoginPage 
          ? 'items-center justify-center p-4' 
          : (scrolled ? 'pt-20 pb-12' : 'pt-32 pb-12')
        }
        transition-all duration-500
      `}>
        <div className={`${isLoginPage ? 'w-full max-w-md' : 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'}`}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/verify' element={<Verify />} />
          </Routes>
        </div>
      </main>

      {/* Footer with Glassmorphism - Hidden on login page */}
      {!isLoginPage && (
        <footer className={`
          relative mt-auto border-t transition-all duration-500
          ${isDarkMode 
            ? 'border-white/10 bg-gray-900/50 backdrop-blur-lg' 
            : 'border-black/10 bg-white/50 backdrop-blur-lg'
          }
        `}>
          <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-12">
            <Footer />
          </div>
          
          {/* Bottom Bar */}
          <div className={`
            border-t px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-4 text-center text-sm
            ${isDarkMode 
              ? 'border-white/10 text-gray-500' 
              : 'border-black/10 text-gray-600'
            }
          `}>
            <p>© 2025 Your Brand. Crafted with precision.</p>
          </div>
        </footer>
      )}
    </div>
  )
}

export default App