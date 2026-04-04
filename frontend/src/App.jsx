import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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

const App = () => {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark for seamless experience

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

      {/* Glassmorphism Navigation Container */}
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
            
            {/* Theme Toggle Button */}
            {/* <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`
                ml-4 p-2 rounded-full transition-all duration-300
                ${isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-yellow-400' 
                  : 'bg-black/5 hover:bg-black/10 text-orange-500'
                }
              `}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button> */}
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

      {/* Main Content Area with Proper Spacing */}
      <main className={`
        min-h-screen pt-24 pb-12
        ${scrolled ? 'pt-20' : 'pt-32'}
        transition-all duration-500
      `}>
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
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

      {/* Footer with Glassmorphism */}
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
    </div>
  )
}

export default App