"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "config/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "@/components/loading";
import sky from "@/../public/sky.jpg";
import AudioPlayer from "@/components/AudioPlayer";

interface Props {
  userId: string;
  folderId: string;
}

interface Memory {
  _id: string;
  title: string;
  image: string;
  audio?: string;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  wallpaper?: string;
  bgImage?: string;
  bgImageUrl?: string;
}

const fetchFolderById = async (folderId: string) => {
  const { data } = await api.get(`/folder/${folderId}`);
  return {
    folder: data.folder,
    memoryCards: data.updatedMemoryCards,
  };
};

const fetchUserData = async (userId: string): Promise<User> => {
  const { data } = await api.get(`/user/get/${userId}`);
  return data;
};

const MAX_DOTS = 7;

const getVisibleDots = (current: number, total: number) => {
  if (total <= MAX_DOTS) {
    return Array.from({ length: total }, (_, i) => ({ index: i, edge: false }));
  }
  let start = Math.max(0, current - Math.floor(MAX_DOTS / 2));
  let end = start + MAX_DOTS;
  if (end > total) {
    end = total;
    start = end - MAX_DOTS;
  }
  return Array.from({ length: MAX_DOTS }, (_, i) => {
    const idx = start + i;
    const edge = (i === 0 && start > 0) || (i === MAX_DOTS - 1 && end < total);
    return { index: idx, edge };
  });
};

const MemoryPage: React.FC<Props> = ({ userId, folderId }) => {
  const [direction, setDirection] = useState(0);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const [bgImage, setBgImage] = useState(sky.src);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["folder", folderId],
    queryFn: () => fetchFolderById(folderId),
    enabled: !!folderId,
  });

  const { data: user, isLoading: loadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      if (!userId) {
        throw new Error("Missing userId");
      }
      return fetchUserData(userId);
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if ((user?.bgImage && user?.bgImageUrl) || user?.wallpaper) {
      setBgImage(user.bgImageUrl || user.wallpaper);
    }
  }, [user]);

  const folder = data?.folder;
  const memoryCards = data?.memoryCards || [];

  if (isLoading || loadingUser) return <Loading />;
  if (error) return <div className="text-white text-center">Error loading memories</div>;

  const handleDragEnd = (event, info) => {
    const threshold = 70;
    if (info.offset.x < -threshold && index < memoryCards.length - 1) {
      setDirection(1);
      setIndex((i) => i + 1);
    } else if (info.offset.x > threshold && index > 0) {
      setDirection(-1);
      setIndex((i) => i - 1);
    }
  };

  const goToNext = () => {
    if (index < memoryCards.length - 1) {
      setDirection(1);
      setIndex((i) => i + 1);
    }
  };

  const goToPrev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex((i) => i - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotate: direction > 0 ? 10 : -10,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      rotate: direction > 0 ? -10 : 10,
      scale: 0.8,
    }),
  };

  return (
    <main
      className="w-full max-h-screen h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute h-screen inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        aria-label="Back"
        className="absolute top-5 left-5 w-10 h-10 flex items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-white text-lg shadow-lg hover:bg-black/60 transition z-50"
      >
        <ChevronLeft size={24} />
      </button>

      {!memoryCards || memoryCards.length === 0 ? (
        <div
          className="text-white text-center text-xl font-medium"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
        >
          No memories found
        </div>
      ) : (
        <>
          {/* Polaroid Gallery Container */}
          <div className="relative w-full max-w-[500px] h-[500px] flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={goToPrev}
              disabled={index === 0}
              className={`absolute left-0 z-20 flex items-center justify-center transition-all ${
                index === 0
                  ? "opacity-20 cursor-not-allowed"
                  : "opacity-70 hover:opacity-100 hover:scale-110 active:scale-95"
              }`}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
              aria-label="Previous memory"
            >
              <ChevronLeft size={36} className="text-white" strokeWidth={2.5} />
            </button>

            {/* Polaroid Card Stack */}
            <div className="relative w-[320px] h-[420px] flex items-center justify-center perspective-1000">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 350, damping: 30 },
                    opacity: { duration: 0.1 },
                    rotate: { duration: 0.15 },
                    scale: { duration: 0.15 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="absolute w-[320px] bg-white rounded-sm flex flex-col cursor-grab active:cursor-grabbing select-none"
                  style={{
                    boxShadow: "0 15px 50px rgba(0,0,0,0.4), 0 5px 15px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Photo Area with White Border (Polaroid Style) */}
                  <div className="p-4 pb-3 bg-white">
                    <div className="w-full aspect-square bg-gray-100 shadow-inner overflow-hidden">
                      <img
                        src={memoryCards[index].image}
                        alt={memoryCards[index].title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* Audio Player */}
                  {memoryCards[index]?.audio && (
                    <div className="px-4 pb-2">
                      <AudioPlayer src={memoryCards[index].audio} />
                    </div>
                  )}

                  {/* Caption Area (Larger bottom section like real Polaroid) */}
                  <div className="flex flex-col justify-start items-center px-6 py-4 bg-white min-h-[100px]">
                    <h2 className="text-sm font-handwriting text-gray-800 text-center leading-relaxed">
                      {memoryCards[index].title}
                    </h2>
                    <p className="text-xs text-gray-500 mt-2 font-mono">
                      {new Date(memoryCards[index].createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              disabled={index === memoryCards.length - 1}
              className={`absolute right-0 z-20 flex items-center justify-center transition-all ${
                index === memoryCards.length - 1
                  ? "opacity-20 cursor-not-allowed"
                  : "opacity-70 hover:opacity-100 hover:scale-110 active:scale-95"
              }`}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
              aria-label="Next memory"
            >
              <ChevronRight size={36} className="text-white" strokeWidth={2.5} />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 flex flex-col items-center gap-3 z-10">
            {/* Dots */}
            <div className="flex gap-1.5 items-center">
              {getVisibleDots(index, memoryCards.length).map((dot, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(dot.index > index ? 1 : -1);
                    setIndex(dot.index);
                  }}
                  className={`transition-all duration-200 rounded-full ${
                    dot.index === index
                      ? "w-8 h-2.5 bg-white shadow-lg"
                      : dot.edge
                      ? "w-1.5 h-1.5 bg-white/30"
                      : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to memory ${dot.index + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="text-white/90 text-sm font-medium bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
              {index + 1} / {memoryCards.length}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default MemoryPage;