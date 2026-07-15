"use client";

import { useState } from "react";
import Image from "next/image";
import api from "@/../config/api";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import LoadingSpinner from "./loading";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/user/forgotPassword", { email });
      toast.success(res.data.message);
      setError("");
      setMessage(res.data.message);
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong";
      toast.error(msg);
      setMessage("");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-100">
      {loading && <LoadingSpinner />}

      {/* Logo */}
      <div className="flex flex-col items-center justify-center">
        <div className="h-[74px] flex items-center justify-center">
          <Image
            src="/3.png"
            alt="Sambandha"
            width={160}
            height={70}
            priority
          />
        </div>
      </div>

      {/* Card */}
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl text-gray-800 font-semibold mb-4 text-center">
          Forgot Password?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
              className="w-full px-10 py-2 text-sm text-gray-800 border border-gray-300 rounded-md shadow-sm bg-white"
            />
            <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-[#2d2d2d] border border-[#3a5b22] rounded-md hover:bg-[#2d4619] disabled:opacity-60"
          >
            Send Reset Link
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}

        {message && (
          <p className="mt-4 text-sm text-gray-600 text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
