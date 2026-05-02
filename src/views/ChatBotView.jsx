import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import '../components/Chat.css';
import { motion, AnimatePresence } from 'framer-motion';
import { getGeminiResponse } from '../services/gemini';
import { QUICK_CHAT_ACTIONS } from '../constants';

const INITIAL_MESSAGE = {
  role: 'bot',
  content: "Namaste! 🙏 I am VoteWise AI, your guide to Indian Elections. Ask me anything about EVMs, voter registration, constitutional articles, or the electoral process!",
};

// Memoized individual message component for performance
const Message = memo(({ msg }) => (
  <motion.div
    className={`message ${msg.role}`}
    initial={{ opacity: 0, x: msg.role === 'bot' ? -20 : 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="avatar" aria-hidden="true">
      {msg.role === 'bot' ? <Bot size={24} /> : <User size={24} />}
    </div>
    <div className="message-content">
      <span className="sr-only">{msg.role === 'bot' ? 'Assistant: ' : 'You: '}</span>
      {msg.content}
    </div>
  </motion.div>
));
Message.displayName = 'Message';

// Memoized quick action button for performance
const QuickActionButton = memo(({ action, onSelect }) => (
  <button
    className="action-btn"
    onClick={() => onSelect(action)}
    aria-label={`Ask about: ${action}`}
  >
    {action}
  </button>
));
QuickActionButton.displayName = 'QuickActionButton';

function ChatBotView({ currentLanguage, currentMode }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const messagesEndRef = useRef(null);
  const MAX_CHARS = 500;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    const greetings = {
      English: `Language changed to ${currentLanguage}, Mode: ${currentMode}. How can I help you?`,
      Hindi: `भाषा ${currentLanguage} में बदल गई, मोड: ${currentMode}. मैं आपकी कैसे मदद कर सकता हूँ?`,
      Telugu: `భాష ${currentLanguage}కి మారింది, మోడ్: ${currentMode}. నేను మీకు ఎలా సహాయం చేయగలను?`,
      Tamil: `மொழி ${currentLanguage}க்கு மாறியது, முறை: ${currentMode}. நான் உங்களுக்கு எப்படி உதவ முடியும்?`,
    };
    setMessages(prev => [
      ...prev,
      { role: 'bot', content: greetings[currentLanguage] || greetings['English'] },
    ]);
  }, [currentLanguage, currentMode]);

  const handleInputChange = useCallback((e) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS) {
      setInput(val);
      setCharCount(val.length);
    }
  }, []);

  const handleQuickAction = useCallback((action) => {
    setInput(action);
    setCharCount(action.length);
  }, []);

  const handleSend = useCallback(async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setCharCount(0);
    setIsTyping(true);

    try {
      const botResponse = await getGeminiResponse(userMessage.content, currentMode, currentLanguage);
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, currentMode, currentLanguage]);

  return (
    <motion.div
      className="chat-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      role="main"
      aria-label="AI Civic Assistant Chat"
    >
      <div className="messages-area" role="log" aria-live="polite" aria-label="Chat conversation">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <Message key={index} msg={msg} />
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="message bot" aria-label="Assistant is typing">
            <div className="avatar" aria-hidden="true">
              <Bot size={24} />
            </div>
            <div className="message-content typing-indicator">
              <Loader2 className="animate-spin" size={20} />
              <span style={{ fontSize: '0.85rem', marginLeft: '8px', color: 'var(--text-secondary)' }}>
                Thinking...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <div className="quick-actions" role="group" aria-label="Suggested questions">
          {QUICK_CHAT_ACTIONS.map((action, i) => (
            <QuickActionButton key={i} action={action} onSelect={handleQuickAction} />
          ))}
        </div>
        <form className="input-form" onSubmit={handleSend}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder={`Ask in ${currentLanguage}... (${MAX_CHARS} char limit)`}
              disabled={isTyping}
              aria-label="Your question"
              maxLength={MAX_CHARS}
            />
            <span
              style={{
                position: 'absolute',
                right: '10px',
                bottom: '-18px',
                fontSize: '0.75rem',
                color: charCount > MAX_CHARS * 0.8 ? 'var(--error)' : 'var(--text-secondary)',
              }}
              aria-live="polite"
              aria-atomic="true"
            >
              {charCount}/{MAX_CHARS}
            </span>
          </div>
          <button
            type="submit"
            className="send-btn"
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
          >
            {isTyping ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

ChatBotView.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  currentMode: PropTypes.string.isRequired,
};

export default memo(ChatBotView);
