import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleCategory = (e) => {
    const value = e.target.value
    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value))
    } else {
      setCategory(prev => [...prev, value])
    }
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    if (subCategory.includes(value)) {
      setSubCategory(prev => prev.filter(item => item !== value))
    } else {
      setSubCategory(prev => [...prev, value])
    }
  }

  // Update active filters count
  useEffect(() => {
    setActiveFiltersCount(category.length + subCategory.length)
  }, [category, subCategory])

  const clearAllFilters = () => {
    setCategory([])
    setSubCategory([])
    setSortType('relevant')
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }
  
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  // Filter chip component for modern UI
  const FilterChip = ({ label, active, onClick, count }) => (
    <button
      onClick={onClick}
      className={`
        px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out
        border backdrop-blur-md
        ${active 
          ? 'bg-white/90 text-black border-white/50 shadow-lg shadow-white/10 scale-105' 
          : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20'
        }
      `}
    >
      {label}
      {count > 0 && (
        <span className="ml-2 text-xs bg-black/20 px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      
      {/* Hero Section with Glassmorphism */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://kimi-web-img.moonshot.cn/img/img.freepik.com/1e4a134baf616442455b1d4495818ba7b37b3c1b.jpg" 
            alt="Fashion background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/80 to-gray-900" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-6 lg:px-12 pt-24 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium tracking-wider uppercase text-gray-300">
                  Spring Collection 2025
                </span>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                    Discover
                  </span>
                  <br />
                  <span className="text-gray-500 font-light italic">Your Style</span>
                </h1>
                <p className="text-gray-400 max-w-md text-lg leading-relaxed">
                  Curated pieces for the modern wardrobe. Filter by category, explore trends, find your perfect fit.
                </p>
              </div>

              {/* Stats / Trust Indicators */}
              <div className="flex gap-8 lg:pb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{products.length}+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">24h</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">4.9</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Filter Bar - Modern Horizontal Scroll Design */}
      <div className={`
        sticky top-0 z-40 transition-all duration-500 border-b border-white/5
        ${isScrolled ? 'bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-black/20' : 'bg-transparent'}
      `}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Filter Pills - Horizontal Scroll on Mobile */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar flex-1 pb-2 sm:pb-0">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:block">
                Filter by:
              </span>
              
              {/* Category Filters */}
              {['Men', 'Women', 'Kids'].map((cat) => (
                <FilterChip
                  key={cat}
                  label={cat}
                  active={category.includes(cat)}
                  onClick={() => toggleCategory({ target: { value: cat } })}
                />
              ))}

              <div className="w-px h-6 bg-white/10 mx-2 hidden sm:block" />

              {/* Type Filters */}
              {[
                { label: 'Tops', value: 'Topwear' },
                { label: 'Bottoms', value: 'Bottomwear' },
                { label: 'Winter', value: 'Winterwear' }
              ].map((type) => (
                <FilterChip
                  key={type.value}
                  label={type.label}
                  active={subCategory.includes(type.value)}
                  onClick={() => toggleSubCategory({ target: { value: type.value } })}
                />
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Active Filters Badge */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
                >
                  <span>Clear {activeFiltersCount}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Sort Dropdown - Glassmorphism Style */}
              <div className="relative group">
                <select 
                  onChange={(e) => setSortType(e.target.value)}
                  value={sortType}
                  className="appearance-none bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 pr-10 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer hover:bg-white/10 transition-all min-w-[140px]"
                >
                  <option value="relevant" className="bg-gray-900">Featured</option>
                  <option value="low-high" className="bg-gray-900">Price: Low to High</option>
                  <option value="high-low" className="bg-gray-900">Price: High to Low</option>
                </select>
                <img 
                  src={assets.dropdown_icon} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none rotate-180" 
                  alt="" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Bento Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 pb-24">
        
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-semibold text-white">All Products</h2>
            <span className="text-gray-500 text-sm">
              {filterProducts.length} items found
            </span>
          </div>
          
          {/* View Toggle (Visual Only - maintains functionality) */}
          <div className="hidden sm:flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/10">
            <button className="p-2 rounded bg-white/10 text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button className="p-2 rounded text-gray-500 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Products Grid - Asymmetric Bento Style */}
        {filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filterProducts.map((item, index) => (
              <div 
                key={item._id}
                className={`
                  group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 
                  hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-white/5
                  ${index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''}
                  ${index === 3 ? 'lg:col-span-2' : ''}
                `}
              >
                <ProductItem 
                  name={item.name} 
                  id={item._id} 
                  price={item.price} 
                  image={item.image}
                  className="h-full w-full"
                />
                
                {/* Hover Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State - Modern Design */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-gray-500 max-w-sm mb-6">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer - Modern Sheet Style */}
      <div className={`
        fixed inset-0 z-50 lg:hidden transition-visibility duration-300
        ${showFilter ? 'visible' : 'invisible'}
      `}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${showFilter ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setShowFilter(false)}
        />
        
        {/* Drawer */}
        <div className={`
          absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-3xl border-t border-white/10
          transform transition-transform duration-300 ease-out max-h-[85vh] overflow-auto
          ${showFilter ? 'translate-y-0' : 'translate-y-full'}
        `}>
          <div className="p-6 space-y-6">
            {/* Handle */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />
            
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Filters</h3>
              <button 
                onClick={() => setShowFilter(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Filter Content */}
            <div className="space-y-6">
              {/* Categories */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {['Men', 'Women', 'Kids'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory({ target: { value: cat } })}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium border transition-all
                        ${category.includes(cat)
                          ? 'bg-white text-black border-white'
                          : 'bg-white/5 text-gray-300 border-white/10'
                        }
                      `}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Types */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Type</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Topwear', value: 'Topwear' },
                    { label: 'Bottomwear', value: 'Bottomwear' },
                    { label: 'Winterwear', value: 'Winterwear' }
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => toggleSubCategory({ target: { value: type.value } })}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium border transition-all
                        ${subCategory.includes(type.value)
                          ? 'bg-white text-black border-white'
                          : 'bg-white/5 text-gray-300 border-white/10'
                        }
                      `}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setShowFilter(false)}
              className="w-full py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-200 transition-colors mt-6"
            >
              Show {filterProducts.length} Results
            </button>
          </div>
        </div>
      </div>

      {/* Floating Mobile Filter Button */}
      <button
        onClick={() => setShowFilter(true)}
        className="lg:hidden fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-white text-black shadow-2xl shadow-black/50 flex items-center justify-center transform hover:scale-110 transition-transform"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        {activeFiltersCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
            {activeFiltersCount}
          </span>
        )}
      </button>

    </div>
  )
}

export default Collection