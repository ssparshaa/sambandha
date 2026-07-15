"use client";
import type { NextPage } from "next";
import { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NavbarDrawer from "./navbar-drawer";
import PortalDrawer from "./portal-drawer";

export type HeroType = {
  className?: string;
};

const Hero: NextPage<HeroType> = ({ className = "" }) => {
  const router = useRouter();
  const [isNavbarDrawerOpen, setNavbarDrawerOpen] = useState(false);

  const onFrameContainerClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='heroDescriptionContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, []);

  const onFrameContainerClick1 = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='productContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, []);

  const onFrameButtonClick = useCallback(() => {
    router.push("/about-us");
  }, [router]);

  const openNavbarDrawer = useCallback(() => {
    setNavbarDrawerOpen(true);
  }, []);

  const closeNavbarDrawer = useCallback(() => {
    setNavbarDrawerOpen(false);
  }, []);

  const onHeroCTAContainerClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='productContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <div
        className={`self-stretch h-[785px] flex flex-col items-start justify-start bg-[url('/hero@3x.png')] bg-cover bg-no-repeat bg-[top] text-left text-[16px] text-[#151313] font-['Reckless_Neue'] ${className}`}
      >
        <div className="self-stretch [backdrop-filter:blur(18px)] bg-[rgba(227,240,234,0.3)] flex flex-row items-center justify-center py-[12px] px-[40px] gap-[10px] md:pl-[20px] md:pr-[20px] md:box-border mq350small:pl-[20px] mq350small:pr-[20px] mq350small:box-border">
          <div className="flex-1 flex flex-col items-start justify-start">
            <Image
              className="w-[135px] relative h-[34px] object-cover"
              width={135}
              height={34}
              alt=""
              src="/31@2x.png"
            />
          </div>
          <div className="flex-1 flex flex-row items-center justify-center gap-[54px] md:hidden">
            <div
              className="flex flex-row items-center justify-start gap-[6px] cursor-pointer"
              onClick={onFrameContainerClick}
            >
              <div className="flex flex-row items-center justify-start">
                <div className="relative">Home</div>
              </div>
              <Image
                className="w-[10px] relative h-[10px]"
                width={10}
                height={10}
                alt=""
                src="/frame-4.svg"
              />
            </div>
            <div
              className="flex flex-row items-center justify-start gap-[6px] cursor-pointer"
              onClick={onFrameContainerClick1}
            >
              <div className="flex flex-row items-center justify-start">
                <div className="relative">Products</div>
              </div>
              <Image
                className="w-[10px] relative h-[10px]"
                width={10}
                height={10}
                alt=""
                src="/frame-4.svg"
              />
            </div>
            <button
              className="cursor-pointer [border:none] p-[0px] bg-[transparent] flex flex-row items-center justify-start gap-[8px]"
              onClick={onFrameButtonClick}
            >
              <div className="relative text-[16px] font-['Reckless_Neue'] text-[#151313] text-left">
                About Us
              </div>
              <Image
                className="w-[10px] relative h-[10px]"
                width={10}
                height={10}
                alt=""
                src="/frame-4.svg"
              />
            </button>
          </div>
          <div className="flex-1 flex flex-row items-center justify-end gap-[20px] md:flex">
            <Image
              className="w-[20px] relative h-[20px] overflow-hidden shrink-0 md:hidden"
              width={20}
              height={20}
              alt=""
              src="/lishoppingbag.svg"
            />
            <div
              className="h-[22px] flex flex-col items-end justify-center gap-[9px] cursor-pointer md:flex"
              onClick={openNavbarDrawer}
            >
              <Image
                className="w-[20.3px] relative max-h-full"
                width={20}
                height={2}
                alt=""
                src="/vector.svg"
              />
              <Image
                className="w-[20.3px] relative max-h-full"
                width={20}
                height={2}
                alt=""
                src="/vector1.svg"
              />
              <Image
                className="w-[20.3px] relative max-h-full"
                width={20}
                height={2}
                alt=""
                src="/vector2.svg"
              />
            </div>
          </div>
        </div>
        <div
          className="self-stretch flex-1 flex flex-col items-center justify-center py-[130px] px-[40px] text-[60px] text-[#fff] font-['Jost']"
          data-scroll-to="heroDescriptionContainer"
        >
          <div className="self-stretch flex-1 flex flex-col items-start justify-center gap-[30px] md:items-center md:justify-center mq350small:items-center mq350small:justify-center">
            <div className="flex flex-row items-center justify-start gap-[8px] md:justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.5 8 2 11.5 2 15.5C2 19.09 6.69 22 12 22C17.31 22 22 19.09 22 15.5C22 11.5 17.5 8 12 2Z" fill="#d4a853"/>
              </svg>
              <span className="text-[13px] font-['Jost'] font-medium tracking-[0.08em] uppercase text-[#f5e6c8]">
                Loved by 1,800+ customers
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.5 8 2 11.5 2 15.5C2 19.09 6.69 22 12 22C17.31 22 22 19.09 22 15.5C22 11.5 17.5 8 12 2Z" fill="#d4a853"/>
              </svg>
            </div>
            <div className="self-stretch relative leading-[78px] font-['EB_Garamond'] md:text-[45px] md:leading-[45px] md:text-center">
              <p className="m-[0px]">UNIQUE</p>
              <p className="m-[0px]">
                <i className="font-['EB_Garamond']">{`AND `}</i>
                <span>AUTHENTIC</span>
              </p>
              <p className="m-[0px]">
                <span>{`VINTAGE `}</span>
                <i className="font-['EB_Garamond']">DESIGNER</i>
              </p>
              <p className="m-[0px]">JEWELLERY</p>
            </div>
            <div className="self-stretch relative text-[20px] uppercase font-medium md:text-[12px] md:text-center">
              Now Available in Sambandha
            </div>
            <div
              className="border-[#fff] border-solid border-[1px] flex flex-row items-center justify-start py-[13px] px-[24px] cursor-pointer text-[16px]"
              onClick={onHeroCTAContainerClick}
            >
              <b className="relative md:text-[14px]">DISCOVER MORE</b>
            </div>
          </div>
        </div>
      </div>
      {isNavbarDrawerOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Right"
          onOutsideClick={closeNavbarDrawer}
        >
          <NavbarDrawer onClose={closeNavbarDrawer} />
        </PortalDrawer>
      )}
    </>
  );
};

export default Hero;
