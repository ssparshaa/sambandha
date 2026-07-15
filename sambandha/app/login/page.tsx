"use client";
import NavBar from "client/components/NavBar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "config/api";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, user: userInfo, loading: authLoading, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (isLoggedIn) {
        if (userInfo?.role !== "admin") {
          router.push("/user");
        } else {
          router.push("/admin");
        }
      }
      setLoading(false);
    }
  }, [isLoggedIn, userInfo, loading, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.success) {
        login(response.data.token, response.data.user);
        if (response.data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/user");
        }
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <NavBar />
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1
              className="text-3xl text-[#2d2d2d] mb-2"
              style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}
            >
              Welcome back.
            </h1>
            <p className="text-xs text-[#999]">Sign in to access your memories</p>
          </div>

          {/* Card */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-black/5 px-8 py-8 flex flex-col gap-5"
          >
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#666] tracking-wide">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-10 px-4 text-sm text-[#2d2d2d] bg-[#faf9f7] border border-black/8 rounded-xl outline-none focus:border-[#2d2d2d] transition-colors placeholder:text-[#ccc]"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs text-[#666] tracking-wide">Password</label>
                <a href="/forgot-password" className="text-xs text-[#999] hover:text-[#2d2d2d] transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 px-4 text-sm text-[#2d2d2d] bg-[#faf9f7] border border-black/8 rounded-xl outline-none focus:border-[#2d2d2d] transition-colors placeholder:text-[#ccc]"
              />
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#2d2d2d] cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-[#999] cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-10 bg-[#2d2d2d] hover:bg-[#1a1a1a] text-white text-sm rounded-xl transition-colors duration-200 mt-1"
            >
              Sign in
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
