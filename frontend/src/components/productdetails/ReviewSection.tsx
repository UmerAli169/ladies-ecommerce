"use client";
import React, { useState } from "react";
import reviewsData from "../../Data/reviews/review.json";
import Button from "../shared/Button";
import Wrapper from "@/app/wrapper";
import { ReviewModal } from "./WriteReview";

const ReviewSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

          <div className=" flex flex-col gap-[20px] text-center mt-2">
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="/svgs/Shared/reviews/starts.svg"
                    alt="star"
                    className="w-4"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                {reviewsData.reviews.length} reviews
              </p>
            </div>
            <div>
              <Button
                className="lg:p-[10px] max-w-[246px]  w-full px-[10px] py-[8px] bg-white text-black border border-black hover:bg-black hover:text-white"
                onClick={() => setIsModalOpen(true)}
              >
                Write a Review
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-[40px] space-y-[30px] ">
          {reviewsData.reviews.map((review, index) => (
            <>
              <div key={index} className="rounded-lg ">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    <img src="/reviews/reviewpic.png" alt="" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium font-[14px] leading-[20px]">
                        {review.name}
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
                              : "/svgs/Shared/reviews/starts.svg"
                          }
                          alt="star"
                          className="w-4"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto font-normal text-[#B0A6BD] font-[14px] leading-[20px]">
                    {review.date}
                  </span>
                </div>
                <div className="mt-[20px] ">
                  <p className="font-medium font-[16px]  leading-[20px] ml-[50px] ml-[50px]">
                    {review.title}
                  </p>
                  <p className="font-nomral font-[14px]  leading-[22px] text-[#697586]  font-[Montserrat]ml-[50px] ml-[50px]  ml-[50px]">
                    {review.text}
                  </p>
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mt-2 ml-[50px]">
                      {review.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="review"
                          className="w-16 h-16 rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex   justify-center ">
                <img
                  src="/svgs/Review/flower.svg"
                  alt=""
                  className="max-w-[2600px] w-full"
                />
              </div>
            </>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Wrapper>
  );
};

export default ReviewSection;
