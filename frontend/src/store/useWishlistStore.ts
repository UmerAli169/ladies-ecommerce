// src/store/wishlistStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getWishlist, addToWishlist, removeFromWishlist } from "../services/internal";

interface WishlistStore {
  wishlist: string[];
  fetchWishlist: () => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      fetchWishlist: async () => {
        try {
          const wishlist = await getWishlist();
          set({ wishlist: Array.isArray(wishlist) ? wishlist : [] });
          return wishlist
        } catch (error) {
          console.error("Error fetching wishlist", error);
          set({ wishlist: [] });
        }
      },
      toggleWishlist: async (productId) => {
        const { wishlist } = get();
        const isInList = wishlist.includes(productId);

        try {
          if (isInList) {
            await removeFromWishlist(productId);
            set({ wishlist: wishlist.filter((id) => id !== productId) });
          } else {
            await addToWishlist(productId);
            set({ wishlist: [...wishlist, productId] });
          }
        } catch (error) {
          console.error("Error toggling wishlist", error);
        }
      },
      isInWishlist: (productId) => {
        return get().wishlist.includes(productId);
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);