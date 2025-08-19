"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

interface PolaroidData {
  id: number;
  image: string;
  rotation: string;
  alt: string;
  heading: string;
  subheading: string;
  audioSrc?: string;
}

interface StackedPolaroidsProps {
  memories: PolaroidData[];
}

export default function StackedPolaroids({ memories }: StackedPolaroidsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});

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

  const handleAudioToggle = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRefs.current[id];
    if (!audio) return;

    if (isPlaying[id]) {
      audio.pause();
      setIsPlaying(prev => ({ ...prev, [id]: false }));
    } else {
      // Pause all other audios
      Object.keys(audioRefs.current).forEach(key => {
        const otherAudio = audioRefs.current[parseInt(key)];
        if (otherAudio && parseInt(key) !== id) {
          otherAudio.pause();
        }
      });
      setIsPlaying(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: parseInt(key) === id }), {}));
      audio.play();
    }
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  // Get card position and styling based on its relationship to current index
  const getCardVariant = (index: number) => {
    const position = (index - currentIndex + memories.length) % memories.length;
    
    switch (position) {
      case 0: // Front card
        return {
          z: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        };
      case 1: // Middle card
        return {
          z: -50,
          rotateX: 15,
          rotateY: -10,
          scale: 0.95,
          opacity: 0.8,
          y: -10,
          filter: "blur(1px)",
        };
      case 2: // Back card
        return {
          z: -100,
          rotateX: 25,
          rotateY: -15,
          scale: 0.9,
          opacity: 0.6,
          y: -20,
          filter: "blur(2px)",
        };
      default: // Hidden cards
        return {
          z: -150,
          rotateX: 35,
          rotateY: -20,
          scale: 0.85,
          opacity: 0.3,
          y: -30,
          filter: "blur(3px)",
        };
    }
  };

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
      {/* 3D Container */}
      <div 
        className="relative w-full max-w-sm h-full"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {memories.map((memory, index) => {
          const variant = getCardVariant(index);
          const position = (index - currentIndex + memories.length) % memories.length;
          const isActive = position === 0;
          
          return (
            <motion.div
              key={memory.id}
              className="absolute inset-0 cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={variant}
              transition={{
                duration: isReducedMotion ? 0.1 : 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              onClick={isActive ? nextCard : undefined}
              whileHover={isActive ? { scale: 1.02 } : undefined}
              whileTap={isActive ? { scale: 0.98 } : undefined}
            >
              <div className="w-full h-full bg-white rounded-lg shadow-2xl p-4 flex flex-col">
                {/* Audio Element */}
                {memory.audioSrc && (
                  <audio
                    ref={(el) => {
                      audioRefs.current[memory.id] = el;
                    }}
                    preload="metadata"
                    onEnded={() => setIsPlaying(prev => ({ ...prev, [memory.id]: false }))}
                  >
                    <source src={memory.audioSrc} type="audio/aiff" />
                    <source src={memory.audioSrc.replace(".aiff", ".mp3")} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}

                {/* Image Container */}
                <div className="relative flex-1 mb-4">
                  <Image
                    src={memory.image}
                    alt={memory.alt}
                    fill
                    className="object-cover rounded"
                    priority={isActive}
                  />
                  
                  {/* Audio Control Overlay */}
                  {memory.audioSrc && isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.9 }}
                      className="absolute top-2 right-2 z-10"
                    >
                      <motion.button
                        onClick={(e) => handleAudioToggle(memory.id, e)}
                        className="flex items-center justify-center w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
                        whileTap={{ scale: 0.9 }}
                        aria-label={isPlaying[memory.id] ? "Pause audio" : "Play audio"}
                      >
                        {isPlaying[memory.id] ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="text-center text-gray-800 mb-4">
                  <h3 className="text-lg font-semibold mb-2 leading-tight">
                    {memory.heading}
                  </h3>
                  <p className="text-sm opacity-80 leading-tight">
                    {memory.subheading}
                  </p>
                </div>

                {/* Audio Controls */}
                {memory.audioSrc && isActive && (
                  <div className="flex justify-center items-center gap-3">
                    <motion.button
                      onClick={(e) => handleAudioToggle(memory.id, e)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-all duration-200"
                      whileTap={{ scale: 0.95 }}
                      aria-label={isPlaying[memory.id] ? "Pause audio" : "Play audio"}
                    >
                      {isPlaying[memory.id] ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {isPlaying[memory.id] ? "Pause" : "Play"}
                      </span>
                    </motion.button>

                    {/* Audio Indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isPlaying[memory.id] ? 1 : 0 }}
                      className="flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3 text-gray-600" />
                      <div className="flex gap-0.5">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-3 bg-gray-600 rounded-full"
                            animate={{
                              scaleY: isPlaying[memory.id] ? [0.5, 1, 0.5] : 0.5,
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: isPlaying[memory.id] ? Infinity : 0,
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
        })}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {memories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gray-800 w-6"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Tap indicator for front card */}
      <motion.div
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center text-gray-500 text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Tap to flip through memories
      </motion.div>
    </div>
  );
}
