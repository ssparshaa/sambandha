import * as React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex gap-1.5 justify-center items-center ${className}`}>
      <Image
        src="https://api.builder.io/api/v1/image/assets/TEMP/99cb12525e242aadfab6c5c5815d4d264d69be45?width=54"
        alt=""
        width={27}
        height={27}
        className="aspect-[1/1] h-[27px] w-[27px]"
      />
      <div className="text-xl font-semibold leading-8 text-zinc-800">
        <div className="text-xl font-bold text-zinc-800">Sambandha</div>
      </div>
    </div>
  );
}
