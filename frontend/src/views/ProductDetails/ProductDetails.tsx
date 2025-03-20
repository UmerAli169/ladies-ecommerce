"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductSection from "@/components/main/ProductSection";
import ProductDetails from "@/components/productdetails/ProductDetails";
import ReviewSection from "@/components/productdetails/ReviewSection";
import { useProductStore } from "@/store/productStore";

function Page() {
  const [product, setProduct] = useState<any>(null);
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const { productdetails, fetchProduct }: any = useProductStore();

  useEffect(() => {
    const getProduct = async () => {
      if (!productId) return;

      try {
        const data = await fetchProduct(productId);

        if (!data) {
          console.error(
            "Product data is undefined. Check fetchProduct function."
          );
        } else {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [productId]);

  return (
    <div className="py-[40px]">
      {product && <ProductDetails productInfo={product} />}
      <ReviewSection productId={productId as string} />
      <ProductSection products={productdetails} cardWidth={289} />
    </div>
  );
}

export default Page;
