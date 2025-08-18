"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

interface InteractivePolaroidProps {
  id: number;
  image: string;
  rotation: string;
  alt: string;
  heading: string;
  subheading: string;
  audioSrc?: string;
  index?: number;
}

export default function InteractivePolaroid({
  id,
  image,
  rotation,
  alt,
  heading,
  subheading,
  audioSrc,
  index = 0,
}: InteractivePolaroidProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  return (
    <motion.div
      className={`relative w-full max-w-sm mx-auto h-[500px] shadow-2xl transform ${rotation} cursor-pointer group`}
      style={{
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      variants={{
        hidden: { opacity: 0, y: 80, rotate: 0 },
        visible: {
          opacity: 1,
          y: 0,
          rotate: rotation.includes("-") ? -7 : 7,
          transition: {
            duration: 0.8,
            delay: index * 0.2,
            ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
          },
        },
      }}
      whileHover={{
        y: -10,
        scale: 1.05,
        rotate: 0,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Audio Element */}
      {audioSrc && (
        <audio ref={audioRef} preload="metadata">
          <source src={audioSrc} type="audio/aiff" />
          <source src={audioSrc.replace(".aiff", ".mp3")} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      {/* Main Image Container - Positioned to fit in the black area of polaroid */}
      <div className="absolute top-[40px] left-[40px] right-[40px] bottom-[140px]">
        <Image
          src={image}
          alt={alt}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content and Audio Controls in White Bottom Area */}
      <div className="absolute bottom-[20px] left-[40px] right-[40px] flex flex-col items-center gap-2">
        {/* Text Content */}
        <div className="text-center text-gray-800">
          <h3 className="text-base font-semibold leading-tight">{heading}</h3>
          <p className="text-xs opacity-80 leading-tight">{subheading}</p>
        </div>

        {/* Audio Controls */}
        {audioSrc && (
          <div className="flex justify-center items-center gap-2 mt-1">
            <motion.button
              onClick={handleAudioToggle}
              className="flex items-center justify-center gap-1.5 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
            >
              {isPlaying ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3" />
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
              <Volume2 className="w-2.5 h-2.5 text-gray-600" />
              <div className="flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 h-2 bg-gray-600 rounded-full"
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
