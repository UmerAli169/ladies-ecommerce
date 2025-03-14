import express from "express";
import { 
  createReview, 
  getReviewsByProduct, 
  getReviewsByUser, 
  deleteReview 
} from "../controllers/reviewController";
import authenticateUser from "../utils/authMiddleware";

const router = express.Router();

router.post("/",authenticateUser, createReview);
router.get("/:productId", authenticateUser,getReviewsByProduct);
router.get("/user/:userId",authenticateUser, getReviewsByUser);
router.delete("/:id", authenticateUser,deleteReview);

export default router;
