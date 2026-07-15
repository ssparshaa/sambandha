"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, Edit, X, Plus, Mic, Folder, Upload, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import api from "config/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "context/AuthContext";
import Loading from "@/loading";
import EditMemoryCard from "@/components/EditMemorycard";
import { ImageProps } from "../../lib/types";

interface Props {
  folderId: string;
}

interface EditFolderInput {
  name: string;
  color: string;
  // isPrivate: boolean;
  // password?: string;
}

const editFolder = async (
  folderData: EditFolderInput,
  token: string,
  folderId,
) => {
  const { data } = await api.put(`/folder/${folderId}`, folderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

const deleteFolder = async (token: string, folderId: string) => {
  const { data } = await api.delete(`/folder/${folderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

const fetchFolderById = async (folderId: string, token: string) => {
  const { data } = await api.get(`/folder/${folderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return {
    folder: data.folder,
    memoryCards: data.updatedMemoryCards,
  };
};

const FolderDetail: React.FC<Props> = ({ folderId }) => {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  // const [password, setPassword] = useState("");
  // const [isPrivate, setIsPrivate] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<Blob | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [loadingg, setLoadingg] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  const [token, setToken] = useState<string | undefined>(undefined);

  // Get token only on client side
  useEffect(() => {
    setMounted(true);
    setToken(Cookies.get("token"));
  }, []);

  // ✅ Fetch folder using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["folder", folderId],
    queryFn: () => fetchFolderById(folderId, token || ""),
    enabled: !!folderId && !!token && mounted,
  });

  const folder = data?.folder;
  const memoryCards = data?.memoryCards || [];

  const handleBack = () => {
    router.push("/user");
  };

  const editFolderMutation = useMutation({
    mutationFn: (newFolder: EditFolderInput) =>
      editFolder(newFolder, token || "", folder?._id || ""), // ✅ CORRECT

    onMutate: () => {
      setLoadingg(true);
    },

    onSuccess: () => {
      toast.success("Folder updated successfully ✅");
      queryClient.invalidateQueries({ queryKey: ["folder", folderId] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      setShowEditModal(false);
      setLoadingg(false);
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update folder");
      setLoadingg(false);
    },
  });

  const deleteFolderMutation = useMutation({
    mutationFn: () => deleteFolder(token || "", folderId),

    onMutate: () => {
      setLoadingg(true);
    },

    onSuccess: () => {
      toast.success("Folder and all contents deleted successfully ✅");
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      setShowDeleteModal(false);
      setShowEditModal(false);
      setLoadingg(false);
      // Navigate back to user page after deletion
      router.push("/user");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete folder");
      setLoadingg(false);
    },
  });

  const handleSubmit = () => {
    if (!folder) return;
    editFolderMutation.mutate({
      name,
      color,
      // isPrivate,
      // password: isPrivate ? password : undefined,
    });
  };

  useEffect(() => {
    if (folder) {
      setName(folder.name);
      setColor(folder.color);
      // setIsPrivate(folder.isPrivate);
    }
  }, [folder]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAudio(e.target.files[0]);
      setAudioPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudio(blob);
        const url = URL.createObjectURL(blob);
        setAudioPreview(url);
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

  const handleSubmitMemoryCard = async () => {
    if (!title || !image) {
      toast.error("Please fill all required fields and upload an image.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("image", image);
      formData.append("folderId", folderId);
      if (audio) {
        formData.append("audio", audio);
      }
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
      queryClient.invalidateQueries({ queryKey: ["folder"] });
      toast.success("Memory created successfully!", {
        duration: 1000,
        // onAutoClose: () => window.location.reload(),
      });
    } catch (error) {
      console.error("Error creating memory:", error);
      toast.error(error?.response?.data?.message || "Failed to create memory.");
    } finally {
      setLoading(false);
      setShowAddPhotoModal(false);
      setTitle("");
      setDate(new Date().toISOString().split("T")[0]);
      setImage(null);
      setAudio(null);
    }
  };

  // Prevent hydration mismatch by not rendering loading state until mounted
  if (!mounted || isLoading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <p className="text-center mt-10">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <p className="text-center mt-10 text-red-500">
          {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex items-center justify-center">
      {loading && <Loading />}

      {/* Phone Frame */}
      <div className="w-full max-w-sm bg-white flex flex-col h-full">
        {/* Header */}
        <div className="p-6 flex items-center justify-between flex-shrink-0 border-b border-gray-100">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Folder Info with Edit Button */}
        <div className="px-6 pt-4 pb-6 flex-shrink-0 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {folder?.name || "Folder Name"}
            </h1>
            <p className="text-sm text-gray-500">
              Created on {folder?.createdAt.slice(0, 10) || "N/A"}
            </p>
          </div>
          <button
            onClick={() => setShowEditModal(true)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
          >
            <Edit className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Image Grid - Scrollable */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Add New Photo Button */}
            <div
              onClick={() => setShowAddPhotoModal(true)}
              className="rounded-2xl overflow-hidden hover:opacity-90 transition-all cursor-pointer border-8 border-white shadow-lg bg-gray-100 flex items-center justify-center"
              style={{
                transform: "rotate(-2deg)",
                aspectRatio: "3/4",
              }}
            >
              <Plus className="w-16 h-16 text-gray-400" />
            </div>

            {memoryCards && memoryCards?.length > 0 ? (
              memoryCards?.map((img, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden hover:opacity-90 transition-all cursor-pointer border-8 border-white shadow-lg"
                  onClick={() => {
                    setSelectedImage(img);
                    setShowImageModal(true);
                  }}
                  style={{
                    transform:
                      (index + 1) % 2 === 0 ? "rotate(-2deg)" : "rotate(2deg)",
                    aspectRatio: "3/4",
                  }}
                >
                  <img
                    src={img.image}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-400">
                <Folder className="w-12 h-12 mx-auto mb-2" />
                <p>No photos in this folder.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Edit Folder Modal */}
      {showEditModal && folder && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Edit Folder
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
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
            <div className="flex gap-3 justify-between items-center">
              <Button
                variant="destructive"
                onClick={() => {
                  setShowEditModal(false);
                  setShowDeleteModal(true);
                }}
                disabled={loadingg}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="border border-black"
                  disabled={loadingg || !name.trim()}
                  // disabled={loadingg || !name.trim() || (isPrivate && !password)}
                >
                  {loadingg ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && folder && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Delete Folder
              </h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                disabled={loadingg}
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Warning Message */}
            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                Are you sure you want to delete <strong>{folder.name}</strong>?
              </p>
              <p className="text-sm text-red-600">
                This will permanently delete the folder and all {memoryCards.length} memory card(s) inside it, including all images and audio files. This action cannot be undone.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                disabled={loadingg}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteFolderMutation.mutate()}
                disabled={loadingg}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                {loadingg ? "Deleting..." : "Delete Forever"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Detail Modal */}
      {showImageModal && selectedImage && (
        <EditMemoryCard
          setShowImageModal={setShowImageModal}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
        />
      )}

      {/* Add Photo Modal */}
      {showAddPhotoModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddPhotoModal(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-md font-bold text-gray-900">
                Add New Memory Card
              </h2>
              <button
                onClick={() => setShowAddPhotoModal(false)}
                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Add Photo Content */}
            <div className="p-6 space-y-4 pb-6">
              {/* Upload Photo Button */}
              <input
                type="file"
                className="hidden"
                id="upload-photo"
                accept="image/*"
                multiple={false}
                onChange={handleImageUpload}
                required
              />
              <label htmlFor="upload-photo" className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-indigo-500 transition-all cursor-pointer">
                  <Plus className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 font-medium">
                    Click to upload photo <span className="text-red-500">*</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">or drag and drop</p>
                </div>
              </label>

              {image && (
                <div className="p-4 flex items-center justify-center w-auto h-[20]">
                  <div
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Polaroid Photo */}
                    <div className="bg-white p-2 pb-4 shadow-2xl">
                      <img
                        src={imagePreview || ""}
                        alt="Captured"
                        className="w-28 h-32 object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Voice Recording or Upload Section */}
              <div className="space-y-3">
                {/* Buttons for Record or Upload */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {!recording ? (
                    <button
                      onClick={startRecording}
                      className="flex-1 px-4 py-3 text-[white] text-xs bg-black rounded-xl font-medium hover:bg-stone-700 transition-all flex items-center justify-center gap-2"
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
                          setAudioPreview(url);

                          // Convert uploaded file to blob (same structure as recorded)
                          setAudio(file);
                        }
                      }}
                      className="hidden"
                    />
                    <div className="flex-1 px-4 py-3 text-xs text-[white]  bg-black rounded-xl font-medium hover:bg-stone-700 transition-all flex items-center justify-center gap-2">
                      <Upload className="w-3 h-3" />
                      Upload Audio
                    </div>
                  </label>
                </div>

                {/* Audio Preview */}
                {audioPreview && (
                  <audio
                    controls
                    src={audioPreview}
                    className="w-full rounded-xl mt-2 h-6"
                  />
                )}
              </div>

              {/* Title and Date */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-black mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    required
                    maxLength={50}
                    className="w-full bg-white text-sm text-gray-700 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                  <p className="text-xs text-gray-400 mt-1">{title.length}/50 characters</p>
                </div>
                {/* Date */}
                <div className="sm:w-40">
                  <label className="block text-sm font-medium text-black mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white text-sm text-gray-700 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddPhotoModal(false)}
                  className="flex-1 px-2 py-2 text-xs bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitMemoryCard}
                  className="flex-1 px-2 py-2 text-xs bg-black text-white rounded-xl font-medium hover:bg-indigo-700 transition-all"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderDetail;
