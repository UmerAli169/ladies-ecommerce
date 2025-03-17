import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  googleId?: string;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  cart: Types.ObjectId[];
  products: Types.ObjectId[];
  reviews: Types.ObjectId[];

}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
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

  },
  { timestamps: true } 
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
