import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export type CartPageType = {
  className?: string;
  onClose?: () => void;
};

const CartPage: NextPage<CartPageType> = ({ className = "", onClose }) => {
  const router = useRouter();
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );
    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  const onCheckoutButtonClick = useCallback(() => {
    router.push("/checkout");
  }, [router]);

  return (
    <div
      className={`w-[520px] relative bg-text-white-trng h-full overflow-hidden flex flex-col items-start justify-start p-3xs box-border gap-[81px] [&.animate]:animate-[0.25s_ease_0s_1_normal_forwards_slide-in-right] opacity-[0] max-w-[90%] text-left text-xl text-black font-poppins ${className}`}
      data-animate-on-scroll
    >
      <div className="self-stretch bg-text-white-trng overflow-hidden flex flex-row items-start justify-start p-3xs gap-2.5">
        <b className="flex-1 relative tracking-[0.01em] lg:flex-1 mq350small:flex-1">
          Cart
        </b>
        <Image
          className="w-[17px] relative h-[17px]"
          width={17}
          height={17}
          alt=""
          src="/exit.svg"
        />
      </div>
      <div className="self-stretch border-gray-600 border-solid border-b-[1px] flex flex-row items-start justify-start p-3xs gap-[15px] text-base lg:self-stretch lg:w-auto">
        <Image
          className="w-20 rounded-3xs h-20 object-cover mq350small:w-auto mq350small:[align-self:unset] mq350small:h-auto"
          width={80}
          height={80}
          alt=""
          src="/productimage@2x.png"
        />
        <div className="flex-1 flex flex-col items-start justify-start gap-[5px] mq350small:flex-1">
          <div className="relative tracking-[0.01em] font-medium lg:self-stretch lg:w-auto mq350small:self-stretch mq350small:w-auto">
            Tshirt
          </div>
          <b className="relative text-sm tracking-[0.01em] lg:self-stretch lg:w-auto mq350small:self-stretch mq350small:w-auto">
            Rs 200.00
          </b>
          <div className="rounded-3xs border-gray-400 border-solid border-[1px] box-border h-[41px] flex flex-row items-center justify-center p-3xs gap-[25px] text-smi">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-sm tracking-[0.01em] font-poppins text-black text-center inline-block lg:flex-1 mq350small:flex-1">
              +
            </button>
            <div className="relative tracking-[0.01em] sm:text-smi mq350small:flex-1">
              1
            </div>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-sm tracking-[0.01em] font-poppins text-black text-center inline-block lg:flex-1 mq350small:flex-1">
              -
            </button>
          </div>
        </div>
        <Image
          className="w-3 relative h-3"
          width={12}
          height={12}
          alt=""
          src="/icon.svg"
        />
      </div>
      <div className="self-stretch flex-1 flex flex-col items-center justify-end p-lg box-border max-w-full [object-fit:contains] h-auto lg:self-stretch lg:w-auto lg:pl-2.5 lg:pr-2.5 lg:box-border mq350small:self-stretch mq350small:w-auto mq350small:flex-1 mq350small:pl-[30px] mq350small:pr-[30px] mq350small:box-border mq350small:h-auto">
        <button
          className="cursor-pointer border-black border-solid border-[1px] py-2.5 px-[3px] bg-darkslategray-200 self-stretch rounded-3xs box-border h-auto flex flex-row items-start justify-center gap-2.5 max-w-full [object-fit:contains] lg:rounded-mini lg:pl-0 lg:pr-0 lg:box-border sm:h-auto"
          onClick={onCheckoutButtonClick}
        >
          <b className="flex-1 relative text-smi tracking-[0.01em] font-poppins text-text-white-trng text-right lg:flex-1 sm:text-smi sm:self-stretch sm:h-auto mq350small:flex-1">
            Checkout
          </b>
          <div className="flex-1 relative text-smi tracking-[0.01em] font-poppins text-text-white-trng text-left lg:flex-1 sm:text-smi sm:self-stretch sm:h-auto mq350small:flex-1">
            Rs 200.00
          </div>
        </button>
      </div>
    </div>
  );
};

export default CartPage;
