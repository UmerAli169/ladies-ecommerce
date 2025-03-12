import express from "express";
import dotenv from "dotenv";
require("dotenv").config();
const cors = require("cors");
import  connectDB  from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config({
  path: 'backend/.env'
});
const app = express();

app.use(
    cors({
      origin: "http://localhost:3000", 
      credentials: true, 
    })
  );
  app.use(express.json());

connectDB();


app.use("/api/auth", authRoutes);

console.log(process.env.PORT, 'process.env.PORT');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
