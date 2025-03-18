import { create } from "zustand";
import { getAllProducts, getProductById } from "../services/internal";

interface Product {
  image: any;
  category: string;
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
  Blog: string;
}

interface ProductState {
  blogs: Product[];
  products: Product[];
  bestSellers: Product[];
  newArrivals: Product[];
  productdetails: Product[];
  product: Product | null;
  fetchProducts: () => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  bestSellers: [],
  newArrivals: [],
  blogs: [],
  productdetails: [],
  product: null,

  fetchProducts: async () => {
    try {
      const response = await getAllProducts();

      const bestSellers = response.filter(
        (product: Product) => product.category === "BEST SELLERS"
      );
      const newArrivals = response.filter(
        (product: Product) => product.category === "New Arrivals"
      );
      const productdetails = response.filter(
        (product: Product) => product.category === "Recently Viewed Products"
      );

      const blogs = response.filter(
        (product: Product) => product.category === "On the Blog"
      );

      set({
        products: response,
        bestSellers,
        newArrivals,
        blogs,
        productdetails,
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
}));

export default useProductStore;
