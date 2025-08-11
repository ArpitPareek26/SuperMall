import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Checkout = () => {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const { fetchProductById, selectedProduct } = useAuth();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    fetchProductById(productId).then(() => setLoadingProduct(false));
  }, [productId]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 1000);
  };

  if (loadingProduct) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-800 text-lg animate-pulse">
          Loading checkout...
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-lg shadow-md text-center max-w-md w-full border border-slate-500">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            🎉 Order Placed!
          </h2>
          <p className="text-gray-800">
            Thanks for buying <strong>{selectedProduct.name}</strong>.
          </p>
          <p className="text-sm text-gray-800 mt-2">Product ID: {productId}</p>
        </div>
      </div>
    );
  }

  const price =
    selectedProduct.discountedPrice || selectedProduct.originalPrice || 0;
  const shipping = 49;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 mt-14">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 grid md:grid-cols-2 gap-8 border border-slate-500">
        {/* Shipping & Payment Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Shipping & Payment Info
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "address", "phone", "email"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required
                className="w-full text-gray-800 border border-slate-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                onChange={handleChange}
              />
            ))}
            <h3 className="text-lg font-semibold text-gray-800 mt-6">
              Card Details
            </h3>
            <input
              name="cardNumber"
              type="text"
              placeholder="Card Number"
              required
              className="w-full text-gray-800 border border-slate-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              onChange={handleChange}
            />
            <div className="flex gap-4">
              <input
                name="expiry"
                type="text"
                placeholder="MM/YY"
                required
                className="w-full text-gray-800 border border-slate-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                onChange={handleChange}
              />
              <input
                name="cvv"
                type="text"
                placeholder="CVV"
                required
                className="w-full text-gray-800 border border-slate-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-500 hover:bg-slate-600 text-white py-3 rounded-lg text-lg font-semibold transition-all duration-300 cursor-pointer"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-slate-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 text-gray-800">
            <div className="flex justify-between">
              <span>Product:</span>
              <span className="font-medium text-gray-800">
                {selectedProduct.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Price:</span>
              <span>₹{price}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>₹{shipping}</span>
            </div>
            <div className="border-t border-slate-500 my-2"></div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>₹{price + shipping}</span>
            </div>
          </div>
          <div className="mt-6 text-sm text-gray-800">
            <p>
              By placing this order, you agree to our{" "}
              <span className="text-slate-500 underline cursor-pointer">
                terms & conditions
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
