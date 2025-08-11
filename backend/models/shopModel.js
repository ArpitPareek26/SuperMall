import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    banner: {
      type: String,
      required: [true, "Shop banner image URL is required"],
    },
    name: {
      type: String,
      required: [true, "Shop name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Shop category is required"],
      trim: true,
    },
    floor: {
      type: String,
      required: [true, "Shop floor is required"],
      enum: [
        "Ground Floor",
        "1st Floor",
        "2nd Floor",
        "3rd Floor",
        "4th Floor",
        "5th Floor",
      ],
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
    },
    address: {
      type: String,
      required: [true, "Shop address is required"],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
