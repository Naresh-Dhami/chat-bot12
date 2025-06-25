
import React, { useState, useEffect } from 'react';
import ChatWindow from '@/components/ChatWindow';
import ConversationList from '@/components/ConversationList';
import { Message, Conversation } from '@/types/chat';
import { loadConversations, saveConversations } from '@/utils/chatStorage';

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const savedConversations = loadConversations();
    setConversations(savedConversations);
    if (savedConversations.length > 0) {
      setActiveConversationId(savedConversations[0].id);
    }
  }, []);

  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: `Chat ${conversations.length + 1}`,
      messages: [],
      createdAt: new Date(),
      lastMessage: null
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversationId(newConversation.id);
  };

  const updateConversation = (conversationId: string, newMessage: Message) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const updatedMessages = [...conv.messages, newMessage];
        return {
          ...conv,
          messages: updatedMessages,
          lastMessage: newMessage,
          title: conv.messages.length === 0 ? newMessage.content.slice(0, 30) + '...' : conv.title
        };
      }
      return conv;
    }));
  };

  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-50 to-red-100">
      <div className="flex h-screen max-w-7xl mx-auto bg-white/60 backdrop-blur-sm shadow-2xl">
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
          onNewConversation={createNewConversation}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <ChatWindow
              conversation={activeConversation}
              onSendMessage={(message) => updateConversation(activeConversation.id, message)}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-red-500/10 to-red-600/10">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to ChatBot</h2>
                <p className="text-gray-600 mb-6">Start a new conversation to begin chatting with our AI assistant</p>
                <button
                  onClick={createNewConversation}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Start New Chat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
