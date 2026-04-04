import React, { useContext, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    navigate,
    backendUrl,
    token,
    products,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            toast.success("Order Placed Successfully!");
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case "stripe": {
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log("Error creating order:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all";

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col lg:flex-row gap-8 lg:gap-12 pt-6 pb-20 min-h-[80vh]"
    >
      {/* Left Side - Delivery Information */}
      <div className="flex-1 max-w-2xl">
        <div className="mb-8">
          <Title text1={"Delivery"} text2={"Information"} />
          <p className="text-gray-400 mt-2">Please enter your shipping details</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="First Name"
              className={inputClasses}
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last Name"
              className={inputClasses}
            />
          </div>

          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Email Address"
            className={inputClasses}
          />

          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            type="text"
            placeholder="Street Address"
            className={inputClasses}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              type="text"
              placeholder="City"
              className={inputClasses}
            />
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              type="text"
              placeholder="State/Province"
              className={inputClasses}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              type="text"
              placeholder="Zip Code"
              className={inputClasses}
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              type="text"
              placeholder="Country"
              className={inputClasses}
            />
          </div>

          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            type="tel"
            placeholder="Phone Number"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Right Side - Order Summary & Payment */}
      <div className="lg:w-[450px]">
        <div className="sticky top-24 space-y-6">
          {/* Cart Total */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <CartTotal />
          </div>

          {/* Payment Method */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <Title text1={"Payment"} text2={"Method"} />
            
            <div className="space-y-3 mt-4">
              {/* Stripe */}
              <label
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  method === "stripe"
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  method === "stripe" ? "border-white" : "border-gray-500"
                }`}>
                  {method === "stripe" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
                <img src={assets.stripe_logo} className="h-6 invert opacity-80" alt="Stripe" />
              </label>

              {/* Razorpay */}
              <label
                onClick={() => setMethod("razorpay")}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  method === "razorpay"
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  method === "razorpay" ? "border-white" : "border-gray-500"
                }`}>
                  {method === "razorpay" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
                <img src={assets.razorpay_logo} className="h-6 invert opacity-80" alt="Razorpay" />
              </label>

              {/* Cash on Delivery */}
              <label
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  method === "cod"
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  method === "cod" ? "border-white" : "border-gray-500"
                }`}>
                  {method === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">Cash on Delivery</span>
                </div>
              </label>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full mt-6 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-white/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Place Order
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure SSL Encryption
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;