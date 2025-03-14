"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ProductSection from "@/components/main/ProductSection";
import ProductDetails from "@/components/productdetails/ProductDetails";
import ReviewSection from "@/components/productdetails/ReviewSection";
import { useProductStore } from "@/store/productStore";

function Page() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const { productdetails, fetchProducts }: any = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="py-[40px]">
      <ProductDetails />
      <ReviewSection productId={productId as string} />
      <ProductSection products={productdetails} cardWidth={289} />
    </div>
  );
}

export default Page;
