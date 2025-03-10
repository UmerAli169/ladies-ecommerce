"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomCard } from "./CustomCard";
import Button from "./Button";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [isHovered, setIsHovered] = useState(true);
  const [liked, setLiked] = useState(false);

  const router = useRouter();

  const handleRedirect = () => {
    console.log("first");
    router.push("ProductDetails");
    // router.push(`/product/${product.id}`);
  };

  return (
    <>
      <CustomCard
        className="w-full rounded-[6px] cursor-pointer pointer-events-auto relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleRedirect}
      >
        {product.discount && (
          <div className="absolute top-[30px] left-[1px] bg-[#F5A3B7] rounded-r-full text-white text-[12px] font-bold px-3 py-1 flex items-center justify-center min-w-[60px] z-10">
            -{product.discount}%
          </div>
        )}

        <div className="relative">
          <div
            className={`absolute top-[20px] right-[23px] transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
          >
            <img
              src={
                liked
                  ? "/svgs/Shared/ProductSection/heart-filled.svg"
                  : "/svgs/Shared/ProductSection/heart.svg"
              }
              alt="wishlist"
              className="w-[18px] h-[19px] cursor-pointer"
            />
          </div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover rounded-[6px]"
          />
        </div>

        <div className="px-[20px] py-[10px]">
          <div className="flex flex-col gap-[10px]">
            <p className="font-[poppins] text-[16px] leading-[24px] text-[#383838] font-medium   hover:text-[#F5A3B7]">
              {product.name}ß
            </p>

            {product.rating !== undefined && (
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="/svgs/Shared/ProductSection/cardStar.svg"
                    alt="star"
                    className="w-4 h-4"
                  />
                ))}
                <span className="text-[14px] text-[#383838] font-medium">
                  ({product.rating})
                </span>
              </div>
            )}

            <p className="font-[Montserrat] text-[14px] text-[#697586] font-normal leading-[22px]">
              {product.description}
            </p>

            <div className="font-[Montserrat] text-[16px] text-[#383838] font-normal">
              {product.price}
            </div>
          </div>

          <div className="mt-[20px]">
            <Button
              className="  py-[10px] text-[14px] font-medium bg-white text-black border border-black hover:bg-black hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              Add To Bag
            </Button>
          </div>
        </div>
        
      </CustomCard>

      
    </>
  );
};

export default ProductCard;
