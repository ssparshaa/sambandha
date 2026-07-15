import type { NextPage } from "next";
import Image from "next/image";

export type MemoryType = {
  className?: string;
};

const Memory: NextPage<MemoryType> = ({ className = "" }) => {
  return (
    <div
      className={`rounded-9xl [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.15),_rgba(0,_0,_0,_0.15))] overflow-hidden flex flex-col items-center justify-start py-[66px] px-0 gap-5 text-center text-lg text-black font-roboto mq480:self-stretch mq480:w-auto mq480:pl-0 mq480:box-border ${className}`}
    >
      <div className="relative font-light sm:text-base">22/10/2025</div>
      <div className="relative text-9xl font-light text-left sm:text-5xl">
        Choose your wallpaper
      </div>
      <div className="self-stretch overflow-hidden flex flex-col items-center justify-center gap-5">
        <div className="flex flex-row items-start justify-start py-0 px-10">
          <Image
            className="w-[414px] relative rounded-2xl h-[370px] object-cover sm:w-[310px] sm:h-[310px] mq350small:w-[270px] mq350small:h-[300px] mq480:w-[360px]"
            width={414}
            height={370}
            alt=""
            src="/rectangle-15@2x.png"
          />
        </div>
        <Image
          className="w-[67px] relative h-5"
          width={67}
          height={20}
          alt=""
          src="/full-pagination-sets.svg"
        />
      </div>
      <div className="relative font-light sm:text-xs">
        <p className="m-0">You can change your wallpaper</p>
        <p className="m-0">picture later on ...</p>
      </div>
    </div>
  );
};

export default Memory;
