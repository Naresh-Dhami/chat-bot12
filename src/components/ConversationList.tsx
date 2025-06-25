
import React from 'react';
import { Conversation } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, Plus, Download, Menu, X } from 'lucide-react';
import { exportConversationsAsJson } from '@/utils/chatStorage';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  isOpen,
  onToggle
}) => {
  const handleExport = () => {
    exportConversationsAsJson(conversations);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:relative z-30 lg:z-0
        w-80 lg:w-80 h-full bg-white/80 backdrop-blur-md border-r border-gray-200/50
        transition-transform duration-300 ease-in-out
        flex flex-col
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Chat
              </h1>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={onNewConversation}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>
            <button
              onClick={handleExport}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-center shadow-sm"
              title="Export conversations"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No conversations yet</p>
              <p className="text-sm mt-1">Start a new chat to begin</p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  className={`
                    w-full text-left p-3 rounded-lg transition-all duration-200 group
                    ${activeConversationId === conversation.id
                      ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 shadow-sm'
                      : 'hover:bg-gray-50 border border-transparent'
                    }
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                      ${activeConversationId === conversation.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                        : 'bg-gray-200 group-hover:bg-gray-300'
                      }
                    `}>
                      <MessageCircle className={`w-5 h-5 ${
                        activeConversationId === conversation.id ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium truncate ${
                        activeConversationId === conversation.id ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {conversation.title}
                      </h3>
                      {conversation.lastMessage && (
                        <p className="text-sm text-gray-500 truncate mt-1">
                          {conversation.lastMessage.content}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDistanceToNow(conversation.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConversationList;
