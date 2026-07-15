"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, FileAudio } from "lucide-react";
import api from "@/../config/api";
import { useAuth } from "@/../context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import Loading from "@/components/loading";

interface Props {
  userId: string;
  memoryCardId: string;
}

const Edit: React.FC<Props> = ({ userId, memoryCardId }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();
  const token = Cookies.get("token");
  const { isLoggedIn, loading: authLoading } = useAuth();

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [authLoading, isLoggedIn, router]);

  // Fetch memory card data
  useEffect(() => {
    if (!userId || !memoryCardId) return;
    const fetchMemoryCard = async () => {
      try {
        setFetching(true);
        const res = await api.get(
          `/memoryCard/get/single/${userId}?memoryCardId=${memoryCardId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const data = res.data;
        setTitle(data.title || "");
        setDate(data.date?.split("T")[0] || ""); // format yyyy-mm-dd
        // For image/audio, we won't set File, but show preview
      } catch (error) {
        console.error("Error fetching memory card:", error);
        toast.error("Failed to load memory card.");
      } finally {
        setFetching(false);
      }
    };
    fetchMemoryCard();
  }, [userId, memoryCardId, token]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAudio(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title) {
      toast.error("Title is required.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      if (image) formData.append("image", image);
      if (audio) formData.append("audio", audio);

      const response = await api.put(
        `/memoryCard/edit/${memoryCardId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Memory updated successfully!", {
        duration: 1000,
        onAutoClose: () => router.push(`/user/${userId}/memoryCard`),
      });
    } catch (error) {
      console.error("Error updating memory card:", error);
      toast.error("Failed to edit memory card.");
    }
  };

  if (fetching) return <Loading />;

  return (
    <div className="p-4 bg-stone-800 min-h-dvh rounded-[2%] pt-16 mx-2">
      {loading && <Loading />}
      <div className="flex flex-col items-center mt-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Edit Memory</h2>

            <div>
              <label className="text-sm font-medium">Title <span className="text-red-500">*</span></label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter memory title"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <UploadCloud size={18} /> Upload Image <span className="text-red-500">*</span>
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {image && (
                <p className="text-sm text-gray-500">Selected: {image.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileAudio size={18} /> Upload Audio (Optional)
              </label>
              <Input
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
              />
              {audio && (
                <p className="text-sm text-gray-500">Selected: {audio.name}</p>
              )}
            </div>

            <Button className="w-full" onClick={handleSubmit}>
              Confirm
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Edit;
