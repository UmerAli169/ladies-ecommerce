import { Request, Response } from "express";
import { Review, IReview } from "../models/Review";

// ✅ Create a new review
export const createReview = async (req: Request, res: Response) => {
  try {
    const { userId, productId, rating, title, text, images } = req.body;

    const newReview: IReview = new Review({
      userId,
      productId,
      rating,
      title,
      text,
      images,
      verified: false,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// ✅ Get all reviews for a product
export const getReviewsByProduct = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate("userId", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// ✅ Get all reviews by a user
export const getReviewsByUser = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId }).populate("productId", "productName");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// ✅ Delete a review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
