export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface ChatSession {
  sessionId: string;
  lastMessageTime: string;
  lastMessage: string;
  lastRole: "user" | "assistant";
  updatedAt: string;
  title: string;
}

export interface SessionListResponse {
  sessions: ChatSession[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  hasMore: boolean;
}

export interface AskChatbotResponse {
  answer: string;
  sessionId: string;
}

export interface SessionDetailResponse {
  sessionId: string;
  title: string;
  messages: ChatMessage[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  hasMore: boolean;
}
