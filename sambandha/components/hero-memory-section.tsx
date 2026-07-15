"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Image from "next/image";

export type HeroMemorySectionType = {
  className?: string;
  rectangle15: string;

  /** Style props */
  frameDivAlignItems?: CSSProperties["alignItems"];
};

const HeroMemorySection: NextPage<HeroMemorySectionType> = ({
  className = "",
  frameDivAlignItems,
  rectangle15,
}) => {
  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      alignItems: frameDivAlignItems,
    };
  }, [frameDivAlignItems]);

  return (
    <div
      className={`self-stretch flex flex-row items-end justify-center text-center text-[18px] text-[#000] font-[Roboto] ${className}`}
      style={frameDivStyle}
    >
      <div className="w-[280px] rounded-[15px] [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.15),_rgba(0,_0,_0,_0.15))] h-[452px] overflow-hidden shrink-0 flex flex-col items-center justify-center pt-[0px] px-[0px] pb-[9px] box-border gap-[20px] mq480:flex-1 mq480:pl-[0px] mq480:box-border">
        <div className="relative font-light font-['Reckless_Neue'] sm:text-[16px]">
          22/10/2025
        </div>
        <div className="relative text-[28px] font-light text-left sm:text-[24px]">
          Memory1
        </div>
        <div className="self-stretch overflow-hidden flex flex-col items-center justify-center">
          <div className="self-stretch flex flex-row items-center justify-center">
            <Image
              className="w-[227px] relative rounded-[7px] h-[178px] object-cover sm:w-[240px] sm:h-[240px] mq350small:w-[270px] mq350small:h-[300px] mq480:w-[360px]"
              width={227}
              height={178}
              alt=""
              src={rectangle15}
            />
          </div>
        </div>
        <div className="relative text-[16px] font-light sm:text-[12px]">
          <p className="m-[0px]">You can change your wallpaper</p>
          <p className="m-[0px]">picture later on ...</p>
        </div>
      </div>
    </div>
  );
};

export default HeroMemorySection;
