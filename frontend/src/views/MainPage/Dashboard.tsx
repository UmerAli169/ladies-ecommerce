"use client";
import { useEffect } from "react";
import Dashboard from "../../components/main/Dashboard";
import ProductSection from "../../components/main/ProductSection";
import Frame from "../../components/main/Frame";
import BlogSection from "../../components/shared/BlogSections";
import SkinQuiz from "@/components/main/SkinQuiz"; 
import InstagramGallery from "../../components/main/InstagramGallery";
import { useProductStore } from "@/store/productStore";
import useCartStore from "@/store/cartStore";

function MainPage() {
  const { bestSellers, newArrivals, fetchProducts, blogs } = useProductStore();
  const { addToCart } = useCartStore();
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Dashboard />
      <ProductSection
        products={newArrivals as any}
        cardWidth={289}
        addToCart={addToCart as any}
      />
      <ProductSection
        products={bestSellers as any}
        cardWidth={289}
        addToCart={addToCart as any}
      />
      <Frame />
      <BlogSection products={blogs as any} cardWidth={392} />
      <SkinQuiz />
      <InstagramGallery />
    </div>
  );
}

export default MainPage;
