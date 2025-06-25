
import React, { useState } from 'react';
import { Message } from '@/types/chat';
import { sendMessageToApi } from '@/utils/chatApi';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: Message) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    onSendMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToApi(userMessage.content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.error || response.response,
        sender: 'ai',
        timestamp: new Date(),
        status: response.error ? 'error' : 'sent'
      };

      onSendMessage(aiMessage);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
        status: 'error'
      };
      onSendMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-md p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            rows={1}
            className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all duration-200"
            style={{ minHeight: '48px', maxHeight: '120px' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`p-3 rounded-2xl transition-all duration-200 flex items-center justify-center ${
            input.trim() && !isLoading
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
