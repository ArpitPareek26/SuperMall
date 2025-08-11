import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../AuthContext";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const MyShop = () => {
  const { pathname } = useLocation();
  const productFormRef = useRef(null);
  const {
    user,
    shop,
    createShop,
    updateShop,
    deleteShop,
    fetchShopById,
    products,
    fetchProductsByShopId,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useAuth();

  const categories = [
    "Clothing",
    "Footwear",
    "Electronics",
    "Beauty",
    "Grocery",
    "Handicrafts",
    "Toys",
    "Furniture",
    "Sports",
  ];
  const floors = [
    "Ground Floor",
    "1st Floor",
    "2nd Floor",
    "3rd Floor",
    "4th Floor",
    "5th Floor",
  ];

  const [shopForm, setShopForm] = useState({
    banner: "",
    name: "",
    category: "",
    floor: "",
    contact: "",
    address: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [productForm, setProductForm] = useState({
    image: "",
    name: "",
    category: "",
    originalPrice: "",
    discountedPrice: "",
  });
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (shop) {
      setShopForm({
        banner: shop.banner || "",
        name: shop.name || "",
        category: shop.category || "",
        floor: shop.floor || "",
        contact: shop.contact || "",
        address: shop.address || "",
      });
      fetchProductsByShopId(shop._id);
    }
  }, [shop]);

  const handleShopChange = (e) => {
    setShopForm({ ...shopForm, [e.target.name]: e.target.value });
  };

  const handleCreateShop = async (e) => {
    e.preventDefault();
    const { banner, name, category, floor, contact, address } = shopForm;
    if (!banner || !name || !category || !floor || !contact || !address) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await createShop({ ...shopForm, userId: user._id });
      toast.success("Shop created successfully");
    } catch (error) {
      toast.error("Failed to create shop" || error.message);
    }
  };

  const handleUpdateShop = async (e) => {
    e.preventDefault();
    try {
      await updateShop(shop._id, shopForm);
      toast.success("Shop updated successfully!");
      setEditMode(false);
    } catch (error) {
      toast.error("Failed to update shop" || error.message);
    }
  };

  const handleDeleteShop = async () => {
    try {
      await deleteShop(shop._id);
      toast.success("Shop deleted successfully!");
      setShopForm({
        banner: "",
        name: "",
        category: "",
        floor: "",
        contact: "",
        address: "",
      });
    } catch (error) {
      toast.error("Failed to delete shop" || error.message);
    }
  };

  const handleProductChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();

    if (
      !productForm.image ||
      !productForm.name ||
      !productForm.category ||
      !productForm.originalPrice ||
      !productForm.discountedPrice
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (editProductId) {
        await updateProduct(editProductId, {
          ...productForm,
          shop: shop._id,
        });
        toast.success("Product updated successfully!");
      } else {
        await addProduct({ ...productForm, shop: shop._id });
        toast.success("Product added successfully!");
      }

      setProductForm({
        image: "",
        name: "",
        category: "",
        originalPrice: "",
        discountedPrice: "",
      });
      setEditProductId(null);
      fetchProductsByShopId(shop._id);
    } catch (err) {
      toast.error("Failed to add product" || err.message);
    }
  };

  const handleEditProduct = (product) => {
    setProductForm({
      image: product.image,
      name: product.name,
      category: product.category,
      originalPrice: product.originalPrice,
      discountedPrice: product.discountedPrice,
    });
    setEditProductId(product._id);
    setTimeout(() => {
      productFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully!");
      fetchProductsByShopId(shop._id);
    } catch (error) {
      toast.error("Failed to delete product" || error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold text-slate-500 mb-6">
        Welcome Seller 👋 {user?.name}
      </h1>

      {/* CREATE OR UPDATE SHOP */}
      {!shop || editMode ? (
        <form
          onSubmit={shop ? handleUpdateShop : handleCreateShop}
          className="bg-white p-6 rounded-lg shadow space-y-4 border border-slate-500"
        >
          <h2 className="text-xl font-semibold text-slate-500 mb-2">
            {shop ? "Update Your Shop" : "Create Your Shop"}
          </h2>
          <input
            type="text"
            name="banner"
            value={shopForm.banner}
            onChange={handleShopChange}
            placeholder="Shop Banner Image URL In 16:9 Aspect Ratio"
            required
            className="w-full px-4 py-2 border border-slate-500 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500 "
          />
          <input
            type="text"
            name="name"
            value={shopForm.name}
            onChange={handleShopChange}
            placeholder="Shop Name"
            required
            className="w-full px-4 py-2 border border-slate-500 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <select
            name="category"
            value={shopForm.category}
            onChange={handleShopChange}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="">Select Shop Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            name="floor"
            value={shopForm.floor}
            onChange={handleShopChange}
            required
            className="w-full px-4 py-2 border border-slate-500 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="">Select Floor</option>
            {floors.map((f, idx) => (
              <option key={idx} value={f}>
                {f}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="contact"
            value={shopForm.contact}
            onChange={handleShopChange}
            placeholder="Contact Number"
            required
            className="w-full px-4 py-2 border border-slate-500 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <textarea
            name="address"
            value={shopForm.address}
            onChange={handleShopChange}
            placeholder="Shop Address"
            rows="3"
            required
            className="w-full px-4 py-2 border border-slate-500 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <div className="flex justify-between">
            <button className="bg-slate-500 text-white px-6 py-2 rounded hover:bg-slate-600 cursor-pointer">
              {shop ? "Update Shop" : "Create Shop"}
            </button>
            {shop && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setShopForm({
                    banner: shop.banner,
                    name: shop.name,
                    category: shop.category,
                    floor: shop.floor,
                    contact: shop.contact,
                    address: shop.address,
                  });
                }}
                className="text-red-500 font-medium cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <>
          {/* SHOP INFO */}
          <div className="bg-white p-6 rounded-lg shadow mb-6 border border-slate-500">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-slate-500">
                {shop.name}
              </h2>
            </div>
            <img
              src={shop.banner}
              alt="Shop Banner"
              className="w-full h-auto object-cover rounded my-4"
            />
            <p className="text-gray-800">
              <strong>Category:</strong> {shop.category}
            </p>
            <p className="text-gray-800">
              <strong>Floor:</strong> {shop.floor}
            </p>
            <p className="text-gray-800">
              <strong>Contact:</strong> {shop.contact}
            </p>
            <p className="text-gray-800">
              <strong>Address:</strong> {shop.address}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setEditMode(true)}
                className="bg-slate-500 text-white px-3 py-1 rounded hover:bg-slate-600 text-sm cursor-pointer"
              >
                Edit Shop
              </button>
              <button
                onClick={handleDeleteShop}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm cursor-pointer"
              >
                Delete Shop
              </button>
            </div>
          </div>

          {/* PRODUCT FORM */}
          <form
            ref={productFormRef}
            onSubmit={handleAddOrUpdateProduct}
            className="bg-white p-6 rounded-lg shadow space-y-4 border border-slate-500"
          >
            <h3 className="text-lg font-semibold text-slate-500">
              {editProductId ? "Edit Product" : "Add New Product"}
            </h3>
            <input
              type="text"
              name="image"
              value={productForm.image}
              onChange={handleProductChange}
              placeholder="Product Image URL"
              required
              className="w-full px-4 py-2 border border-slate-500 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <input
              type="text"
              name="name"
              value={productForm.name}
              onChange={handleProductChange}
              placeholder="Product Name"
              required
              className="w-full px-4 py-2 border border-slate-500 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <select
              name="category"
              value={productForm.category}
              onChange={handleProductChange}
              required
              className="w-full px-4 py-2 border border-slate-500 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="">Select Product Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="originalPrice"
              value={productForm.originalPrice}
              onChange={handleProductChange}
              placeholder="Original Price"
              required
              className="w-full px-4 py-2 border border-slate-500 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <input
              type="number"
              name="discountedPrice"
              value={productForm.discountedPrice}
              onChange={handleProductChange}
              placeholder="Discounted Price"
              required
              className="w-full px-4 py-2 border border-slate-500 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <button className="bg-slate-500 text-white px-6 py-2 rounded hover:bg-slate-600 cursor-pointer">
              {editProductId ? "Update Product" : "Add Product"}
            </button>
          </form>

          {/* PRODUCT LIST */}
          {products?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-slate-500 mb-4">
                Your Products
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded shadow p-4 border border-slate-500"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-40 w-full object-cover rounded mb-3"
                    />
                    <h4 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-800">
                      Category: {product.category}
                    </p>
                    <p className="text-sm text-red-500">
                      Original Price: ₹{product.originalPrice}
                    </p>
                    <p className="text-sm text-green-600">
                      Discounted Price: ₹{product.discountedPrice}
                    </p>
                    <div className="flex gap-2 mt-1.5">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-sm px-3 py-1 bg-slate-500 text-white rounded hover:bg-slate-600 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyShop;
