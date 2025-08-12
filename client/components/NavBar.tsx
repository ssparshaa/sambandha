// components/NavBar.tsx
"use client";

import * as React from "react";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      {/* Navigation */}
      <nav className="flex justify-between items-center w-full px-4 md:px-12 lg:px-[50px] py-[25px] bg-white">
        {/* Logo + Brand */}
        <div className="flex justify-center items-center gap-[5px]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/99cb12525e242aadfab6c5c5815d4d264d69be45?width=54"
            alt="Sambandha logo"
            className="w-[27px] h-[27px]"
          />
          <div className="text-[#2d2d2d] font-epilogue text-[20px] font-bold leading-[30px]">
            Sambandha
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-start gap-[50px]">
          {["Products", "About", "Contact", "Sign In"].map((item) => (
            <div
              key={item}
              className="text-[#2d2d2d] font-epilogue text-[17px] font-normal leading-[28px] cursor-pointer hover:opacity-70 transition-opacity"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col cursor-pointer gap-1"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="w-[25px] h-[3px] bg-[#2d2d2d] transition-all duration-300"></span>
          <span className="w-[25px] h-[3px] bg-[#2d2d2d] transition-all duration-300"></span>
          <span className="w-[25px] h-[3px] bg-[#2d2d2d] transition-all duration-300"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full bg-white px-4 py-4 border-t border-gray-200">
          <div className="flex flex-col gap-4">
            {["Products", "About", "Contact", "Sign In"].map((item) => (
              <div
                key={item}
                className="text-[#2d2d2d] font-epilogue text-[17px] font-normal leading-[28px] cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
