import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FLASHCARDS } from '../constants';

// Memoized Flashcard component for performance
const Flashcard = memo(({ term, definition, category }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = useCallback(() => setIsFlipped(f => !f), []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  }, [handleFlip]);

  return (
    <div
      className="flashcard-container"
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
      aria-label={isFlipped ? `${term}: ${definition}` : `Flashcard: ${term}. Press to reveal definition.`}
      style={{ perspective: '1000px', width: '100%', height: '250px', cursor: 'pointer' }}
    >
      <motion.div
        className="flashcard-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          aria-hidden={isFlipped}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'var(--surface-color)',
            border: '2px solid var(--primary)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              background: 'var(--bg-color)',
              padding: '4px 8px',
              borderRadius: '12px',
            }}
          >
            {category}
          </span>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>{term}</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '20px', fontSize: '0.9rem' }}>
            Click to reveal definition
          </p>
        </div>

        {/* Back */}
        <div
          aria-hidden={!isFlipped}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'var(--primary)',
            color: 'white',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px',
            transform: 'rotateY(180deg)',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>{definition}</p>
        </div>
      </motion.div>
    </div>
  );
});
Flashcard.displayName = 'Flashcard';

function FlashcardsView() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % FLASHCARDS.length);
  }, []);

  const prevCard = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  }, []);

  return (
    <motion.div
      className="view-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
      role="main"
      aria-label="Flashcards Mode"
    >
      <div style={{ textAlign: 'center' }}>
        <h2>Flashcards Mode</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Test your memory on key election terms.</p>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '8px' }} role="tablist" aria-label="Flashcard progress">
        {FLASHCARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Card ${i + 1}`}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              background: i === currentIndex ? 'var(--primary)' : 'var(--border-color)',
              transition: 'background 0.2s',
              padding: 0,
            }}
          />
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: '500px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
          >
            <Flashcard {...FLASHCARDS[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '10px', alignItems: 'center' }}>
        <button
          onClick={prevCard}
          aria-label="Previous flashcard"
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--surface-color)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          ← Previous
        </button>
        <span
          style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}
          aria-live="polite"
        >
          {currentIndex + 1} / {FLASHCARDS.length}
        </span>
        <button
          onClick={nextCard}
          aria-label="Next flashcard"
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--primary)',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Next →
        </button>
      </div>
    </motion.div>
  );
}

export default memo(FlashcardsView);
