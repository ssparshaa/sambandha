"use client";

import { NextPage } from "next";

export type TextbannerType = {
  className?: string;
};

const Textbanner: NextPage<TextbannerType> = ({ className = "" }) => {
  return (
    <div className={`w-full overflow-hidden py-24 bg-white ${className}`}>
      <div className="relative flex whitespace-nowrap">
        <div className="flex space-x-10 text-[140px] text-[#151313] font-['Reckless_Neue'] sm:text-[70px] animate-scroll">
          <span>{`SAMBANDHA - `}</span>
          <span className="text-[#d8d8d8]">
            SINCE 2019 // WORLD’S FINEST JEWELLERY
          </span>
        </div>
        <div className="flex space-x-10 text-[140px] text-[#151313] font-['Reckless_Neue'] sm:text-[70px] animate-scroll">
          <span>{`SAMBANDHA - `}</span>
          <span className="text-[#d8d8d8]">
            SINCE 2019 // WORLD’S FINEST JEWELLERY
          </span>
        </div>
      </div>

      {/* Inline CSS for smooth infinite scrolling */}
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          display: flex;
          min-width: max-content;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Textbanner;
