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

app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/reviews", reviewRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
