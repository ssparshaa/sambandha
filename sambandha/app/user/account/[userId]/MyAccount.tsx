"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "context/AuthContext";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/../config/api";
import Loading from "@/components/loading";
import Cookies from "js-cookie";
import {
  User,
  Database,
  ChevronLeft,
  Mail,
  Shield,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";

interface Props {
  userId: string;
}

const MyAccount: NextPage<Props> = ({ userId }) => {
  const router = useRouter();
  const { isLoggedIn, loading, updateUser } = useAuth();
  const [token] = useState<string | undefined>(Cookies.get("token"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!loading && !isLoggedIn) router.push("/login");
  }, [isLoggedIn, loading, router]);

  const { data: user = {}, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!token) throw new Error("Missing token");
      const { data } = await api.get(`/user/get/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    enabled: !!token,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setName(user.name || "");
    setEmail(user.email || "");
  }, [user]);

  const { data: memoryCards = {}, isLoading: isLoadingMemory } = useQuery({
    queryKey: ["memoryCards", userId],
    queryFn: async () => {
      if (!token) throw new Error("Missing token");
      const { data } = await api.get(`/memoryCard/get/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    enabled: !!token,
    refetchOnWindowFocus: false,
  });

  const handleBack = () => {
    router.push("/user");
  };

  const editUser = useMutation({
    mutationFn: async (updatedData: {
      name: string;
      email: string;
      token?: string;
    }) => {
      const { name, email, token } = updatedData;
      if (!token) throw new Error("Missing token");
      const { data } = await api.put(
        `/user/edit`,
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return data;
    },
    onSuccess: () => {
      updateUser({ ...user, name, email });
      toast.success("Folder updated successfully ✅");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  const handleSave = () => {
    editUser.mutate({
      name,
      email,
      token,
    });
  };

  return (
    <>
      {(loading || isLoading || isLoadingMemory) && <Loading />}
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-full max-w-sm bg-white flex flex-col h-full">
          {/* Header */}
          <div className="p-6 flex items-center justify-between flex-shrink-0 border-b border-gray-100">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-black text-white rounded-2xl font-semibold text-sm hover:bg-gray-900"
            >
              Save
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col mt-4 pb-32 overflow-auto">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-700">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-center text-black text-base font-bold mb-8">
              My Account
            </h1>

            {/* Form */}
            <div className="space-y-6 bg-white rounded-2xl">
              {/* Name */}
              <div className="bg-white rounded-xl shadow p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <label className="text-sm font-medium text-gray-500">
                    User Name
                  </label>
                </div>{" "}
                <input
                  type="text"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg text-black focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl shadow p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                </div>{" "}
                <input
                  type="email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 text-black rounded-lg focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="bg-white rounded-xl shadow p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <h3 className="text-sm font-medium text-gray-500">
                    Memory Card Limit
                  </h3>
                </div>
                <p className="text-gray-900 font-medium ml-8">
                  {Array.isArray(memoryCards) ? memoryCards.length : 0} /{" "}
                  {user?.memoryCardLimit || 50} Memory cards
                </p>
                <div className="mt-3 ml-8">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-full bg-stone-800 rounded-full"
                      style={{
                        width: `${
                          (memoryCards.length / (user?.memoryCardLimit || 50)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round(
                      (memoryCards.length / (user?.memoryCardLimit || 50)) *
                        100,
                    )}
                    % used
                  </p>
                  <button
                    onClick={() =>
                      (window.location.href = "tel:+9779843742684")
                    }
                    className="px-4 py-2 mt-2 bg-black text-white rounded-2xl font-semibold text-xs hover:bg-gray-900"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
