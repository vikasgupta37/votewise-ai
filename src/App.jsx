import React, { useState, useCallback, memo, lazy, Suspense } from 'react';
import { Vote, Moon, Sun, Award, Globe, BookOpen, Loader2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import { LANGUAGES, MODES, VIEWS } from './constants';
import './index.css';

// Lazy load all views for improved efficiency/performance
const ChatBotView = lazy(() => import('./views/ChatBotView'));
const QuizView = lazy(() => import('./views/QuizView'));
const FlashcardsView = lazy(() => import('./views/FlashcardsView'));
const SimulationView = lazy(() => import('./views/SimulationView'));
const TimelineView = lazy(() => import('./views/TimelineView'));
const MythBustersView = lazy(() => import('./views/MythBustersView'));

const ViewLoader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      flexDirection: 'column',
      gap: '10px',
    }}
    role="status"
    aria-label="Loading content"
  >
    <Loader2 className="animate-spin" size={32} color="var(--primary)" />
    <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
  </div>
);

function App() {
  const [activeView, setActiveView] = useState('chat');
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('English');
  const [mode, setMode] = useState('Simple');
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  const applyTheme = useCallback((newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      return newTheme;
    });
  }, [applyTheme]);

  // Apply theme on initial render
  useState(() => { applyTheme(theme); });

  const addXP = useCallback((amount) => {
    setXp(prev => {
      const newXp = prev + amount;
      if (newXp >= level * 100) {
        setLevel(l => l + 1);
      }
      return newXp;
    });
  }, [level]);

  const renderView = () => {
    switch (activeView) {
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
          <Vote size={32} aria-hidden="true" />
          <h1>VoteWise AI</h1>
        </div>

        <div className="header-controls">
          <div className="stats-badge" title="Experience Points" aria-label={`Level ${level}, ${xp} XP`}>
            <Award size={16} aria-hidden="true" /> Lvl {level} ({xp} XP)
          </div>

          <label htmlFor="language-select" className="sr-only">Select Language</label>
          <select
            id="language-select"
            value={language}
            onChange={e => setLanguage(e.target.value)}
            title="Select Language"
            aria-label="Select language"
          >
            {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>

          <label htmlFor="mode-select" className="sr-only">Select Learning Mode</label>
          <select
            id="mode-select"
            value={mode}
            onChange={e => setMode(e.target.value)}
            title="Learning Mode"
            aria-label="Select learning mode"
          >
            {MODES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          <button
            onClick={toggleTheme}
            className="action-btn"
            title="Toggle Theme"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', padding: 0 }}
          >
            {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="tabs-container" aria-label="Main navigation">
        {VIEWS.map(view => (
          <button
            key={view.id}
            className={`tab-btn ${activeView === view.id ? 'active' : ''}`}
            onClick={() => setActiveView(view.id)}
            aria-current={activeView === view.id ? 'page' : undefined}
          >
            {view.label}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <ErrorBoundary>
          <Suspense fallback={<ViewLoader />}>
            <AnimatePresence mode="wait">
              {renderView()}
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Footer Disclaimer */}
      <footer className="footer">
        <p>
          <strong>Neutrality Notice:</strong> VoteWise AI is an educational civic platform and does not
          support or oppose any political party. All information is strictly based on the Constitution
          of India and ECI guidelines.
        </p>
      </footer>
    </div>
  );
}

export default App;
