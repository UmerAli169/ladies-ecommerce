"use client";

import React from "react";
import Wrapper from "@/app/wrapper";
import ProductCard from "../shared/ProductCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface Product {
  title: string;
  category: string;
  _id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  reviews: string;
}

interface ProductSectionProps {
  addToCart: (productId: string) => void;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  products: Product[];
  cardWidth: number;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  cardWidth,
  toggleWishlist,
  isInWishlist,
  addToCart,
}) => {
  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center w-full lg:pt-[80px] pt-[71px] relative">
        <div className="text-center">
          <div className="flex gap-[10px] items-center">
            <img
              src="/svgs/Shared/ProductSection/leftflower.svg"
              alt="Left Flower"
            />
            <div className="lg:text-[24px] text-[20px] text-[#383838] font-bold">
              {[...new Set(products?.map((item: any) => item.tittle))].map(
                (tittle, index) => (
                  <p key={`${tittle}-${index}`}>{tittle}</p>
                )
              )}
            </div>
            <img
              src="/svgs/Shared/ProductSection/rightflower.svg"
              alt="Right Flower"
            />
          </div>
          <Link href="/Catalog">
            <p className="text-[18px] text-[#697586] font-normal hover:text-[#F5A3B7] cursor-pointer">
              See All
            </p>
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500 mt-4">No products available.</p>
        ) : (
          <div className="w-full relative lg:py-[30px] py-[20px]">
            <div className="absolute top-1/2 left-[-1px] z-10 cursor-pointer custom-prev">
              <img
                src="/svgs/Shared/ProductSection/leftArrow.svg"
                alt="Left Arrow"
              />
            </div>

            <Swiper
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView="auto"
              className="mySwiper"
            >
              {products.map((product, index) => (
                <SwiperSlide
                  key={`${product._id}-${index}`}
                  style={{ maxWidth: `${cardWidth}px`, width: "100%" }}
                >
                  <ProductCard
                    product={product as any}
                    addToCart={() => addToCart(product._id)}
                    toggleWishlist={() => toggleWishlist(product._id)}
                    isInWishlist={isInWishlist(product._id)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute top-1/2 right-[-1px] z-10 cursor-pointer custom-next">
              <img
                src="/svgs/Shared/ProductSection/rightArrow.svg"
                alt="Right Arrow"
              />
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ProductSection;
