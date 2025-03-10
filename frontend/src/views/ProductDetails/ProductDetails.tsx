import ProductSection from "@/components/main/ProductSection";
import ProductDetails from "@/components/productdetails/ProductDetails";
import ReviewSection from "@/components/productdetails/ReviewSection";
import productsData from "../../Data/mainPage/cardSection/products.json";

import React from "react";

function page() {
  return (
    <div className="py-[40px] ">
      <ProductDetails />
      <ReviewSection />
      {productsData.sections.map((section) => {
        const products =
          productsData[section.products as keyof typeof productsData];
        return (
          <ProductSection
            key={section.title}
            title={section.title}
            products={products}
            cardWidth={289}
          />
        );
      })}
    </div>
  );
}

export default page;
