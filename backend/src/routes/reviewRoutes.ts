import express from "express";
import { 
  createReview, 
  getReviewsByProduct, 
  getReviewsByUser, 
  deleteReview 
} from "../controllers/reviewController";
import authenticateUser from "../utils/authMiddleware";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.post("/",authenticateUser, upload.array("images", 5),createReview);
router.get("/:productId", authenticateUser,getReviewsByProduct);
router.get("/user/:userId",authenticateUser, getReviewsByUser);
router.delete("/:id", authenticateUser,deleteReview);

export default router;
