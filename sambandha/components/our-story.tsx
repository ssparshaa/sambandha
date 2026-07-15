import type { NextPage } from "next";
import Image from "next/image";

export type OurStoryType = {
  className?: string;
};

const OurStory: NextPage<OurStoryType> = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch bg-[#fff] overflow-hidden flex flex-row items-center justify-center md:flex-col py-[27px] px-[40px] gap-[40px] text-left text-[44px] text-[#151313] font-['EB_Garamond'] sm:flex-col sm:pl-[20px] sm:pr-[20px] sm:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-center gap-[14px] sm:flex-[unset] sm:self-stretch">
        <div className="relative tracking-[0.02em] md:text-center sm:tracking-[0.02em] sm:text-left">
          <p className="m-[0px]">{`Our `}</p>
          <p className="m-[0px]">Story</p>
        </div>
        <div className="self-stretch relative text-[20px] md:text-[16px] font-[Jost] text-[#373737] sm:text-[16px] mq350small:text-[14px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
          nibh pharetra ultrices pellentesque. Amet nunc vel aliquet augue
          tellus at bibendum molestie sem. Sed turpis cras arcu pharetra,
          pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Elementum nibh pharetra ultrices pellentesque. Amet nunc vel aliquet
          augue tellus at bibendum molestie sem. Sed turpis cras arcu pharetra,
          pharetra.
        </div>
        <div className="flex flex-row items-center justify-start gap-[5px] text-[24px] text-[#151515] font-['Neue_Montreal']">
          <div className="relative font-medium mq350small:text-[20px]">
            View Project
          </div>
          <Image
            className="w-[26.5px] relative h-[24.5px] object-contain"
            width={27}
            height={25}
            alt=""
            src="/vector-3-stroke.svg"
          />
        </div>
      </div>
      <Image
        className="flex-1 relative max-w-full overflow-hidden h-[501px] object-cover sm:flex-[unset] sm:self-stretch"
        width={670}
        height={501}
        alt=""
        src="/rectangle-2-1@2x.png"
      />
    </div>
  );
};

export default OurStory;
