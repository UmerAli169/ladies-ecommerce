import { create } from "zustand";
import { getAllProducts, getProductById } from "../services/internal";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  thumbnailImages: string[];
  rating: number;
  reviews: number;
  size: string;
  recommendedFor: string;
}

interface ProductState {
  products: Product[];
  product: Product | null;
  fetchProducts: () => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  product: null,
  
  fetchProducts: async () => {
    try {
      const response = await getAllProducts();
      set({ products: response });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  fetchProduct: async (id) => {
    try {
      const response = await getProductById(id);
      console.log(response,'responesse')

      set({ product: response });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
}));
