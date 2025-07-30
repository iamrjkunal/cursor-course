"use client";

import React, { useState } from "react";
import {
  ChatInterface,
  ChatHeader,
  EmptyState,
  InputArea,
  Message,
  ModeToggle
} from "@/components";
import type { ChatMessage, ChatMode } from "@/types";

export default function ChatDemoPage() {
  // State for messages, mode, and loading status
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [mode, setMode] = useState<ChatMode>("text");
  const [isLoading, setIsLoading] = useState(false);

  // Handler for sending a new message
  const handleSendMessage = (content: string) => {
    if (isLoading) return;
    
    // Set loading state
    setIsLoading(true);
    
    // Create a unique ID for the message
    const messageId = Date.now().toString();
    
    // Create the new user message
    const userMessage: ChatMessage = {
      id: messageId,
      chat_id: "demo-chat", // In a real app, this would be a proper ID
      created_at: new Date().toISOString(),
      role: "user",
      content,
      type: mode
    };
    
    // Add the user message to the messages array
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    // Simulate AI response (would call an API in a real app)
    setTimeout(() => {
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        chat_id: "demo-chat",
        created_at: new Date().toISOString(),
        role: "assistant",
        content: mode === "text" 
          ? `This is a simulated response to: "${content}"` 
          : "Here's the image you requested:",
        type: mode,
        image_url: mode === "image" ? "https://placehold.co/600x400?text=AI+Generated+Image" : undefined,
      };
      
      // Add the AI response to the messages array
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Handler for starting a new chat
  const handleNewChat = () => {
    setMessages([]);
  };
  
  // Handler for changing the chat mode
  const handleModeChange = (newMode: ChatMode) => {
    setMode(newMode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl h-screen">
        <ChatInterface
          header={
            <ChatHeader onNewChat={handleNewChat} title="AI Chat Demo" />
          }
          footer={
            <>
              <ModeToggle
                mode={mode}
                onModeChange={handleModeChange}
                disabled={isLoading}
              />
              <InputArea
                onSendMessage={handleSendMessage}
                mode={mode}
                isLoading={isLoading}
              />
            </>
          }
        >
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  type={message.type}
                  imageUrl={message.image_url}
                  timestamp={new Date(message.created_at).toLocaleTimeString()}
                />
              ))}
              
              {isLoading && (
                <div className="flex justify-start my-4">
                  <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none p-4 inline-block max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ChatInterface>
      </div>
    </div>
  );
}