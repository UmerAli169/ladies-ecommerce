import mongoose, { Schema, Document, Types } from "mongoose";
 
interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  thumbnailImages: string[];
  discount?: number;
  rating?: number;
  likes: number;
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
    rating: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    category: { type: String, required: true },
    size: { type: [String], default: [] }, 
    recommendedFor: { type: String, required: true }, 
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],

  },
  { timestamps: true }
);

const  Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
