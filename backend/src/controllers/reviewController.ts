import { Request, Response } from "express";
import { Review, IReview } from "../models/Review";

import Product from "../models/Product";

export const createReview = async (req: any, res: any) => {
  try {
    const { userId, productId, rating, title, text } = req.body;

    const images =
      req.files && req.files.length > 0
        ? req.files.map((file: Express.Multer.File) => `/${file.filename}`)
        : [];

    const newReview: any = new Review({
      userId,
      productId,
      rating,
      title,
      text,
      images,
      verified: false,
    });

    await newReview.save();

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.reviews.push(newReview._id);
    await product.save();

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getReviewsByProduct = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    }).populate("userId", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getReviewsByUser = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId }).populate(
      "productId",
      "productName"
    );
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
