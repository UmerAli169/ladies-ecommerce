"use client";
import React, { useState, useEffect } from "react";
import { getReviewsByProduct } from "../../services/internal";
import Button from "../shared/Button";
import Wrapper from "@/app/wrapper";
import { ReviewModal } from "./WriteReview";
import { useAuthStore } from "@/store/authStore";
const ReviewSection = ({ productId }: { productId: string }) => {
  const UserId = useAuthStore((state: any) => state.user.user._id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByProduct(productId);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);


  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review: any) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <Wrapper>
      <div className="rounded-lg py-[40px] w-full mx-auto">
        <div className="text-center">
          <div className="flex gap-[10px] justify-center items-center">
            <img
              src="/svgs/Shared/ProductSection/leftflower.svg"
              alt="left decoration"
            />
            <p className="lg:text-[24px] text-[20px] text-[#383838] font-bold">
              Reviews All
            </p>
            <img
              src="/svgs/Shared/ProductSection/rightflower.svg"
              alt="right decoration"
            />
          </div>

          <p className="text-[18px] text-[#697586] font-normal hover:text-[#F5A3B7] cursor-pointer">
            See All
          </p>

          <div className="flex flex-col gap-[20px] text-center mt-2">
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < Math.round(Number(averageRating))
                        ? "/svgs/Shared/reviews/starts.svg"
                        : "/svgs/Shared/ProductSection/cardStar.svg"
                    }
                    alt="star"
                    className="w-4"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">{averageRating} /5</p>
            </div>

            <div>
              <Button
                className="lg:p-[10px] max-w-[246px] w-full px-[10px] py-[8px] bg-white text-black border border-black hover:bg-black hover:text-white"
                onClick={() => setIsModalOpen(true)}
              >
                Write a Review
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-[40px] space-y-[30px]">
          {reviews.map((review: any, index) => (
            <div key={review._id || index} className="rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  <img
                    src={review.userProfile || "/reviews/reviewpic.png"}
                    alt=""
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium font-[14px] leading-[20px]">
                      {review.userId.firstName}
                    </p>
                    {review.verified && (
                      <p className="font-normal text-[#B0A6BD] font-[14px] leading-[20px]">
                        Verified Reviewer
                      </p>
                    )}
                  </div>

                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        src={
                          i < review.rating
                            ? "/svgs/Shared/reviews/starts.svg"
                            : "/svgs/Shared/ProductSection/cardStar.svg"
                        }
                        alt="star"
                        className="w-4"
                      />
                    ))}
                  </div>
                </div>
                <span className="ml-auto font-normal text-[#B0A6BD] font-[14px] leading-[20px]">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                </span>
              </div>
              <div className="mt-[20px]">
                <p className="font-medium font-[16px] leading-[20px] ml-[50px]">
                  {review.title}
                </p>
                <p className="font-normal font-[14px] leading-[22px] text-[#697586] ml-[50px]">
                  {review.text}
                </p>
                {review.images?.length > 0 && (
                  <div className="flex gap-2 mt-2 ml-[50px]">
                    {review.images.map((img: string, i: number) => (
                      <img
                        key={i}
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${img}`}
                        alt="review"
                        className="w-16 h-16 rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userId={UserId}
          productId={productId}
        />
      )}
    </Wrapper>
  );
};

export default ReviewSection;
