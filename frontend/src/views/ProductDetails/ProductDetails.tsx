"use client"
import ProductSection from "@/components/main/ProductSection";
import ProductDetails from "@/components/productdetails/ProductDetails";
import ReviewSection from "@/components/productdetails/ReviewSection";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";

function Page() {
  const { productdetails, fetchProducts }:any = useProductStore();

  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <div className="py-[40px]">
      <ProductDetails />
      {/* <ReviewSection /> */}
      <ProductSection products={productdetails} cardWidth={289} />
    </div>
  );
}

export default Page;
