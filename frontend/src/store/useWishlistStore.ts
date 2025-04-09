import { create } from "zustand";
import {
  getWishlist,
  addToWishlist as apiAddToWishlist,
  removeFromWishlist as apiRemoveFromWishlist,
} from "../services/internal";

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
      const fetchedWishlist = await getWishlist();
      set({ wishlist: Array.isArray(fetchedWishlist) ? fetchedWishlist : [] });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  },

  addToWishlist: async (id: string) => {
    try {
      await apiAddToWishlist(id);
      const { wishlist } = get();
      if (!wishlist.includes(id)) {
        set({ wishlist: [...wishlist, id] });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  },

  removeFromWishlist: async (id: string) => {
    try {
      await apiRemoveFromWishlist(id);
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
    return Array.isArray(wishlist) && wishlist.includes(id);
  },
}));
