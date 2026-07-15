import "./globals.css";
import { Inter, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import Providers from "./providers";
import StyledJsxRegistry from "@/lib/registry";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const ananda = localFont({
  src: "../public/fonts/AnandaPersonalUse.ttf",
  variable: "--font-ananda",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAMBANDHA",
  description: "Stories you can hold.",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  icons: {
    icon: "/5.png",
    apple: "/sambandha.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ananda.variable} ${instrumentSerif.variable} font-inter antialiased`}
        suppressHydrationWarning
        style={{ padding: 0, margin: 0, backgroundColor: 'transparent', overflow: 'auto' }}
      >
        <StyledJsxRegistry>
          <Providers>{children}</Providers>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
