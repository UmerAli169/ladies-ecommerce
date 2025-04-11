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
<<<<<<< HEAD
  },

  addToWishlist: async (product: any) => {
    try {
      await apiAddToWishlist(product._id);
      const { wishlist } = get();

      if (!wishlist.includes(product._id)) {
        set({ wishlist: [...wishlist, product] });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  },

  removeFromWishlist: async (product: any) => {
    try {
      await apiRemoveFromWishlist(product._id);
      const { wishlist } = get();
      set({ wishlist: wishlist.filter((item) => item !== product) });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  },

  toggleWishlist: async (product: any) => {
    const { isInWishlist, addToWishlist, removeFromWishlist } = get();
    if (isInWishlist(product._id)) {
      await removeFromWishlist(product);
    } else {
      await addToWishlist(product);
    }
  },

  isInWishlist: (id: string) => {
    const { wishlist } = get();

    return (
      Array.isArray(wishlist) && wishlist.some((item: any) => item._id === id)
    );
  },
}));
=======
  )
);
>>>>>>> main
