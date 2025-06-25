
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  lastMessage: Message | null;
}

export interface ApiResponse {
  response: string;
  error?: string;
}
