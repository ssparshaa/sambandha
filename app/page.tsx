"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import NavBar from "../client/components/NavBar";
import Footer from "../client/components/Footer";
import InteractivePolaroid from "../client/components/InteractivePolaroid";
import StackedPolaroids from "../client/components/StackedPolaroids";
import { PlayCircle, ShoppingBag } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../client/components/ui/carousel";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
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

  // Polaroid memories data
  const memories = [
    {
      id: 1,
      image: "/image/sweta.jpeg",

      rotation: "rotate-3 md:rotate-[7deg]",
      alt: "Happy Birthday Celebration",
      heading: "Happy Birthday!",
      subheading: "A special day to remember",
      audioSrc: "/audio/memory-1.aiff",
    },
    {
      id: 2,
      image: "/image/birthdayimage.jpg",

      rotation: "-rotate-3 md:-rotate-[7deg]",
      alt: "Birthday Memory",
      heading: "Birthday Surprise",
      subheading: "The moment we'll never forget",
      audioSrc: "/audio/memory-2.aiff",
    },
    {
      id: 3,
      image: "/image/birthdayimage.jpg",

      rotation: "rotate-3 md:rotate-[7deg]",
      alt: "Birthday Wishes",
      heading: "Best Wishes",
      subheading: "Memories that last forever",
      audioSrc: "/audio/memory-3.aiff",
    },
  ];

  return (
    <div className="min-h-screen w-full max-w-[1440px] mx-auto flex flex-col bg-white">
      {/* Navigation */}
      <NavBar />

      {/* Header */}
      <motion.div
        className="flex flex-col justify-center items-center gap-[10px] w-full px-4 md:px-12 lg:px-[100px] py-[60px] lg:py-[100px] bg-white"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="flex flex-col lg:flex-row justify-center items-center gap-[28px] w-full">
          <motion.div
            className="flex flex-col justify-center items-center lg:items-start gap-[40px] flex-1"
            variants={slideInLeft}
          >
            <div className="flex flex-col items-center lg:items-start gap-[40px] w-full">
              <motion.div
                className="w-full text-subtitle text-[#2d2d2d] text-center lg:text-left"
                variants={fadeInUp}
              >
                Your Memories, Close to Your Heart
              </motion.div>
              <motion.div
                className="w-full text-display-large text-[#2d2d2d] text-center lg:text-left"
                variants={fadeInUp}
              >
                Stories You Can Hold
              </motion.div>
            </div>
            <motion.div
              className="w-full text-body-large text-[#2d2d2d] text-center lg:text-left"
              variants={fadeInUp}
            >
              Probably the Closest Thing to Time Travel — Powered by Touch,
              Fueled by Love.
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 w-full mt-6"
              variants={fadeInUp}
            >
              <Link href="/product">
                <button className="bg-[#2d2d2d] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#1a1a1a] transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto min-w-[160px] text-sm shadow-sm hover:shadow-md">
                  <ShoppingBag size={16} />
                  <span>Buy Now</span>
                </button>
              </Link>
              <button
                onClick={() => setShowDemo(true)}
                className="bg-white text-[#2d2d2d] border border-[#2d2d2d] px-6 py-2.5 rounded-full font-medium hover:bg-[#f8f8f8] hover:border-[#1a1a1a] transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto min-w-[160px] text-sm shadow-sm hover:shadow-md"
              >
                <PlayCircle size={16} />
                <span>Watch a Demo</span>
              </button>
            </motion.div>
          </motion.div>
          <motion.div variants={slideInRight}>
            <Image
              src="https://api.builder.io/api/v1/image/assets/TEMP/38ec7941626fec7cff55aa25e3ad5aba509d0ad0?width=1212"
              alt="Stories You Can Hold"
              width={636}
              height={424}
              className="h-[250px] md:h-[350px] lg:h-[424px] flex-1 object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Logos Section */}
      <motion.div
        className="flex justify-center items-center gap-[10px] w-full px-4 md:px-12 lg:px-[66px] bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="flex h-[147px] py-[60px] items-start flex-1 border-t-2 border-b-2 border-black/20 gap-0">
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
        </div>
      </motion.div>

      {/* Memories Section */}
      <motion.div
        className="w-full px-4 md:px-12 lg:px-[100px] py-[60px] bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {/* Desktop: Show all three polaroids side by side */}
        <div className="hidden md:flex justify-center items-center gap-[30px] md:gap-[60px] w-full">
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
        </div>

        {/* Mobile & Tablet: Stacked Polaroids */}
        <motion.div className="md:hidden w-full" variants={fadeInUp}>
          <StackedPolaroids memories={memories} />
        </motion.div>
      </motion.div>

      {/* Products Section */}
      <div className="flex flex-col items-center gap-[60px] w-full px-4 md:px-12 lg:px-[100px] py-[60px] bg-white">
        <div className="w-full text-heading-2 text-[#2d2d2d] text-center">
          Products
        </div>
        <div className="flex flex-col justify-center items-center gap-[60px] w-full">
          <div className="flex flex-col md:flex-row justify-center items-center gap-[30px] md:gap-[67.5px] w-full">
            <div className="flex flex-col items-start gap-[25px] flex-1">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/2614228aa5ebab10f87604f8b79a6372eec0d012?width=737"
                alt="Snake Chain Necklace"
                width={737}
                height={315}
                className="h-[250px] md:h-[315px] w-full object-cover rounded-lg"
              />
              <div className="flex flex-col justify-center items-start gap-[10px] w-full">
                <div className="w-full text-heading-4 text-[#2d2d2d]">
                  Snake Chain Necklace 50cm/20&apos;
                </div>
                <div className="w-full text-price text-[#2d2d2d]">Rs 5000</div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-[25px] flex-1">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/a3a074d206007be20a8e545864017ff5e260c3a5?width=737"
                alt="Alta Capture Charm Bracelet"
                width={737}
                height={315}
                className="h-[250px] md:h-[315px] w-full object-cover rounded-lg"
              />
              <div className="flex flex-col justify-center items-start gap-[10px] w-full">
                <div className="w-full text-heading-4 text-[#2d2d2d]">
                  Alta Capture Charm Bracelet
                </div>
                <div className="w-full text-price text-[#2d2d2d]">Rs 5000</div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-[25px] flex-1">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/0d6b5c0bf9cfdc9a32ba72a3f0ba23a3a58d1f48?width=737"
                alt="You Really Got Me"
                width={737}
                height={315}
                className="h-[250px] md:h-[315px] w-full object-cover rounded-lg"
              />
              <div className="flex flex-col justify-center items-start gap-[10px] w-full">
                <div className="w-full text-heading-4 text-[#2d2d2d]">
                  You Really Got Me
                </div>
                <div className="w-full text-body-medium text-[#2d2d2d]">
                  The Kinks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="flex flex-col justify-center items-center gap-[60px] w-full px-4 md:px-12 lg:px-[100px] py-[80px] md:py-[130px] bg-white">
        <div className="w-full text-heading-2 text-[#2d2d2d] text-center">
          How it works
        </div>
        <div className="flex justify-center items-center gap-[60px] w-full">
          <div className="flex flex-col md:flex-row justify-center items-center gap-[40px] md:gap-[125px] flex-1">
            <div className="flex flex-col justify-center items-center gap-[56px] flex-1">
              <div className="flex flex-col justify-center items-center gap-[56px] w-full">
                <div className="w-[100px] md:w-[130px] h-[100px] md:h-[130px] bg-[#e5e5e5] rounded-lg"></div>
                <div className="flex flex-col justify-center items-center gap-[19px] w-full">
                  <div className="w-full text-[#2d2d2d] text-center text-[20px] md:text-[27px] font-bold leading-[32px] md:leading-[42px]">
                    Create & Curate
                  </div>
                  <div className="w-full text-[#2d2d2d] text-center text-[15px] md:text-[17px] font-normal leading-[22px] md:leading-[27px]">
                    Login to upload photos, notes, voice clips, and dates — all
                    in one place.
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-col justify-center items-center gap-[56px] flex-1">
              <div className="flex flex-col justify-center items-center gap-[56px] w-full">
                <div className="w-[130px] h-[130px] bg-[#e5e5e5] rounded-lg"></div>
                <div className="flex flex-col justify-center items-center gap-[19px] w-full">
                  <div className="w-full text-[#2d2d2d] text-center text-[27px] font-bold leading-[42px]">
                    Create & Curate
                  </div>
                  <div className="w-full text-[#2d2d2d] text-center text-[17px] font-normal leading-[27px]">
                    Login to upload photos, notes, voice clips, and dates — all
                    in one place.
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col justify-center items-center gap-[56px] flex-1">
              <div className="flex flex-col justify-center items-center gap-[56px] w-full">
                <div className="w-[130px] h-[130px] bg-[#e5e5e5] rounded-lg"></div>
                <div className="flex flex-col justify-center items-center gap-[19px] w-full">
                  <div className="w-full text-[#2d2d2d] text-center text-[27px] font-bold leading-[42px]">
                    Create & Curate
                  </div>
                  <div className="w-full text-[#2d2d2d] text-center text-[17px] font-normal leading-[27px]">
                    Login to upload photos, notes, voice clips, and dates — all
                    in one place.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


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
  );
}
