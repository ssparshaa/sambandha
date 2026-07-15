"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import AuthLayout from "@/components/AuthLayout";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "./loading";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Whenever pathname changes, briefly show loader
    setIsTransitioning(true);

    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // adjust time for smooth transition

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <CartProvider>
            <AuthLayout>
              <>
                {isTransitioning && <Loading />}
                {children}
              </>
            </AuthLayout>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
