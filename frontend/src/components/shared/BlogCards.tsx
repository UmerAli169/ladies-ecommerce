"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomCard } from "./CustomCard";
import Button from "./Button";

interface Product {
  image: string | undefined;
  _id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  discount?: number;
  reviews: { rating: number }[];
}

interface ProductCardProps {
  product: Product;

}

const ProductCard: React.FC<ProductCardProps> = ({
  product

}) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/BlogDetail`);
  };

  return (
    <CustomCard className="w-full rounded-[6px] cursor-pointer relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full max-h-[220px] object-cover rounded-[6px]"
        />
      </div>

      <div className="px-[20px] py-[10px]">
        <div className="flex flex-col gap-[10px]">
          <p className="font-[poppins] text-[16px] leading-[24px] text-[#383838] font-medium hover:text-[#F5A3B7]">
            {product.name}
          </p>

          <p className="font-[Montserrat] text-[14px] text-[#697586] font-normal leading-[22px]">
            {product.description.slice(0,100)}...
          </p>
        </div>

        <div className="mt-[20px]">
          <Button
            className="py-[10px] text-[14px] font-medium bg-white text-black border border-black hover:bg-black hover:text-white"
            onClick={handleRedirect}
          >
            ReadMore{" "}
          </Button>
        </div>
      </div>
    </CustomCard>
  );
};

export default ProductCard;
