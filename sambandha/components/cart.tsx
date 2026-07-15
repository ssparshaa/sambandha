import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartProvider";

export type CartDrawerType = {
  className?: string;
  onClose?: () => void;
};

const Cart: NextPage<CartDrawerType> = ({ className = "", onClose }) => {
  const router = useRouter();
  const { cartItems, totalPrice, removeItem, updateItemQuantity } = useCart();

  const handleQuantityChange = (id, change) => {
    updateItemQuantity(id, change);
  };

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

  const onFrameButtonClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const onCheckoutButtonClick = useCallback(() => {
    const checkoutData = {
      items: cartItems,
      totalPrice: totalPrice,
    };

    // Save to sessionStorage
    sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    router.push("/checkout");
  }, [router]);

  return (
    <div>
      <div
        className={`w-[480px] relative bg-[#e3f0ea] flex flex-col items-center justify-start pt-[15px] px-[10px] pb-[39px] box-border gap-[10px] [&.animate]:animate-[0.25s_ease_0s_1_normal_forwards_slide-in-right] opacity-[0] min-h-screen text-left text-[16px] text-[#151313] font-[Jost] ${className}`}
        data-animate-on-scroll
      >
        <div
          onClick={() => {
            onClose?.();
          }}
          className="self-stretch flex flex-row items-center justify-start"
        >
          <Image
            className="w-[25px] relative max-h-full overflow-hidden shrink-0"
            width={25}
            height={25}
            alt=""
            src="/close.svg"
          />
        </div>
        <div className="self-stretch flex flex-row items-center justify-start py-[0px] px-[10px] text-[20px] font-['Reckless_Neue']">
          <div className="relative font-semibold">Cart</div>
        </div>

        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="self-stretch border-[rgba(0,0,0,0.05)] border-solid border-b-[1px] flex flex-row items-start justify-start p-[10px] gap-[15px] text-[#000] lg:self-stretch lg:w-auto"
              >
                <Image
                  className="w-[80px] rounded-[10px] h-[80px] object-cover mq350small:w-auto mq350small:[align-self:unset] mq350small:h-auto"
                  width={80}
                  height={80}
                  alt=""
                  src={item.productImage}
                />
                <div className="self-stretch flex-1 flex flex-col items-start justify-center gap-[5px] mq350small:flex-1">
                  <div className="relative tracking-[0.01em] font-medium lg:self-stretch lg:w-auto mq350small:self-stretch mq350small:w-auto">
                    {item.productName}
                  </div>
                  <b className="relative text-[14px] tracking-[0.01em] lg:self-stretch lg:w-auto mq350small:self-stretch mq350small:w-auto">
                    Rs {item.productPrice.toFixed(2)}
                  </b>
                </div>
                <div>
                  <span>Quantity</span>
                  <div className="rounded-3xs border-gray-400 border-[1px] border-solid box-border h-[41px] flex flex-row items-center justify-center p-2.5 gap-[25px] text-smi">
                    <button
                      className="cursor-pointer bg-transparent text-lg font-poppins text-red-500 w-[20px] border-r-[1px] border-gray-300 pr-2"
                      onClick={() => handleQuantityChange(item.productId, -1)}
                    >
                      -
                    </button>
                    <div className="relative tracking-[0.01em]">
                      {item.productQuantity}
                    </div>
                    <button
                      className="cursor-pointer bg-transparent text-sm font-poppins text-black w-[20px] border-l-[1px] border-gray-300 pl-2"
                      onClick={() => handleQuantityChange(item.productId, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div onClick={() => removeItem(item.productId)}>
                  <Image
                    className="w-[12px] relative h-[12px]"
                    width={12}
                    height={12}
                    alt=""
                    src="/icon.svg"
                  />
                </div>
              </div>
            ))}

            <div className="self-stretch h-auto flex flex-col items-center justify-end p-[18px] box-border max-w-full [object-fit:contains] lg:self-stretch lg:w-auto lg:pl-[10px] lg:pr-[10px] lg:box-border mq350small:self-stretch mq350small:w-auto mq350small:flex-1 mq350small:pl-[30px] mq350small:pr-[30px] mq350small:box-border mq350small:h-auto">
              <button
                className="cursor-pointer border-[#000] border-solid border-[1px] py-[10px] px-[3px] bg-[transparent] self-stretch rounded-[7px] box-border h-auto flex flex-row items-start justify-center gap-[10px] max-w-full [object-fit:contains] lg:rounded-[15px] lg:pl-[0px] lg:pr-[0px] lg:box-border sm:h-auto"
                onClick={onCheckoutButtonClick}
              >
                <b className="flex-1 relative text-[13px] tracking-[0.01em] font-[Jost] text-[#000] text-right lg:flex-1 sm:text-[13px] sm:self-stretch sm:h-auto mq350small:flex-1">
                  Checkout
                </b>
                <div className="flex-1 relative text-[13px] tracking-[0.01em] font-[Jost] text-[#000] text-left lg:flex-1 sm:text-[13px] sm:self-stretch sm:h-auto mq350small:flex-1">
                  Rs {totalPrice.toFixed(2)}
                </div>
              </button>
            </div>
          </>
        ) : (
          <div className="self-stretch flex flex-row items-center justify-center py-[0px] px-[10px]">
            <div className="flex-1 relative">Your cart is empty.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
