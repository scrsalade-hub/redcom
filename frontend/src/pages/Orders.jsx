import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusColor = (status) => {
    const colors = {
      "Order Placed": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      "Packing": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Shipped": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "Out for delivery": "bg-orange-500/20 text-orange-400 border-orange-500/30",
      "Delivered": "bg-green-500/20 text-green-400 border-green-500/30",
    };
    return colors[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  if (loading) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (orderData.length === 0) {
    return (
      <div className="pt-20 pb-20 text-center">
        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No Orders Yet</h2>
        <p className="text-gray-400 mb-6">Start shopping to see your orders here</p>
        <button 
          onClick={() => window.location.href = '/collection'}
          className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-20 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Title text1={"MY"} text2={"ORDERS"} />
          <p className="text-gray-400 mt-1">{orderData.length} orders found</p>
        </div>
        <button 
          onClick={loadOrderData}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          title="Refresh orders"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {orderData.map((item, index) => (
          <div 
            key={index} 
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Product Image */}
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                <img 
                  src={item.image[0]} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1 truncate">
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        Size: {item.size}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-white font-medium">
                        {currency}{item.price}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(item.status)} whitespace-nowrap`}>
                    {item.status}
                  </span>
                </div>

                {/* Order Meta */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div>
                      <span className="text-gray-600">Order Date</span>
                      <p className="text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment</span>
                      <p className="text-gray-400">{item.paymentMethod}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Total</span>
                      <p className="text-white font-medium">{currency}{item.price * item.quantity}</p>
                    </div>
                  </div>

                  <button 
                    onClick={loadOrderData}
                    className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors border border-white/10 hover:border-white/20"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Orders;