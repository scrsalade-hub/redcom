import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">All Products</h1>
          <p className="text-gray-400">{list.length} products in your store</p>
        </div>
        <button
          onClick={fetchList}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[80px_2fr_1fr_1fr_100px] gap-4 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-400">
        <span>Image</span>
        <span>Product Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {/* Product List */}
      <div className="mt-4 space-y-3">
        {list.map((item, index) => (
          <div
            key={index}
            className="group grid grid-cols-[80px_1fr_auto] md:grid-cols-[80px_2fr_1fr_1fr_100px] gap-4 items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src={item.image[0]}
                alt={item.name}
              />
            </div>

            <div className="min-w-0">
              <p className="text-white font-medium truncate">{item.name}</p>
              <p className="text-sm text-gray-500 md:hidden">{item.category}</p>
            </div>

            <p className="text-gray-400 hidden md:block">{item.category}</p>

            <p className="text-white font-medium hidden md:block">
              {currency}{item.price}
            </p>

            <div className="flex items-center justify-end md:justify-center gap-2">
              <span className="md:hidden text-white font-medium">
                {currency}{item.price}
              </span>
              <button
                onClick={() => removeProduct(item._id)}
                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400">No products found</p>
        </div>
      )}

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

export default List;