import type { NextPage } from "next";
import Image from "next/image";

export type MemoryCardType = {
  className?: string;
};

const MemoryCard: NextPage<MemoryCardType> = ({ className = "" }) => {
  return (
    <div
      className={`w-[230px] rounded-3xs border-gray-700 border-solid border-[1px] box-border flex flex-col items-start justify-center p-3xs gap-[7px] text-left text-base text-black font-poppins sm:w-[150px] mq350small:w-[130px] mq480:w-[170px] ${className}`}
    >
      <div className="self-stretch flex flex-row items-center justify-end">
        <Image
          className="w-3.5 relative h-3.5"
          width={14}
          height={14}
          alt=""
          src="/icon1.svg"
        />
      </div>
      <Image
        className="self-stretch rounded-3xs max-w-full overflow-hidden h-[188px] shrink-0 object-cover md:self-stretch md:w-auto md:flex-1"
        width={210}
        height={188}
        alt=""
        src="/frame-1410103764@2x.png"
      />
      <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
        <div className="self-stretch relative tracking-[0.01em] font-medium mq350small:text-smi">{`Memory Title `}</div>
        <div className="self-stretch relative text-2xs tracking-[0.01em] font-medium text-gray-200 mq350small:text-3xs">
          Memory Description
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
