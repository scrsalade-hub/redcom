import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductData = async () => {
    setIsLoading(true);
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
    setTimeout(() => setIsLoading(false), 300);
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (isLoading || !productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-20 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <span className="hover:text-white cursor-pointer transition-colors">Home</span>
        <span>/</span>
        <span className="hover:text-white cursor-pointer transition-colors">{productData.category}</span>
        <span>/</span>
        <span className="text-white">{productData.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Product Images - Glassmorphism Gallery */}
        <div className="flex-1 lg:max-w-2xl">
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] no-scrollbar">
              {productData.image.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setImage(item)}
                  className={`
                    relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300
                    ${image === item 
                      ? 'border-white shadow-lg shadow-white/20' 
                      : 'border-white/10 hover:border-white/30'
                    }
                  `}
                >
                  <img
                    src={item}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {image === item && (
                    <div className="absolute inset-0 bg-white/10" />
                  )}
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src={image} 
                  alt={productData.name}
                />
              </div>
              
              {/* Zoom Hint */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                Hover to zoom
              </div>
            </div>
          </div>
        </div>

        {/* Product Info - Glass Card */}
        <div className="flex-1 lg:max-w-xl">
          <div className="sticky top-24 space-y-6">
            
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-gray-300 border border-white/10">
                  {productData.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-xs font-medium text-green-400 border border-green-500/20">
                  In Stock
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                {productData.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-5 h-5 text-gray-600 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-400">(122 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">{currency}{productData.price}</span>
              <span className="text-lg text-gray-500 line-through">{currency}{Math.round(productData.price * 1.2)}</span>
              <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-sm font-medium">20% OFF</span>
            </div>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed">
              {productData.description}
            </p>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Select Size</span>
                <button className="text-sm text-gray-400 hover:text-white transition-colors underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`
                      relative w-14 h-14 rounded-xl font-medium transition-all duration-300
                      ${item === size
                        ? 'bg-white text-black shadow-lg shadow-white/25 scale-105'
                        : 'bg-white/5 text-gray-300 border border-white/10 hover:border-white/30 hover:bg-white/10'
                      }
                    `}
                  >
                    {item}
                    {item === size && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => addToCart(productData._id, size)}
                disabled={!size}
                className={`
                  flex-1 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-300
                  ${size
                    ? 'bg-white text-black hover:bg-gray-200 hover:shadow-lg hover:shadow-white/25 transform hover:-translate-y-0.5'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {size ? 'Add to Cart' : 'Select a Size'}
              </button>
              
              <button className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              {[
                { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Authentic' },
                { icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', text: 'Cash on Delivery' },
                { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', text: '7-Day Returns' },
              ].map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.icon} />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-20">
        <div className="flex gap-8 border-b border-white/10">
          {['description', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                relative pb-4 text-sm font-medium uppercase tracking-wider transition-colors
                ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
              `}
            >
              {tab === 'description' ? 'Description' : `Reviews (${122})`}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
              )}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === 'description' ? (
            <div className="prose prose-invert max-w-none">
              <div className="grid md:grid-cols-2 gap-8 text-gray-400 leading-relaxed">
                <p className="text-base">
                  Experience unparalleled comfort and style with our premium collection. 
                  Crafted from the finest materials, this piece represents the perfect 
                  fusion of contemporary design and timeless elegance. Every stitch is 
                  meticulously placed to ensure durability while maintaining a sleek, 
                  modern silhouette.
                </p>
                <p className="text-base">
                  Whether you're dressing for a casual outing or a special occasion, 
                  this versatile garment adapts to your lifestyle. The breathable 
                  fabric ensures all-day comfort, while the tailored fit flatters 
                  every body type. Join thousands of satisfied customers who have 
                  made this their go-to choice.
                </p>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {[
                  { title: 'Premium Fabric', desc: '100% Organic Cotton' },
                  { title: 'Tailored Fit', desc: 'Modern Silhouette' },
                  { title: 'Easy Care', desc: 'Machine Washable' },
                  { title: 'Sustainable', desc: 'Eco-Friendly' },
                ].map((feature, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-500">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Review Cards */}
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium">
                        JD
                      </div>
                      <div>
                        <p className="text-white font-medium">John Doe</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Absolutely love this product! The quality is exceptional and the fit is perfect. 
                    Will definitely be ordering more in different colors.
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Product;