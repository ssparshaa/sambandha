"use client";
import type { NextPage } from "next";
import Image from "next/image";

export type AddAddressType = {
  className?: string;
  onClose?: () => void;
};

const AddAddress: NextPage<AddAddressType> = ({ className = "", onClose }) => {
  return (
    <div
      className={`w-[350px] relative rounded-[15px] bg-[#e3f0ea] overflow-hidden flex flex-col items-center justify-center py-[25px] px-[24px] box-border gap-[10px] max-w-full max-h-full text-left text-[14px] text-[#000] font-[Poppins] ${className}`}
    >
      <Image
        className="w-[12px] absolute !m-[0] top-[19px] left-[323px] h-[12px] cursor-pointer z-[0]"
        width={12}
        height={12}
        alt=""
        src="/icon.svg"
        onClick={onClose}
      />
      <div className="self-stretch rounded-[15px] flex flex-col items-center justify-end py-[15px] px-[10px] gap-[13px] z-[1]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[9px] mq350small:self-stretch mq350small:w-auto">
          <div className="self-stretch relative tracking-[0.01em] font-semibold lg:self-stretch lg:w-auto mq350small:self-stretch mq350small:w-auto">
            Enter Address
          </div>
          <textarea className="border-[rgba(0,0,0,0.1)] border-solid border-[1px] bg-[transparent] [outline:none] self-stretch rounded-[7px] box-border h-[50px]" />
        </div>
        <button className="cursor-pointer border-[#000] border-solid border-[1px] py-[10px] px-[3px] bg-[#2e2e2e] self-stretch rounded-[15px] box-border h-auto flex flex-row items-center justify-center max-w-full [object-fit:contains] lg:rounded-[15px] lg:pl-[0px] lg:pr-[0px] lg:box-border sm:h-auto">
          <div className="flex-1 relative text-[13px] tracking-[0.01em] font-semibold font-[Poppins] text-[#fff] text-center lg:flex-1 sm:text-[13px] sm:self-stretch sm:h-auto mq350small:flex-1">
            Confirm
          </div>
        </button>
      </div>
    </div>
  );
};

export default AddAddress;
