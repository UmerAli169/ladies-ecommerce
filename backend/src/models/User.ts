import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phone?: string; // ✅ Fixed: Correct type declaration
  address?: string; // ✅ Fixed: Correct type declaration
  city?: string; // ✅ Fixed: Correct type declaration
  country?: string; // ✅ Fixed: Correct type declaration
  googleId?: string;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  cart: Types.ObjectId[];
  products: Types.ObjectId[];
  wishlist: Types.ObjectId[];
  orders: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String }, // ✅ Kept schema correct
    address: { type: String }, // ✅ Kept schema correct
    city: { type: String }, // ✅ Kept schema correct
    country: { type: String }, // ✅ Kept schema correct
    password: {
      type: String,
      required: function (this: IUser) {
        return !this.googleId;
      },
    },
    googleId: { type: String },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    cart: [{ type: Schema.Types.ObjectId, ref: "Cart" }],
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
