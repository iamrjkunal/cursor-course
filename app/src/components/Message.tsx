"use client";

import React from "react";
import Image from "next/image";

export interface MessageProps {
  content: string;
  role: "user" | "assistant";
  type: "text" | "image";
  imageUrl?: string;
  timestamp?: string;
}

export default function Message({ content, role, type, imageUrl, timestamp }: MessageProps) {
  return (
    <div
      className={`mb-4 ${
        role === "user" ? "text-right" : "text-left"
      }`}
    >
      <div
        className={`inline-block max-w-[80%] p-4 rounded-lg ${
          role === "user" 
            ? "bg-blue-500 text-white rounded-br-none" 
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {type === "text" ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          imageUrl && (
            <div>
              <p className="mb-2">{content}</p>
              <div className="relative h-60 w-full">
                <Image 
                  src={imageUrl} 
                  alt={content} 
                  fill
                  className="object-contain rounded"
                />
              </div>
            </div>
          )
        )}
      </div>
      <div className="text-xs text-gray-500 mt-1 flex items-center justify-end">
        <span className="mr-2">{role === "user" ? "You" : "Assistant"}</span>
        {timestamp && <span>{timestamp}</span>}
      </div>
    </div>
  );
}