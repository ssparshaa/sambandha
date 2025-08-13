import * as React from "react";
import Link from "next/link";

interface NavMenuProps {
  className?: string;
}

export function NavMenu({ className = "" }: NavMenuProps) {
  const menuItems = [
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Sign In", href: "/signin" },
  ];

  return (
    <nav
      className={`flex flex-wrap gap-0 content-start items-start max-md:gap-0 max-sm:hidden ${className}`}
    >
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-lg leading-7 text-zinc-800"
        >
          <div className="text-lg text-zinc-800">{item.name}</div>
        </Link>
      ))}
    </nav>
  );
}
