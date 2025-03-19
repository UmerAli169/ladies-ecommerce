"use client";
import { useEffect } from "react";
import Dashboard from "../../components/main/Dashboard";
import ProductSection from "../../components/main/ProductSection";
import Frame from "../../components/main/Frame";
import BlogSection from "../../components/main/ProductSection";
import SkinQuiz from "@/components/main/SkinQuiz";
import InstagramGallery from "../../components/main/InstagramGallery";
import { useProductStore } from "@/store/productStore";

function MainPage() {
  const { bestSellers, newArrivals, fetchProducts ,blogs}:any = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(newArrivals,'newArrivals')
  return (
    <div>
      <Dashboard />
      <ProductSection products={newArrivals} cardWidth={289} />
      <ProductSection products={bestSellers} cardWidth={289} />
      <Frame />
      <BlogSection products={blogs} cardWidth={320} />
      <SkinQuiz />
      <InstagramGallery />
    </div>
  );
}

export default MainPage;
