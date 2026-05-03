import { useState, useRef, useEffect, useCallback } from 'react';
import { getGeminiResponse } from '../services/gemini';
import { logAnalyticsEvent } from '../services/firebase';
import { QUICK_CHAT_ACTIONS } from '../constants';

export const MAX_CHARS = 500;

const INITIAL_MESSAGE = {
    role: 'bot',
    content: 'Namaste! I am VoteWise AI, your guide to Indian Elections.',
};

function useChat(currentLanguage, currentMode) {
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const messagesEndRef = useRef(null);

  useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
        setMessages(prev => [...prev, { role: 'bot', content: 'Switched to ' + currentLanguage + ' - ' + currentMode + ' mode.' }]);
  }, [currentLanguage, currentMode]);

  const handleInputChange = useCallback((e) => {
        const val = e.target.value;
        if (val.length <= MAX_CHARS) { setInput(val); setCharCount(val.length); }
  }, []);

  const handleQuickAction = useCallback((action) => {
        setInput(action); setCharCount(action.length);
  }, []);

  const handleSend = useCallback(async (e) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isTyping) return;
        setMessages(prev => [...prev, { role: 'user', content: trimmed }]);
        setInput(''); setCharCount(0); setIsTyping(true);
        logAnalyticsEvent('chat_message_sent', { mode: currentMode });
        try {
                const resp = await getGeminiResponse(trimmed, currentMode, currentLanguage);
                setMessages(prev => [...prev, { role: 'bot', content: resp }]);
        } catch {
                setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, please try again.' }]);
        } finally { setIsTyping(false); }
  }, [input, isTyping, currentMode, currentLanguage]);

  return { messages, input, isTyping, charCount, messagesEndRef, handleInputChange, handleSend, handleQuickAction, quickActions: QUICK_CHAT_ACTIONS, maxChars: MAX_CHARS };
}

export default useChat;
