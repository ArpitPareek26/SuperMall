import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProductDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { fetchProductById, selectedProduct } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  const handleBuyNow = () => {
    navigate(`/checkout/${productId}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    fetchProductById(productId).then(() => {
      setIsAvailable(Math.random() < 0.7);
      setLoading(false);
    });
  }, [productId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading product details...
        </p>
      </div>
    );

  if (!selectedProduct)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">Product not found</p>
      </div>
    );

  const discount = Math.round(
    ((selectedProduct.originalPrice - selectedProduct.discountedPrice) /
      selectedProduct.originalPrice) *
      100
  );

  return (
    <div className="pt-24 px-4 sm:px-8 md:px-16 lg:px-32 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-xl p-6 sm:p-10 flex flex-col lg:flex-row gap-10 mb-8 border border-slate-500">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
          <img
            src={selectedProduct.image || "https://via.placeholder.com/400"}
            alt={selectedProduct.name}
            className="w-full h-[300px] sm:h-[400px] object-cover rounded-lg border border-slate-500"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between w-full lg:w-1/2 space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              {selectedProduct.name}
            </h1>

            <p className="text-sm text-gray-800 mb-2 capitalize">
              Category:{" "}
              <span className="font-medium">{selectedProduct.category}</span>
            </p>

            <p className="text-sm text-gray-800 mb-2">
              Seller:{" "}
              <span className="text-gray-800 font-semibold">
                {selectedProduct.sellerName || "SuperMall Verified Seller"}
              </span>
            </p>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-gray-800">
                ₹{selectedProduct.discountedPrice}
              </span>
              <span className="text-lg line-through text-gray-800">
                ₹{selectedProduct.originalPrice}
              </span>
              <span className="text-sm text-white bg-slate-500 px-2 py-1 rounded">
                {discount}% OFF
              </span>
            </div>

            {/* Availability */}
            <p className="mb-2 text-sm text-gray-800">
              Availability:{" "}
              {isAvailable ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-red-500 font-medium">Out of Stock</span>
              )}
            </p>

            {/* Description */}
            <p className="text-gray-800 leading-relaxed mb-4">
              {selectedProduct.description || "No description available."}
            </p>

            {/* Ratings */}
            <div className="mb-4">
              <div className="flex items-center text-gray-800 gap-1">
                ⭐ ⭐ ⭐ ⭐ ☆
                <span className="text-sm text-gray-800 ml-2">
                  (122 reviews)
                </span>
              </div>
              <p className="text-sm text-gray-800">Rated 4.2 out of 5</p>
            </div>

            {/* Terms */}
            <div className="text-xs text-gray-800 italic">
              * Terms and conditions apply. Product visuals are for illustration
              only. Pricing and availability subject to change.
            </div>
          </div>

          {/* Buy Button */}
          <button
            disabled={!isAvailable}
            className={`mt-4 w-full py-3 px-6 rounded-lg text-lg font-medium transition-all duration-300 ${
              isAvailable
                ? "bg-slate-500 hover:bg-slate-600 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleBuyNow}
          >
            {isAvailable ? "Buy Now" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
