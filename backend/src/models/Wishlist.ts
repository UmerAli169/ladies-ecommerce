import mongoose, { Schema, Document, Types } from "mongoose";

interface IWishlist extends Document {
  userId: Types.ObjectId;
  products: Types.ObjectId[];
}

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", 
    },
  ],
});

const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
export default Wishlist;
