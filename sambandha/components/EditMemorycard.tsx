// EditMemoryCard.tsx
import { NextPage } from "next";
import { useState } from "react";
import { Mic, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/loading";
import Cookies from "js-cookie";
import api from "config/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { ImageProps } from "../app/lib/types";

interface Props {
  setShowImageModal: (value: boolean) => void;
  setSelectedImage: (value: ImageProps | null) => void;
  selectedImage: ImageProps;
}

const EditMemoryCard: NextPage<Props> = ({
  setShowImageModal,
  setSelectedImage,
  selectedImage,
}) => {
  const [oldImage] = useState<string | null>(selectedImage.image || null);
  const [oldAudio] = useState<string | null>(selectedImage.audio || null);
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [title, setTitle] = useState(selectedImage.title || "");
  const [date, setDate] = useState(selectedImage.date.split("T")[0] || "");
  const [token] = useState<string | undefined>(Cookies.get("token"));
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const handleConfirmDelete = async () => {
    // onDelete(); // call delete function
    // setOpen(false); // close modal
    try {
      setLoading(true);

      const response = await api.delete(
        `/memoryCard/delete/${selectedImage._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Memory card deleted successfully!", {
        duration: 1000,
        onAutoClose: () => window.location.reload(),
      });
    } catch (error) {
      console.error("Error deleting memory card:", error);
      toast.error("Failed to delete memory card.");
    } finally {
      setLoading(false);
    }
  };

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

  const handleEditMemoryCard = async () => {
    if (!selectedImage?._id) {
      toast.error("Invalid memory card ID");
      return;
    }
    
    if (!title) {
      toast.error("Title is required");
      return;
    }

    try {
      setLoading(true);

      // Create form data to send files + text
      const formData = new FormData();
      if (image) formData.append("image", image);
      if (audio) formData.append("audio", audio);
      formData.append("title", title);
      formData.append("date", date);

      const response = await api.put(
        `/memoryCard/edit/${selectedImage._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Memory card edited successfully!", {
        duration: 1000,
        onAutoClose: () => window.location.reload(),
      });
    } catch (error) {
      console.error("Error editing memory card:", error);
      toast.error("Failed to edit memory card.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={() => {
        setShowImageModal(false);
        setSelectedImage(null);
      }}
    >
      {loading && <Loading />}
      <div
        className="bg-white rounded-3xl max-h-screen h-[580px] overflow-auto w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-md font-bold text-gray-900">
            Memory Card Detail
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setOpen(true)}
              className="w-7 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
            >
              <Trash2 className="w-4 h-4 text-red-700 hover:text-red-600 transition-all" />
            </button>
            <button
              onClick={() => setShowImageModal(false)}
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <input
            type="file"
            className="hidden"
            id="upload-photo"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-photo" className="block cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-indigo-500 transition-all cursor-pointer">
              <Plus className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-600 font-medium">
                Click to upload photo <br /> It will replace the current one
              </p>
              <p className="text-xs text-gray-400 mt-1">or drag and drop</p>
            </div>
          </label>

          {(image || oldImage) && (
            <img
              src={imagePreview || oldImage}
              alt="Preview"
              className="max-h-32 rounded-xl shadow-md"
            />
          )}

          <input
            type="file"
            className="hidden"
            id="upload-voice"
            accept="audio/*"
            onChange={handleAudioUpload}
          />
          <label htmlFor="upload-voice" className="block cursor-pointer">
            <div className="w-full px-4 py-3 text-xs bg-black rounded-xl font-medium hover:bg-stone-700 transition-all flex items-center justify-center gap-2">
              <Mic className="w-4 h-4" />
              Add/Update Voice Recording
            </div>
          </label>

          {(audio || oldAudio) && (
            <audio controls className="w-full mt-2">
              <source src={audioPreview || oldAudio} type="audio/mpeg" />
            </audio>
          )}

          <div>
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
          <div>
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

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowImageModal(false)}
              className="flex-1 px-4 py-2 text-xs bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleEditMemoryCard}
              className="flex-1 px-4 py-2 text-xs bg-black text-white rounded-xl font-medium hover:bg-indigo-700 transition-all"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-800">Are you sure?</DialogTitle>
            <DialogDescription className="text-gray-700">
              This action cannot be undone. This will permanently delete this
              memory card.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditMemoryCard;
