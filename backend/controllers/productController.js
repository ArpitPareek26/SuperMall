import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const { shop, image, name, category, originalPrice, discountedPrice } =
      req.body;

    if (
      !shop ||
      !image ||
      !name ||
      !category ||
      !originalPrice ||
      !discountedPrice
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const product = new Product({
      shop,
      image,
      name,
      category,
      originalPrice,
      discountedPrice,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ message: "Server error while adding product" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

export const getProductsByShop = async (req, res) => {
  try {
    const products = await Product.find({ shop: req.params.shopId });
    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { image, name, category, originalPrice, discountedPrice } = req.body;

    product.image = image || product.image;
    product.name = name || product.name;
    product.category = category || product.category;
    product.originalPrice = originalPrice ?? product.originalPrice;
    product.discountedPrice = discountedPrice ?? product.discountedPrice;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error while updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};
