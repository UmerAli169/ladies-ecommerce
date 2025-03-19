import mongoose, { Schema, Document, Types } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  thumbnailImages: string[];

  wishlistUsers: any;
  dislikes: number;
  category: string;
  size: string[];
  recommendedFor: string;
  reviews: Types.ObjectId[];
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    thumbnailImages: { type: [String], default: [] },
    discount: { type: Number, default: 0 },
    wishlistUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],

    category: { type: String, required: true },
    size: { type: [String], default: [] },
    recommendedFor: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
