"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag, LogIn } from "lucide-react";

interface GalleryItem {
  id: number | string;
  image: string;
  alt: string;
}

interface AssetItem {
  type: "asset";
  image: string;
  alt: string;
  scale: number;
  rotate: number;
}

// Positions (center-relative px) for each decorative asset
const ASSET_POSITIONS: [number, number][] = [
  [-320, -320],  // camera
  [290, -350],   // flowers
  [-620, 70],    // digicam
  [370, -70],    // letter
  [-210, 330],   // earphones
  [210, 350],    // cherry
  [-90, -390],   // memories
  [610, 250],    // ps i love you
  [-660, -120],  // ring
  [660, -60],    // ring 2
];

const ASSETS: AssetItem[] = [
  { type: "asset", image: "/image/images-landing/poloroid_camera.png",  alt: "Camera",        scale: 2.3, rotate: 15  },
  { type: "asset", image: "/image/images-landing/flower_boquet.png",    alt: "Flowers",       scale: 2.1, rotate: -10 },
  { type: "asset", image: "/image/images-landing/digicam.png",          alt: "Digicam",       scale: 2.3, rotate: 5   },
  { type: "asset", image: "/image/images-landing/letter_ILOVEYOU.png",  alt: "Letter",        scale: 1.5, rotate: -5  },
  { type: "asset", image: "/image/images-landing/earphone.png",         alt: "Earphones",     scale: 1.7, rotate: 20  },
  { type: "asset", image: "/image/images-landing/cherry_key_chain.png", alt: "Cherry",        scale: 1.3, rotate: -15 },
  { type: "asset", image: "/image/images-landing/memories.png",         alt: "Memories",      scale: 1.3, rotate: 0   },
  { type: "asset", image: "/image/images-landing/PSILOVEYOU.png",       alt: "PS I Love You", scale: 1.4, rotate: -8  },
  { type: "asset", image: "/image/images-landing/men_ring.png",         alt: "Ring",          scale: 1.9, rotate: 25  },
  { type: "asset", image: "/image/images-landing/men_ring_2.png",       alt: "Ring 2",        scale: 1.0, rotate: -12 },
];

// Deterministic random number generator
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

interface HeroProps {
  items: GalleryItem[];
}

// Quadratic bezier helpers — center-relative coordinates
function bezierPoint(t: number, p0: [number, number], p1: [number, number], p2: [number, number]): [number, number] {
  const x = (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0];
  const y = (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1];
  return [x, y];
}

function bezierTangentAngle(t: number, p0: [number, number], p1: [number, number], p2: [number, number]): number {
  const dx = 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
  const dy = 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

// Arc control points no longer used — scatter positions defined per-index below

// Scatter positions (center-relative px): upper-left, upper-right, mid-left, mid-right, bottom-center
const SCATTER_POSITIONS: [number, number][] = [
  [-530, -240],  // upper-left
  [530, -220],   // upper-right
  [-450, 160],   // mid-left
  [450, 180],    // mid-right
  [0, -300],     // top-center
];

const MOBILE_SCATTER_POSITIONS: [number, number][] = [
  [-115, -70],   // upper-left
  [115, -60],    // upper-right
  [-118, 110],   // mid-left
  [118, 120],    // mid-right
  [0, -130],     // top-center
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Hero: React.FC<HeroProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onShopClick = () => {
    router.push("/product");
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, 200], [0, 1]);
  const mobileTextY = useTransform(scrollY, [0, 200], [-260, -60]);

  const displayItems = useMemo(() => {
    const extra = { id: "extra-1", image: "/image/Memory1.jpg", alt: "Memory" };
    if (!items || items.length === 0) return [extra];
    return [...items.slice(0, 4), extra];
  }, [items]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.2 },
    },
  };

  const floatingVariant = (i: number): Variants => ({
    animate: {
      y: [0, i % 2 === 0 ? -12 : 12, 0],
      rotate: [0, i % 3 === 0 ? 3 : -3, 0],
      transition: {
        duration: 4 + (i % 3),
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2,
      },
    },
  });

  // Scatter rotations per position
  const SCATTER_ROTATIONS = [-18, 15, -22, 18, -8];

  return (
    <>
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/4516067/pexels-photo-4516067.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ── Hero text ── */}
      <motion.div
        className="absolute z-40 flex flex-col items-center justify-center pointer-events-none text-center gap-3"
        style={{ y: isMobile ? mobileTextY : -130 }}
      >
        <div className="flex items-center gap-2">
          {/* <span className="text-[11px] md:text-[16px] font-medium text-gray-900">
            Loved by 1,800+ customers
          </span> */}
        </div>
        <h1 className="font-ananda text-3xl md:text-6xl text-white leading-tight" style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}>
          Forever, in a touch.
        </h1>
        <span className="mt-2 max-w-lg text-white text-sm">
Because some memories deserve to stay.  </span>

        {/* <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 pointer-events-auto">
          <button
            onClick={onShopClick}
            className="bg-[#2d2d2d] text-white px-8 py-3 rounded-full font-medium hover:bg-[#1a1a1a] transition-all duration-300 flex items-center justify-center gap-2 min-w-[180px] text-base shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <ShoppingBag size={18} />
            <span>Buy Now</span>
          </button>
          <button
            onClick={() => router.push("/login")}
            className="bg-white text-[#2d2d2d] border border-[#2d2d2d] px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 min-w-[180px] text-base shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <LogIn size={18} />
            Login
          </button>
        </div> */}

      </motion.div>

      {/* ── Folder back (z-15) ── */}
      <div className="absolute z-[15] flex items-center justify-center pointer-events-none translate-y-36 md:translate-y-32">
        <motion.div
          className="relative  w-[330px] h-[270px] md:w-[460px] md:h-[370px] flex items-center justify-center"
          style={{ rotate: useTransform(scrollProgress, [0, 1], [-18, 0]) }}
        >
          <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="folderBackGrad" x1="125.95" y1="-36.2557" x2="125.95" y2="292.546" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFF5AC" />
                <stop offset="1" stopColor="#FFCC00" />
              </linearGradient>
            </defs>
            <rect x="50" y="50" width="400" height="400" rx="60" ry="60" fill="url(#folderBackGrad)" />
          </svg>
        </motion.div>
      </div>

      {/* ── Folder front flap (z-30, in front of photos) ── */}
      <div className="absolute z-30 flex items-center justify-center pointer-events-none translate-y-36 md:translate-y-32">
        <motion.div
          className="relative w-[330px] h-[270px] md:w-[460px] md:h-[370px] flex items-center justify-center"
          style={{
            rotate: useTransform(scrollProgress, [0, 1], [-18, 0]),
            skewX: useTransform(scrollProgress, [0, 1], [-30, 0]),
            x: useTransform(scrollProgress, [0, 1], [0, isMobile ? -54 : -74]),
          }}
        >
          <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ filter: "blur(0.5px)" }}>
            <defs>
              <filter id="glassBlur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="paint0_linear_flap" x1="125.95" y1="-70.7905" x2="125.95" y2="175.257" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0.85" />
                <stop offset="0.658352" stopColor="#FBF195" stopOpacity="0.75" />
              </linearGradient>
            </defs>
            <g transform="translate(150, 220) scale(1.6)">
              <g filter="url(#glassBlur)">
                <path d="M0 12.6627C0 5.6693 5.66931 0 12.6628 0L43.4194 0C53.2896 0 62.4167 5.2435 67.3884 13.7701C72.36 22.2967 81.4871 27.5402 91.3573 27.5402H216.232C234.882 27.5402 250 42.6584 250 61.3076V110.617C250 129.266 234.882 144.384 216.232 144.384H33.7673C15.1181 144.384 0 129.266 0 110.617V12.6627Z" fill="url(#paint0_linear_flap)" fillOpacity="0.9" />
              </g>
              <g>
                <path d="M0 12.6627C0 5.6693 5.66931 0 12.6628 0L43.4194 0C53.2896 0 62.4167 5.2435 67.3884 13.7701C72.36 22.2967 81.4871 27.5402 91.3573 27.5402H216.232C234.882 27.5402 250 42.6584 250 61.3076V110.617C250 129.266 234.882 144.384 216.232 144.384H33.7673C15.1181 144.384 0 129.266 0 110.617V12.6627Z" fill="url(#paint0_linear_flap)" fillOpacity="0.9" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
              </g>
            </g>
          </svg>
        </motion.div>
      </div>

      {/* ── Photos (z-20) ── */}
      <motion.div
        className="absolute w-full h-full flex items-center justify-center z-20 pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {displayItems.map((item, index) => {
          const scatter = isMobile ? MOBILE_SCATTER_POSITIONS : SCATTER_POSITIONS;
          const [initialX, initialY] = scatter[index] ?? [0, -300];
          const baseItemRotation = SCATTER_ROTATIONS[index] ?? 0;

          const count = displayItems.length;
          const endX      = (index - (count - 1) / 2) * (isMobile ? 22 : 45);
          const endY      = (isMobile ? 150 : 135) + index * (isMobile ? 3 : 5);
          const endRotate = (index - (count - 1) / 2) * (isMobile ? 7 : 10);
          const endScale  = isMobile ? 0.65 : 0.42;

          const x      = useTransform(scrollProgress, [0, 1], [initialX, endX]);
          const y      = useTransform(scrollProgress, [0, 1], [initialY, endY]);
          const rotate = useTransform(scrollProgress, [0, 1], [baseItemRotation, endRotate]);
          const scale  = useTransform(scrollProgress, [0, 1], [1, endScale]);

          return (
            <motion.div
              key={String(item.id)}
              className="absolute pointer-events-auto flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.06, type: "spring" }}
              style={{ x, y, rotate, scale, originX: 0.5, originY: 0.5 }}
            >
              <motion.div variants={floatingVariant(index)} animate="animate">
                <div className="w-[140px] h-[190px] md:w-[201px] md:h-[273px] relative bg-white shadow-xl p-2 pb-6 md:p-3 md:pb-10 flex flex-col items-center justify-start rounded-sm border border-gray-100">
                  <div className="relative w-full h-full overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 130px, 201px"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Buy Now button below folder (fades in on scroll) ── */}
      <motion.div
        className="absolute z-40 flex items-center justify-center pointer-events-auto"
        style={{ y: isMobile ? 310 : 360, opacity: scrollProgress }}
      >
        <button
          onClick={onShopClick}
          className="text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm hover:-translate-y-1 underline"
        >
          <span>Buy Now</span>
        </button>
      </motion.div>

      {/* ── Decorative assets (scroll into folder) ── */}
      {ASSETS.map((asset, index) => {
        const [initialX, initialY] = ASSET_POSITIONS[index] ?? [0, 0];

        const endX = (index - (ASSETS.length - 1) / 2) * 16;
        const endY = 188 + (index % 4) * 5;
        const endRotate = (index - (ASSETS.length - 1) / 2) * 6;

        const x      = useTransform(scrollProgress, [0, 1], [initialX, endX]);
        const y      = useTransform(scrollProgress, [0, 1], [initialY, endY]);
        const rotate = useTransform(scrollProgress, [0, 1], [asset.rotate, endRotate]);
        const scale  = useTransform(scrollProgress, [0, 1], [asset.scale, 0.28]);

        return (
          <motion.div
            key={asset.alt}
            className="absolute pointer-events-none hidden md:flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.07, type: "spring" }}
            style={{ x, y, rotate, scale, originX: 0.5, originY: 0.5 }}
          >
            <motion.div variants={floatingVariant(index)} animate="animate">
              <div className="relative w-[120px] h-[120px]">
                <Image
                  src={asset.image}
                  alt={asset.alt}
                  fill
                  className="object-contain drop-shadow-md"
                  sizes="120px"
                />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>

    </>
  );
};

export default Hero;
