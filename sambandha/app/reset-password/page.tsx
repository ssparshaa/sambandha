"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/../config/api";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";
import LoadingSpinner from "./loading";
import axios from "axios";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post(`/user/resetPassword/${token}`, {
        password,
      });

      toast.success(res.data.message || "Password reset successful");
      router.push("/login");
    } catch (err: unknown) {
      let msg = "Something went wrong";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || msg;
      }
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-100">
      {loading && <LoadingSpinner />}

      {/* Logo */}
      <div className="flex items-center justify-center">
        <Image src="/3.png" alt="Sambandha" width={160} height={70} priority />
      </div>

      {/* Card */}
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl text-gray-800 font-semibold text-center">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              required
              className="w-full px-10 py-2 text-sm text-gray-800 border border-gray-300 rounded-md bg-white"
            />
            <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="w-full px-10 py-2 text-sm text-gray-800 border border-gray-300 rounded-md bg-white"
            />
            <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-[#2d2d2d] border border-[#3a5b22] rounded-md hover:bg-[#2d4619] disabled:opacity-60"
          >
            Reset Password
          </button>
        </form>

        {error && (
          <p
            aria-live="assertive"
            className="mt-4 text-sm text-red-600 text-center"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
