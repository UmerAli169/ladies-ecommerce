"use client";

import React, { useRef, useEffect } from "react";
import Wrapper from "@/app/wrapper";
import ProductCard from "../shared/ProductCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const swiperRef = useRef<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current && paginationRef.current) {
      // Initialize navigation and pagination
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.params.pagination.el = paginationRef.current;

      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
      swiperRef.current.pagination.init();
      swiperRef.current.pagination.render();
      swiperRef.current.pagination.update();
    }
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center w-full lg:pt-[80px] pt-[71px] pb-12 relative">
        <div className="text-center">
          <div className="flex gap-[10px] items-center">
            <img
              src="/svgs/Shared/ProductSection/leftflower.svg"
              alt="Left Flower"
            />
            <div className="lg:text-[24px] text-[20px] text-[#383838] font-bold">
              {[...new Set(products?.map((item: any) => item.tittle))].map(
                (title, index) => (
                  <p key={`${title}-${index}`}>{title}</p>
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
          <>
            <div className="w-full relative lg:py-[30px] py-[20px]">
              <div
                ref={prevRef}
                className="absolute top-1/2 left-[-20px] z-10 cursor-pointer"
              >
                <img
                  src="/svgs/Shared/ProductSection/leftArrow.svg"
                  alt="Left Arrow"
                />
              </div>

              <Swiper
                ref={swiperRef}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                // pagination={{
                //   clickable: true,
                //   bulletClass: "swiper-pagination-bullet",
                //   bulletActiveClass: "swiper-pagination-bullet-active",
                // }}
                cssMode={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                spaceBetween={20}
                slidesPerView="auto"
                className="mySwiper"
                // Remove default navigation arrows
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                  disabledClass: "swiper-button-disabled", // Optional: style for disabled state
                }}
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

              <div
                ref={nextRef}
                className="absolute top-1/2 right-[-20px] z-10 cursor-pointer"
              >
                <img
                  src="/svgs/Shared/ProductSection/rightArrow.svg"
                  alt="Right Arrow"
                />
              </div>
            </div>

            <div
              ref={paginationRef}
              className="swiper-pagination absolute bottom-4 left-0 right-0"
            />
          </>
        )}
      </div>

      <style jsx>{`
        .swiper-pagination {
          position: absolute;
          display: flex;
          justify-content: center;
          gap: 6px;
          bottom: 1rem;
          left: 0;
          right: 0;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: rgb(209, 219, 15);
          opacity: 0.5;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background-color: rgb(179, 79, 104);
          opacity: 1;
          transform: scale(1.2);
        }
        /* Hide default navigation arrows */
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }
      `}</style>
    </Wrapper>
  );
};

export default ProductSection;
