
import React from 'react';
import { Message } from '@/types/chat';
import { format } from 'date-fns';
import { Check, CheckCheck, AlertCircle, Clock } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />;
      case 'sent':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      case 'error':
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
            : 'bg-gradient-to-r from-gray-400 to-gray-600'
        }`}>
          {isUser ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* Message */}
        <div className={`group relative ${isUser ? 'mr-2' : 'ml-2'}`}>
          <div className={`px-4 py-2 rounded-2xl max-w-full break-words shadow-sm ${
            isUser 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm' 
              : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
          }`}>
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          
          {/* Timestamp and status */}
          <div className={`flex items-center space-x-1 mt-1 ${
            isUser ? 'justify-end' : 'justify-start'
          }`}>
            <span className="text-xs text-gray-500">
              {format(message.timestamp, 'HH:mm')}
            </span>
            {isUser && getStatusIcon()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
