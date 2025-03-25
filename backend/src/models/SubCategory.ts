import mongoose, { Schema, Document, Types } from "mongoose";

interface ISubcategory extends Document {
  name: string;
  category: Types.ObjectId;
}

const SubcategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" }, // Relation with Category
  },
  { timestamps: true }
);

const Subcategory = mongoose.model<ISubcategory>("Subcategory", SubcategorySchema);
export default Subcategory;
