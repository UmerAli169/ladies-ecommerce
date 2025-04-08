import express from "express";
import {
  createProduct,
  getAllProducts,
  addToCart,
  getProductById,
  getWishlist,
  getCart,
  removeFromCart,
  updateCartItemQuantity,
  createCategory,
  getAllCategories,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/productController";
import authenticateUser from "../utils/authMiddleware";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.post(
  "/create",
  authenticateUser,
  upload.array("images", 5),
  createProduct
);
router.get("/getAllProducts", authenticateUser, getAllProducts);

router.post("/addToWishlist/:id", authenticateUser, addToWishlist);

router.post("/removeFromWishlist/:id", authenticateUser, removeFromWishlist);



router.get("/getWishlist", authenticateUser, getWishlist);

router.put("/getProductById/:id", authenticateUser, getProductById);

router.post("/addToCart", authenticateUser, addToCart);

router.put("/updateCart/:cartItemId", authenticateUser, updateCartItemQuantity);

router.get("/fetchCart", authenticateUser, getCart);

router.delete("/removeFromCart/:cartItemId", authenticateUser, removeFromCart);

router.post("/category", authenticateUser, createCategory);

router.get("/categories", getAllCategories);

export default router;
