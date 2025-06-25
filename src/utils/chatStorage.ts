
import { Conversation } from '@/types/chat';

const STORAGE_KEY = 'chatbot_conversations';

export const loadConversations = (): Conversation[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((conv: any) => ({
      ...conv,
      createdAt: new Date(conv.createdAt),
      lastMessage: conv.lastMessage ? {
        ...conv.lastMessage,
        timestamp: new Date(conv.lastMessage.timestamp)
      } : null,
      messages: conv.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    }));
  } catch (error) {
    console.error('Error loading conversations:', error);
    return [];
  }
};

export const saveConversations = (conversations: Conversation[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error('Error saving conversations:', error);
  }
};

export const exportConversationsAsJson = (conversations: Conversation[]): void => {
  try {
    const dataStr = JSON.stringify(conversations, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat_conversations_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting conversations:', error);
  }
};
