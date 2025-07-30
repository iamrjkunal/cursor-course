"use client";

import React from "react";

interface ChatInterfaceProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function ChatInterface({ 
  children, 
  header, 
  footer 
}: ChatInterfaceProps) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header Area */}
      {header && (
        <div className="border-b">
          {header}
        </div>
      )}
      
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
      
      {/* Footer Area with Input */}
      {footer && (
        <div className="border-t">
          {footer}
        </div>
      )}
    </div>
  );
}