
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
  attachedFile?: {
    name: string;
    size: number;
    type: string;
  };
  chartData?: ChartData;
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
  chartData?: ChartData;
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie';
  data: Array<{
    name: string;
    value: number;
    [key: string]: any;
  }>;
  title?: string;
}
