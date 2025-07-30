"use client";

import React from "react";

interface ModeToggleProps {
  mode: "text" | "image";
  onModeChange: (mode: "text" | "image") => void;
  disabled?: boolean;
}

export default function ModeToggle({ 
  mode, 
  onModeChange, 
  disabled = false 
}: ModeToggleProps) {
  return (
    <div className="flex space-x-2 mb-4 p-2">
      <button
        onClick={() => onModeChange("text")}
        disabled={disabled || mode === "text"}
        className={`px-4 py-2 rounded-md transition-colors flex-1 ${
          mode === "text"
            ? "bg-blue-500 text-white"
            : disabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
        aria-label="Switch to text chat mode"
      >
        Text Chat
      </button>
      <button
        onClick={() => onModeChange("image")}
        disabled={disabled || mode === "image"}
        className={`px-4 py-2 rounded-md transition-colors flex-1 ${
          mode === "image"
            ? "bg-blue-500 text-white"
            : disabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
        aria-label="Switch to image generation mode"
      >
        Image Generation
      </button>
    </div>
  );
}