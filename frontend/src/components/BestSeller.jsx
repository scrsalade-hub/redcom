import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
    setTimeout(() => setIsVisible(true), 200);
  }, [products]);

  return (
    <section className="py-20 relative">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Customer Favorites
          </span>
          <Title text1={"BEST"} text2={"SELLERS"} />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our most loved pieces, tried and tested by thousands of happy customers. Quality that speaks for itself.
          </p>
        </div>

        {/* Featured Product (First Item Larger) */}
        {bestSeller.length > 0 && (
          <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid md:grid-cols-2 gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group">
              <div className="relative aspect-square md:aspect-auto rounded-2xl overflow-hidden">
                <img 
                  src={bestSeller[0].image[0]} 
                  alt={bestSeller[0].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold">
                  #1 Best Seller
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">{bestSeller[0].name}</h3>
                <p className="text-gray-400 line-clamp-2">{bestSeller[0].description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-white">${bestSeller[0].price}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-500 ml-1">(2.4k reviews)</span>
                  </div>
                </div>
                <Link 
                  to={`/product/${bestSeller[0]._id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium w-fit hover:bg-gray-200 transition-colors"
                >
                  View Product
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Other Best Sellers Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {bestSeller.slice(1).map((item, index) => (
            <ProductItem 
              key={index} 
              id={item._id} 
              image={item.image} 
              name={item.name} 
              price={item.price}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link 
            to="/collection"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all"
          >
            Explore All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;