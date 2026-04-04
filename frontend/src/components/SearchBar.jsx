import React, { useContext, useEffect, useRef } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = React.useState(false);
    const inputRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    // Focus input when search opens
    useEffect(() => {
        if (showSearch && visible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showSearch, visible]);

    // Handle escape key to close
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setShowSearch(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [setShowSearch]);

    if (!showSearch || !visible) return null;

    return (
        <div className='py-6 animate-fade-in'>
            <div className="max-w-2xl mx-auto">
                <div className="relative flex items-center">
                    {/* Search Icon */}
                    <div className="absolute left-4 text-gray-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Input */}
                    <input
                        ref={inputRef}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder='Search products...'
                        className='w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-base'
                    />

                    {/* Clear Button */}
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-14 p-1 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}

                    {/* Close Button */}
                    <button
                        onClick={() => setShowSearch(false)}
                        className="absolute right-4 p-2 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                        aria-label="Close search"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Search Suggestions / Popular Searches */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-500">Popular:</span>
                    {['Summer Collection', 'T-Shirts', 'Dresses', 'Accessories'].map((term) => (
                        <button
                            key={term}
                            onClick={() => setSearch(term)}
                            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
                        >
                            {term}
                        </button>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default SearchBar;