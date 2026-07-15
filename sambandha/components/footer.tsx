import type { NextPage } from "next";
import Image from "next/image";

export type FooterType = {
  className?: string;
};

const Footer: NextPage<FooterType> = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-center justify-center py-[100px] px-[40px] gap-[50px] text-left text-[20px] text-[#656665] font-['Reckless_Neue'] md:flex-col ${className}`}
    >
      <div className="self-stretch flex-1 flex flex-col items-center justify-center gap-[10px] md:flex-[unset] md:self-stretch">
        <Image
          className="w-[266px] relative max-h-full object-cover"
          width={266}
          height={67}
          alt=""
          src="/32@2x.png"
        />
        <div className="flex flex-col items-center justify-start gap-[20px]">
          <i className="relative leading-[22px]">FOLLOW US ON</i>
          <div className="flex flex-row items-start justify-start gap-[20px]">
            <button className="cursor-pointer [border:none] p-[0px] bg-[transparent] flex flex-row items-center justify-center relative gap-[10px]">
              <div className="w-[48px] relative [backdrop-filter:blur(6px)] rounded-[50%] border-[rgba(21,19,19,0.4)] border-solid border-[1px] box-border h-[48px] z-[0]" />
              <Image
                className="w-[24px] absolute !m-[0] top-[calc(50%_-_12px)] left-[calc(50%_-_12px)] h-[24px] overflow-hidden shrink-0 z-[1]"
                width={24}
                height={24}
                alt=""
                src="/liinstagram.svg"
              />
            </button>
            <button className="cursor-pointer [border:none] p-[0px] bg-[transparent] flex flex-row items-center justify-center relative gap-[10px]">
              <div className="w-[48px] relative [backdrop-filter:blur(6px)] rounded-[50%] border-[rgba(21,19,19,0.4)] border-solid border-[1px] box-border h-[48px] z-[0]" />
              <Image
                className="w-[24px] absolute !m-[0] top-[12px] left-[12px] h-[24px] overflow-hidden shrink-0 z-[1]"
                width={24}
                height={24}
                alt=""
                src="/lifacebook.svg"
              />
            </button>
            <button className="cursor-pointer [border:none] p-[0px] bg-[transparent] flex flex-row items-center justify-center relative gap-[10px]">
              <div className="w-[48px] relative [backdrop-filter:blur(6px)] rounded-[50%] border-[rgba(21,19,19,0.4)] border-solid border-[1px] box-border h-[48px] z-[0]" />
              <Image
                className="w-[24px] absolute !m-[0] top-[12px] left-[12px] h-[24px] overflow-hidden shrink-0 z-[1]"
                width={24}
                height={24}
                alt=""
                src="/litwitter.svg"
              />
            </button>
            <button className="cursor-pointer [border:none] p-[0px] bg-[transparent] flex flex-row items-center justify-center relative gap-[10px]">
              <div className="w-[48px] relative [backdrop-filter:blur(6px)] rounded-[50%] border-[rgba(21,19,19,0.4)] border-solid border-[1px] box-border h-[48px] z-[0]" />
              <Image
                className="w-[24px] absolute !m-[0] top-[12px] left-[12px] h-[24px] overflow-hidden shrink-0 z-[1]"
                width={24}
                height={24}
                alt=""
                src="/liyoutube.svg"
              />
            </button>
            <button className="cursor-pointer [border:none] p-[0px] bg-[transparent] flex flex-row items-center justify-center relative gap-[10px]">
              <div className="w-[48px] relative [backdrop-filter:blur(6px)] rounded-[50%] border-[rgba(21,19,19,0.4)] border-solid border-[1px] box-border h-[48px] z-[0]" />
              <Image
                className="w-[24px] absolute !m-[0] top-[12px] left-[12px] h-[24px] overflow-hidden shrink-0 z-[1]"
                width={24}
                height={24}
                alt=""
                src="/litwitch.svg"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="self-stretch flex-1 flex flex-row items-center justify-center text-[#151313] md:flex-[unset] md:self-stretch">
        <div className="flex flex-col items-start justify-start gap-[20px] md:items-center md:justify-center">
          <div className="relative leading-[22px]">SHOP</div>
          <div className="flex flex-col items-start justify-start gap-[10px] md:items-center md:justify-center">
            <button className="cursor-pointer [border:none] p-[0px] bg-[transparent] relative text-[14px] tracking-[-0.02em] font-[Poppins] text-[#656665] text-left inline-block">
              New arrival
            </button>
            <button className="cursor-pointer [border:none] p-[0px] bg-[transparent] relative text-[14px] tracking-[-0.02em] font-[Poppins] text-[#656665] text-left inline-block">
              Shop by category
            </button>
            <button className="cursor-pointer [border:none] p-[0px] bg-[transparent] relative text-[14px] tracking-[-0.02em] font-[Poppins] text-[#656665] text-left inline-block">
              Shop by collection
            </button>
            <button className="cursor-pointer [border:none] p-[0px] bg-[transparent] relative text-[14px] tracking-[-0.02em] font-[Poppins] text-[#656665] text-left inline-block">
              Gift
            </button>
          </div>
          <div className="relative text-[15px] leading-[22px] font-medium font-['Neue_Montreal'] text-[rgba(0,0,0,0.3)]">
            © 2025 — Copyright
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
