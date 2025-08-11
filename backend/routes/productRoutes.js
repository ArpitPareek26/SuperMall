import express from "express";
import {
  addProduct,
  getProductsByShop,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", addProduct);

router.get("/", getAllProducts);

router.get("/shop/:shopId", getProductsByShop);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
