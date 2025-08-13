"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when screen size changes
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
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-[100px]">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/99cb12525e242aadfab6c5c5815d4d264d69be45?width=54"
              alt="Sambandha logo"
              className="w-7 h-7"
            />
            <span className="font-bold text-[#2d2d2d] text-lg">Sambandha</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link 
              href="/product" 
              className="text-[#2d2d2d] hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className="text-[#2d2d2d] hover:text-blue-600 font-medium transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-[#2d2d2d] hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Contact
            </Link>
            <Link 
              href="/signin" 
              className="bg-[#2d2d2d] text-white px-4 py-2 rounded-lg hover:bg-gray-800 font-medium transition-colors duration-200"
            >
              Sign In
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
              href="/product" 
              className="block text-[#2d2d2d] hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg font-medium transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className="block text-[#2d2d2d] hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg font-medium transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block text-[#2d2d2d] hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg font-medium transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-gray-100">
              <Link 
                href="/signin" 
                className="block bg-[#2d2d2d] text-white text-center px-4 py-3 rounded-lg hover:bg-gray-800 font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}