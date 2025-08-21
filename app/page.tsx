"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import NavBar from "../client/components/NavBar";
import Footer from "../client/components/Footer";
import InteractivePolaroid from "../client/components/InteractivePolaroid";
import StackedPolaroids from "../client/components/StackedPolaroids";
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

      {/* CTA: Watch a demo */}
      <div className="flex flex-col items-center w-full px-4 md:px-12 lg:px-[100px] pb-20 bg-white">
        <button
          onClick={() => setShowDemo(true)}
          className="bg-[#2d2d2d] text-white text-lg font-bold px-8 py-3 rounded-full shadow hover:bg-[#444] transition-colors duration-200 flex items-center gap-2"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="11" fill="#fff" fillOpacity="0.15" />
            <polygon points="8,6 16,11 8,16" fill="#fff" />
          </svg>
          Watch a demo
        </button>
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
                frameBorder="0"
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
<<<<<<< HEAD

      {/* Footer */}
      <div className="flex flex-col justify-center items-center gap-[10px] w-full px-4 md:px-12 lg:px-[100px] pb-[70px] bg-white">
        <div className="flex pt-[70px] justify-center items-center gap-0 w-full border-t-2 border-black/20">
          <div className="flex flex-col md:flex-row justify-center items-start gap-[40px] md:gap-[190px] flex-1">
            <div className="flex flex-col justify-center items-start gap-[60px] flex-1 h-full">
              <div className="flex flex-col items-start gap-[40px] w-full">
                <div className="flex justify-center items-center gap-[5px]">
                  <Image
                    src="https://api.builder.io/api/v1/image/assets/TEMP/873d074b568ad3dc0e100f871fed99d7a0518729?width=54"
                    alt="Sambandha logo"
                    width={27}
                    height={27}
                    className="w-[27px] h-[27px]"
                  />
                  <div className="text-[#2d2d2d] text-[20px] font-bold leading-[30px]">
                    Sambandha
                  </div>
                </div>
                <div className="w-full text-[#2d2d2d] text-[15px] md:text-[17px] font-normal leading-[22px] md:leading-[27px]">
                  This is a template Figma file, turned into code using Anima.
                  Learn more at AnimaApp.com This is a template Figma file,
                  turned into code using Anima. Learn more at AnimaApp.com
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 cursor-pointer hover:opacity-70 transition-opacity">
                  <svg
                    width="36"
                    height="37"
                    viewBox="0 0 36 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30 5.14624H6C5.60218 5.14624 5.22064 5.30428 4.93934 5.58558C4.65804 5.86688 4.5 6.24842 4.5 6.64624V30.6462C4.5 31.0441 4.65804 31.4256 4.93934 31.7069C5.22064 31.9882 5.60218 32.1462 6 32.1462H18.9225V21.7062H15.4155V17.6187H18.9225V14.6187C18.9225 11.1312 21.0525 9.23074 24.1725 9.23074C25.221 9.22774 26.271 9.28174 27.315 9.39124V13.0212H25.1625C23.4705 13.0212 23.1405 13.8282 23.1405 15.0087V17.6112H27.186L26.661 21.6987H23.139V32.1462H30C30.3978 32.1462 30.7794 31.9882 31.0607 31.7069C31.342 31.4256 31.5 31.0441 31.5 30.6462V6.64624C31.5 6.24842 31.342 5.86688 31.0607 5.58558C30.7794 5.30428 30.3978 5.14624 30 5.14624Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="w-9 h-9 cursor-pointer hover:opacity-70 transition-opacity">
                  <svg
                    width="36"
                    height="37"
                    viewBox="0 0 36 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.9994 11.7118C16.1599 11.7118 14.3957 12.4426 13.0949 13.7433C11.7942 15.0441 11.0634 16.8083 11.0634 18.6478C11.0634 20.4873 11.7942 22.2515 13.0949 23.5523C14.3957 24.8531 16.1599 25.5838 17.9994 25.5838C19.8389 25.5838 21.6031 24.8531 22.9039 23.5523C24.2047 22.2515 24.9354 20.4873 24.9354 18.6478C24.9354 16.8083 24.2047 15.0441 22.9039 13.7433C21.6031 12.4426 19.8389 11.7118 17.9994 11.7118ZM17.9994 23.1523C16.8043 23.1523 15.6582 22.6776 14.8132 21.8325C13.9681 20.9875 13.4934 19.8414 13.4934 18.6463C13.4934 17.4512 13.9681 16.3051 14.8132 15.4601C15.6582 14.615 16.8043 14.1403 17.9994 14.1403C19.1945 14.1403 20.3406 14.615 21.1856 15.4601C22.0307 16.3051 22.5054 17.4512 22.5054 18.6463C22.5054 19.8414 22.0307 20.9875 21.1856 21.8325C20.3406 22.6776 19.1945 23.1523 17.9994 23.1523Z"
                      fill="black"
                    />
                    <path
                      d="M25.2099 13.0738C26.103 13.0738 26.8269 12.3499 26.8269 11.4568C26.8269 10.5638 26.103 9.83981 25.2099 9.83981C24.3169 9.83981 23.5929 10.5638 23.5929 11.4568C23.5929 12.3499 24.3169 13.0738 25.2099 13.0738Z"
                      fill="black"
                    />
                    <path
                      d="M30.8004 9.81281C30.4532 8.91608 29.9225 8.10173 29.2424 7.4219C28.5623 6.74206 27.7478 6.21172 26.8509 5.86481C25.8014 5.47084 24.6927 5.25782 23.5719 5.23481C22.1274 5.17181 21.6699 5.15381 18.0069 5.15381C14.3439 5.15381 13.8744 5.15381 12.4419 5.23481C11.322 5.25664 10.214 5.46971 9.16591 5.86481C8.26881 6.21131 7.45405 6.74151 6.77391 7.4214C6.09376 8.10129 5.56325 8.91584 5.21641 9.81281C4.82236 10.8622 4.60983 11.9711 4.58791 13.0918C4.52341 14.5348 4.50391 14.9923 4.50391 18.6568C4.50391 22.3198 4.50391 22.7863 4.58791 24.2218C4.61041 25.3438 4.82191 26.4508 5.21641 27.5023C5.56422 28.399 6.09525 29.2132 6.77556 29.893C7.45587 30.5728 8.2705 31.1032 9.16741 31.4503C10.2136 31.8601 11.322 32.0884 12.4449 32.1253C13.8894 32.1883 14.3469 32.2078 18.0099 32.2078C21.6729 32.2078 22.1424 32.2078 23.5749 32.1253C24.6956 32.1025 25.8043 31.89 26.8539 31.4968C27.7505 31.1491 28.5648 30.6183 29.2449 29.9383C29.9249 29.2582 30.4557 28.4439 30.8034 27.5473C31.1979 26.4973 31.4094 25.3903 31.4319 24.2683C31.4964 22.8253 31.5159 22.3678 31.5159 18.7033C31.5159 15.0388 31.5159 14.5738 31.4319 13.1383C31.4144 12.0017 31.2008 10.8767 30.8004 9.81281ZM28.9734 24.1108C28.9637 24.9753 28.8059 25.8317 28.5069 26.6428C28.2816 27.2261 27.9368 27.7558 27.4945 28.1978C27.0522 28.6398 26.5223 28.9844 25.9389 29.2093C25.1367 29.507 24.2894 29.6648 23.4339 29.6758C22.0089 29.7418 21.6069 29.7583 17.9529 29.7583C14.2959 29.7583 13.9224 29.7583 12.4704 29.6758C11.6153 29.6653 10.7684 29.5075 9.96691 29.2093C9.38144 28.9858 8.84941 28.6418 8.40524 28.1997C7.96107 27.7576 7.61466 27.2272 7.38841 26.6428C7.09358 25.8404 6.93587 24.9941 6.92191 24.1393C6.85741 22.7143 6.84241 22.3123 6.84241 18.6583C6.84241 15.0028 6.84241 14.6293 6.92191 13.1758C6.9316 12.3118 7.08939 11.4559 7.38841 10.6453C7.84591 9.46181 8.78341 8.53031 9.96691 8.07731C10.7688 7.78052 11.6154 7.62275 12.4704 7.61081C13.8969 7.54631 14.2974 7.52831 17.9529 7.52831C21.6084 7.52831 21.9834 7.52831 23.4339 7.61081C24.2895 7.6211 25.1369 7.77892 25.9389 8.07731C26.5223 8.30272 27.0521 8.64761 27.4944 9.08985C27.9366 9.5321 28.2815 10.0619 28.5069 10.6453C28.8017 11.4477 28.9594 12.294 28.9734 13.1488C29.0379 14.5753 29.0544 14.9758 29.0544 18.6313C29.0544 22.2853 29.0544 22.6783 28.9899 24.1123H28.9734V24.1108Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-[20px] flex-1 h-full">
              <div className="w-full text-[#151313] text-[20px] font-bold leading-[22px] uppercase">
                SHOP
              </div>
              <div className="flex flex-col items-start gap-[25px] w-full">
                <div className="w-full text-[#656665] text-[17px] font-normal leading-[20px] tracking-[-0.34px] cursor-pointer hover:opacity-70 transition-opacity">
                  New arrival
                </div>
                <div className="w-full text-[#656665] text-[17px] font-normal leading-[20px] tracking-[-0.34px] cursor-pointer hover:opacity-70 transition-opacity">
                  Shop by category
                </div>
                <div className="w-full text-[#656665] text-[17px] font-normal leading-[20px] tracking-[-0.34px] cursor-pointer hover:opacity-70 transition-opacity">
                  Shop by collection
                </div>
                <div className="w-full text-[#656665] text-[17px] font-normal leading-[20px] tracking-[-0.34px] cursor-pointer hover:opacity-70 transition-opacity">
                  Gift
                </div>
              </div>
              <div className="w-full text-black/30 text-[15px] font-normal leading-[22px] uppercase">
                © 2025 — Copyright
              </div>
            </div>
          </div>
        </div>
      </div>
=======
      <Footer />
>>>>>>> 8924d7a7501d2095a99bdb994fdfaf02adc54f89
    </div>
  );
}
