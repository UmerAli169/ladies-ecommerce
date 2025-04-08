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
  wishlist: JSON.parse(localStorage.getItem("wishlist") || "[]"), // Load wishlist from localStorage on initial load

  // Fetch wishlist from API or storage and update the state
  fetchWishlist: async () => {
    try {
      const wishlist = await getWishlist(); // Fetch from your data source (API, local storage, etc.)
      console.log("Fetched wishlist:", wishlist); // Debugging line to see the fetched wishlist
      set({ wishlist });
      localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Persist wishlist in localStorage
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  },

  // Add item to wishlist and update state
  addToWishlist: async (id: string) => {
    try {
      await addToWishlist(id); // Call API to add to wishlist
      const { wishlist } = get();
      const updatedWishlist = [...wishlist, id];
      set({ wishlist: updatedWishlist });
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Persist updated wishlist in localStorage
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  },

  // Remove item from wishlist and update state
  removeFromWishlist: async (id: string) => {
    try {
      await removeFromWishlist(id); // Call API to remove from wishlist
      const { wishlist } = get();
      const updatedWishlist = wishlist.filter((item) => item !== id);
      set({ wishlist: updatedWishlist });
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Persist updated wishlist in localStorage
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  },

  // Toggle item in wishlist (add/remove)
  toggleWishlist: async (id: string) => {
    const wishlist = get().wishlist;

    if (wishlist.includes(id)) {
      // If item is already in wishlist, remove it
      try {
        await removeFromWishlist(id);
        set({ wishlist: wishlist.filter((item) => item !== id) });
        localStorage.setItem("wishlist", JSON.stringify(wishlist.filter((item) => item !== id))); // Persist updated wishlist in localStorage
      } catch (error) {
        console.error("Error toggling wishlist (remove):", error);
      }
    } else {
      // If item is not in wishlist, add it
      try {
        await addToWishlist(id);
        set({ wishlist: [...wishlist, id] });
        localStorage.setItem("wishlist", JSON.stringify([...wishlist, id])); // Persist updated wishlist in localStorage
      } catch (error) {
        console.error("Error toggling wishlist (add):", error);
      }
    }
  },

  // Check if an item is in the wishlist
  isInWishlist: (id: string) => {
    const wishlist = get().wishlist;
    console.log("Current wishlist state:", wishlist); // Debugging line to see the current wishlist
    return Array.isArray(wishlist) && wishlist.includes(id);
  }
}));

export default useWishlistStore;
