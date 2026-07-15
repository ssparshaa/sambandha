// // import type { NextPage } from "next";
// // import Image from "next/image";

// // export type CustomerMemoryCardType = {
// //   className?: string;
// // };

// // const CustomerMemoryCard: NextPage<CustomerMemoryCardType> = ({
// //   className = "",
// // }) => {
// //   return (
// //     <div
// //       className={`rounded-[28px] [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.15),_rgba(0,_0,_0,_0.15))] overflow-hidden flex flex-col items-center justify-start py-[66px] px-[0px] gap-[20px] text-center text-[18px] text-[#000] font-[Roboto] mq480:self-stretch mq480:w-auto mq480:pl-[0px] mq480:box-border ${className}`}
// //     >
// //       <div className="relative font-light sm:text-[16px]">22/10/2025</div>
// //       <div className="relative text-[28px] font-light text-left sm:text-[24px]">
// //         Choose your wallpaper
// //       </div>
// //       <div className="self-stretch overflow-hidden flex flex-col items-center justify-center gap-[20px]">
// //         <div className="flex flex-row items-start justify-start py-[0px] px-[40px]">
// //           <Image
// //             className="w-[414px] relative rounded-[16px] h-[370px] object-cover sm:w-[290px] sm:h-[300px] mq350small:w-[270px] mq350small:h-[300px] mq350small:min-w-[200px] mq350small:min-h-[250px] mq480:w-[360px]"
// //             width={414}
// //             height={370}
// //             alt=""
// //             src="/rectangle-15@2x.png"
// //           />
// //         </div>
// //         <Image
// //           className="w-[67px] relative h-[20px]"
// //           width={67}
// //           height={20}
// //           alt=""
// //           src="/full-pagination-sets.svg"
// //         />
// //       </div>
// //       <div className="relative font-light sm:text-[12px]">
// //         <p className="m-[0px]">You can change your wallpaper</p>
// //         <p className="m-[0px]">picture later on ...</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CustomerMemoryCard;

// "use client";
// import type { FC } from "react";
// import Image from "next/image";
// import { EllipsisVertical } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { usePathname } from "next/navigation";

// export type CustomerMemoryCardType = {
//   className?: string;
//   date: string;
//   title: string;
//   description: string;
//   imageUrl?: string;
//   bgColor?: string;
//   audio?: string;
// };

// const CustomerMemoryCard: FC<CustomerMemoryCardType> = ({
//   className = "",
//   date,
//   title,
//   description,
//   bgColor,
//   audio,
//   imageUrl = "/rectangle-15@2x.png",
// }) => {
//   const pathname = usePathname();
//   const isUserIdPage = /^\/[a-f\d]{24}$/i.test(pathname);

//   return (
//     <div
//       style={{ backgroundColor: bgColor }}
//       className={`relative shadow-[0px_4px_9.7px_3px_rgba(0,_0,_0,_0.05)] rounded-[10px] [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.15),_rgba(0,_0,_0,_0.15))] overflow-hidden flex flex-col items-center justify-center py-[25px] px-[0px] gap-[20px] text-center text-[18px] text-[#000] font-[Roboto] mq480:self-stretch mq480:w-auto mq480:pl-[0px] mq480:box-border ${className}`}
//     >
//       {/* EllipsisVertical in top-right */}
//       {!isUserIdPage && (
//         <div className="absolute top-2 right-2 z-10 cursor-pointer">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <EllipsisVertical className="" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start" className="flex flex-col gap-1">
//               <DropdownMenuItem>Edit</DropdownMenuItem>
//               <DropdownMenuItem
//                 className="text-red-500"
//                 // onClick={() => {
//                 //   setIsDeleteModalOpen(true);
//                 //   setUserId(user._id);
//                 // }}
//               >
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>{" "}
//         </div>
//       )}

//       <div className="relative font-light sm:text-[16px]">{date}</div>

//       <div className="self-stretch overflow-hidden flex flex-col items-center justify-center">
//         <div className="flex flex-row items-start justify-start py-[0px] px-[40px]">
//           <Image
//             className="w-[414px] relative rounded-[10px] h-[370px] object-cover sm:w-[290px] sm:h-[300px] mq350small:w-[270px] mq350small:h-[300px] mq350small:min-w-[200px] mq350small:min-h-[250px] mq480:w-[360px]"
//             // layout="fill"
//             objectFit="contain"
//             width={414}
//             height={370}
//             alt={title}
//             src={imageUrl}
//           />
//         </div>
//       </div>

//       <div className="self-stretch relative sm:text-[12px]">
//         <p className="m-[0px] font-semibold">{title}</p>
//         <p className="m-[0px] font-light">{description}</p>
//       </div>
//     </div>
//   );
// };

// export default CustomerMemoryCard;

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";

interface CustomerMemoryCard {
  id: string;
  image: string;
  // rotation?: string;
  date: string;
  alt: string;
  heading: string;
  subheading: string;
  audioSrc?: string;
  index?: number;
  setIsDeleteModalOpen?: (isOpen: boolean) => void;
  setSelectedMemoryCardId?: (userId: string) => void;
  userId?: string;
}

export default function CustomerMemoryCard({
  id,
  image,
  // rotation,
  date,
  alt,
  heading,
  subheading,
  audioSrc,
  index = 0,
  setSelectedMemoryCardId,
  setIsDeleteModalOpen,
  userId = "",
}: CustomerMemoryCard) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isUserIdPage = /^\/[a-f\d]{24}$/i.test(pathname);

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

  const [isReducedMotion, setIsReducedMotion] = useState(false);

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

  return (
    <motion.div
      className={`relative w-full max-w-[280px] sm:max-w-[320px] mx-auto bg-white shadow-2xl transform cursor-pointer group rounded-xl`}
      style={{
        padding: "12px 12px 35px 12px",
        minHeight: "320px",
      }}
      // variants={{
      //   hidden: { opacity: 0, y: 80, rotate: 0 },
      //   visible: {
      //     opacity: 1,
      //     y: 0,
      //     rotate: rotation?.includes("-") ? -7 : 7,
      //     transition: {
      //       duration: 0.8,
      //       delay: index * 0.2,
      //       ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
      //     },
      //   },
      // }}
      // whileHover={{
      //   y: -10,
      //   scale: 1.05,
      //   rotate: 0,
      //   transition: { duration: 0.3 },
      // }}
      // onHoverStart={() => setIsHovered(true)}
      // onHoverEnd={() => setIsHovered(false)}
    >
      {/* EllipsisVertical in top-right */}
      {!isUserIdPage && (
        <div className="absolute top-2 right-2 z-10 cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical className="text-black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="flex flex-col gap-1">
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/user/${userId}/memoryCard/edit/${id}`)
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setSelectedMemoryCardId(id);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>{" "}
        </div>
      )}
      {/* Audio Element */}
      {audioSrc && (
        <audio ref={audioRef} preload="metadata">
          <source src={audioSrc} type="audio/aiff" />
          <source src={audioSrc.replace(".aiff", ".mp3")} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      <div className="text-center text-gray-800 mb-3">
        <p className="text-xs opacity-80 leading-tight">{date}</p>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full aspect-square mb-4">
        <Image
          src={image}
          alt={alt}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content and Audio Controls Below Image (Polaroid Style) */}
      <div className="flex flex-col items-center gap-2">
        {/* Text Content */}
        <div className="text-center text-gray-800 mb-3">
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
