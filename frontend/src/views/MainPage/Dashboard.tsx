"use client";
import { useEffect } from "react";
import Dashboard from "../../components/main/Dashboard";
import ProductSection from "../../components/main/ProductSection";
import Frame from "../../components/main/Frame";
import BlogSection from "../../components/main/ProductSection";
import SkinQuiz from "@/components/main/SkinQuiz";
import InstagramGallery from "../../components/main/InstagramGallery";
import { useProductStore } from "@/store/productStore";
import useWishlistStore from "@/store/useWishlistStore";

function MainPage() {
  const { bestSellers, newArrivals, fetchProducts, blogs, addToCart } = useProductStore(); 
  const {  toggleWishlist, isInWishlist } = useWishlistStore(); 


  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <Dashboard />
        <ProductSection
          products={newArrivals}
          cardWidth={289}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
        />
      <ProductSection
        products={bestSellers}
        cardWidth={289}
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />
      <Frame />
      <BlogSection products={blogs} cardWidth={320} />
      <SkinQuiz />
      <InstagramGallery />
    </div>
  );
}

export default MainPage;
