
import { ApiResponse } from '@/types/chat';

// Mock API call - replace with your actual API endpoint
export const sendMessageToApi = async (message: string): Promise<ApiResponse> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Check if message contains keywords for chart generation
    const shouldGenerateChart = message.toLowerCase().includes('chart') || 
                              message.toLowerCase().includes('graph') || 
                              message.toLowerCase().includes('data') ||
                              message.toLowerCase().includes('analytics');
    
    // Mock responses for demonstration
    const responses = [
      "That's an interesting question! Let me analyze that data for you.",
      "I understand what you're saying. Here's my perspective on that topic.",
      "Thank you for sharing that with me. I'd like to add that...",
      "That's a great point! Based on the data analysis, I would suggest...",
      "I appreciate you asking about this. Based on the information available...",
      "That's something I can help you with. Let me provide some insights.",
      "Interesting! This reminds me of similar patterns where...",
      "I see what you mean. Here's the data visualization you requested."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Generate mock chart data if requested
    let chartData = undefined;
    if (shouldGenerateChart) {
      const chartTypes = ['bar', 'line', 'pie'] as const;
      const randomType = chartTypes[Math.floor(Math.random() * chartTypes.length)];
      
      chartData = {
        type: randomType,
        title: `Sample ${randomType} Chart`,
        data: [
          { name: 'Jan', value: Math.floor(Math.random() * 100) + 20 },
          { name: 'Feb', value: Math.floor(Math.random() * 100) + 20 },
          { name: 'Mar', value: Math.floor(Math.random() * 100) + 20 },
          { name: 'Apr', value: Math.floor(Math.random() * 100) + 20 },
          { name: 'May', value: Math.floor(Math.random() * 100) + 20 },
        ]
      };
    }
    
    // Simulate occasional errors (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('API temporarily unavailable');
    }
    
    return { 
      response: randomResponse,
      chartData 
    };
  } catch (error) {
    console.error('API Error:', error);
    return { 
      response: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
