import { create } from "zustand";
import { getWishlist, toggleWishlist } from "../services/internal";

interface WishlistState {
  wishlist: string[];
  fetchWishlist: () => Promise<void>;
  toggleWishlist: (id: string) => Promise<void>;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],
  fetchWishlist: async () => {
    try {
      const wishlist = await getWishlist();
      set({ wishlist });
      return wishlist;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return [];
    }
  },

  toggleWishlist: async (id: string) => {
    try {
      const { wishlist } = get();
      await toggleWishlist(id);

      set({
        wishlist: wishlist.includes(id)
          ? wishlist.filter((item) => item !== id)
          : [...wishlist, id],
      });
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  },

  isInWishlist: (id: string) => get().wishlist.includes(id),
}));

export default useWishlistStore;
