"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/../config/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/../context/AuthContext";
import Loading from "@/components/loading";
import CustomerMemoryCard from "@/components/customer-memory-card";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
  Camera,
  Home,
  User,
  X,
  Zap,
  ZapOff,
  RotateCcw,
  Clock,
  Check,
  Edit,
  Mic,
  LogOut,
  Upload,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import CameraComponent from "@/components/camera";
import imageCompression from "browser-image-compression";

interface Confetti {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
  color: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  wallpaper?: string;
  bgImageUrl?: string;
}

// Extend Window interface
declare global {
  interface Window {
    selectedFolder?: string;
  }
}

// Interface for the user data from auth context
interface AuthUser {
  _id: string;
  name: string;
  email?: string;
  role?: string;
  wallpaper?: string;
}

interface Folder {
  _id: string;
  name: string;
  color: string;
  // isPrivate: boolean;
  count?: number; // optional if backend doesn't provide this yet
}

interface AddFolderInput {
  name: string;
  color: string;
  // isPrivate: boolean;
  // password?: string;
}

const addFolder = async (folderData: AddFolderInput, token: string) => {
  const { data } = await api.post("/folder", folderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

const fetchUserData = async (userId: string, token: string): Promise<User> => {
  const { data } = await api.get(`/user/get/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

const fetchFolders = async (token: string): Promise<Folder[]> => {
  const { data } = await api.get(`/folder`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.folders || []; // ✅ Extract folders correctly
};

export default function PhotoGalleryUI() {
  const [bgImage, setBgImage] = useState(
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  );
  const [activeTab, setActiveTab] = useState("home");
  const [showCamera, setShowCamera] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showPhotoPreview, setShowPhotoPreview] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showWallpaperModal, setShowWallpaperModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoggedIn, user: userData, loading, updateUser, logout } = useAuth();
  const [loadingg, setLoadingg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [token] = useState<string | undefined>(Cookies.get("token"));

  // ✅ Form States
  const [name, setName] = useState("");
  const [color, setColor] = useState("#f9ca24");
  // const [isPrivate, setIsPrivate] = useState(false);
  // const [password, setPassword] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  // const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
  //   null,
  // );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        router.push("/login");
      }
    }
  }, [isLoggedIn, loading, router]);

  // Type assertion for userData to ensure it has the expected structure
  const typedUserData = userData as AuthUser | null;
  const userId = typedUserData?._id;

  const { data: user, isLoading: loadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      if (!userId || !token) {
        throw new Error("Missing userId or token");
      }
      return fetchUserData(userId, token);
    },
    enabled: !!userId && !!token,
  });

  useEffect(() => {
    if (user?.wallpaper) {
      setBgImage(user.bgImageUrl || user.wallpaper);
    }
    if (user) {
      updateUser(user);
    }
  }, [user]);

  const { data: folders = [], isLoading: loadingFolder } = useQuery({
    queryKey: ["folders"],
    queryFn: () => {
      if (!token) throw new Error("Missing token");
      return fetchFolders(token);
    },
    enabled: !!token,
    refetchOnWindowFocus: false,
  });

  // ✅ Mutation FIXED
  const createFolderMutation = useMutation({
    mutationFn: (newFolder: AddFolderInput) =>
      addFolder(newFolder, token || ""), // ✅ CORRECT

    onMutate: () => {
      setLoadingg(true);
    },

    onSuccess: () => {
      toast.success("Folder created successfully ✅");
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data || error.message);
    },

    onSettled: () => {
      setShowAddModal(false);
      setLoadingg(false);
      setName("");
      // setPassword("");
      // setIsPrivate(false);
    },
  });

  // ✅ Submit Handler FIXED
  const handleSubmit = () => {
    createFolderMutation.mutate({
      name,
      color,
      // isPrivate,
      // password: isPrivate ? password : undefined,
    });
  };

  const wallpaperOptions = [
    "https://plus.unsplash.com/premium_photo-1664529914557-ee01920185e2?q=80&w=680&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1596367407372-96cb88503db6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1686305867944-9dd69e1b287f?q=80&w=1221&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1700353612860-bd8ab8d71f05?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1590372648787-fa5a935c2c40?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1682125139523-92d7def89cd1?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const handleWallpaperSelect = async (wallpaper: string) => {
    setBgImage(wallpaper);
    // Update wallpaper in backend
    await api.put(
      `/user/changeWallpaper/${userId}`,
      { wallpaper },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    setShowWallpaperModal(false);
  };

  const handleFolderClick = (folderID: string) => {
    // Store folder name in window object to pass to next page
    if (typeof window !== "undefined") {
      window.selectedFolder = folderID;
    }
    // Navigate to folder-details page
    // window.location.href = "/user/folder-details";
    router.push(`/user/${folderID}`);
  };

  const handleCapturePhoto = () => {
    setCapturedPhoto(
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    );
    setShowPhotoPreview(true);
    generateConfetti();
  };

  const generateConfetti = () => {
    const newConfetti: Confetti[] = [];
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1,
        rotation: Math.random() * 360,
        color: Math.random() > 0.5 ? "bg-black" : "bg-white",
      });
    }
    setConfetti(newConfetti);
  };

  const handleAcceptPhoto = () => {
    setShowPhotoPreview(false);
    setShowCamera(false);
    setActiveTab("home");
    setSelectedImage(capturedPhoto);
    setShowImageModal(true);
    setConfetti([]);
  };

  const handleRejectPhoto = () => {
    setShowPhotoPreview(false);
    setCapturedPhoto(null);
    setConfetti([]);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setRecording(false);
        setRecordingTime(0);
      };

      recorder.start();
      setRecording(true);
      // setMediaRecorder(recorder);

      // Store recorder ref
      mediaRecorderRef.current = recorder;

      // Start timer
      let time = 0;
      timerRef.current = setInterval(() => {
        time += 1;
        setRecordingTime(time);

        // Auto-stop after 20 seconds
        // if (time >= 20) stopRecording();
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Microphone access denied or unavailable.");
    }
  };

  // const stopRecording = () => {
  //   if (mediaRecorder) {
  //     mediaRecorder.stop();
  //     setRecording(false);
  //   }
  // };

  // Stop recording
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setRecording(false);
  };

  // Format seconds into MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Slight compression
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.8, // ~800KB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      // Prepare FormData
      const formData = new FormData();
      formData.append("bgImage", compressedFile);

      // API request
      const response = await api.put("/user/changeBgImage", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setBgImage(response.data.bgImage);
      setShowWallpaperModal(false);
      toast.success("Wallpaper updated successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to upload wallpaper. Please try again.");
    } finally {
      e.target.value = ""; // reset input
    }
  };

  // Helper: Convert base64 image to Blob
  function dataURLtoBlob(dataUrl: string) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const handleSubmitAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFolder || !title || !selectedImage) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("folderId", selectedFolder);
    formData.append("title", title);
    formData.append("date", date);

    // Convert base64 -> blob
    const imageBlob = dataURLtoBlob(selectedImage);
    formData.append("image", imageBlob, "captured.png");

    if (audioBlob) formData.append("audio", audioBlob, "recording.webm");

    setLoadingg(true);
    try {
      const response = await api.post(
        `/memoryCard/create/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      toast.success("Memory created successfully!", {
        duration: 1000,
        onAutoClose: () => router.push(`/user/${selectedFolder}`),
      });
    } catch (error) {
      console.error("Error creating memory:", error);
      toast.error("Failed to create memory.");
    }
  };

  // const folders = [
  //   { name: "Japan 2024", count: 83 },
  //   { name: "Vacation", count: 45 },
  //   { name: "Family", count: 120 },
  //   { name: "Nature", count: 67 },
  //   { name: "Friends", count: 92 },
  // ];

  // Show loading state while auth is loading or if queries are loading
  if (loadingg || loading || loadingUser) {
    return (
      <div className="p-4 bg-stone-800 min-h-dvh rounded-[2%] pt-16 mx-2">
        <Loading />
      </div>
    );
  }

  // If not logged in and not loading, don't render anything (redirect will happen)
  if (!loading && !isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center pb-20">
      {/* Wallpaper Selection Modal */}
      {showWallpaperModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowWallpaperModal(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Choose Wallpaper
              </h2>
              <button
                onClick={() => setShowWallpaperModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Wallpaper Grid */}
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {wallpaperOptions.map((wallpaper, index) => (
                  <button
                    key={index}
                    onClick={() => handleWallpaperSelect(wallpaper)}
                    className="relative rounded-2xl overflow-hidden aspect-video hover:ring-4 hover:ring-black transition-all group"
                  >
                    <img
                      src={wallpaper}
                      alt={`Wallpaper ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {bgImage === wallpaper && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                          <Check
                            className="w-6 h-6 text-white"
                            strokeWidth={2.5}
                          />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Custom Wallpaper */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleFileSelect}
                className="w-full px-4 py-3 bg-black text-white rounded-xl font-medium hover:from-purple-600 hover:to-indigo-600 transition-all flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Upload Custom Wallpaper
              </button>

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      )}

      {/* Image Detail Modal */}
      {showImageModal && selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70] p-4"
          onClick={() => {
            setShowImageModal(false);
            setSelectedImage(null);
            setTitle("");
            setDate(new Date().toISOString().split("T")[0]);
            setSelectedFolder("");
            setAudioUrl(null);
            setAudioBlob(null);
            setRecording(false);
            mediaRecorderRef.current = null;
          }}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-md font-bold text-gray-900">
                Add Memory Card
              </h2>
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setSelectedImage(null);
                  setTitle("");
                  setDate(new Date().toISOString().split("T")[0]);
                  setSelectedFolder("");
                  setAudioUrl(null);
                  setAudioBlob(null);
                  setRecording(false);
                  mediaRecorderRef.current = null;
                }}
                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Image Display */}
            <div className="p-4 flex items-center justify-center w-auto">
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                {/* Polaroid Photo */}
                <div className="bg-white p-2 pb-4 shadow-2xl">
                  <img
                    src={capturedPhoto}
                    alt="Captured"
                    className="w-28 h-32 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Photo Actions */}
            <div className="p-4 space-y-3 pb-6">
              {/* Choose Folder */}
              <div className="text-gray-700">
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Choose Folder
                </label>
                <select
                  className="w-full text-xs px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                >
                  <option value="">Select a folder...</option>
                  {folders.map((folder, index) => (
                    <option key={index} value={folder._id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Voice Recording or Upload Section */}
              <div className="space-y-3">
                {/* Buttons for Record or Upload */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {!recording ? (
                    <button
                      onClick={startRecording}
                      className="flex-1 px-4 py-3 text-xs bg-black rounded-xl font-medium hover:bg-stone-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Mic className="w-3 h-3" />
                      Start Recording
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="flex-1 px-4 py-3 text-xs bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-all flex items-center justify-center gap-2"
                    >
                      <X className="w-3 h-3" />
                      Stop Recording ({formatTime(recordingTime)})
                    </button>
                  )}

                  {/* Upload Audio from Device */}
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setAudioUrl(url);

                          // Convert uploaded file to blob (same structure as recorded)
                          setAudioBlob(file);
                        }
                      }}
                      className="hidden"
                    />
                    <div className="flex-1 px-4 py-3 text-xs bg-black rounded-xl font-medium hover:bg-stone-700 transition-all flex items-center justify-center gap-2">
                      <Upload className="w-3 h-3" />
                      Upload Audio
                    </div>
                  </label>
                </div>

                {/* Audio Preview */}
                {audioUrl && (
                  <audio
                    controls
                    src={audioUrl}
                    className="w-full rounded-xl mt-2 h-6"
                  />
                )}
              </div>

              {/* Title and Date */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-medium text-black mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    required
                    className="w-full bg-white text-xs text-gray-700 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                {/* Date */}
                <div className="flex-1 min-w-0 sm:flex-none sm:w-auto">
                  <label className="block text-xs font-medium text-black mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white text-xs text-gray-700 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowImageModal(false)}
                  className="flex-1 px-2 py-2 text-xs bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitAdd}
                  className="flex-1 px-2 py-2 text-xs bg-black text-white rounded-xl font-medium hover:bg-indigo-700 transition-all"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Preview Popup with Confetti */}
      {showPhotoPreview && capturedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-[70] flex items-center justify-center p-4"
          onClick={() => handleRejectPhoto()}
        >
          {/* Confetti Animation */}
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className={`absolute w-3 h-3 ${piece.color} opacity-80`}
              style={{
                left: `${piece.left}%`,
                top: "-20px",
                animation: `fall ${piece.duration}s ease-in ${piece.delay}s forwards`,
                transform: `rotate(${piece.rotation}deg)`,
              }}
            />
          ))}

          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {/* Polaroid Photo */}
            <div className="bg-white p-4 pb-16 shadow-2xl">
              <img
                src={capturedPhoto}
                alt="Captured"
                className="w-64 h-80 object-cover"
              />
            </div>

            {/* Action Buttons - Small Black and White */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <button
                onClick={handleRejectPhoto}
                className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center shadow-lg transition-all active:scale-95 border-2 border-black"
              >
                <X className="w-6 h-6 text-black" strokeWidth={2.5} />
              </button>

              <button
                onClick={handleAcceptPhoto}
                className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center shadow-lg transition-all active:scale-95"
              >
                <Check className="w-6 h-6 text-white" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camera Popup */}
      {showCamera && !showPhotoPreview && (
        // <div
        //   className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        //   onClick={() => {
        //     setShowCamera(false);
        //     setActiveTab("home");
        //   }}
        // >
        //   <div
        //     className="w-full max-w-sm bg-white rounded-[3rem] shadow-2xl overflow-hidden relative"
        //     onClick={(e) => e.stopPropagation()}
        //   >
        //     {/* Camera Interface */}
        //     <div className="relative p-6">
        //       {/* Viewfinder Screen */}
        //       <div className="bg-black rounded-3xl overflow-hidden border-8 border-black aspect-[3/4] relative">
        //         <img
        //           src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        //           alt="Camera view"
        //           className="w-full h-full object-cover"
        //         />

        //         {/* Top status bar with close button and time */}
        //         <div className="absolute top-4 left-0 right-0 px-4 flex items-center justify-between">
        //           <button
        //             onClick={() => {
        //               setShowCamera(false);
        //               setActiveTab("home");
        //             }}
        //             className="text-white/90 hover:text-white"
        //           >
        //             <X className="w-6 h-6" strokeWidth={2} />
        //           </button>
        //           <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
        //             <Clock className="w-5 h-5" strokeWidth={2} />
        //             <span>12:34</span>
        //           </div>
        //         </div>
        //       </div>

        //       {/* Camera Controls Section */}
        //       <div className="mt-8 flex items-center justify-center gap-12">
        //         {/* Flash toggle (left) */}
        //         <button
        //           onClick={() => setFlashOn(!flashOn)}
        //           className={`px-6 py-2 rounded-full transition-all ${
        //             flashOn
        //               ? "bg-yellow-400 text-gray-900"
        //               : "bg-gray-200 text-gray-700"
        //           }`}
        //         >
        //           {flashOn ? (
        //             <Zap
        //               className="w-5 h-5"
        //               strokeWidth={2}
        //               fill="currentColor"
        //             />
        //           ) : (
        //             <ZapOff className="w-5 h-5" strokeWidth={2} />
        //           )}
        //         </button>

        //         {/* Shutter button (center) */}
        //         <button
        //           onClick={handleCapturePhoto}
        //           className="w-20 h-20 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-all active:scale-95"
        //         >
        //           <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-900"></div>
        //         </button>

        //         {/* Camera flip button (right) */}
        //         <button className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-all">
        //           <RotateCcw
        //             className="w-6 h-6 text-gray-700"
        //             strokeWidth={2}
        //           />
        //         </button>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <CameraComponent
          onCapture={(photoDataUrl) => {
            setShowPhotoPreview(true);
            // Store the photo or display it
            setCapturedPhoto(photoDataUrl);
          }}
          onClose={() => {
            setShowCamera(false);
            setActiveTab("home");
          }}
        />
      )}

      {/* Phone Frame */}
      <div className="w-full max-h-screen max-w-sm bg-white flex flex-col">
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-gray-700 text-lg font-light">Hello</span>
              <span className="font-medium font-Poppins text-xl mb-1">👋🏼</span>
            </div>
            <h2
              className="text-gray-900 text-xl font-bold"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
            >
              {typedUserData?.name || "UserName"}
            </h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center shadow-md hover:shadow-lg transition-all">
                <User className="w-6 h-6 text-gray-600" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 mt-2 mr-2 shadow-lg rounded-xl bg-white">
              <DropdownMenuItem
                onClick={() => router.push(`/user/account/${userData._id}`)}
                className="cursor-pointer text-gray-700 font-medium hover:bg-white"
              >
                My Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => router.push(`/${userData._id}`)}
                className="cursor-pointer text-gray-700 font-medium hover:bg-white"
              >
                Visit
              </DropdownMenuItem>
              {/* <DropdownMenuItem className="cursor-pointer hover:bg-indigo-50">
                Settings
              </DropdownMenuItem> */}

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 font-medium hover:bg-white"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Change Wallpaper Card */}
        <div className="px-6 mb-6 flex-shrink-0">
          <button
            onClick={() => setShowWallpaperModal(true)}
            className="relative rounded-2xl overflow-hidden h-32 shadow-lg w-full hover:shadow-xl transition-all border border-white/20"
          >
            <img
              src={bgImage}
              alt="Wallpaper"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <span
                className="text-white text-sm font-medium"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
              >
                Change wallpaper
              </span>
            </div>
          </button>
        </div>

        {/* Main Content */}
        <div className="px-6 flex-1 min-h-0 mb-4">
          <div
            className="relative rounded-2xl shadow-lg"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>

            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
          linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
        `,
                backgroundSize: "35px 35px",
              }}
            ></div>

            <div className="relative z-10 max-h-[400px] overflow-y-auto p-4 sm:p-6 md:p-8 mb-8">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* add new folder section */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="w-full aspect-square max-w-[128px] rounded-3xl bg-gray-800/50 backdrop-blur-md shadow-2xl flex items-center justify-center hover:bg-gray-900/90 transition-all border border-gray-700/50 active:scale-95"
                  >
                    <div
                      className="text-white text-4xl sm:text-5xl font-light"
                      style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                    >
                      +
                    </div>
                  </button>
                  <div className="mt-2 sm:mt-3 text-center">
                    <p
                      className="text-white text-sm sm:text-base font-semibold"
                      style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                    >
                      Add Folder
                    </p>
                  </div>
                </div>

                {/* folder list section */}
                {loadingFolder ? (
                  <p className="text-white col-span-2 text-center">
                    Loading...
                  </p>
                ) : folders.length > 0 ? (
                  folders.map((folder, index) => (
                    <div
                      key={folder._id || index}
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => handleFolderClick(folder._id)}
                    >
                      {/* Folder with aspect ratio container */}
                      <div className="w-full aspect-square max-w-[120px]">
                        <div className="relative w-full h-[85%] rounded-br-md rounded-bl-md rounded-tr-md">
                          <div
                            style={{
                              backgroundColor: folder?.color || "#f9ca24",
                              opacity: 0.7,
                            }}
                            className="absolute -top-2 left-0 w-[35%] h-[12%] rounded-t-md"
                          ></div>
                          <div
                            style={{
                              backgroundColor: folder?.color || "#f9ca24",
                            }}
                            className="absolute top-0 left-0 w-full h-full rounded-md z-30 origin-bottom"
                          />
                        </div>
                      </div>
                      <div className="mt-1 text-center">
                        <p
                          className="text-white text-sm sm:text-base font-semibold mb-0.5"
                          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                        >
                          {folder.name}
                        </p>
                        <p
                          className="text-white/90 text-xs sm:text-sm"
                          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                        >
                          {folder.count || 0} photos
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p
                    className="text-white text-center col-span-2 text-sm sm:text-base"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                  >
                    No folders available. Click "Add Folder" to create one.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <div className="fixed mt-10 bottom-2 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-black rounded-full shadow-2xl p-2 flex items-center justify-around min-w-[200px]">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex-1 py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center ${
              activeTab === "home"
                ? "bg-gray-800 shadow-lg"
                : "hover:bg-gray-800/50"
            }`}
          >
            <Home
              className={`w-6 h-6 transition-colors ${
                activeTab === "home" ? "text-white" : "text-gray-400"
              }`}
              strokeWidth={2.5}
            />
          </button>
          <button
            onClick={() => {
              setActiveTab("camera");
              setShowCamera(true);
            }}
            className={`flex-1 py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center ${
              activeTab === "camera"
                ? "bg-gray-800 shadow-lg"
                : "hover:bg-gray-800/50"
            }`}
          >
            <Camera
              className={`w-6 h-6 transition-colors ${
                activeTab === "camera" ? "text-white" : "text-gray-400"
              }`}
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>

      {/* Add Folder Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Add Folder
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Folder Name */}
            <div className="mb-5">
              <Label className="text-black">Folder Name</Label>
              <Input
                placeholder="Enter folder name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl mt-2 text-black"
              />
            </div>

            {/* Folder Color */}
            <div className="mb-5">
              <Label className="text-black">Folder Color</Label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 rounded-xl border mt-2 cursor-pointer"
              />
            </div>

            {/* Private Toggle - COMMENTED OUT */}
            {/* <div className="mb-5 flex items-center justify-between">
              <Label className="text-black">Private Folder</Label>
              <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
            </div> */}

            {/* Password - COMMENTED OUT */}
            {/* {isPrivate && (
              <div className="mb-6 animate-fade-in">
                <Label className="text-black">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl mt-2 text-black"
                />
              </div>
            )} */}

            {/* Buttons */}
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="border border-black"
                disabled={loadingg || !name.trim()}
                // disabled={loadingg || !name.trim() || (isPrivate && !password)}
              >
                {loadingg ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
