"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "config/api";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Loading from "@/components/loading";

// const memories = [
//   {
//     image: img6,
//     title: "35th Birthday Day",
//     date: "2024-06-29",
//   },
//   {
//     image: img3,
//     title: "35th Birthday Day",
//     date: "2024-06-29",
//   },
//   {
//     image: img4,
//     title: "First day of day care.",
//     date: "2003-03-17",
//   },
//   {
//     image: img7,
//     title: "Dashain 2023",
//     date: "2023-09-10",
//   },
//   {
//     image: img1,
//     title: "At Goa Airport",
//     date: "2024-08-19",
//   },
// ];

const fetchMemoryCard = async (userId: string) => {
  const { data } = await api.get(`/memoryCard/get/${userId}`);
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

export default function MemoryPage({ userId }) {
  const [direction, setDirection] = useState(0);
  const [index, setIndex] = useState(0);
  const router = useRouter();

  // Fetch directly using React Query
  const {
    data: memories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["memoryCard", userId],
    queryFn: () => fetchMemoryCard(userId),
    enabled: !!userId, // only fetch if we have a userId
  });

  if (isLoading)
    return (
      <Loading />
      // <div>Loading...</div>
    );
  if (error) return <div>Error loading memories</div>;
  if (!memories || memories.length === 0) return <div>No memories found</div>;

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      setDirection(1); // moving left (next card)
      setIndex((i) => (i + 1) % memories.length);
    } else if (info.offset.x > 50) {
      setDirection(-1); // moving right (previous card)
      setIndex((i) => (i - 1 + memories.length) % memories.length);
    }
  };

  return (
    <main
      className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 bg-cover bg-center"
      style={{ backgroundImage: `url('/sky.jpg')` }} // ✅ background image here
    >
      {isLoading && <Loading />}
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        aria-label="Back"
        className="absolute top-5 left-5 w-9 h-9 flex items-center justify-center rounded-full border border-gray-500 bg-gray-800 text-white text-lg shadow-md hover:bg-gray-700 transition z-50"
      >
        {/* {`<`} */}
        <ChevronLeft />
      </button>

      {/* Grid View Button */}
      {/* <button
        onClick={() => router.back()}
        className="absolute bottom-5 right-5 px-3 py-1 text-sm bg-white border border-gray-300 text-gray-700 rounded-full shadow-sm hover:bg-gray-100 transition z-50"
      >
        Back
      </button> */}

      {/* Slide area */}
      <div className="relative w-[95vw] max-w-[360px] h-[380px] flex items-center justify-center">
        {/* Main Polaroid Card */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={handleDragEnd}
            initial={{ x: direction === 1 ? 120 : -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === 1 ? -120 : 120, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[280px] h-[340px] bg-white rounded-sm shadow-xl flex flex-col cursor-grab select-none relative z-10 border border-gray-300"
          >
            <div className="w-full h-[240px] bg-white border-[10px] border-white border-b-0 shadow-inner">
              <img
                src={memories[index].image}
                alt={memories[index].title}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            {memories[index]?.audio && (
              <audio
                controls
                className="mt-2 w-full"
                src={memories[index].audio}
              >
                Your browser does not support the audio element.
              </audio>
            )}

            <div className="flex flex-col justify-center items-center px-4 py-3 h-[100px]">
              <h2 className="text-xs font-semibold text-gray-800 truncate">
                {memories[index].title}
              </h2>
              <p className="text-[10px] text-gray-500">
                {memories[index].createdAt.slice(0, 10)}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 mt-5 items-center">
        {getVisibleDots(index, memories.length).map((dot, i) => (
          <div
            key={i}
            onClick={() => setIndex(dot.index)}
            className={`rounded-full transition-all duration-200 cursor-pointer ${
              dot.index === index
                ? "w-2 h-2 bg-gray-400 opacity-80 scale-110"
                : dot.edge
                ? "w-1 h-1 bg-gray-200 opacity-30"
                : "w-2 h-2 bg-gray-200 opacity-30 hover:opacity-50"
            }`}
          />
        ))}
      </div>
    </main>
  );
}
