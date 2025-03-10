"use client";
import ProductSection from "@/components/main/ProductSection";
import ProductCard from "@/components/shared/ProductCard";
import productsData from "../../../../Data/mainPage/cardSection/products.json";
import { useState } from "react";

export default function SubCategoryProduct({ products }: any) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const addToCart = (product: any) => {
    setCartItems((prev) => [...prev, product]);
    setIsCartOpen(true);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {products.length > 0 ? (
          products.map((product: any) => (
            <ProductCard product={product} addToCart={addToCart} />
          ))
        ) : (
          <p>No products found for this category.</p>
        )}

        <div className="mb-[80px]"></div>
      </div>
      <ProductSection
        title="Recently Viewed Products"
        products={productsData.bestSellers}
        cardWidth={289}
      />
    </>
  );
}
