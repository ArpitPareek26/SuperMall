import Shop from "../models/shopModel.js";

export const createShop = async (req, res) => {
  try {
    const { banner, name, category, floor, contact, address, userId } =
      req.body;

    if (
      !banner ||
      !name ||
      !category ||
      !floor ||
      !contact ||
      !address ||
      !userId
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const shop = new Shop({
      banner,
      name,
      category,
      floor,
      contact,
      address,
      user: userId,
    });

    const createdShop = await shop.save();
    res.status(201).json(createdShop);
  } catch (error) {
    console.error("Create shop error:", error);
    res.status(500).json({ message: "Server error while creating shop" });
  }
};

export const getShopsByCategory = async (req, res) => {
  try {
    const category = req.params.name;

    const shops = await Shop.find({
      category: { $regex: new RegExp(category, "i") },
    });

    res.status(200).json(shops);
  } catch (error) {
    console.error("Error fetching shops by category:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching shops by category" });
  }
};

export const updateShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    const { userId } = req.body;

    if (!shop) return res.status(404).json({ message: "Shop not found" });

    if (!userId || shop.user.toString() !== userId.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this shop" });
    }

    const updates = [
      "banner",
      "name",
      "category",
      "floor",
      "contact",
      "address",
    ];
    updates.forEach((field) => {
      if (req.body[field] !== undefined) {
        shop[field] = req.body[field];
      }
    });

    const updatedShop = await shop.save();
    res.status(200).json(updatedShop);
  } catch (error) {
    console.error("Update shop error:", error);
    res.status(500).json({ message: "Server error while updating shop" });
  }
};

export const deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const { userId } = req.query;

    if (!userId || shop.user.toString() !== userId.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this shop" });
    }

    await Shop.findByIdAndDelete(req.params.id);
    res.json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error("Error deleting shop:", error);
    res.status(500).json({ message: "Failed to delete shop" });
  }
};

export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate("user", "name email");
    res.status(200).json(shops);
  } catch (error) {
    console.error("Get all shops error:", error);
    res.status(500).json({ message: "Server error while fetching shops" });
  }
};

export const getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!shop) return res.status(404).json({ message: "Shop not found" });

    res.status(200).json(shop);
  } catch (error) {
    console.error("Get shop by ID error:", error);
    res.status(500).json({ message: "Server error while fetching shop" });
  }
};

export const getShopByUserId = async (req, res) => {
  try {
    const shop = await Shop.findOne({ user: req.params.userId }).populate(
      "user",
      "name email"
    );

    if (!shop) return res.status(404).json({ message: "Shop not found" });

    res.status(200).json(shop);
  } catch (error) {
    console.error("Get shop by userId error:", error);
    res.status(500).json({ message: "Server error while fetching shop" });
  }
};
