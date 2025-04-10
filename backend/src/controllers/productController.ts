import Product from "../models/Product";
import Cart from "../models/Cart";
import User from "../models/User";
import Wishlist from "../models/Wishlist";
import Category from "../models/Category";
import Subcategory from "../models/Subcategory";
const mongoose = require("mongoose");

// Update user's address
export const updateAddress = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { address, city, country, postalCode, phone } = req.body;

    const user: any = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.address = address;
    user.city = city;
    user.country = country;
    user.postalCode = postalCode;
    user.phone = phone;

    await user.save();
    res.status(200).json({ message: "Address updated successfully", user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req: any, res: any) => {
  try {
    const {
      tittle,
      name,
      description,
      price,
      discount,
      category,
      subcategory,
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

    // Find or create category
    let categoryExists = await Category.findOne({ name: category });
    if (!categoryExists) {
      categoryExists = await Category.create({
        name: category,
        subcategories: [],
      });
    }

    // Find or create subcategory
    let subcategoryExists = await Subcategory.findOne({
      name: subcategory,
      category: categoryExists._id,
    });

    if (!subcategoryExists) {
      subcategoryExists = await Subcategory.create({
        name: subcategory,
        category: categoryExists._id,
      });

      // Add subcategory to category's subcategories list
      await Category.findByIdAndUpdate(categoryExists._id, {
        $push: { subcategories: subcategoryExists._id },
      });
    }

    // Handle image uploads
    const imagePaths = req.files
      ? (req.files as Express.Multer.File[]).map((file: any) => file.path)
      : [];

    const product: any = new Product({
      tittle,
      name,
      description,
      price,
      image: imagePaths.length > 0 ? imagePaths[0] : "",
      thumbnailImages: imagePaths,
      discount,
      category: categoryExists._id,
      subcategory: subcategoryExists._id,
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

// Get all categories with subcategories populated
export const getAllCategories = async (req: any, res: any) => {
  try {
    const categories = await Category.find().populate("subcategories");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Create a new category
export const createCategory = async (req: any, res: any) => {
  try {
    const { name, subcategories } = req.body;

    // Step 1: Create Category
    const newCategory = new Category({ name });
    await newCategory.save();

    // Step 2: Create Subcategories if provided
    if (subcategories && subcategories.length > 0) {
      const createdSubcategories = await Subcategory.insertMany(
        subcategories.map((sub: string) => ({
          name: sub,
          category: newCategory._id,
        }))
      );

      // Step 3: Update Category with Subcategory IDs
      newCategory.subcategories = createdSubcategories.map((sub) => sub._id);
      await newCategory.save();
    }

    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

export const getAllProducts = async (req: any, res: any) => {
  try {
    const products = await Product.find()
      .populate("reviews", "rating")
      .populate("category", "name")
      .populate("subcategory", "name");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const addToWishlist = async (req: any, res: any) => {
  try {
    const productId = new mongoose.Types.ObjectId(req.params.id);
    const userId = req.userId;

    let wishlist:any = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
    } else if (!wishlist.products.some((id: any) => id.equals(productId))) {
      wishlist.products.push(productId);
    } else {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    const user = await User.findById(userId);
    if (user) {
      if (!user.wishlist.some((id: any) => id.equals(productId))) {
        user.wishlist.push(productId);
        await user.save();
      }
    }

    const productWish = await Product.findById(productId);
    if (productWish) {
      if (!productWish.wishlistUsers.some((id: any) => id.equals(wishlist._id.toString()))) {
        productWish.wishlistUsers.push(wishlist._id.toString());
        await productWish.save();
      }
    }

    await wishlist.save();
    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const removeFromWishlist = async (req: any, res: any) => {
  try {
    const productId = new mongoose.Types.ObjectId(req.params.id); // ✅ convert to ObjectId
    const userId = req.userId;

    const wishlist = await Wishlist.findOne({ userId });

    if (
      !wishlist ||
      !wishlist.products.some((id: any) => id.equals(productId))
    ) {
      return res.status(404).json({ message: "Product not in wishlist" });
    }

    // Remove from wishlist collection
    wishlist.products = wishlist.products.filter(
      (id: any) => !id.equals(productId)
    );

    // Remove from user's wishlist field
    const user = await User.findById(userId);
    if (user) {
      user.wishlist = user.wishlist.filter((id: any) => !id.equals(productId));
      await user.save();
    }

    await wishlist.save();

    res
      .status(200)
      .json({ message: "Product removed from wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getWishlist = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const wishlist: any = await Wishlist.findOne({ userId }).populate(
      "products"
    );
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
