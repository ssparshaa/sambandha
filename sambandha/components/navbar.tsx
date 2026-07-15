import type { NextPage } from "next";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import NavbarDrawer from "./navbar-drawer";
import PortalDrawer from "./portal-drawer";
import Cart from "./cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export type NavbarType = {
  className?: string;
};

const Navbar: NextPage<NavbarType> = ({ className = "" }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isNavbarDrawerOpen, setNavbarDrawerOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const onFrameContainerClick = useCallback(() => {
    if (pathname !== "/") {
      // Navigate first
      router.push("/");

      // Wait a short time before scrolling to ensure the page changes
      setTimeout(() => {
        const anchor = document.querySelector(
          "[data-scroll-to='heroDescriptionContainer']"
        );
        if (anchor) {
          anchor.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
      }, 100);
    } else {
      // If already on home, just scroll
      const anchor = document.querySelector(
        "[data-scroll-to='heroDescriptionContainer']"
      );
      if (anchor) {
        anchor.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [router]);

  const onFrameContainerClick1 = useCallback(() => {
    if (pathname !== "/") {
      // Navigate first
      router.push("/");

      // Wait a short time before scrolling to ensure the page changes
      setTimeout(() => {
        const anchor = document.querySelector(
          "[data-scroll-to='productContainer']"
        );
        if (anchor) {
          anchor.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
      }, 200);
    } else {
      // If already on home, just scroll
      const anchor = document.querySelector(
        "[data-scroll-to='productContainer']"
      );
      if (anchor) {
        anchor.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [router]);

  const onFrameButtonClick = useCallback(() => {
    router.push("/about-us");
  }, [router]);

  const openNavbarDrawer = useCallback(() => {
    setNavbarDrawerOpen(true);
  }, []);

  const closeNavbarDrawer = useCallback(() => {
    setNavbarDrawerOpen(false);
  }, []);

  return (
    <div className={`flex flex-col items-start justify-start text-[#151313]`}>
      <div className="self-stretch [backdrop-filter:blur(18px)] bg-[rgba(227,240,234,0.5)] flex flex-row items-center justify-center py-[12px] px-[40px] gap-[10px] md:pl-[20px] md:pr-[20px] md:box-border mq350small:pl-[20px] mq350small:pr-[20px] mq350small:box-border">
        <div className="flex-1 flex flex-col items-start justify-start">
          <Image
            className="w-[135px] relative h-[34px] object-cover"
            width={135}
            height={34}
            alt=""
            src="/3.png"
          />
        </div>
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none bg-[rgba(227,240,234,0)]">
              <UserCircle className="w-8 h-8 text-gray-700 cursor-pointer hover:text-gray-900" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
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
              <button onClick={() => router.push("/login")}>Login</button>
              <Image
                className="w-[20px] relative h-[20px] overflow-hidden shrink-0 md:hidden"
                onClick={openNavbarDrawer}
                width={20}
                height={20}
                alt=""
                src="/lishoppingbag.svg"
              />

              <div
                className="h-[22px] flex flex-col items-end justify-center gap-[9px] cursor-pointer md:flex hidden md-block"
                onClick={openNavbarDrawer}
              >
                <Image
                  className="w-[20.3px] relative max-h-full"
                  width={20}
                  height={2}
                  alt=""
                  src="/vector copy.svg"
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
          </>
        )}
      </div>
      {isNavbarDrawerOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Right"
          onOutsideClick={closeNavbarDrawer}
        >
          <Cart className="lg:block md:hidden" onClose={closeNavbarDrawer} />
          <NavbarDrawer
            className="hidden md:block lg:hidden"
            onClose={closeNavbarDrawer}
          />
        </PortalDrawer>
      )}
    </div>
  );
};

export default Navbar;
