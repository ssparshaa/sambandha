"use client";

import React, { useState, useCallback, useEffect } from "react";
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
}

const Edit: React.FC<Props> = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  // const [bgColor, setBgColor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(Cookies.get("token"));
  const { isLoggedIn, user: userData, loading: isLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        router.push("/login");
      }
    }
  }, [isLoggedIn, isLoading, router]);
  useEffect(() => {
    if (!userId) {
      // Redirect or show an error message if userId is not available
      router.push("/user/memoryCard");
    }
  }, [userId, router]);

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
    if (!title || !image) {
      toast.error("Please fill all required fields and upload an image.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      // formData.append("bgColor", bgColor);
      formData.append("image", image);
      if (audio) {
        formData.append("audio", audio);
      }
      const response = await api.post(`/memoryCard/edit/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Memory created successfully!", {
        duration: 1000,
        onAutoClose: () => router.push(`/user/${userId}/memoryCard`),
      });
    } catch (error) {
      console.error("Error creating memory:", error);
      toast.error("Failed to edit memory.");
    }
  };
  return (
    <div className="p-4 bg-stone-800 min-h-dvh rounded-[2%] pt-16 mx-2">
      {loading && <Loading />}
      <div className="flex flex-col items-center mt-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Let's Edit a Memory</h2>
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
                placeholder="Enter memory title"
                className="w-full flex-1 flex justify-center items-center"
              />
            </div>
            {/* <div>
              <label className="text-sm font-medium">Background Color</label>
              <div className="flex">
                <Input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
                <Input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </div>
            </div> */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <UploadCloud size={18} /> Upload Image <span className="text-red-500">*</span>
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required
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
