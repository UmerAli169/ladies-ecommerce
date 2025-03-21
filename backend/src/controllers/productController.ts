import Product from "../models/Product";
import Cart from "../models/Cart";
import User from "../models/User";
import Wishlist from "../models/Wishlist";
const mongoose = require("mongoose");

export const createProduct = async (req: any, res: any) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      category,
      stock,
      size,
      recommendedFor,
    } = req.body;

    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const imagePaths = req.files
    ? (req.files as Express.Multer.File[]).map((file: any) => file.path) 
    : [];
  
  
    const product: any = new Product({
      name,
      description,
      price,
      image: imagePaths.length > 0 ? imagePaths[0] : "",
      thumbnailImages: imagePaths,
      discount,
      category,
      stock,
      size: size ? size.split(",") : [],
      recommendedFor,
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
    const products = await Product.find().populate("reviews", "rating");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const toggleWishlist = async (req: any, res: any) => {
  try {
    const  productId  = req.params.id;
    const userId = req.userId;
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
      await wishlist.save();
      return res.status(200).json({ message: "Product added to wishlist", wishlist });
    }

    if (wishlist.products.includes(productId)) {
      wishlist.products = wishlist.products.filter((id) => id && id !== productId); 
      await wishlist.save();
      return res.status(200).json({ message: "Product removed from wishlist", wishlist });
    }

    wishlist.products.push(productId);
    await wishlist.save();
    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getWishlist = async (req:any, res:any) => {
  try {
    const userId = req.userId; 
    const wishlist = await Wishlist.findOne({ userId }).populate("products");

    if (!wishlist) {
      return res.status(200).json({ products: [] });
    }

    res.status(200).json({ products: wishlist.products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



export const addToCart = async (req: any, res: any) => {
  try {
    const { productId, quantity =2} = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }
    const product:any = await Product.findById(new mongoose.Types.ObjectId(productId));

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    // Ensure productId is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.log("Invalid productId received:", productId); // Debugging
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Convert productId to ObjectId
    const objectIdProductId = new mongoose.Types.ObjectId(productId);

    const existingCartItem = await Cart.findOne({ userId, productId: objectIdProductId });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      existingCartItem.total = existingCartItem.price * existingCartItem.quantity;
      await existingCartItem.save();
      return res.status(200).json({ message: "Cart updated successfully!", cartItem: existingCartItem });
    }

    const cartItem :any= new Cart({
      userId,
      productId: objectIdProductId,
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



export const getProductById = async (req: any, res: any) => {
  try {
    const productId = req.params.id?.trim();
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(productId).populate(
      "reviews",
      "rating"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
