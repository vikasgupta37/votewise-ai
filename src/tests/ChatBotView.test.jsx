import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChatBotView from '../views/ChatBotView';
import React from 'react';

// Mock the Gemini service
vi.mock('../services/gemini', () => ({
  getGeminiResponse: vi.fn().mockResolvedValue('AI Response')
}));

describe('ChatBotView Component', () => {
  it('renders initial bot message', () => {
    render(<ChatBotView currentLanguage="English" currentMode="Simple" />);
    expect(screen.getByText(/Namaste! I am VoteWise AI/i)).toBeInTheDocument();
  });

  it('updates input field on change', () => {
    render(<ChatBotView currentLanguage="English" currentMode="Simple" />);
    const input = screen.getByPlaceholderText(/Ask in English/i);
    fireEvent.change(input, { target: { value: 'How to vote?' } });
    expect(input.value).toBe('How to vote?');
  });

  it('sends message and displays AI response', async () => {
    render(<ChatBotView currentLanguage="English" currentMode="Simple" />);
    const input = screen.getByPlaceholderText(/Ask in English/i);
    const sendBtn = screen.getByLabelText(/Send message/i);

    fireEvent.change(input, { target: { value: 'What is NOTA?' } });
    fireEvent.click(sendBtn);

    expect(screen.getByText('What is NOTA?')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('AI Response')).toBeInTheDocument();
    });
  });
});
