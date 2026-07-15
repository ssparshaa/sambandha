"use client";
import type { NextPage } from "next";
import Image from "next/image";

export type MemoryComponentType = {
  className?: string;
  onClose?: () => void;
};

const MemoryComponent: NextPage<MemoryComponentType> = ({
  className = "",
  onClose,
}) => {
  return (
    <div
      className={`w-[482px] relative rounded-[15px] bg-[#fff] border-[rgba(0,0,0,0.05)] border-solid border-[1px] box-border flex flex-col items-start justify-start py-[20px] px-[10px] gap-[10px] max-w-full max-h-full overflow-auto text-left text-[12px] text-[#000] font-[Poppins] ${className}`}
    >
      <button
        className="cursor-pointer [border:none] p-[10px] bg-[transparent] self-stretch h-[22px] flex flex-col items-end justify-center box-border"
        onClick={onClose}
      >
        <Image
          className="w-[22px] relative max-h-full cursor-pointer"
          width={22}
          height={22}
          alt=""
          src="/icon2.svg"
          onClick={onClose}
        />
      </button>
      <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-[0px] px-[10px] text-[15px]">
        <div className="flex-1 relative tracking-[0.01em] font-semibold lg:flex-1 mq350small:flex-1">
          Memory Section
        </div>
      </div>
      <div className="self-stretch overflow-hidden flex flex-col items-start justify-start py-[7px] px-[10px] gap-[3px]">
        <div className="relative tracking-[0.01em]">Memory Title</div>
        <div className="self-stretch flex flex-row items-start justify-start">
          <input
            className="border-[rgba(0,0,0,0.1)] border-solid border-[1px] [outline:none] bg-[transparent] flex-1 rounded-[7px] flex flex-row items-start justify-start p-[10px]"
            type="text"
          />
        </div>
      </div>
      <div className="self-stretch overflow-hidden flex flex-col items-start justify-start py-[7px] px-[10px] gap-[3px]">
        <div className="relative tracking-[0.01em]">Memory Description</div>
        <div className="self-stretch flex flex-row items-start justify-start">
          <input
            className="border-[rgba(0,0,0,0.1)] border-solid border-[1px] [outline:none] bg-[transparent] flex-1 rounded-[7px] flex flex-row items-start justify-start p-[10px]"
            type="text"
          />
        </div>
      </div>
      <div className="self-stretch overflow-hidden flex flex-col items-start justify-start py-[7px] px-[10px] gap-[3px]">
        <div className="relative tracking-[0.01em]">Memory Date</div>
        <div className="self-stretch flex flex-row items-start justify-start">
          <input
            className="border-[rgba(0,0,0,0.1)] border-solid border-[1px] [outline:none] bg-[transparent] flex-1 rounded-[7px] flex flex-row items-start justify-start p-[10px]"
            type="text"
          />
        </div>
      </div>
      <div className="self-stretch bg-[#fff] overflow-hidden flex flex-col items-start justify-start py-[7px] px-[10px]">
        <div className="relative tracking-[0.01em]">Insert Image</div>
      </div>
      <div className="self-stretch border-[rgba(0,0,0,0.05)] border-solid border-b-[1px] flex flex-row items-start justify-start p-[10px] gap-[15px] lg:self-stretch lg:w-auto">
        <Image
          className="w-[113px] rounded-[10px] max-h-full object-cover mq350small:h-auto"
          width={113}
          height={113}
          alt=""
          src="/productimage1@2x.png"
        />
        <button className="cursor-pointer [border:none] p-[0px] bg-[transparent] w-[12px] relative h-[12px]" />
      </div>
      <div className="self-stretch bg-[#fff] overflow-hidden flex flex-col items-start justify-start py-[7px] px-[10px]">
        <div className="relative tracking-[0.01em]">Insert Voice Recording</div>
      </div>
      <button className="cursor-pointer border-[#000] border-solid border-[1px] py-[10px] px-[3px] bg-[#000] self-stretch rounded-[10px] box-border h-auto flex flex-row items-center justify-center max-w-full [object-fit:contains] lg:rounded-[15px] lg:pl-[0px] lg:pr-[0px] lg:box-border sm:h-auto">
        <div className="flex-1 relative text-[13px] tracking-[0.01em] font-semibold font-[Poppins] text-[#fff] text-center lg:flex-1 sm:text-[13px] sm:self-stretch sm:h-auto mq350small:flex-1">
          Create a memory
        </div>
      </button>
    </div>
  );
};

export default MemoryComponent;
