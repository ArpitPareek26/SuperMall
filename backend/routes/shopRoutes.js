import express from "express";
import {
  createShop,
  updateShop,
  deleteShop,
  getAllShops,
  getShopById,
  getShopByUserId,
  getShopsByCategory,
} from "../controllers/shopController.js";

const router = express.Router();

router.post("/", createShop);

router.get("/", getAllShops);

router.get("/user/:userId", getShopByUserId);

router.get("/:id", getShopById);

router.get("/category/:name", getShopsByCategory);

router.put("/:id", updateShop);

router.delete("/:id", deleteShop);

export default router;
