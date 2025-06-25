
import React, { useState, useRef } from 'react';
import { Message } from '@/types/chat';
import { sendMessageToApi } from '@/utils/chatApi';
import { Send, Paperclip, X } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: Message) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !attachedFile) || isLoading) return;

    let messageContent = input.trim();
    if (attachedFile) {
      messageContent += attachedFile ? ` [File: ${attachedFile.name}]` : '';
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
      attachedFile: attachedFile ? {
        name: attachedFile.name,
        size: attachedFile.size,
        type: attachedFile.type
      } : undefined
    };

    onSendMessage(userMessage);
    setInput('');
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsLoading(true);

    try {
      const response = await sendMessageToApi(userMessage.content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.error || response.response,
        sender: 'ai',
        timestamp: new Date(),
        status: response.error ? 'error' : 'sent',
        chartData: response.chartData
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
      {attachedFile && (
        <div className="mb-3 flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded-lg">
          <Paperclip className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-800 flex-1">{attachedFile.name}</span>
          <button
            onClick={removeAttachedFile}
            className="text-red-600 hover:text-red-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            rows={1}
            className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none transition-all duration-200"
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
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileAttach}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-3 rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        <button
          type="submit"
          disabled={(!input.trim() && !attachedFile) || isLoading}
          className={`p-3 rounded-2xl transition-all duration-200 flex items-center justify-center ${
            (input.trim() || attachedFile) && !isLoading
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:scale-105'
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
