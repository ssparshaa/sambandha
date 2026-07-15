"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import HeroMemorySection from "./hero-memory-section";

export type MemorySectionType = {
  className?: string;
};

const MemorySection: NextPage<MemorySectionType> = ({ className = "" }) => {
  const images = [
    "/rectangle-151@2x.png",
    "/rectangle-152@2x.png",
    "/rectangle-153@2x.png",
    "/rectangle-154@2x.png",
    "/rectangle-155@2x.png",
    "/rectangle-156@2x.png",
    "/rectangle-157@2x.png",
  ];

  const controls = useAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  // Start Animation when component mounts
  useEffect(() => {
    if (isAnimating) {
      controls.start({
        x: ["0%", "-100%"],
        transition: { ease: "linear", duration: 15, repeat: Infinity },
      });
    }
  }, [isAnimating, controls]);

  // Stops animation when clicked
  const handleStopAnimation = () => {
    setIsAnimating(false);
    controls.stop();
  };

  return (
    <div className={`relative w-full py-12  overflow-hidden ${className}`}>
      {/* Title Section */}
      <div className="text-center text-[16px] text-[#151313] font-['Jost']">
        <div className="py-6">
          <div>
            <span>{`BECAUSE `}</span>
            <i>LOVE</i>
            <span> IS MEANT TO BE</span>
          </div>
          <i className="text-[44px] tracking-wide font-['Reckless_Neue'] sm:text-[34px]">
            REMEMBERED
          </i>
        </div>
      </div>

      {/* Scrolling Cards */}
      <div
        ref={scrollRef}
        className="relative w-full h-[528px] overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleStopAnimation} // Stop animation when clicked
        onTouchStart={handleStopAnimation} // Stop on mobile touch
      >
        <motion.div
          className="flex gap-6"
          animate={isAnimating ? controls : undefined}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            cursor: isAnimating ? "pointer" : "grab",
          }}
        >
          {[...Array(2)].flatMap((_, i) =>
            images.map((src, index) => (
              <div
                key={`${i}-${index}`}
                className="flex-shrink-0"
                style={{
                  transform: `translateY(${index % 2 === 0 ? "20px" : "-20px"})`,
                }}
              >
                <HeroMemorySection rectangle15={src} />
              </div>
            ))
          )}
        </motion.div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */
          scrollbar-width: none; /* Hide scrollbar for Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Hide scrollbar for Chrome/Safari */
        }
      `}</style>
    </div>
  );
};

export default MemorySection;
