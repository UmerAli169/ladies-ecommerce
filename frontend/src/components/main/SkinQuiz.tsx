import Wrapper from "@/app/wrapper";
import Button from "../shared/Button";

const SkinQuiz = () => {
  return (
    <div className=" lg:py-[80px] pt-[71px] ">
      <div className="bg-[#FEE2E3]/30 flex items-center justify-center  lg:max-h-[226px]  h-full">
        <div className="max-w-4xl flex flex-col md:flex-row items-center">
          <img src="/skaincare.png" alt="Skin Quiz" />
          <Wrapper>
            <div className="md:ml-6 md:text-left flex flex-col  gap-[6px] text-left md:text-left py-[30px] max-w-[449px]">
              <p className="lg:text-[36px] text-[32px] text-[#383838] font-bold">
                The Skin Quiz
              </p>
              <p className="lg:text-[18px] text-[16px] text-[#697586] font-medium">
                Meet the quiz that will curate a routine just just just as
                unique as you are.
              </p>
              <Button className="lg:max-w-[246px] text-[14px] text-[#FFFFFF] font-semibold w-full lg:p-[10px] px-[10px] py-[8px] hover:bg-black hover:text-white">
                Explore More
              </Button>
            </div>{" "}
          </Wrapper>
        </div>
      </div>
    </div>
  );
};

export default SkinQuiz;
