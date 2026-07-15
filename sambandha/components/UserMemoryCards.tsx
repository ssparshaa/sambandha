// "use client";
// import { useQuery } from "@tanstack/react-query";
// import CustomerPage from "./customer-page";
// import api from "../config/api";
// import Image from "next/image";
// import CustomerMemoryCard from "@/components/customer-memory-card";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/scrollbar";
// import "swiper/css/pagination";
// import {
//   Keyboard,
//   Navigation,
//   Mousewheel,
//   Pagination,
//   Scrollbar,
// } from "swiper/modules";

// const fetchMemoryCard = async (userId: string) => {
//   const { data } = await api.get(`/memoryCard/get/${userId}`);
//   return data;
// };

// const UserMemoryCards = ({ userId }: { userId: string }) => {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["memoryCard", userId],
//     queryFn: () => fetchMemoryCard(userId),
//     enabled: !!userId,
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching memory card</div>;
//   if (!data || data.length === 0) return <div>No memory cards found</div>;

//   return (
//     <div className="flex flex-col min-h-screen w-full bg-white text-[#323334] font-['Reckless_Neue'] px-4 pb-4 pt-12 text-center">
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col items-center justify-center">
//         <Swiper
//           spaceBetween={30}
//           slidesPerView={1}
//           pagination={true}
//           navigation={true}
//           // keyboard={true}
//           // mousewheel={true}
//           modules={[Keyboard, Navigation, Mousewheel, Pagination, Scrollbar]}
//           className="w-full lg:w-[40%] h-auto"
//         >
//           {data.map((card: any) => (
//             <SwiperSlide
//               key={card._id}
//               // className="flex justify-center items-center"
//             >
//               <CustomerMemoryCard
//                 className="max-w-[800px] w-full"
//                 bgColor={card.bgColor}
//                 date={new Date(card.createdAt).toLocaleDateString()}
//                 title={card.title}
//                 description={card.description}
//                 imageUrl={card.image}
//                 audio={card.audio}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Sticky Footer */}
//       <div className="flex flex-col items-center justify-end gap-1 text-[18px] font-['Neue_Montreal']">
//         <div className="text-base leading-6 max-w-[90%] md:max-w-[400px]">
//           Made with love with
//         </div>
//         <Image
//           className="w-[135px] h-[34px] object-contain"
//           width={135}
//           height={34}
//           alt="Made with love"
//           src="/3@2x.png"
//         />
//       </div>
//     </div>
//   );
// };

// export default UserMemoryCards;

// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";
// import sky from "../public/sky.jpg";
// import { useQuery } from "@tanstack/react-query";
// import api from "config/api";
// import Cookies from "js-cookie";
// import Loading from "@/loading";

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   status: string;
//   wallpaper?: string;
//   bgImage?: string;
//   bgImageUrl?: string;
// }

// interface Folder {
//   _id: string;
//   name: string;
//   color?: string;
//   count?: number;
//   previewImages?: string[];
// }

// const fetchFolders = async (userId: string) => {
//   const { data } = await api.get(`/folder/user/${userId}`);
//   return data.folders || [];
// };

// const fetchUserData = async (userId: string): Promise<User> => {
//   const { data } = await api.get(`/user/get/${userId}`);
//   return data;
// };

// export default function UserMemoryCards({ userId }: { userId: string }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [clickedFolder, setClickedFolder] = useState<string | null>(null);
//   const router = useRouter();
//   const [bgImage, setBgImage] = useState(sky.src);

//   useEffect(() => {
//     let timeout;
//     if (isOpen) {
//       timeout = setTimeout(() => {
//         router.push(`/${userId}/memories`);
//       }, 1200);
//     }
//     return () => clearTimeout(timeout);
//   }, [isOpen, router]);

//   const {
//     data: folders,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["folders", userId],
//     queryFn: () => fetchFolders(userId),
//     enabled: !!userId,
//     staleTime: Infinity,
//   });

//   const { data: user, isLoading: loadingUser } = useQuery({
//     queryKey: ["user", userId],
//     queryFn: () => {
//       if (!userId) {
//         throw new Error("Missing userId");
//       }
//       return fetchUserData(userId);
//     },
//     enabled: !!userId,
//   });

//   useEffect(() => {
//     if ((user?.bgImage && user?.bgImageUrl) || user?.wallpaper) {
//       setBgImage(user.bgImageUrl || user.wallpaper);
//     }
//   }, [user]);

//   const handleFolderClick = (folderID: string) => {
//     setClickedFolder(folderID);
//     setTimeout(() => {
//       if (typeof window !== "undefined") {
//         window.selectedFolder = folderID;
//       }
//       router.push(`/${userId}/${folderID}`);
//     }, 600);
//   };

//   if (isLoading || loadingUser) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center bg-stone-900">
//         <Loading />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center bg-stone-900">
//         <p className="text-white text-lg">Error fetching memory folders</p>
//       </div>
//     );
//   }

//   return (
//     <main
//       className="w-full min-h-screen bg-cover bg-center relative overflow-x-hidden"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       {/* Backdrop Overlay */}
//       <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

//       {/* Content Container */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
//         <div className="w-full max-w-6xl">
//           {/* Folders Grid - Centered with justify-center */}
//           <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
//             {folders.length > 0 ? (
//               folders.map((folder: Folder, index: number) => {
//                 const isClicked = clickedFolder === folder._id;
//                 return (
//                   <motion.div
//                     key={folder._id || index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05, duration: 0.3 }}
//                     className="w-[calc(50%-1rem)] sm:w-auto flex flex-col items-center cursor-pointer group"
//                     onClick={() => handleFolderClick(folder._id)}
//                   >
//                     {/* Folder Container */}
//                     <div className="w-[120px] relative transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1">
//                       <div className="relative w-full h-[100px]">
//                         {/* Main Folder Body */}
//                         <div
//                           style={{
//                             backgroundColor: folder?.color || "#E8E8E8",
//                           }}
//                           className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
//                         ></div>

//                         {/* Images Peeking Out from Top - With Lift Animation */}
//                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-full flex justify-center z-5">
//                           <motion.div
//                             animate={
//                               isClicked
//                                 ? {
//                                     y: -20,
//                                     rotate: -15,
//                                     x: -50,
//                                     scale: 1.05,
//                                   }
//                                 : {}
//                             }
//                             transition={{
//                               duration: 0.4,
//                               ease: [0.34, 1.56, 0.64, 1],
//                             }}
//                             className="w-12 h-16 rounded-lg overflow-hidden shadow-5xl border-[3px] border-white absolute"
//                             style={{
//                               transform: `rotate(-33deg) translateX(-40px)`,
//                               zIndex: 1,
//                             }}
//                           >
//                             <img
//                               src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=200&fit=crop"
//                               alt=""
//                               className="w-full h-full object-cover"
//                             />
//                           </motion.div>
//                           <motion.div
//                             animate={
//                               isClicked
//                                 ? {
//                                     y: -25,
//                                     rotate: 0,
//                                     scale: 1.08,
//                                   }
//                                 : {}
//                             }
//                             transition={{
//                               duration: 0.4,
//                               ease: [0.34, 1.56, 0.64, 1],
//                               delay: 0.05,
//                             }}
//                             className="w-12 h-16 rounded-lg overflow-hidden shadow-5xl border-[3px] border-white absolute"
//                             style={{
//                               transform: `rotate(0deg) translateY(10px)`,
//                               zIndex: 3,
//                             }}
//                           >
//                             <img
//                               src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=200&fit=crop"
//                               alt=""
//                               className="w-full h-full object-cover"
//                             />
//                           </motion.div>
//                           <motion.div
//                             animate={
//                               isClicked
//                                 ? {
//                                     y: -20,
//                                     rotate: 15,
//                                     x: 50,
//                                     scale: 1.05,
//                                   }
//                                 : {}
//                             }
//                             transition={{
//                               duration: 0.4,
//                               ease: [0.34, 1.56, 0.64, 1],
//                               delay: 0.1,
//                             }}
//                             className="w-12 h-26 rounded-lg overflow-hidden shadow-5xl border-[3px] border-white absolute"
//                             style={{
//                               transform: `rotate(33deg) translateX(40px)`,
//                               zIndex: 2,
//                             }}
//                           >
//                             <img
//                               src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150&h=200&fit=crop"
//                               alt=""
//                               className="w-full h-full object-cover"
//                             />
//                           </motion.div>
//                         </div>

//                         {/* Shadow layer behind glassmorphic - only top part */}
//                         <div
//                           style={{
//                             clipPath:
//                               "polygon(0% 0%, 50% 0%, 52% 5%, 54% 10%, 56% 14%, 58% 15%, 100% 15%, 100% 40%, 0% 40%)",
//                           }}
//                           className="absolute top-0 left-0 w-full h-full z-[9]"
//                         >
//                           <div className="w-full h-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"></div>
//                         </div>

//                         {/* Glassmorphic Front Layer - Folder Shape */}
//                         <div
//                           style={{
//                             background:
//                               "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
//                             backdropFilter: "blur(5px)",
//                             WebkitBackdropFilter: "blur(20px)",
//                             clipPath:
//                               "polygon(0% 0%, 50% 0%, 52% 5%, 54% 10%, 56% 14%, 58% 15%, 100% 15%, 100% 100%, 0% 100%)",
//                           }}
//                           className="absolute top-0 left-0 w-full h-full transition-all duration-300 z-10 rounded-2xl"
//                         >
//                           {/* Photo Count */}
//                           <div className="absolute bottom-3 right-3">
//                             <span className="text-white text-xs font-semibold drop-shadow-lg">
//                               {folder.count || 0}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Folder Name */}
//                     <div className="mt-3 w-full sm:w-[160px] text-center px-2">
//                       <p
//                         className="text-white text-sm font-medium truncate transition-transform duration-300 group-hover:scale-105"
//                         title={folder.name}
//                       >
//                         {folder.name}
//                       </p>
//                     </div>
//                   </motion.div>
//                 );
//               })
//             ) : (
//               <div className="col-span-full flex items-center justify-center py-20">
//                 <p className="text-white text-lg">No folders available</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import sky from "../public/sky.jpg";
import { useQuery } from "@tanstack/react-query";
import api from "config/api";
import Cookies from "js-cookie";
import Loading from "@/loading";

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

interface Folder {
  _id: string;
  name: string;
  color?: string;
  count?: number;
  previewImages?: string[];
}

interface MemoryCard {
  _id: string;
  image?: string;
  title?: string;
}

const fetchFolders = async (userId: string) => {
  const { data } = await api.get(`/folder/user/${userId}`);
  return data.folders || [];
};

const fetchUserData = async (userId: string): Promise<User> => {
  const { data } = await api.get(`/user/get/${userId}`);
  return data;
};

// Fetch folder with memory cards (includes signed URLs)
const fetchFolderWithMemoryCards = async (folderId: string) => {
  try {
    const { data } = await api.get(`/folder/${folderId}`);
    return data.updatedMemoryCards || [];
  } catch (error) {
    return [];
  }
};

// Default placeholder image
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=200&fit=crop";

export default function UserMemoryCards({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedFolder, setClickedFolder] = useState<string | null>(null);
  const router = useRouter();
  const [bgImage, setBgImage] = useState(sky.src);
  const [folderPreviewImages, setFolderPreviewImages] = useState<Record<string, string[]>>({});
  const [loadingFolders, setLoadingFolders] = useState<Set<string>>(new Set());

  useEffect(() => {
    let timeout;
    if (isOpen) {
      timeout = setTimeout(() => {
        router.push(`/${userId}/memories`);
      }, 1200);
    }
    return () => clearTimeout(timeout);
  }, [isOpen, router]);

  const {
    data: folders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["folders", userId],
    queryFn: () => fetchFolders(userId),
    enabled: !!userId,
    staleTime: Infinity,
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

  // Lazy load preview images for a folder
  const loadFolderPreview = useCallback(async (folderId: string) => {
    // Skip if already loaded or loading
    if (folderPreviewImages[folderId] || loadingFolders.has(folderId)) {
      return;
    }

    setLoadingFolders((prev) => new Set(prev).add(folderId));

    try {
      const memoryCards = await fetchFolderWithMemoryCards(folderId);
      // Filter memory cards that have images and get first 3
      const imagesWithUrls = memoryCards
        .filter((card: MemoryCard) => card.image)
        .slice(0, 3)
        .map((card: MemoryCard) => card.image!);

      // Build preview array: actual images + default placeholders
      const previewImages: string[] = [];

      if (imagesWithUrls.length === 0) {
        // No pictures: show 3 default pictures
        previewImages.push(DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE);
      } else if (imagesWithUrls.length === 1) {
        // 1 picture: show 1 actual + 2 defaults
        previewImages.push(imagesWithUrls[0], DEFAULT_IMAGE, DEFAULT_IMAGE);
      } else if (imagesWithUrls.length === 2) {
        // 2 pictures: show 2 actual + 1 default
        previewImages.push(imagesWithUrls[0], imagesWithUrls[1], DEFAULT_IMAGE);
      } else {
        // 3+ pictures: show any 3 pictures
        previewImages.push(imagesWithUrls[0], imagesWithUrls[1], imagesWithUrls[2]);
      }

      setFolderPreviewImages((prev) => ({
        ...prev,
        [folderId]: previewImages,
      }));
    } catch (error) {
      // On error, use default images
      setFolderPreviewImages((prev) => ({
        ...prev,
        [folderId]: [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE],
      }));
    } finally {
      setLoadingFolders((prev) => {
        const next = new Set(prev);
        next.delete(folderId);
        return next;
      });
    }
  }, [folderPreviewImages, loadingFolders]);

  // Preload preview images for visible folders
  useEffect(() => {
    if (!folders || folders.length === 0) return;

    // Load previews for first few folders immediately
    const visibleFolders = folders.slice(0, 3);
    visibleFolders.forEach((folder: Folder) => {
      loadFolderPreview(folder._id);
    });

    // Load rest on hover or after a delay
    const timeout = setTimeout(() => {
      folders.slice(3).forEach((folder: Folder) => {
        loadFolderPreview(folder._id);
      });
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folders]);

  const handleFolderClick = (folderID: string) => {
    setClickedFolder(folderID);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.selectedFolder = folderID;
      }
      router.push(`/${userId}/${folderID}`);
    }, 600);
  };

  if (isLoading || loadingUser) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-stone-900">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-stone-900">
        <p className="text-white text-lg">Error fetching memory folders</p>
      </div>
    );
  }

  return (
    <main
      className="w-full min-h-screen bg-cover bg-center relative overflow-x-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Backdrop Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-6xl">
          {/* Folders Grid - Centered with justify-center */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
            {folders.length > 0 ? (
              folders.map((folder: Folder, index: number) => {
                const isClicked = clickedFolder === folder._id;
                // Get preview images for this folder, or use defaults while loading
                const previewImages = folderPreviewImages[folder._id] || [
                  DEFAULT_IMAGE,
                  DEFAULT_IMAGE,
                  DEFAULT_IMAGE,
                ];
                return (
                  <motion.div
                    key={folder._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="w-[calc(50%-1rem)] sm:w-auto flex flex-col items-center cursor-pointer group"
                    onClick={() => handleFolderClick(folder._id)}
                    onMouseEnter={() => loadFolderPreview(folder._id)}
                  >
                    {/* Folder Container */}
                    <div className="w-[120px] relative transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1">
                      <div className="relative w-full h-[100px]">
                        {/* Main Folder Body */}
                        <div
                          style={{
                            backgroundColor: folder?.color || "#E8E8E8",
                          }}
                          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
                        ></div>

                        {/* Images Peeking Out from Top - With Lift Animation */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-full flex justify-center z-5">
                          <motion.div
                            animate={
                              isClicked
                                ? {
                                    y: -20,
                                    rotate: -15,
                                    x: -50,
                                    scale: 1.05,
                                  }
                                : {}
                            }
                            transition={{
                              duration: 0.4,
                              ease: [0.34, 1.56, 0.64, 1],
                            }}
                            className="w-12 h-16 rounded-lg overflow-hidden shadow-2xl border-[3px] border-white absolute"
                            style={{
                              transform: `rotate(-33deg) translateX(-40px)`,
                              zIndex: 1,
                            }}
                          >
                            <img
                              src={previewImages[0]}
                              alt=""
                              className="w-full h-full object-cover"
                              style={{ width: "48px", height: "64px" }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                              }}
                            />
                          </motion.div>
                          <motion.div
                            animate={
                              isClicked
                                ? {
                                    y: -25,
                                    rotate: 0,
                                    scale: 1.08,
                                  }
                                : {}
                            }
                            transition={{
                              duration: 0.4,
                              ease: [0.34, 1.56, 0.64, 1],
                              delay: 0.05,
                            }}
                            className="w-12 h-16 rounded-lg overflow-hidden shadow-2xl border-[3px] border-white absolute"
                            style={{
                              transform: `rotate(0deg) translateY(10px)`,
                              zIndex: 3,
                            }}
                          >
                            <img
                              src={previewImages[1]}
                              alt=""
                              className="w-full h-full object-cover"
                              style={{ width: "48px", height: "64px" }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                              }}
                            />
                          </motion.div>
                          <motion.div
                            animate={
                              isClicked
                                ? {
                                    y: -20,
                                    rotate: 15,
                                    x: 50,
                                    scale: 1.05,
                                  }
                                : {}
                            }
                            transition={{
                              duration: 0.4,
                              ease: [0.34, 1.56, 0.64, 1],
                              delay: 0.1,
                            }}
                            className="w-12 h-16 rounded-lg overflow-hidden shadow-2xl border-[3px] border-white absolute"
                            style={{
                              transform: `rotate(33deg) translateX(40px)`,
                              zIndex: 2,
                            }}
                          >
                            <img
                              src={previewImages[2]}
                              alt=""
                              className="w-full h-full object-cover"
                              style={{ width: "48px", height: "64px" }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                              }}
                            />
                          </motion.div>
                        </div>

                        {/* Shadow layer behind glassmorphic - only top part */}
                        <div
                          style={{
                            clipPath:
                              "polygon(0% 0%, 50% 0%, 52% 5%, 54% 10%, 56% 14%, 58% 15%, 100% 15%, 100% 40%, 0% 40%)",
                          }}
                          className="absolute top-0 left-0 w-full h-full z-[9]"
                        >
                          <div className="w-13 h-16 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"></div>
                        </div>

                        {/* Glassmorphic Front Layer - Folder Shape */}
                        <div
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
                            backdropFilter: "blur(2px)",
                            WebkitBackdropFilter: "blur(10px)",
                            clipPath:
                              "polygon(0% 0%, 50% 0%, 52% 5%, 54% 10%, 56% 14%, 58% 15%, 100% 15%, 100% 100%, 0% 100%)",
                            boxShadow: "inset 0 8px 16px 0 rgba(0,0,0,0.15)",
                          }}
                          className="absolute top-0 left-0 w-full h-full transition-all duration-300 z-10 rounded-lg"
                        >
                          {/* Photo Count */}
                          <div className="absolute bottom-3 right-3">
                           <span className="text-gray-400 text-xs font-semibold drop-shadow-lg">

                              {folder.count || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Folder Name */}
                    <div className="mt-3 w-full sm:w-[160px] text-center px-2">
                      <p
                        className="text-white text-sm font-medium truncate transition-transform duration-300 group-hover:scale-105"
                        title={folder.name}
                      >
                        {folder.name}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full flex items-center justify-center py-20">
                <p className="text-white text-lg">No folders available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}