"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

interface MobileInteractivePolaroidProps {
  id: number;
  image: string;
  rotation: string;
  alt: string;
  heading: string;
  subheading: string;
  audioSrc?: string;
  index?: number;
  total?: number;
}

export default function MobileInteractivePolaroid({
  id,
  image,
  rotation,
  alt,
  heading,
  subheading,
  audioSrc,
  index = 0,
  total = 3,
}: MobileInteractivePolaroidProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Motion values for drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleAudioToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  // Get position and styling classes based on index
  const getPositionClass = () => {
    if (index === 0) return 'mobile-polaroid-front';
    if (index === 1) return 'mobile-polaroid-mid';
    return 'mobile-polaroid-back';
  };

  const getBlurClass = () => {
    if (index === 0) return 'mobile-front-polaroid';
    if (index === 1) return 'mobile-depth-blur-light';
    return 'mobile-depth-blur-heavy';
  };

  const getFloatAnimation = () => {
    if (index === 0 || isReducedMotion) return '';
    if (index === 1) return 'animate-gentle-float-1';
    return 'animate-gentle-float-2';
  };

  // Handle drag for front polaroid only
  const handleDragStart = () => {
    if (index !== 0) return;
    setIsDragging(true);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (index !== 0) return;
    setIsDragging(false);
    
    // Snap back to center with some elastic effect
    x.set(0);
    y.set(0);
  };

  // Only front polaroid is interactive
  const isInteractive = index === 0;

  return (
    <motion.div
      className={`mobile-polaroid-stack ${
        getPositionClass()
      } ${getBlurClass()} ${getFloatAnimation()} ${
        isDragging ? 'dragging' : ''
      }`}
      style={{
        x: isInteractive ? x : 0,
        y: isInteractive ? y : 0,
        rotateX: isInteractive ? rotateX : 0,
        rotateY: isInteractive ? rotateY : 0,
      }}
      drag={isInteractive && !isReducedMotion}
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.3}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={() => isInteractive && setIsHovered(true)}
      onTouchEnd={() => isInteractive && setIsHovered(false)}
      onClick={() => isInteractive && setIsHovered(!isHovered)}
      whileHover={isInteractive ? { scale: 1.02 } : undefined}
      whileTap={isInteractive ? { scale: 0.98 } : undefined}
    >
      <div className="relative flex flex-col bg-white p-3 sm:p-4 shadow-2xl">
      {/* Audio Element */}
      {audioSrc && (
        <audio ref={audioRef} preload="metadata">
          <source src={audioSrc} type="audio/aiff" />
          <source src={audioSrc.replace(".aiff", ".mp3")} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      {/* Main Image Container */}
      <div className="relative w-full aspect-square mb-3 sm:mb-4 p-1.5 sm:p-2">
        <Image
          src={image}
          alt={alt}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />

        {/* Audio Control Overlay */}
        {audioSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
            className="absolute top-2 right-2 z-10"
          >
            <motion.button
              onClick={handleAudioToggle}
              className="flex items-center justify-center w-8 h-8 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Content Below Image (Polaroid Style) */}
      <div className="text-center text-gray-800 mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-base font-semibold mb-1 leading-tight">
          {heading}
        </h3>
        <p className="text-xs sm:text-sm opacity-80 leading-tight">
          {subheading}
        </p>
      </div>

      {/* Audio Controls Below */}
      {audioSrc && (
        <div className="flex justify-center items-center gap-2 sm:gap-3">
          <motion.button
            onClick={handleAudioToggle}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-all duration-200"
            whileTap={{ scale: 0.95 }}
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
            ) : (
              <Play className="w-3 h-3 sm:w-4 sm:h-4" />
            )}
            <span className="text-xs font-medium">
              {isPlaying ? "Pause" : "Play"}
            </span>
          </motion.button>

          {/* Audio Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isPlaying ? 1 : 0 }}
            className="flex items-center gap-1"
          >
            <Volume2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-600" />
            <div className="flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-0.5 sm:w-1 h-2 sm:h-3 bg-gray-600 rounded-full"
                  animate={{
                    scaleY: isPlaying ? [0.5, 1, 0.5] : 0.5,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: isPlaying ? Infinity : 0,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
      </div>
    </motion.div>
  );
}
