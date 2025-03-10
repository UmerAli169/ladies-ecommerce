"use client";
import { useRef, useState, useEffect } from "react";
import Wrapper from "@/app/wrapper";
import ProductCard from "../shared/ProductCard";
import { CartModal } from "../model/RightModal";

const ProductSection = ({ title, products, cardWidth }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320 * 4;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = 320;
        const visibleIndex = Math.round(scrollLeft / (cardWidth * 4));
        setCurrentIndex(visibleIndex);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const totalDots = Math.ceil(products.length / 4);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCartItems((prev) => [...prev, product]);
    setIsCartOpen(true);
  };
  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center w-full lg:pt-[80px] pt-[71px] relative">
        <div className="text-center">
          <div className="flex gap-[10px]">
            <img src="/svgs/Shared/ProductSection/leftflower.svg" alt="" />
            <p className="lg:text-[24px] text-[20px] text-[#383838] font-bold">
              {title}
            </p>
            <img src="/svgs/Shared/ProductSection/rightflower.svg" alt="" />
          </div>
          <p className="text-[18px] text-[#697586] font-normal hover:text-[#F5A3B7]">
            See All
          </p>
        </div>

        <div className="w-full  relative lg:py-[30px] py-[20px] ">
          <button
            className="absolute left-[-20px] top-1/2 -translate-y-1/2  rounded-full hidden lg:flex z-[20]"
            onClick={() => scroll("left")}
          >
            <img src="/svgs/Shared/ProductSection/leftArrow.svg" alt="" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-[10px] overflow-x-scroll scrollbar-hide flex-nowrap relative"
          >
            {products.map((product: any, index: number) => (
              <div
                key={`${product.id}-${index}`}
                style={{ maxWidth: `${cardWidth}px`, width: "100%" }}
                className="shrink-0"
              >
                <ProductCard product={product} addToCart={addToCart} />
              </div>
            ))}

            <CartModal
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cartItems={cartItems}
            />
          </div>

          <button
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 rounded-full hidden lg:flex  z-[20]"
            onClick={() => scroll("right")}
          >
            <img src="/svgs/Shared/ProductSection/rightArrow.svg" alt="" />
          </button>
        </div>

        <div className="flex mt-4 gap-2">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              className={`w-[10px] h-[10px] rounded-full ${
                index === currentIndex ? "bg-[#B0A6BD]" : "bg-[#DFE1E3]"
              }`}
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: index * 320 * 4,
                    behavior: "smooth",
                  });
                }
              }}
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductSection;
