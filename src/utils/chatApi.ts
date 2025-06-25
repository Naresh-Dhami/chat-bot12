
import { ApiResponse } from '@/types/chat';

// Mock API call - replace with your actual API endpoint
export const sendMessageToApi = async (message: string): Promise<ApiResponse> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Mock responses for demonstration
    const responses = [
      "That's an interesting question! Let me think about that.",
      "I understand what you're saying. Here's my perspective on that topic.",
      "Thank you for sharing that with me. I'd like to add that...",
      "That's a great point! From my analysis, I would suggest...",
      "I appreciate you asking about this. Based on the information available...",
      "That's something I can help you with. Let me provide some insights.",
      "Interesting! This reminds me of similar situations where...",
      "I see what you mean. This is actually quite common, and here's why..."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Simulate occasional errors (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('API temporarily unavailable');
    }
    
    return { response: randomResponse };
  } catch (error) {
    console.error('API Error:', error);
    return { 
      response: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
