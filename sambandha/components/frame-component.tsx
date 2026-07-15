import type { NextPage } from "next";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export type FrameComponentType = {
  className?: string;
  rectangle543: string;
  nATIVEIRONCHAIR?: string;
  prop?: string;
};

const FrameComponent: NextPage<FrameComponentType> = ({
  className = "",
  rectangle543,
  nATIVEIRONCHAIR,
  prop,
}) => {
  const router = useRouter();

  const onFrameContainerClick = useCallback(() => {
    router.push("/single-product-page");
  }, [router]);

  return (
    <div
      className={`flex-1 flex flex-col items-center justify-center gap-2.5 min-w-[200px] cursor-pointer text-left text-xs text-stormy font-paragraph-small ${className}`}
      onClick={onFrameContainerClick}
    >
      <Image
        className="self-stretch relative max-w-full overflow-hidden h-[331px] shrink-0 object-cover"
        width={328}
        height={331}
        alt=""
        src={rectangle543}
      />
      <div className="self-stretch flex flex-row items-start justify-between">
        <div className="relative tracking-[0.1em] leading-[14px]">
          {nATIVEIRONCHAIR}
        </div>
        <div className="relative tracking-[0.1em] leading-[14px] text-opal">
          {prop}
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
