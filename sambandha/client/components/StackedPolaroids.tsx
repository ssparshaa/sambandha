"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
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

  // Handle swipe gestures
  const handleDragEnd = (event: any, info: PanInfo) => {
    const { offset, velocity } = info;
    
    // Check if swipe was significant enough (distance or velocity)
    if (Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 300) {
      if (offset.x > 0) {
        // Swiped right - go to previous
        prevCard();
      } else {
        // Swiped left - go to next
        nextCard();
      }
    }
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
        };
      case 1: // Middle card
        return {
          z: -30,
          rotateX: 8,
          rotateY: -5,
          scale: 0.96,
          opacity: 0.7,
          y: -8,
        };
      case 2: // Back card
        return {
          z: -60,
          rotateX: 12,
          rotateY: -8,
          scale: 0.92,
          opacity: 0.5,
          y: -16,
        };
      default: // Hidden cards
        return {
          z: -90,
          rotateX: 15,
          rotateY: -10,
          scale: 0.88,
          opacity: 0,
          y: -24,
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
          const position = (index - currentIndex + memories.length) % memories.length;
          const isActive = position === 0;
          
          // Only render the active card
          if (!isActive) return null;
          
          return (
            <motion.div
              key={`${memory.id}-${currentIndex}`}
              className="absolute inset-0 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -100 }}
              transition={{
                duration: isReducedMotion ? 0.1 : 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
    </div>
  );
}
