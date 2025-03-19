import { create } from "zustand";
import { getAllProducts, getProductById, getWishlist, addToWishlist } from "../services/internal"; // Add removeFromWishlist if needed

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  imageUrl: string;
  thumbnailImages: string[];
  rating: number;
  reviews: number;
  size: string[];
  recommendedFor: string;
  blog: string;
}

interface ProductState {
  blogs: Product[];
  products: Product[];
  bestSellers: Product[];
  newArrivals: Product[];
  productdetails: Product[];
  product: Product | null;
  cart: Product[];
  wishlist: string[];
  fetchProducts: () => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  fetchWishlist: () => Promise<void>;
  toggleWishlist: (id: string) => Promise<void>;
  addToCart: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  bestSellers: [],
  newArrivals: [],
  blogs: [],
  productdetails: [],
  product: null,
  cart: [],
  wishlist: [],

  fetchProducts: async () => {
    try {
      const response = await getAllProducts();
      const formattedProducts = response.map((product: any) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        description: product.description,
        imageUrl: product.imageUrl,
        thumbnailImages: product.thumbnailImages,
        rating: product.rating,
        reviews: product.reviews,
        size: product.size,
        recommendedFor: product.recommendedFor,
        blog: product.Blog,
      }));

      set({
        products: formattedProducts,
        bestSellers: formattedProducts.filter((p: any) => p.category === "BEST SELLERS"),
        newArrivals: formattedProducts.filter((p: any) => p.category === "New Arrivals"),
        productdetails: formattedProducts.filter((p: any) => p.category === "Recently Viewed Products"),
        blogs: formattedProducts.filter((p: any) => p.category === "On the Blog"),
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  fetchProduct: async (id) => {
    try {
      const response = await getProductById(id);
      set({ product: response });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },

  fetchWishlist: async () => {
    try {
      const wishlist = await getWishlist();
      set({ wishlist });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  },

  toggleWishlist: async (id: string) => {
    try {
      const { wishlist } = get();
      if (wishlist.includes(id)) {
        // Remove from wishlist
        const updatedWishlist = wishlist.filter((item) => item !== id);
        // await removeFromWishlist(id); // Ensure this API exists
        set({ wishlist: updatedWishlist });
      } else {
        // Add to wishlist
        const updatedWishlist = [...wishlist, id];
        await addToWishlist(id);
        set({ wishlist: updatedWishlist });
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  },

  addToCart: (product) => {
    set((state) => ({ cart: [...state.cart, product] }));
  },

  isInWishlist: (id: string) => get().wishlist.includes(id),
}));

export default useProductStore;
