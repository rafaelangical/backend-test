import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    sku: { type: Number },
    name: { type: String },
    inventory: { type: Schema.Types.ObjectId, ref: "Inventory" },
  },
  {
    timestamps: true,
    _id: false,
  }
);

export default mongoose.model("Product", ProductSchema);
