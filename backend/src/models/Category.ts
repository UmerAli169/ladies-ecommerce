import mongoose, { Schema, Document, Types } from "mongoose";

interface ICategory extends Document {
  name: string;
  description?: string;
  subcategories: Types.ObjectId[]; // References Subcategory model
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String }, // Added the missing description field
    subcategories: [{ type: Schema.Types.ObjectId, ref: "Subcategory" }], // Relation with Subcategory
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
