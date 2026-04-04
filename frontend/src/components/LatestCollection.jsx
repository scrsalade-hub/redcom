import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 100);
  }, [products]);

  return (
    <section className="py-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
            Just Dropped
          </span>
          <Title text1={"LATEST"} text2={"ARRIVALS"} />
          <p className="text-gray-400 max-w-lg">
            Discover our newest additions, carefully curated to bring you the finest in contemporary fashion.
          </p>
        </div>
        
        <Link 
          to="/collection"
          className="group inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors"
        >
          View All Products
          <svg 
            className="w-4 h-4 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Products Grid with Animation */}
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {latestProducts.map((item, index) => (
          <div 
            key={index}
            className="group"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <ProductItem 
              id={item._id} 
              image={item.image} 
              name={item.name} 
              price={item.price}
            />
          </div>
        ))}
      </div>

      {/* View All Button Mobile */}
      <div className="mt-12 text-center sm:hidden">
        <Link 
          to="/collection"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
        >
          View All Products
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default LatestCollection;