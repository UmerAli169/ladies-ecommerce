"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomCard } from "./CustomCard";
import Button from "./Button";

interface Product {
  image: string | undefined;
  id: number;
  name: string;
  description: string;
  price: number;
  discount?: number;
  reviews: { rating: number }[];

}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  addToCart,
}: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(true);

  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/ProductDetails?id=${product._id}`);
  };

  const averageRating = product.reviews.length
  ? product.reviews.reduce((sum, rate) => sum + rate.rating, 0) / product.reviews.length
  : 0;
  return (
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
          src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover rounded-[6px]"
        />
      </div>

      <div className="px-[20px] py-[10px]">
        <div className="flex flex-col gap-[10px]">
          <p className="font-[poppins] text-[16px] leading-[24px] text-[#383838] font-medium hover:text-[#F5A3B7]">
            {product.name}
          </p>

          {product.reviews.length > 0 && (
            <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.round(averageRating)
                    ? "/svgs/Shared/reviews/starts.svg"
                    : "/svgs/Shared/ProductSection/cardStar.svg"
                }
                alt="star"
                className="w-4 h-4"
              />
            ))}
            <span className="text-[14px] text-[#383838] font-medium">
              ({averageRating.toFixed(1)})
            </span>
          </div>
          )}

          <p className="font-[Montserrat] text-[14px] text-[#697586] font-normal leading-[22px]">
            {product.description}
          </p>

          <div className="font-[Montserrat] text-[16px] text-[#383838] font-normal">
            ${product.price}
          </div>
        </div>

        <div className="mt-[20px]">
          <Button
            className="py-[10px] text-[14px] font-medium bg-white text-black border border-black hover:bg-black hover:text-white"
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
  );
};

export default ProductCard;
