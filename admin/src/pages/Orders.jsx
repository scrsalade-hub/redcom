import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from '../assets/admin_assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
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

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      "Order Placed": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Packing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "Out for delivery": "bg-orange-500/20 text-orange-400 border-orange-500/30",
      Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
    };
    return colors[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  useEffect(() => {
    if (token) fetchAllOrders();
  }, [token]);

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
          <h1 className="text-3xl font-bold text-white mb-2">Orders</h1>
          <p className="text-gray-400">{orders.length} orders to manage</p>
        </div>
        <button
          onClick={fetchAllOrders}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="grid lg:grid-cols-[auto_1fr_auto_auto] gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <img className="w-6 h-6 opacity-70" src={assets.parcel_icon} alt="" />
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-300 border border-white/10"
                    >
                      {item.name} × {item.quantity} <span className="text-gray-500">({item.size})</span>
                    </span>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-gray-500 mt-1">
                      {order.address.street}, {order.address.city}
                    </p>
                    <p className="text-gray-500">
                      {order.address.state}, {order.address.country} {order.address.zipcode}
                    </p>
                    <p className="text-gray-400 mt-1">{order.address.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">
                      Method: <span className="text-white">{order.paymentMethod}</span>
                    </p>
                    <p className="text-gray-400">
                      Payment:{" "}
                      <span className={order.payment ? "text-green-400" : "text-yellow-400"}>
                        {order.payment ? "Done" : "Pending"}
                      </span>
                    </p>
                    <p className="text-gray-400">
                      Date: <span className="text-white">{new Date(order.date).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-white">
                  {currency}{order.amount}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </p>
              </div>

              <div className="min-w-[180px]">
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium cursor-pointer focus:outline-none ${getStatusColor(order.status)}`}
                >
                  <option value="Order Placed" className="bg-gray-900">Order Placed</option>
                  <option value="Packing" className="bg-gray-900">Packing</option>
                  <option value="Shipped" className="bg-gray-900">Shipped</option>
                  <option value="Out for delivery" className="bg-gray-900">Out for delivery</option>
                  <option value="Delivered" className="bg-gray-900">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400">No orders yet</p>
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

export default Orders;