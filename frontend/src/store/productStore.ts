import { create } from "zustand";
import { getAllProducts, getProductById } from "../services/internal";

interface Product {
  _id: string;
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
        bestSellers: formattedProducts.filter(
          (p: any) => p.category === "Best Sellers"
        ),
        newArrivals: formattedProducts.filter(
          (p: any) => p.category === "New Arrivals"
        ),
        productdetails: formattedProducts.filter(
          (p: any) => p.category === "Recently Viewed Products"
        ),
        blogs: formattedProducts.filter(
          (p: any) => p.category === "On the Blog"
        ),
      });
      return response;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  fetchProduct: async (id) => {
    try {
      const response = await getProductById(id);
      set({ product: response });
      return response;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
}));

export default useProductStore;
