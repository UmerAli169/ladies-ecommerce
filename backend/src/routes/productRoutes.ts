import express from "express";
import {
  createProduct,
  getAllProducts,
  addToCart,
  getProductById,
  toggleWishlist,
  getWishlist,
} from "../controllers/productController";
import authenticateUser from "../utils/authMiddleware";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.post("/create", authenticateUser, upload.array("images", 5), createProduct);
router.get("/getAllProducts",authenticateUser, getAllProducts);
router.post("/addToWishlist/:id", authenticateUser, toggleWishlist);
router.get("/getWishlist", authenticateUser, getWishlist);
router.put("/getProductById/:id", authenticateUser,getProductById);
router.post("/cart", authenticateUser,addToCart);

export default router;
