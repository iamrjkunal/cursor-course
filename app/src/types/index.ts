// Types for the chat application

// Message type as defined in the PRD
export interface ChatMessage {
  id: string;
  created_at: string;
  chat_id: string;
  role: 'user' | 'assistant';
  content: string;
  type: 'text' | 'image';
  image_url?: string;
}

// Chat session type as defined in the PRD
export interface ChatSession {
  id: string;
  created_at: string;
  updated_at: string;
  title: string; // Derived from first message
}

// Application state types
export type ChatMode = 'text' | 'image';