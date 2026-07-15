// components/AuthLayout.tsx

"use client";

import { useAuth } from "../context/AuthContext";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoggedIn } = useAuth();

  // const isUserIdPage = /^\/[a-f\d]{24}$/i.test(pathname);
  // const isUserIdPage = /^\/[a-f\d]{24}(\/.*)?$/i.test(pathname);
  // const showFooter = ["/", "/product-page", "/about-us"].includes(pathname);

  // Matches /<24hexId> and /<24hexId>/something...
  // const isUserIdPage = /^\/[a-f\d]{24}(\/.*)?$/i.test(pathname);

  // Explicitly allow /admin and /user paths
  const isAdminOrUserRoute = /^\/(admin)(\/.*)?$/i.test(pathname);

  return (
    <>
      {isAdminOrUserRoute && isLoggedIn && user && (
        <div className="fixed w-full top-0 z-50">
          <Navbar />
        </div>
      )}

      <div className="flex">
        {isAdminOrUserRoute && isLoggedIn && user && <Sidebar user={user} />}
        <div
          className={
            isAdminOrUserRoute && isLoggedIn && user ? "ml-56 w-full" : "w-full"
          }
        >
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </div>

      {/* {showFooter && (
        <div className="w-full relative bg-[#f9f9f9] flex flex-col items-start justify-start gap-[60px] text-left text-[36px] text-[#151313] font-['Neue_Montreal']">
          <Footer />
        </div>
      )} */}
    </>
  );
}
