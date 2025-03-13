import express from "express";
import {
  createProduct,
  getAllProducts,
  likeProduct,
  dislikeProduct,
  addToCart,
  getProductById,
} from "../controllers/productController";
import authenticateUser from "../utils/authMiddleware";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.post("/create", authenticateUser, upload.single("image"), createProduct);
router.get("/getAllProducts",authenticateUser, getAllProducts);
router.put("/like/:id", authenticateUser,likeProduct);
router.put("/dislike/:id",authenticateUser, dislikeProduct);
router.put("/getProductById/:id", authenticateUser,getProductById);

router.post("/cart", authenticateUser,addToCart);

export default router;
