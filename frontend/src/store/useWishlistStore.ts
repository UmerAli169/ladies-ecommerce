import { create } from "zustand";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
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
  wishlist: JSON.parse(localStorage.getItem("wishlist") || "[]"),

  fetchWishlist: async () => {
    try {
      const wishlist = await getWishlist();
      set({ wishlist });

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      return wishlist;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  },

  addToWishlist: async (id: string) => {
    try {
      await addToWishlist(id);
      const { wishlist } = get();
      const updatedWishlist = [...wishlist, id];
      set({ wishlist: updatedWishlist });
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  },

  removeFromWishlist: async (id: string) => {
    try {
      await removeFromWishlist(id);
      const { wishlist } = get();
      const updatedWishlist = wishlist.filter((item) => item !== id);
      set({ wishlist: updatedWishlist });
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  },

  toggleWishlist: async (id: string) => {
    const wishlist = get().wishlist || [];
    console.log(wishlist,'strewiihslist')
    try {
      if (wishlist.includes(id)) {
        await removeFromWishlist(id);
        const updatedWishlist = wishlist.filter((item) => item !== id);
        set({ wishlist: updatedWishlist });
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      } else {
        await addToWishlist(id);
        const updatedWishlist = [...wishlist, id];
        set({ wishlist: updatedWishlist });
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  },
  isInWishlist: (id: string) => {
    const wishlist = get().wishlist;
    return Array.isArray(wishlist) && wishlist.includes(id);
  },
}));

export default useWishlistStore;
