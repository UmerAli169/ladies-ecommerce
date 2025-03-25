import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import passport from "../src/utils/passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes";
import path from "path";
import reviewRoutes from "./routes/reviewRoutes";
dotenv.config();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(
  session({
    secret: 'f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3' ,//process.env.GooglePassportSECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

connectDB();
app.get("/", async (req: any, res: any) => {
  res.status(200).json({message:"runniung"})
});

app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/reviews", reviewRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));






import Category from "../src/models/Category";
import Subcategory from "./models/Subcategory";



const seedData = async () => {
  try {
    await Category.deleteMany();
    await Subcategory.deleteMany();

    // Step 1: Insert Categories
    const categories = await Category.insertMany([
      { name: "Shirts" },
      { name: "Pants" },
      { name: "Shoes" },
    ]);

    // Step 2: Insert Subcategories & Capture their IDs
    const subcategories = await Subcategory.insertMany([
      { name: "T-Shirts", category: categories[0]._id },
      { name: "Jeans", category: categories[1]._id },
      { name: "Sneakers", category: categories[2]._id },
    ]);

    // Step 3: Update Categories with Subcategory IDs
    for (const sub of subcategories) {
      await Category.findByIdAndUpdate(sub.category, {
        $push: { subcategories: sub._id },
      });
    }

    console.log("✅ Seed Data Added Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error Seeding Data:", error);
    process.exit(1);
  }
};


// seedData();
