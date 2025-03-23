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
    const productId = req.params.id;
    const userId = req.userId;
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
      await wishlist.save();
      return res
        .status(200)
        .json({ message: "Product added to wishlist", wishlist });
    }

    if (wishlist.products.includes(productId)) {
      wishlist.products = wishlist.products.filter(
        (id) => id && id !== productId
      );
      await wishlist.save();
      return res
        .status(200)
        .json({ message: "Product removed from wishlist", wishlist });
    }

    wishlist.products.push(productId);
    await wishlist.save();
    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getWishlist = async (req: any, res: any) => {
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
    const { productId, quantity } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    let cartItem: any = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.total = cartItem.price * cartItem.quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({
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
    }

    res.status(201).json({
      message: "Product added to cart successfully!",
      cartItem,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

// ✅ Get all cart items for a user
export const getCartItems = async (req: any, res: any) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    const cartItems = await Cart.find({ userId }).populate("productId");
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Failed to get cart items" });
  }
};

// ✅ Update cart item quantity using cartItem ID (Increment / Decrement)
export const updateCartItemQuantity = async (req: any, res: any) => {
  try {
    const { cartItemId } = req.params; // Get cartItemId from URL params
    const { quantity } = req.body; // Get quantity from request body
    const userId = req.userId; // Extract userId from authentication

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    if (!mongoose.Types.ObjectId.isValid(cartItemId)) {
      return res.status(400).json({ error: "Invalid cart item ID format" });
    }

    const cartItem = await Cart.findOne({ _id: cartItemId, userId });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Ensure quantity is at least 1
    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    cartItem.quantity = quantity;
    cartItem.total = cartItem.price * quantity;
    await cartItem.save();

    res.status(200).json({ message: "Cart updated successfully!", cartItem });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};

// ✅ Remove cart item using cartItem ID
export const removeFromCart = async (req: any, res: any) => {
  try {
    const { cartItemId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    if (!mongoose.Types.ObjectId.isValid(cartItemId)) {
      return res.status(400).json({ error: "Invalid cart item ID format" });
    }

    const cartItem = await Cart.findOneAndDelete({ _id: cartItemId, userId });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Remove from user's cart array
    await User.findByIdAndUpdate(userId, {
      $pull: { cart: cartItem._id },
    });

    res.status(200).json({ message: "Item removed from cart successfully!" });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ error: "Failed to remove cart item" });
  }
};

export const getCart = async (req: any, res: any) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    const user = await User.findById(userId).populate({
      path: "cart",
      populate: { path: "productId", select: "name image price" }, // Populate product details
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
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
