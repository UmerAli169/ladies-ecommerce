import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrder extends Document {
  user: Types.ObjectId;
  products: { product: Types.ObjectId; quantity: number }[];
  totalAmount: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Link to user
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
