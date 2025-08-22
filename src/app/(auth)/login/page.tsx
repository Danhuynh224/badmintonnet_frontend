import LoginForm from "@/app/(auth)/login/login-form";
import React from "react";

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950">
      {/* Background Sports Elements */}
      <div className="absolute inset-0 opacity-10">
        {/* Soccer ball pattern */}
        <div className="absolute top-20 left-20 w-16 h-16 rounded-full border-4 border-white transform rotate-12"></div>
        <div className="absolute top-40 right-32 w-12 h-12 rounded-full border-3 border-white transform -rotate-45"></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 rounded-full border-4 border-white transform rotate-45"></div>

        {/* Basketball lines */}
        <div className="absolute top-60 right-20 w-24 h-24">
          <div className="w-full h-full rounded-full border-4 border-white"></div>
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white transform -translate-x-0.5"></div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white transform -translate-y-0.5"></div>
        </div>

        {/* Tennis racket shape */}
        <div className="absolute bottom-20 right-40 w-16 h-24">
          <div className="w-full h-16 rounded-full border-3 border-white"></div>
          <div className="w-1 h-8 bg-white mx-auto"></div>
        </div>

        {/* Dynamic lines */}
        <div className="absolute top-1/4 left-1/3 w-32 h-0.5 bg-white transform rotate-12 opacity-30"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-0.5 bg-white transform -rotate-12 opacity-30"></div>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-blue-700/20 animate-pulse"></div>

      {/* Main content */}
      <div className="w-full max-w-lg p-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 relative z-10">
        {/* Header with sports icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>

          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 mb-2 tracking-tight">
            SportsNet
          </h1>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></div>
            <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
              ĐĂNG NHẬP
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full"></div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Tham gia cộng đồng thể thao{" "}
            <span className="text-blue-600 font-bold">NĂNG ĐỘNG</span> ngay hôm
            nay!
          </p>
        </div>

        <div className="flex justify-center">
          <LoginForm />
        </div>

        {/* Bottom sports motivation */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            Chiến thắng không chỉ trên sân, mà trong từng{" "}
            <span className="text-blue-600 font-semibold">nỗ lực</span> mỗi
            ngày.
          </p>
        </div>
      </div>

      {/* Floating action elements */}
      <div className="absolute top-10 right-10 flex items-center gap-2 text-white/80 animate-bounce">
        <span className="text-sm font-medium">⚡ JOIN NOW</span>
      </div>
    </div>
  );
}

export default LoginPage;
