import { create } from "zustand";
import { getWishlist, addToWishlist, removeFromWishlist } from "../services/internal";

interface WishlistState {
  wishlist: string[];
  fetchWishlist: () => Promise<void>;
  addToWishlist: (id: string) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  toggleWishlist: (id: string) => Promise<void>;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],

  fetchWishlist: async () => {
    try {
      const wishlist = await getWishlist();
      set({ wishlist });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  },

  addToWishlist: async (id: string) => {
    try {
      await addToWishlist(id);
      const { wishlist } = get();
      set({ wishlist: [...wishlist, id] });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  },

  removeFromWishlist: async (id: string) => {
    try {
      await removeFromWishlist(id);
      const { wishlist } = get();
      set({ wishlist: wishlist.filter((item) => item !== id) });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  },

  toggleWishlist: async (id: string) => {
    const { isInWishlist, addToWishlist, removeFromWishlist } = get();
    if (isInWishlist(id)) {
      await removeFromWishlist(id);
    } else {
      await addToWishlist(id);
    }
  },

  isInWishlist: (id: string) => {
    const { wishlist } = get();
    return wishlist.includes(id);
  },
}));

export default useWishlistStore;
