"use client";
import * as React from "react";
import { Logo } from "./Logo";
import { NavMenu } from "./NavMenu";
import { MobileMenuToggle } from "./MobileMenuToggle";

export function NavBar() {
  const handleMobileMenuToggle = () => {
    // Mobile menu toggle functionality can be implemented here
    console.log("Mobile menu toggled");
  };

  return (
    <header className="box-border flex justify-between items-center px-12 py-6 w-full h-20 bg-white max-md:px-8 max-md:py-5 max-sm:px-5 max-sm:py-4">
      <Logo />
      <NavMenu />
      <MobileMenuToggle onClick={handleMobileMenuToggle} />
    </header>
  );
}

export default NavBar;
