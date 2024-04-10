import mongoose, { Schema } from "mongoose";

const InventorySchema = new Schema(
  {
    quantity: { type: Number },
    warehouses: [{ type: Schema.Types.ObjectId, ref: "Warehouse" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Inventory", InventorySchema);
