import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API = axios.create({
  baseURL: "https://supermall-backend-n450.onrender.com/api",
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryShops, setCategoryShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("supermall-user"));
    const storedShop = JSON.parse(localStorage.getItem("myshop-data"));
    const storedProducts = JSON.parse(localStorage.getItem("myshop-products"));

    if (storedUser) {
      setUser(storedUser);
      API.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedUser.token}`;

      if (!storedShop && storedUser.role === "seller") {
        API.get(`/shops/user/${storedUser._id}`)
          .then((res) => {
            setShop(res.data);
            localStorage.setItem("myshop-data", JSON.stringify(res.data));
          })
          .catch(() => setShop(null))
          .finally(() => setLoading(false));
      } else {
        setShop(storedShop);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    if (storedProducts) setProducts(storedProducts);
    fetchAllShops();
  }, []);

  const login = async ({ email, password }) => {
    try {
      const { data } = await API.post("/users/login", { email, password });

      setUser(data);
      localStorage.setItem("supermall-user", JSON.stringify(data));
      API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      if (data.role === "seller") {
        try {
          const shopRes = await API.get(`/shops/user/${data._id}`);
          setShop(shopRes.data);
          localStorage.setItem("myshop-data", JSON.stringify(shopRes.data));
        } catch (err) {
          if (err.response?.status === 404) {
            setShop(null);
            localStorage.removeItem("myshop-data");
          } else {
            throw new Error(
              err.response?.data?.message || "Failed to fetch shop"
            );
          }
        }
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const signup = async ({ fullName, email, password, role }) => {
    try {
      const { data } = await API.post("/users/signup", {
        fullName,
        email,
        password,
        role,
      });

      setUser(data);
      localStorage.setItem("supermall-user", JSON.stringify(data));
      API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      if (data.role === "seller") {
        try {
          const shopRes = await API.get(`/shops/user/${data._id}`);
          setShop(shopRes.data);
          localStorage.setItem("myshop-data", JSON.stringify(shopRes.data));
        } catch (err) {
          if (err.response?.status === 404) {
            setShop(null);
            localStorage.removeItem("myshop-data");
          } else {
            throw new Error(
              err.response?.data?.message || "Failed to fetch shop"
            );
          }
        }
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  // 🚪 Logout
  const logout = () => {
    setUser(null);
    setShop(null);
    setProducts([]);
    localStorage.removeItem("supermall-user");
    localStorage.removeItem("myshop-data");
    localStorage.removeItem("myshop-products");
    delete API.defaults.headers.common["Authorization"];
  };

  // 🏪 Create Shop
  const createShop = async (shopData) => {
    try {
      const { data } = await API.post("/shops", {
        ...shopData,
        user: user?._id,
      });
      setShop(data);
      localStorage.setItem("myshop-data", JSON.stringify(data));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Shop creation failed");
    }
  };

  // 🔍 Get Shop by ID
  const fetchShopById = async (shopId) => {
    try {
      const { data } = await API.get(`/shops/${shopId}`);
      setShop(data);
      localStorage.setItem("myshop-data", JSON.stringify(data));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Fetching shop failed");
    }
  };

  // ✏️ Update Shop
  const updateShop = async (shopId, updatedData) => {
    try {
      const { data } = await API.put(`/shops/${shopId}`, {
        ...updatedData,
        userId: user?._id,
      });
      setShop(data);
      localStorage.setItem("myshop-data", JSON.stringify(data));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Updating shop failed");
    }
  };

  // 🗑️ Delete Shop
  const deleteShop = async (shopId) => {
    await API.delete(`/shops/${shopId}`, {
      params: { userId: user?._id },
    });
    setShop(null);
    localStorage.removeItem("myshop-data");
  };

  // Fetch all shops
  const fetchAllShops = async () => {
    try {
      const res = await API.get("/shops");
      setShops(res.data);
    } catch (err) {
      console.error("Failed to fetch shops:", err);
    }
  };

  // Fetch shops by category
  const fetchShopsByCategory = async (category) => {
    try {
      const res = await API.get(`/shops/category/${category}`);
      setCategoryShops(res.data);
    } catch (err) {
      console.error("Failed to fetch category shops:", err);
      setCategoryShops([]);
    }
  };

  // Group shops by floor
  const getShopsGroupedByFloor = () => {
    const grouped = {};

    shops.forEach((shop) => {
      const floor = shop.floor || "Unknown";
      if (!grouped[floor]) {
        grouped[floor] = [];
      }
      grouped[floor].push(shop);
    });

    return grouped;
  };

  // ➕ Add Product (API)
  const addProduct = async (productData) => {
    try {
      const { data } = await API.post("/products", {
        ...productData,
        shopId: shop._id,
      });
      const updated = [...products, data];
      setProducts(updated);
      localStorage.setItem("myshop-products", JSON.stringify(updated));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to add product");
    }
  };

  // 🔍 Fetch Products of Current Shop
  const fetchProducts = async () => {
    try {
      const { data } = await API.get(`/products/shop/${shop._id}`);
      setProducts(data);
      localStorage.setItem("myshop-products", JSON.stringify(data));
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  };

  // 🔍 Fetch Product by ID
  const fetchProductById = async (productId) => {
    try {
      const response = await API.get(`/products/${productId}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      setSelectedProduct(null);
    }
  };

  // 🔍 Fetch Products by Shop ID
  const fetchProductsByShopId = async (shopId) => {
    try {
      const { data } = await API.get(`/products/shop/${shopId}`);
      setProducts(data);
      localStorage.setItem("myshop-products", JSON.stringify(data));
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Fetching products failed"
      );
    }
  };

  // get all products
  const getAllProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 📝 Update Product
  const updateProduct = async (productId, updatedData) => {
    try {
      const { data } = await API.put(`/products/${productId}`, updatedData);
      const updated = products.map((p) => (p._id === productId ? data : p));
      setProducts(updated);
      localStorage.setItem("myshop-products", JSON.stringify(updated));
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update product"
      );
    }
  };

  // ❌ Delete Product
  const deleteProduct = async (productId) => {
    try {
      await API.delete(`/products/${productId}`);
      const updated = products.filter((p) => p._id !== productId);
      setProducts(updated);
      localStorage.setItem("myshop-products", JSON.stringify(updated));
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        shop,
        setShop,
        createShop,
        fetchShopById,
        updateShop,
        deleteShop,
        products,
        setProducts,
        fetchProductsByShopId, //
        addProduct,
        updateProduct,
        deleteProduct,
        getAllProducts,
        shops,
        setShops,
        fetchAllShops,
        getShopsGroupedByFloor,
        selectedProduct,
        fetchProductById,
        fetchShopsByCategory,
        categoryShops,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
