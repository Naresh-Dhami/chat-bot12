
import React, { useRef, useEffect } from 'react';
import { Conversation, Message } from '@/types/chat';
import MessageBubble from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';
import { Menu } from 'lucide-react';

interface ChatWindowProps {
  conversation: Conversation;
  onSendMessage: (message: Message) => void;
  onToggleSidebar: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  onSendMessage,
  onToggleSidebar
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 p-4 flex items-center space-x-3 shadow-sm">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">{conversation.title}</h2>
          <p className="text-sm text-gray-500">AI Assistant • Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start a conversation</h3>
              <p className="text-gray-500">Send a message to begin chatting with the AI assistant</p>
            </div>
          </div>
        ) : (
          <>
            {conversation.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;
