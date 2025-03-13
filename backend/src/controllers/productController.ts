import Product from "../models/Product";
import Cart from "../models/Cart";
import User from "../models/UserModel";
const mongoose = require("mongoose");

export const createProduct = async (req: any, res: any) => {
  try {
    const { name, description, price, discount, category, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    const user: any = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = new Product({
      name,
      description,
      price,
      image,
      discount,
      category,
      stock,
    });

    await product.save();

    user.products.push(product._id);
    await user.save();

    res.status(201).json({ message: "Product added successfully!", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

export const getAllProducts = async (req: any, res: any) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const likeProduct = async (req: any, res: any) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to like product" });
  }
};

export const dislikeProduct = async (req: any, res: any) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { dislikes: 1 } },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to dislike product" });
  }
};

export const addToCart = async (req: any, res: any) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const cartItem: any = new Cart({
      userId,
      productId,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      total: product.price * quantity,
    });

    await cartItem.save();

    user.cart.push(cartItem._id);
    await user.save();

    res.status(201).json({ message: "Added to cart successfully!", cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// Get Product by ID
export const getProductById = async (req: any, res: any) => {
  try {
    const productId = req.params.id?.trim();
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
