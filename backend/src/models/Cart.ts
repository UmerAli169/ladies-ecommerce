import mongoose, { Schema, Document, Types } from "mongoose";

interface ICartItem extends Document {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  name: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
}

const CartSchema: Schema<ICartItem> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

CartSchema.pre<ICartItem>("save", function (next) {
  this.total = this.price * this.quantity;
  next();
});

const Cart = mongoose.model<ICartItem>("Cart", CartSchema);
export default Cart;
