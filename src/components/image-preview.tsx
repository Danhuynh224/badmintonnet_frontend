"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

interface ImagePreviewProps {
  src?: string | null;
  alt?: string;
  className?: string;
  containerClassName?: string;
}

/**
 * Component hiển thị ảnh có thể click để xem lớn.
 * Dùng được cho cả banner và logo.
 */
export default function ImagePreview({
  src,
  alt = "Hình ảnh",
  className = "",
  containerClassName = "",
}: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      {/* Ảnh hiển thị chính */}
      <div
        className={`relative cursor-pointer px-12 ${containerClassName}`} // 👈 thêm padding ngang
        onClick={() => {
          console.log("Clicked image, opening modal");
          setIsOpen(true);
        }}
      >
        <div className="relative w-full h-86 overflow-hidden rounded-xl">
          {" "}
          {/* 👈 h-64 = chiều cao cố định */}
          <Image
            src={src}
            alt={alt}
            fill
            sizes="80vw"
            className={`object-cover transition-transform duration-300  ${className}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-white/70 dark:via-slate-900/70 to-transparent z-10" />
        </div>
      </div>

      {/* Modal xem ảnh lớn */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()} // chặn click đóng khi bấm vào ảnh
            className="relative flex items-center justify-center max-w-5xl w-full max-h-[90vh]"
          >
            <Image
              src={src}
              alt={alt}
              width={800}
              height={600}
              className="object-contain rounded-lg max-h-[90vh] w-auto h-auto"
            />

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-2 bg-black/70 rounded-full hover:bg-black"
            >
              <X className="text-white w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
