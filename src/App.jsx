import React, { useState, useEffect } from 'react';
import { Vote, Moon, Sun, Award, Globe, BookOpen } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import ChatBotView from './views/ChatBotView';
import QuizView from './views/QuizView';
import FlashcardsView from './views/FlashcardsView';
import SimulationView from './views/SimulationView';
import TimelineView from './views/TimelineView';
import MythBustersView from './views/MythBustersView';

import './index.css';

const VIEWS = [
  { id: 'chat', label: 'Chat Assistant' },
  { id: 'quiz', label: 'Quiz Mode' },
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'simulation', label: 'Simulation' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'myths', label: 'Myth vs Fact' },
];

const LANGUAGES = ['English', 'Hindi', 'Telugu', 'Tamil'];
const MODES = ['Simple', 'Student', 'Exam', 'First Voter'];

function App() {
  const [activeView, setActiveView] = useState('chat');
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('English');
  const [mode, setMode] = useState('Simple');
  
  // Gamification State
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addXP = (amount) => {
    setXp(prev => {
      const newXp = prev + amount;
      if (newXp >= level * 100) {
        setLevel(l => l + 1); // Level up every 100*level XP
      }
      return newXp;
    });
  };

  const renderView = () => {
    switch(activeView) {
      case 'chat': return <ChatBotView currentLanguage={language} currentMode={mode} />;
      case 'quiz': return <QuizView addXP={addXP} />;
      case 'flashcards': return <FlashcardsView />;
      case 'simulation': return <SimulationView addXP={addXP} />;
      case 'timeline': return <TimelineView />;
      case 'myths': return <MythBustersView />;
      default: return <ChatBotView currentLanguage={language} currentMode={mode} />;
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-title">
          <Vote size={32} />
          VoteWise AI
        </div>
        
        <div className="header-controls">
          <div className="stats-badge" title="Experience Points">
            <Award size={16} /> Lvl {level} ({xp} XP)
          </div>

          <select value={language} onChange={(e) => setLanguage(e.target.value)} title="Select Language">
            {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>

          <select value={mode} onChange={(e) => setMode(e.target.value)} title="Learning Mode">
            {MODES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          <button onClick={toggleTheme} className="action-btn" title="Toggle Theme" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', padding: 0 }}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="tabs-container">
        {VIEWS.map(view => (
          <button 
            key={view.id}
            className={`tab-btn ${activeView === view.id ? 'active' : ''}`}
            onClick={() => setActiveView(view.id)}
          >
            {view.label}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      {/* Footer Disclaimer */}
      <footer className="footer">
        <p><strong>Neutrality Notice:</strong> VoteWise AI is an educational civic platform and does not support or oppose any political party. All information is strictly based on the Constitution of India and ECI guidelines.</p>
      </footer>
    </div>
  );
}

export default App;
