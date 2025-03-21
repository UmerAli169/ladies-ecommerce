"use client";

import React, { useEffect, useRef } from "react";
import Button from "../shared/Button";
import Wrapper from "@/app/wrapper";
import AboutSection from "../about/AboutSection";
import Accordion from "../about/Accordion";
import { CartModal } from "../model/RightModal";
import { useProductStore } from "@/store/productStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import aboutData from "../../Data/productDetails/details.json";

interface ProductProps {
  productInfo: string | number;
}

const ProductDetails = ({ productInfo }: ProductProps) => {
  const { product, fetchProduct, addToCart, cart } = useProductStore();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlistStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isCartOpen, setIsCartOpen] = React.useState(false);


  if (!product) {
    return <p className="text-center">Loading product...</p>;
  }

  const reviewsArray = Array.isArray(product.reviews) ? product.reviews : [];
  const averageRating =
    reviewsArray.length > 0
      ? reviewsArray.reduce(
          (sum: number, review: any) => sum + (review.rating || 0),
          0
        ) / reviewsArray.length
      : 0;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    setIsCartOpen(true);
  };
  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row gap-[123px]">
        <div className="flex flex-col items-center w-full md:w-1/2 relative">
          <button
            className="absolute left-[-20px] top-1/3 -translate-y-1/2 rounded-full hidden lg:flex z-[10]"
            onClick={() => scroll("left")}
          >
            <img src="/svgs/Shared/ProductSection/leftArrow.svg" alt="left" />
          </button>
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-cover"
          />

          <button
            className="absolute right-[-20px] top-1/3 -translate-y-1/2 rounded-full hidden lg:flex z-[10]"
            onClick={() => scroll("right")}
          >
            <img src="/svgs/Shared/ProductSection/rightArrow.svg" alt="right" />
          </button>
          <div className="w-full relative lg:py-[30px] py-[20px]">
            <div
              ref={scrollRef}
              className="flex mt-[20px] gap-[20px] overflow-x-auto scrollbar-hide"
            >
              {product.thumbnailImages.map((thumb, index) => (
                <img
                  key={`${thumb}-${index}`}
                  src={thumb}
                  alt="thumbnail"
                  className="w-26 h-[124px] object-cover cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[10px] md:w-1/2">
          <p className="lg:text-[22px] text-[20px] font-medium text-[#383838] lg:leading-[33px] leading-[30px]">
            {product.name}
          </p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.round(averageRating)
                    ? "/svgs/Shared/ProductSection/productDetials.svg"
                    : "/svgs/Shared/ProductSection/cardStar.svg"
                }
                alt="star"
                className="w-4 h-4"
              />
            ))}
            <span className="lg:text-[14px] ml-[8px] text-[12px] font-medium font-[Montserrat] font-normal text-[#697586] lg:leading-[22px] leading-[20px]">
              {product.reviews.length} reviews
            </span>
          </div>
          <p className="lg:text-[16px] text-[14px] font-medium text-[#383838] lg:leading-[27px] leading-[24px]">
            ${product.price.toFixed(2)}
          </p>
          <div className="lg:text-[14px] text-[12px] font-normal font-[Montserrat] text-[#697586] lg:leading-[22px] leading-[20px]">
            <p>{product.description}</p>
            <p>Size: {product.size?.join(", ") || "N/A"}</p>
            <div className="flex flex-col gap-[6px]">
              <div className="font-[14px] leading-[20px] font-medium text-[#383838]">
                Recommended For
              </div>
              <span className="flex flex-col font-[14px] leading-[20px] font-normal text-[#697586] font-[Montserrat]">
                {product.recommendedFor}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <Button
              className="max-w-[246px] w-full py-[10px] px-[80px] text-[14px] font-bold text-[#383838] lg:leading-[21px] leading-[18px]"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
            <img
              src={
                isInWishlist(product._id)
                  ? "/svgs/Shared/ProductSection/heart-filled.svg"
                  : "/svgs/Shared/ProductSection/heart.svg"
              }
              alt="wishlist"
              className="cursor-pointer"
              onClick={() => toggleWishlist(product._id)}
            />
          </div>
          <CartModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
          />

          {aboutData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.items.map((item, itemIndex) => (
                <Accordion
                  key={itemIndex}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductDetails;
