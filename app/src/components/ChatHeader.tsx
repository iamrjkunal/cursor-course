"use client";

import React from "react";

interface ChatHeaderProps {
  onNewChat?: () => void;
  title?: string;
}

export default function ChatHeader({ onNewChat, title = "AI Chat" }: ChatHeaderProps) {
  return (
    <div className="p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">{title}</h1>
      
      {onNewChat && (
        <button
          onClick={onNewChat}
          className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
          aria-label="Start a new chat"
        >
          New Chat
        </button>
      )}
    </div>
  );
}