import { create } from "zustand";
import {
  addToCart,
  fetchCart,
  updateCartItemQuantity,
  removeCartItem,
} from "../services/internal";

interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  incrementQuantity: (cartItemId: string) => Promise<void>;
  decrementQuantity: (cartItemId: string) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  // Fetch Cart Items
  fetchCart: async () => {
    try {
      const cartData = await fetchCart();
      set({ cart: cartData.cart });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },

  // Add Item to Cart
  addToCart: async (productId, quantity = 1) => {
    try {
      await addToCart(productId, quantity);
      get().fetchCart(); // Refresh cart after adding
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  },

  // Increment Quantity (✅ Uses `cartItemId`)
  incrementQuantity: async (cartItemId) => {
    try {
      const cart = get().cart;
      const item: any = cart.find((item) => item._id === cartItemId);
      if (item) {
        await updateCartItemQuantity(cartItemId, item.quantity + 1); // Send new quantity
        get().fetchCart(); // Refresh cart
      }
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  },

  decrementQuantity: async (cartItemId) => {
    try {
      const cart = get().cart;
      const item: any = cart.find((item) => item._id === cartItemId);
      if (item && item.quantity > 1) {
        await updateCartItemQuantity(cartItemId, item.quantity - 1); // Send new quantity
        get().fetchCart(); // Refresh cart
      }
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  },

  // Remove Item from Cart (✅ Uses `cartItemId`)
  removeFromCart: async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      get().fetchCart(); // Refresh cart after removing
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  },
}));

export default useCartStore;
