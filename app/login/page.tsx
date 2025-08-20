"use client";
import NavBar from "client/components/NavBar";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password, rememberMe });
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
      />
      <NavBar />
      <div className="w-full min-h-screen bg-white flex items-center justify-center p-4 lg:p-0 mt-[-40px]">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
          {/* Left side - Image */}
          <div className="w-full lg:w-auto flex-shrink-0 order-2 lg:order-1 flex items-center">
          <div className="w-full max-w-[404px] h-[460px] lg:h-[540px] mx-auto lg:mx-0 lg:ml-[146px] flex items-center">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/78ced4488ae24383914ba9914474f7e495d167c0?width=1076"
              alt=""
              className="w-full h-full object-cover rounded-tl-[45px] rounded-br-[45px]"
            />
          </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full lg:w-auto flex-shrink-0 order-1 lg:order-2 lg:mr-[150px] lg:ml-[100px]">
            <div className="w-full max-w-[404px] mx-auto lg:mx-0">
              <div className="relative text-[17px] lg:text-[19px]"> {/* Decreased base font size */}
                {/* Welcome back title */}
                <h1 className="text-black font-poppins text-[30px] lg:text-[38px] font-medium leading-normal mb-4">
                  Welcome back!
                </h1>

                {/* Subtitle */}
                <p className="text-black font-poppins text-[17px] lg:text-[19px] font-medium leading-normal mb-10">
                  Enter your credentials to access your account
                </p>

                {/* Email field */}
                <div className="mb-5">
                  <label className="block text-black font-poppins text-[14px] font-medium leading-normal mb-2">
                    Email address
                  </label>
                  <div className="w-full h-[40px] flex items-center gap-[10px] px-[10px] py-[10px] border border-[#d9d9d9] rounded-lg">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 text-black font-poppins text-[13px] font-medium leading-normal outline-none bg-transparent placeholder:text-[#d9d9d9]"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="mb-5 relative">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-black font-poppins text-[14px] font-medium leading-normal">
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-[#0c2a92] font-poppins text-[12px] font-medium leading-normal"
                    >
                      Forgot password
                    </a>
                  </div>
                  <div className="w-full h-[40px] flex items-center gap-[10px] px-[10px] py-[10px] border border-[#d9d9d9] rounded-lg">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="flex-1 text-black font-poppins text-[13px] font-medium leading-normal outline-none bg-transparent placeholder:text-[#d9d9d9]"
                    />
                  </div>
                </div>

                {/* Remember me checkbox */}
                <div className="mb-7 flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-[13px] h-[13px] rounded-[2px] border border-black appearance-none checked:bg-black cursor-pointer"
                    />
                    {rememberMe && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <label className="text-black font-poppins text-[12px] font-medium leading-normal cursor-pointer">
                    Remember me
                  </label>
                </div>

                {/* Login button */}
                <button
                  onClick={handleSubmit}
                  className="w-full h-[40px] bg-[#2d2d2d] border border-[#3a5b22] rounded-lg flex items-center justify-center px-[10px] py-[10px] mb-10 hover:bg-[#2d4619] transition-colors"
                >
                  <span className="text-white font-poppins text-[14px] font-bold leading-normal">
                    Login
                  </span>
                </button>

                {/* Or divider - visible only on desktop */}
                <div className="hidden lg:block relative mb-10">
                  <div className="w-full h-0 border-t border-[#f5f5f5]"></div>
                  <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3">
                    <span className="text-black font-poppins text-[11px] font-medium leading-normal">
                      Or
                    </span>
                  </div>
                </div>

                {/* Don't have account text */}
                <p className="text-center lg:text-left text-black font-poppins text-[13px] lg:text-[15px] font-medium leading-normal">
                  Don't have an account? Contact the Admin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
