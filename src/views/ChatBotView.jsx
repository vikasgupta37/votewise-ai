import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import '../components/Chat.css';
import { motion } from 'framer-motion';

const QUICK_ACTIONS = [
  'What is an EVM?',
  'How do I register to vote?',
  'What is NOTA?',
];

function ChatBotView({ currentLanguage, currentMode }) {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Namaste! I am VoteWise AI. I'm ready to help you learn about Indian Elections. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Add greeting when language or mode changes
    const greetings = {
      'English': `Mode: ${currentMode}. How can I help you?`,
      'Hindi': `मोड: ${currentMode}. मैं आपकी कैसे मदद कर सकता हूँ?`,
      'Telugu': `మోడ్: ${currentMode}. నేను మీకు ఎలా సహాయం చేయగలను?`,
      'Tamil': `முறை: ${currentMode}. நான் உங்களுக்கு எப்படி உதவ முடியும்?`
    };
    
    setMessages(prev => [...prev, {
      role: 'bot',
      content: greetings[currentLanguage] || greetings['English']
    }]);
  }, [currentLanguage, currentMode]);

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    let prefix = "";
    if (currentLanguage === "Hindi") prefix = "[Hindi Translation Simulated]\n";
    if (currentLanguage === "Telugu") prefix = "[Telugu Translation Simulated]\n";
    if (currentLanguage === "Tamil") prefix = "[Tamil Translation Simulated]\n";
    
    let detailLevelText = "";
    if (currentMode === "Student") detailLevelText = " Imagine you are explaining this in a classroom: ";
    if (currentMode === "Exam") detailLevelText = " (Key Facts for UPSC: Article 324, 1951 RP Act): ";
    if (currentMode === "First Voter") detailLevelText = " As a first time voter, here is a simple guide: ";

    if (lowerInput.includes('evm')) {
      return prefix + detailLevelText + "An Electronic Voting Machine (EVM) is a simple electronic device used to record votes in place of ballot papers and boxes.";
    }
    if (lowerInput.includes('register') || lowerInput.includes('voter id')) {
      return prefix + detailLevelText + "To register to vote in India, you must be 18 years old. Fill Form 6 on the Election Commission's portal at voters.eci.gov.in.";
    }
    if (lowerInput.includes('nota')) {
      return prefix + detailLevelText + "NOTA stands for 'None of the Above'. Introduced after the PUCL v. Union of India case (2013), it allows voters to express their dissatisfaction.";
    }
    
    return prefix + detailLevelText + "That's a great question about the Indian election process! Ask me about EVMs, NOTA, or how to register to vote!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage.content);
      setMessages((prev) => [...prev, { role: 'bot', content: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <motion.div 
      className="chat-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="messages-area">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="avatar">
              {msg.role === 'bot' ? <Bot size={24} /> : <User size={24} />}
            </div>
            <div className="message-content">
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message bot">
            <div className="avatar">
              <Bot size={24} />
            </div>
            <div className="message-content typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <div className="quick-actions">
          {QUICK_ACTIONS.map((action, i) => (
            <button 
              key={i} 
              className="action-btn"
              onClick={() => setInput(action)}
            >
              {action}
            </button>
          ))}
        </div>
        <form className="input-form" onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask in ${currentLanguage}...`}
            disabled={isTyping}
          />
          <button type="submit" className="send-btn" disabled={!input.trim() || isTyping}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default ChatBotView;
