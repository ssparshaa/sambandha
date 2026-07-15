"use client";
import type { NextPage } from "next";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type ProductType = {
  className?: string;
};

const Product: NextPage<ProductType> = ({ className = "" }) => {
  const router = useRouter();

  const onProductContainerClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='productContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start" });
    }
  }, []);

  const onFrameContainerClick = useCallback(() => {
    router.push("/product-page");
  }, [router]);

  return (
    <div
      className={`min-w-screen w-full flex flex-col items-center justify-center py-0  gap-[20px] cursor-pointer text-center text-[16px] text-[#151313] font-['Neue_Montreal'] sm:px-[20px] sm:box-border ${className}`}
      data-scroll-to="productContainer"
      onClick={onProductContainerClick}
    >
      <div className="w-full flex flex-col items-center justify-center py-[20px] px-0 gap-[10px]">
        <div className="w-full relative md:text-center">DISCOVER ALL TRENDS</div>
        <div className="w-full relative text-[44px] tracking-[0.02em] font-['Reckless_Neue'] md:text-center sm:text-[34px] sm:text-center">
          TRENDING JEWELLERY
        </div>
      </div>
      <div className="w-full flex flex-row lg:gap-[10px] md:flex-col  items-center justify-center text-left text-[24px] sm:flex-col sm:gap-[60px] sm:px-5">
        <div
          className="flex-1 flex flex-col px-5 items-start justify-start gap-[20px] cursor-pointer md:h-auto sm:w-full"
          onClick={onFrameContainerClick}
        >
          <div className="w-full relative overflow-hidden h-[600px] md:h-[400px] sm:h-[300px] rounded-lg">
            <Image
              className="w-full h-full object-cover"
              width={661}
              height={700}
              alt=""
              src="/rectangle-4491@2x.png"
            />
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-[14px]">
            <div className="w-full flex flex-row items-center justify-start gap-[10px] font-['Reckless_Neue']">
              <div className="relative font-medium">
                Snake Chain Necklace 50cm/20'
              </div>
              <Image
                className="w-[24px] relative h-[24px] overflow-hidden shrink-0"
                width={24}
                height={24}
                alt=""
                src="/frame-13.svg"
              />
            </div>
            <div className="flex flex-row items-center justify-start gap-[20px] text-[14px]">
              <div className="flex flex-row items-center justify-start gap-[10px]">
                <Image
                  className="w-[38px] relative rounded-full h-[38px] object-cover"
                  width={38}
                  height={38}
                  alt=""
                  src="/ellipse-21@2x.png"
                />
                <Image
                  className="w-[34px] relative rounded-full h-[34px] object-cover"
                  width={34}
                  height={34}
                  alt=""
                  src="/ellipse-23@2x.png"
                />
              </div>
              <div className="relative">18ct Gold Vermeil</div>
            </div>
            <div className="relative text-[20px] sm:text-[15px]">Rs 5000</div>
          </div>
        </div>
        <div
          className="flex-1 px-5 flex flex-col items-start  justify-start gap-[20px] cursor-pointer md:h-auto sm:w-full"
          onClick={onFrameContainerClick}
        >
          <div className="w-full relative overflow-hidden h-[600px] md:h-[400px] sm:h-[300px] rounded-lg">
            <Image
              className="w-full h-full object-cover"
              width={661}
              height={700}
              alt=""
              src="/rectangle-450@2x.png"
            />
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-[14px]">
            <div className="w-full flex flex-row items-center justify-start gap-[10px] font-['Reckless_Neue']">
              <div className="relative font-medium">
                Alta Capture Charm Bracelet
              </div>
              <Image
                className="w-[24px] relative h-[24px] overflow-hidden shrink-0"
                width={24}
                height={24}
                alt=""
                src="/frame-13.svg"
              />
            </div>
            <div className="flex flex-row items-center justify-start gap-[20px] text-[14px]">
              <div className="flex flex-row items-center justify-start gap-[10px]">
                <Image
                  className="w-[38px] relative rounded-full h-[34px] object-cover"
                  width={38}
                  height={38}
                  alt=""
                  src="/ellipse-211@2x.png"
                />
                <Image
                  className="w-[34px] relative rounded-full h-[34px] object-cover"
                  width={34}
                  height={34}
                  alt=""
                  src="/ellipse-231@2x.png"
                />
              </div>
              <div className="relative">18ct Gold Vermeil</div>
            </div>
            <div className="relative text-[20px] sm:text-[15px]">Rs 5000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
