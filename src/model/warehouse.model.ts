import mongoose, { Schema } from "mongoose";

const WarehouseSchema = new Schema(
  {
    locality: { type: String },
    type: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Warehouse", WarehouseSchema);
