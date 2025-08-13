"use client";
import * as React from "react";

interface MobileMenuToggleProps {
  className?: string;
  onClick?: () => void;
}

export function MobileMenuToggle({
  className = "",
  onClick,
}: MobileMenuToggleProps) {
  return (
    <button
      className={`hidden text-2xl cursor-pointer text-zinc-800 max-sm:block ${className}`}
      onClick={onClick}
      aria-label="Toggle mobile menu"
    >
      <i className="ti ti-menu-2" />
    </button>
  );
}
