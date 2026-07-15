"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import NavBar from "../client/components/NavBar";
import Footer from "../client/components/Footer";
import InteractivePolaroid from "../client/components/InteractivePolaroid";
import StackedPolaroids from "../client/components/StackedPolaroids";
import Hero from "../client/components/Hero";
import api from "config/api";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import {
  PlayCircle,
  ShoppingBag,
  Smartphone,
  Upload,
  Heart,
  LogIn,
} from "lucide-react";

const fetchProducts = async () => {
  const { data } = await api.get("/product"); // your backend endpoint
  return data;
};

// Mandala and Necklace Component testing
// Mandala and Necklace Component
// Mandala and Necklace Component
// Mandala and Necklace Component


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
      },
    },
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
      },
    },
  };

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
      },
    },
  };

  const onFrameContainerClick1 = useCallback(() => {
    if (pathname !== "/") {
      // Navigate first
      router.push("/");

      // Wait a short time before scrolling to ensure the page changes
      setTimeout(() => {
        const anchor = document.querySelector(
          "[data-scroll-to='productContainer']",
        );
        if (anchor) {
          anchor.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
      }, 200);
    } else {
      // If already on home, just scroll
      const anchor = document.querySelector(
        "[data-scroll-to='productContainer']",
      );
      if (anchor) {
        anchor.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [router]);

  // Polaroid memories data
  const memories = [
    {
      id: 1,
      image: "/image/Memory4.jpg",
      rotation: "rotate-3 md:rotate-[7deg]",
      alt: "Our First Date!",
      heading: "Our First Date!",
      subheading:
        "I still remember how nervous I was that day, but being with you made everything feel so easy.",
      audioSrc: "/audio/memory-1.aiff",
    },
    {
      id: 2,
      image: "/image/Memory2.jpg",
      rotation: "-rotate-3 md:-rotate-[7deg]",
      alt: "Our Little Lake Adventure",
      heading: "Our Little Lake Adventure",
      subheading: "We snuck away to the lake and had some icecream.",
      audioSrc: "/audio/memory-2.aiff",
    },
    {
      id: 3,
      image: "/image/Memory3.jpg",
      rotation: "rotate-3 md:rotate-[7deg]",
      alt: "First Kick With Dad”",
      heading: "First Kick With Dad",
      subheading:
        "I can still remember how tiny his feet looked chasing the ball, and how his giggles made me laugh more than I’ve laughed in years.",
      audioSrc: "/audio/memory-3.aiff",
    },
  ];

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-white">
      <div className="w-full flex flex-col">
        {/* Navigation */}
        <NavBar />

        {/* Hero Section with Circular Gallery */}
        <div className="w-full flex-col justify-center items-center bg-white overflow-hidden">
          <Hero items={memories} />

          {/* Action Buttons below gallery */}
          {/* <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full mt-[-80px] z-30 relative pb-20"
            variants={fadeInUp}
          >
            <p onClick={onFrameContainerClick1}>
              <button className="bg-[#2d2d2d] text-white px-8 py-3 rounded-full font-medium hover:bg-[#1a1a1a] transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto min-w-[180px] text-base shadow-lg hover:shadow-xl hover:-translate-y-1">
                <ShoppingBag size={18} />
                <span>Buy Now</span>
              </button>
            </p>
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-[#2d2d2d] border border-[#2d2d2d] px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 min-w-[180px] text-base shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <LogIn size={18} />
              Login
            </button>
          </motion.div> */}
        </div>

        {/* Rest of your existing code remains the same... */}
        {/* Logos Section */}
        <motion.div
          className="flex justify-center items-center gap-[10px] w-full px-4 md:px-12 lg:px-[66px] bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* <div className="flex h-[147px] py-[60px] items-start flex-1 border-t-2 border-b-2 border-black/20 gap-0">
            <div className="flex justify-between items-center flex-1">
              <motion.div
                className="flex-1 text-black text-center text-heading-4 font-bold"
                variants={scaleIn}
              >
                स्नेह
              </motion.div>
              <motion.div
                className="flex-1 text-black text-center text-heading-4 font-bold"
                variants={scaleIn}
              >
                حب
              </motion.div>
            </div>
            <div className="flex justify-between items-center flex-1">
              <motion.div
                className="flex-1 text-black text-center text-heading-4 font-bold"
                variants={scaleIn}
              >
                Amour
              </motion.div>
              <motion.div
                className="flex-1 text-black text-center text-heading-4 font-bold"
                variants={scaleIn}
              >
                사랑
              </motion.div>
            </div>
            <div className="flex justify-between items-center flex-1">
              <motion.div
                className="flex-1 text-black text-center text-heading-4 font-bold"
                variants={scaleIn}
              >
                愛
              </motion.div>
              <motion.div
                className="flex-1 text-black text-center text-heading-4 font-bold"
                variants={scaleIn}
              >
                אהבה
              </motion.div>
            </div>
          </div> */}
        </motion.div>

        {/* Memories Section */}
        {/* <motion.div
          className="w-full px-4 md:px-12 lg:px-[100px] py-[60px] bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        > */}
          {/* Desktop: Show all three polaroids side by side */}
          {/* <div className="hidden md:flex justify-center items-center gap-[30px] md:gap-[60px] w-full">
            {memories.map((memory, index) => (
              <InteractivePolaroid
                key={memory.id}
                id={memory.id}
                image={memory.image}
                rotation={memory.rotation}
                alt={memory.alt}
                heading={memory.heading}
                subheading={memory.subheading}
                audioSrc={memory.audioSrc}
                index={index}
              />
            ))}
          </div> */}

          {/* Mobile & Tablet: Stacked Polaroids */}
          {/* <motion.div className="md:hidden w-full" variants={fadeInUp}>
            <StackedPolaroids memories={memories} />
          </motion.div> */}
        {/* </motion.div> */}

        {/* Products Section */}
        {/* <div
          data-scroll-to="productContainer"
          className="flex flex-col items-center gap-12 w-full px-4 md:px-12 lg:px-24 py-12 bg-white"
        >
          <div className="w-full text-heading-2 text-[#2d2d2d] text-center">
            Products
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {products?.map((product: any) => (
              <div
                key={product._id}
                onClick={() => router.push(`/product/${product.slug}`)}
                className="cursor-pointer flex flex-col items-start gap-3 bg-gray-50 rounded-lg shadow-sm p-3 hover:shadow-md transition cursor-pointer"
              >
                <div className="w-full h-40 md:h-48 overflow-hidden rounded-md">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={300}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="text-sm md:text-base font-bold text-gray-700 truncate">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500 font-semibold">
                    Rs {product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* How it Works Section */}
        {/* <div className="flex flex-col justify-center items-center gap-[60px] w-full px-4 md:px-12 lg:px-[100px] py-[80px] md:py-[130px] bg-white">
          <div className="w-full text-heading-2 text-[#2d2d2d] text-center">
            How it works
          </div>
          <div className="flex justify-center items-center gap-[60px] w-full">
            <div className="flex flex-col md:flex-row justify-center items-center gap-[40px] md:gap-[125px] flex-1">
              <div className="flex flex-col justify-center items-center gap-[56px] flex-1">
                <div className="flex flex-col justify-center items-center gap-[56px] w-full">
                  <div className="w-[100px] md:w-[130px] h-[100px] md:h-[130px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <Smartphone
                      size={48}
                      strokeWidth={1.5}
                      className="text-gray-400"
                    />
                  </div>{" "}
                  <div className="flex flex-col justify-center items-center gap-[19px] w-full">
                    <div className="w-full text-[#2d2d2d] text-center text-[20px] md:text-[27px] font-bold leading-[32px] md:leading-[42px]">
                      Tap & View
                    </div>
                    <div className="w-full text-[#2d2d2d] text-center text-[15px] md:text-[17px] font-normal leading-[22px] md:leading-[27px]">
                      Sign in, upload your memories, then tap your pendant to any
                      phone to see them all instantly.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-[56px] flex-1">
                <div className="flex flex-col justify-center items-center gap-[56px] w-full">
                  <div className="w-[100px] md:w-[130px] h-[100px] md:h-[130px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <Upload
                      size={48}
                      strokeWidth={1.5}
                      className="text-gray-400"
                    />
                  </div>{" "}
                  <div className="flex flex-col justify-center items-center gap-[19px] w-full">
                    <div className="w-full text-[#2d2d2d] text-center text-[20px] md:text-[27px] font-bold leading-[32px] md:leading-[42px]">
                      Store & Share
                    </div>
                    <div className="w-full text-[#2d2d2d] text-center text-[15px] md:text-[17px] font-normal leading-[22px] md:leading-[27px]">
                      Upload your photos and videos once, then tap your NFC
                      pendant to share memories anywhere.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-[56px] flex-1">
                <div className="flex flex-col justify-center items-center gap-[56px] w-full">
                  <div className="w-[100px] md:w-[130px] h-[100px] md:h-[130px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <Heart
                      size={48}
                      strokeWidth={1.5}
                      className="text-gray-400"
                    />
                  </div>{" "}
                  <div className="flex flex-col justify-center items-center gap-[19px] w-full">
                    <div className="w-full text-[#2d2d2d] text-center text-[20px] md:text-[27px] font-bold leading-[32px] md:leading-[42px]">
                      Memory Key
                    </div>
                    <div className="w-full text-[#2d2d2d] text-center text-[15px] md:text-[17px] font-normal leading-[22px] md:leading-[27px]">
                      Set up your collection online, carry your pendant, tap to
                      unlock all your memories.{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {showDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full p-10 flex flex-col items-center">
              {/* Close button */}
              <button
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 text-[#686363] hover:text-[#2d2d2d] transition-colors bg-transparent rounded-full p-2"
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 22 22" fill="none">
                  <circle
                    cx="11"
                    cy="11"
                    r="11"
                    fill="#686363"
                    fillOpacity="0.08"
                  />
                  <path
                    d="M7 7L15 15M15 7L7 15"
                    stroke="#686363"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
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
              <div className="mt-6 text-center text-[#2d2d2d] font-montreal text-xl font-semibold">
                Watch a demo of Sambandha
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
