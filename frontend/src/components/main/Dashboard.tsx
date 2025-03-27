import Wrapper from "@/app/wrapper";
import React from "react";
import Button from "../shared/Button";

function Dashboard() {
  return (
    <div className="bg-[#F5E0E5] lg:py-[102px] py-[78px] relative">
      <img
        src="/main.png"
        alt="main"
        className="absolute top-[12px]   inset-0 lg:min-h-[500px] w-full h-full md:min-h-[300px]  object-cover object-top z-[1] overflow-hidden  "
      />
      <Wrapper>
        <div className="lg:max-w-[592px] md:max-w-[212px] min-w-[179px] relative z-10 flex flex-col lg:gap-[20px] gap-[10px]">
          <p className="lg:text-[36px] text-[18px] font-bold text-[#383838]">
            DISCOVER YOUR INNER BEAUTY WITH BLOSSOM GLOW KIT
          </p>
          <p className="lg:text-[24px]  lg:max-w-[562px] max-w-[159px] text-[14px] font-normal">
            Great gift for yourself and loved ones
          </p>
          <Button className="lg:max-w-[246px]  max-w-[200px] w-full lg:mt-[34px] text-[14px] text-[#FFFFFF] font-semibold lg:py-[8.5px] px-[10px] py-[8px] hover:bg-black hover:text-white">
            Shop Now
          </Button>
        </div>
      </Wrapper>
    </div>
  );
}

export default Dashboard;
