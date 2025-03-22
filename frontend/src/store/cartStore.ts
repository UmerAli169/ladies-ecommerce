import { create } from "zustand";
import { addToCart, fetchCart } from "../services/internal";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  fetchCart: async () => {
    try {
      const cartData = await fetchCart();
      set({ cart: cartData.cart });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },

  addToCart: async (productId, quantity = 1) => {
    console.log(productId, "productId");
    try {
      await addToCart(productId, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  },
}));

export default useCartStore;
