import { create } from "zustand";
import { getAllProducts, getProductById } from "../services/internal";

interface Product {
  _id: string;
  tittle: string; // ✅ Fixed typo from 'tittle' to 'title'
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
      const formattedProducts: Product[] = response.map((product: any) => ({
        _id: product._id,
        tittle: product.tittle, // ✅ Fixed mapping
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        description: product.description,
        imageUrl: product.imageUrl,
        thumbnailImages: product.thumbnailImages || [],
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        size: product.size || [],
        recommendedFor: product.recommendedFor || "",
        blog: product.blog || "",
      }));
      set({
        products: formattedProducts,
        bestSellers: formattedProducts.filter(
          (p) => p.tittle === "Best Sellers"
        ),
        newArrivals: formattedProducts.filter(
          (p) => p.tittle === "New Arrivals"
        ),
        productdetails: formattedProducts.filter(
          (p) => p.tittle === "Recently Viewed Products"
        ),
        blogs: formattedProducts.filter(
          (p) => p.tittle === "On the Blog"
        ),
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
