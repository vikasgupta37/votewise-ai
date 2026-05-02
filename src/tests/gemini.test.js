import { describe, it, expect, vi } from 'vitest';
import { getGeminiResponse } from '../services/gemini';

// Mock the generative AI library
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockImplementation(() => ({
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: () => 'EVM is Electronic Voting Machine.'
        }
      })
    }))
  }))
}));

describe('Gemini Service', () => {
  it('should return a response from Gemini API', async () => {
    const response = await getGeminiResponse('What is EVM?');
    expect(response).toBe('EVM is Electronic Voting Machine.');
  });

  it('should handle API errors gracefully', async () => {
    // Force an error
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    GoogleGenerativeAI.mockImplementationOnce(() => ({
      getGenerativeModel: () => ({
        generateContent: () => { throw new Error('API Error'); }
      })
    }));

    const response = await getGeminiResponse('What is EVM?');
    expect(response).toContain('trouble connecting');
  });
});
