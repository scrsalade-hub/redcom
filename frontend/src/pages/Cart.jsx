import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleQuantityChange = (itemId, size, newQty) => {
    setIsUpdating(true);
    updateQuantity(itemId, size, newQty);
    setTimeout(() => setIsUpdating(false), 300);
  };

  const handleRemoveItem = (itemId, size) => {
    setIsUpdating(true);
    updateQuantity(itemId, size, 0);
    setTimeout(() => setIsUpdating(false), 300);
  };

  if (cartData.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Explore our collection to find something you'll love.</p>
        <Link 
          to="/collection"
          className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Title text1={"YOUR"} text2={"CART"} />
          <p className="text-gray-400 text-sm mt-1">{cartData.length} items in your cart</p>
        </div>
        <Link 
          to="/collection"
          className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          Continue Shopping
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div
                key={index}
                className="group relative p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex gap-4 sm:gap-6">
                  {/* Product Image */}
                  <Link 
                    to={`/product/${item._id}`}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-white/5 flex-shrink-0"
                  >
                    <img
                      src={productData.image[0]}
                      alt={productData.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link 
                          to={`/product/${item._id}`}
                          className="text-base sm:text-lg font-medium text-white hover:text-gray-300 transition-colors line-clamp-2"
                        >
                          {productData.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">{productData.category}</p>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item._id, item.size)}
                        className="p-2 rounded-full bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 sm:opacity-100"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      {/* Size & Price */}
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1.5 rounded-lg bg-white/10 text-sm text-gray-300 border border-white/10">
                          Size: {item.size}
                        </span>
                        <span className="text-lg font-semibold text-white">
                          {currency}{productData.price}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex md:flex-row flex-col items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.size, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="w-8 text-center font-medium text-white">{item.quantity}</span>
                        
                        <button
                          onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary - Sticky Sidebar */}
        <div className="lg:w-[400px]">
          <div className="sticky top-24 space-y-6">
            {/* Summary Card */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-6">Order Summary</h3>
              <CartTotal />
            </div>

            {/* Promo Code */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <label className="text-sm text-gray-400 mb-2 block">Promo Code</label>
              <div className="flex md:flex-row flex-col md:gap-2 gap-4">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                />
                <button className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate("/place-order")}
              className="w-full py-4 rounded-xl bg-white text-black font-semibold text-sm uppercase tracking-wider hover:bg-gray-200 hover:shadow-lg hover:shadow-white/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 text-gray-500">
              <div className="flex items-center gap-2 text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure
              </div>
              <div className="flex items-center gap-2 text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Free Shipping
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Cart;