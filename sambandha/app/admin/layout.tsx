import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAMBANDHA",
  description: "Stories you can hold.",
  themeColor: "#000000",
  icons: {
    icon: "/5.png", // or PNG, SVG, etc.
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en" className="dark">
      <div className="bg-black p-0 m-0">{children}</div>
    </div>
  );
}
