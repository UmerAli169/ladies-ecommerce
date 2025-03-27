import { Request, Response } from "express";
import { Review, IReview } from "../models/Review";

import Product from "../models/Product";
import mongoose from "mongoose";

export const createReview = async (req: any, res: any) => {
  try {
    const { userId, productId, rating, title, text } = req.body;

    const images =
    req.files
    ? (req.files as Express.Multer.File[]).map((file: any) => file.path)
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

export const getReviewsByProduct = async (req: any, res: any) => {
  try {
    const productId = req.params.productId.trim();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid Product ID" });
    }

    const reviews = await Review.find({ productId }).populate("userId","firstName" );


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
