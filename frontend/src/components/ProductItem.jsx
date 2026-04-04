import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Format price with commas
    const formattedPrice = price.toLocaleString();

    return (
        <Link 
            className='group block'
            to={`/product/${id}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-500">
                {/* Loading Skeleton */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-white/5 animate-pulse" />
                )}
                
                {/* Main Image */}
                <img 
                    src={image[0]} 
                    alt={name}
                    className={`
                        w-full h-full object-cover transition-all duration-700
                        ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                        ${isHovered ? 'scale-110' : 'scale-100'}
                    `}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Hover Overlay */}
                <div className={`
                    absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent
                    transition-opacity duration-300
                    ${isHovered ? 'opacity-100' : 'opacity-0'}
                `} />

                {/* Quick View Button - Appears on Hover */}
                <div className={`
                    absolute bottom-4 left-4 right-4
                    transform transition-all duration-300
                    ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}>
                    <div className="py-3 rounded-xl bg-white/90 backdrop-blur-sm text-black text-sm font-medium text-center">
                        Quick View
                    </div>
                </div>

                {/* Wishlist Button */}
                <button 
                    className={`
                        absolute top-4 right-4
                        w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm
                        flex items-center justify-center
                        text-white/70 hover:text-red-400 hover:bg-black/60
                        transition-all duration-300
                        ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                    `}
                    onClick={(e) => {
                        e.preventDefault();
                        // Add to wishlist logic
                    }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>

                {/* Sale Badge - Optional */}
                {price < 100 && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-500/90 text-white text-xs font-medium">
                        Sale
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="pt-4 px-4 space-y-1">
                {/* Product Name */}
                <h3 className={`
                    text-sm font-medium line-clamp-2 transition-colors duration-300
                    ${isHovered ? 'text-white' : 'text-gray-300'}
                `}>
                    {name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2 ">
                    <p className="text-base font-semibold text-white">
                        {currency}{formattedPrice}
                    </p>
                    {/* Original Price - if on sale */}
                    {price < 100 && (
                        <p className="text-sm text-gray-500 line-through">
                            {currency}{(price * 1.2).toFixed(0)}
                        </p>
                    )}
                </div>

                {/* Rating - Optional */}
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <svg 
                            key={i} 
                            className={`w-3 h-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-600'} fill-current`}
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(24)</span>
                </div>
            </div>

            <style>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </Link>
    )
}

export default ProductItem;