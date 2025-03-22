"use client";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Wrapper from "@/app/wrapper";
import ProductCard from "../shared/ProductCard";
import { CartModal } from "../model/RightModal";

interface Product {
  category: string;
  id: string;
  name: string;
  price: number;
  image: string;
  raing: number;
  describtion: string;
  reviews: string;
}

interface ProductSectionProps {
  addToCart: (product: any) => void;
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollAmount = cardWidth * 4;

  const scroll = useCallback(
    (direction: "left" | "right") => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    },
    [scrollAmount]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const visibleIndex = Math.round(scrollLeft / scrollAmount);
        setCurrentIndex(visibleIndex);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [scrollAmount]);
  const totalDots = useMemo(() => Math.ceil(products.length / 4), [products]);
  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center w-full lg:pt-[80px] pt-[71px] relative">
        <div className="text-center">
          <div className="flex gap-[10px] items-center">
            <img src="/svgs/Shared/ProductSection/leftflower.svg" alt="" />
            <div className="lg:text-[24px] text-[20px] text-[#383838] font-bold">
              {[...new Set(products?.map((item) => item.category))].map(
                (category, index) => (
                  <p key={`${category}-${index}`}>{category}</p>
                )
              )}
            </div>

            <img src="/svgs/Shared/ProductSection/rightflower.svg" alt="" />
          </div>
          <p className="text-[18px] text-[#697586] font-normal hover:text-[#F5A3B7] cursor-pointer">
            See All
          </p>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500 mt-4">No products available.</p>
        ) : (
          <div className="w-full relative lg:py-[30px] py-[20px]">
            <button
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 rounded-full hidden lg:flex z-[20]"
              onClick={() => scroll("left")}
            >
              <img src="/svgs/Shared/ProductSection/leftArrow.svg" alt="Left" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-[10px] overflow-x-scroll scrollbar-hide flex-nowrap relative"
            >
              {products.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  style={{ maxWidth: `${cardWidth}px`, width: "100%" }}
                  className="shrink-0"
                >
                  <ProductCard
                    product={product as any}
                    addToCart={() => addToCart(product.id)}
                    toggleWishlist={() => toggleWishlist(product.id)}
                    isInWishlist={
                      typeof isInWishlist === "function"
                        ? isInWishlist(product.id)
                        : false
                    }
                  />
                </div>
              ))}
            </div>

            <button
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 rounded-full hidden lg:flex z-[20]"
              onClick={() => scroll("right")}
            >
              <img
                src="/svgs/Shared/ProductSection/rightArrow.svg"
                alt="Right"
              />
            </button>
          </div>
        )}

        {products.length > 4 && (
          <div className="flex mt-4 gap-2">
            {Array.from({ length: Math.min(totalDots, 4) }).map((_, index) => {
              let startIndex = Math.min(currentIndex, totalDots - 4);
              let dotIndex = startIndex + index;

              return (
                <button
                  key={dotIndex}
                  className={`w-[10px] h-[10px] rounded-full ${
                    dotIndex === currentIndex ? "bg-[#B0A6BD]" : "bg-[#DFE1E3]"
                  }`}
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({
                        left: dotIndex * scrollAmount,
                        behavior: "smooth",
                      });
                    }
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ProductSection;
