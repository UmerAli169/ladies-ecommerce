"use client"
import ProductSection from "@/components/main/ProductSection";
import ProductDetails from "@/components/productdetails/ProductDetails";
import ReviewSection from "@/components/productdetails/ReviewSection";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";

function Page() {
  const { products, fetchProducts }:any = useProductStore();

  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <div className="py-[40px]">
      <ProductDetails />
      {/* <ReviewSection /> */}
      <ProductSection title="All Products" products={products} cardWidth={289} />
    </div>
  );
}

export default Page;
