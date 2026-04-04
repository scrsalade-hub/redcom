import React, { useState } from "react";
import { assets } from '../assets/admin_assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [images, setImages] = useState([false, false, false, false]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setImage = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName("");
        setDescription("");
        setImages([false, false, false, false]);
        setPrice("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all";
  const labelClasses = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Add New Product</h1>
        <p className="text-gray-400">Create a new product listing for your store</p>
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-8 max-w-4xl">
        {/* Image Upload */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <p className={labelClasses}>Product Images</p>
          <div className="flex flex-wrap gap-4">
            {[0, 1, 2, 3].map((idx) => (
              <label
                key={idx}
                htmlFor={`image${idx + 1}`}
                className={`
                  relative w-24 h-24 rounded-xl overflow-hidden cursor-pointer
                  border-2 border-dashed transition-all duration-300
                  ${images[idx] ? "border-white/30" : "border-white/10 hover:border-white/20"}
                `}
              >
                <img
                  className="w-full h-full object-cover"
                  src={images[idx] ? URL.createObjectURL(images[idx]) : assets.upload_area}
                  alt=""
                />
                {images[idx] && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <input
                  onChange={(e) => setImage(idx, e.target.files[0])}
                  type="file"
                  id={`image${idx + 1}`}
                  accept="image/*"
                  hidden
                />
              </label>
            ))}
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Product Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={inputClasses}
              type="text"
              placeholder="Premium Cotton T-Shirt"
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Price ($)</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className={inputClasses}
              type="number"
              placeholder="29.99"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={`${inputClasses} min-h-[120px] resize-none`}
            placeholder="Describe your product..."
            required
          />
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className={inputClasses}
            >
              <option value="Men" className="bg-gray-900">Men</option>
              <option value="Women" className="bg-gray-900">Women</option>
              <option value="Kids" className="bg-gray-900">Kids</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Sub Category</label>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              className={inputClasses}
            >
              <option value="Topwear" className="bg-gray-900">Topwear</option>
              <option value="Bottomwear" className="bg-gray-900">Bottomwear</option>
              <option value="Winterwear" className="bg-gray-900">Winterwear</option>
            </select>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className={labelClasses}>Available Sizes</label>
          <div className="flex flex-wrap gap-3">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`
                  w-14 h-14 rounded-xl font-medium transition-all duration-300
                  ${sizes.includes(size)
                    ? "bg-white text-black shadow-lg shadow-white/25"
                    : "bg-white/5 text-gray-400 border border-white/10 hover:border-white/20"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller Toggle */}
        <label className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-white/20 transition-colors">
          <div className="relative">
            <input
              type="checkbox"
              checked={bestseller}
              onChange={() => setBestseller((prev) => !prev)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500/50"></div>
          </div>
          <div>
            <span className="text-white font-medium">Add to Bestsellers</span>
            <p className="text-sm text-gray-500">Feature this product on the homepage</p>
          </div>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-12 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            "Add Product"
          )}
        </button>
      </form>

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

export default Add;