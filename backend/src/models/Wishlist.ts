import mongoose, { Schema, Document, Types } from "mongoose";

interface IWishlist extends Document {
  userId: Types.ObjectId;
  products: Types.ObjectId[];
}

const WishlistSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const Wishlist = mongoose.model<IWishlist>("Wishlist", WishlistSchema);
export default Wishlist;
