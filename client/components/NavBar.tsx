"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, PlayCircle } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Only show navbar when demo is not open */}
      {!showDemo && (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-[100px]">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/99cb12525e242aadfab6c5c5815d4d264d69be45?width=54"
                  alt="Sambandha logo"
                  className="w-7 h-7"
                />
                <span className="text-nav font-bold text-[#2d2d2d]">
                  Sambandha
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                <Link
                  href="/"
                  className="block text-nav text-[#2d2d2d] hover:text-blue-600 px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/product"
                  className="text-nav text-[#2d2d2d] hover:text-blue-600 transition-colors duration-200"
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="text-nav text-[#2d2d2d] hover:text-blue-600 transition-colors duration-200"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-nav text-[#2d2d2d] hover:text-blue-600 transition-colors duration-200"
                >
                  Contact
                </Link>

                <button
                  onClick={() => setShowDemo(true)}
                  className="flex items-center gap-2 text-nav text-[#2d2d2d] hover:text-blue-600 transition-colors duration-200"
                >
                  <PlayCircle size={20} />
                  Watch Demo
                </button>

                <Link
                  href="/login"
                  className="bg-[#2d2d2d] text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-button transition-colors duration-200"
                >
                  Login
                </Link>
              </div>

              {/* Mobile Hamburger Menu */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
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

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
              <div className="px-4 py-4 space-y-3">
                <Link
                  href="/"
                  className="block text-nav text-[#2d2d2d] hover:text-blue-600 px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/product"
                  className="block text-nav text-[#2d2d2d] hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="block text-nav text-[#2d2d2d] hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block text-nav text-[#2d2d2d] hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  Contact
                </Link>

                <button
                  onClick={() => setShowDemo(true)}
                  className="block w-full text-left text-nav text-[#2d2d2d] hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  Watch Demo
                </button>

                <div className="pt-2 border-t border-gray-100">
                  <Link
                    href="/signin"
                    className="block bg-[#2d2d2d] text-white text-center px-4 py-3 rounded-lg hover:bg-gray-800 text-button transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      )}

      {/* Demo Video Overlay */}
      {showDemo && (
        <div suppressHydrationWarning={true}>
          {/* Blurred background with fade */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 z-40"
            onClick={() => setShowDemo(false)}
            data-qb-installed="true"
          />

          {/* Centered Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-3xl transform transition-all duration-300 scale-95 animate-scale-in">
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={() => setShowDemo(false)}
                  className="absolute top-3 right-3 text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 z-50 transition-colors duration-200"
                >
                  <X size={20} />
                </button>

                {/* Video */}
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
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.25s ease-out forwards;
        }
      `}</style>
    </>
  );
}
