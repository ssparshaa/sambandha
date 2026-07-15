"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "../../app/contexts/CartContext";
import Checkout from "./Checkout";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { state, toggleCart } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  // Scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [lastScrollY]);

  const onFrameContainerClick1 = useCallback(() => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const anchor = document.querySelector(
          "[data-scroll-to='productContainer']",
        );
        if (anchor) {
          anchor.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
      }, 200);
    } else {
      const anchor = document.querySelector(
        "[data-scroll-to='productContainer']",
      );
      if (anchor) {
        anchor.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
    setIsOpen(false);
  }, [router, pathname]);

  return (
    <>
      {/* Floating Navbar */}
      {!showDemo && (
        <div
          className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pt-4 transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <nav
            className="w-full max-w-5xl relative"
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(25px)",
              WebkitBackdropFilter: "blur(25px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "20px",
              boxShadow:
                "0 8px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
            }}
          >
            {/* Top bar: Logo + Hamburger */}
            <div className="px-5 md:px-8">
              <div className="flex justify-between items-center h-14">
                {/* Logo */}
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/3.png"
                    alt="Sambandha logo"
                    className="w-44 h-auto"
                  />
                </Link>

                {/* Hamburger — all screen sizes */}
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/20 transition-colors duration-200"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X size={24} className="text-[#2d2d2d]" />
                  ) : (
                    <Menu size={24} className="text-[#2d2d2d]" />
                  )}
                </button>
              </div>
            </div>

            {/* Dropdown Menu — compact popover */}
            {isOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50">
                <div
                  className="w-44 rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.45)",
                    backdropFilter: "blur(25px)",
                    WebkitBackdropFilter: "blur(25px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                  }}
                >
                  <div className="px-2 py-2 space-y-0.5">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm text-[#2d2d2d] hover:bg-white/40 px-3 py-2 rounded-xl transition-all duration-200"
                    >
                      Home
                    </Link>
                    <Link
                      href="/product"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm text-[#2d2d2d] hover:bg-white/40 px-3 py-2 rounded-xl transition-all duration-200"
                    >
                      Products
                    </Link>
                    <Link
                      href="/aboutus"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm text-[#2d2d2d] hover:bg-white/40 px-3 py-2 rounded-xl transition-all duration-200"
                    >
                      About
                    </Link>
                    <button
                      onClick={() => { router.push("/login"); setIsOpen(false); }}
                      className="block w-full text-left text-sm text-[#2d2d2d] hover:bg-white/40 px-3 py-2 rounded-xl transition-all duration-200"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => { toggleCart(); setIsOpen(false); }}
                      className="flex items-center w-full gap-2 text-sm text-[#2d2d2d] hover:bg-white/40 px-3 py-2 rounded-xl transition-all duration-200"
                    >
                      <ShoppingBag size={15} />
                      Cart
                      {state.totalItems > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center ml-auto">
                          {state.totalItems}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Checkout Component */}
      <Checkout isOpen={state.isOpen} onClose={toggleCart} />

      {/* Demo Video Overlay */}
      {showDemo && (
        <div suppressHydrationWarning={true}>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 z-40"
            onClick={() => setShowDemo(false)}
            data-qb-installed="true"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-3xl transform transition-all duration-300 scale-95 animate-scale-in">
              <div className="relative">
                <button
                  onClick={() => setShowDemo(false)}
                  className="absolute top-3 right-3 text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 z-50 transition-colors duration-200"
                >
                  <X size={20} />
                </button>
                <div className="w-full aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="mt-4 text-center text-gray-800 font-semibold text-xl">
                  Watch a demo of Sambandha
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.25s ease-out forwards;
        }
      `}</style>
    </>
  );
}
