import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLASHCARDS = [
  { term: "Article 324", definition: "Vests the superintendence, direction, and control of elections in an Election Commission.", category: "Constitution" },
  { term: "VVPAT", definition: "Voter Verified Paper Audit Trail. An independent verification system for voting machines.", category: "EVM" },
  { term: "Model Code of Conduct", definition: "Guidelines issued by ECI for conduct of political parties and candidates during elections.", category: "Election Laws" },
  { term: "NOTA", definition: "None Of The Above. Allows voters to officially register a vote of rejection for all candidates.", category: "Voting" },
  { term: "Delimitation", definition: "The act of redrawing boundaries of Lok Sabha and Assembly seats to represent changes in population.", category: "Constitution" }
];

function Flashcard({ term, definition, category }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="flashcard-container" 
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        perspective: '1000px',
        width: '100%',
        height: '250px',
        cursor: 'pointer'
      }}
    >
      <motion.div
        className="flashcard-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front */}
        <div style={{
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
          textAlign: 'center'
        }}>
          <span style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'var(--bg-color)', padding: '4px 8px', borderRadius: '12px' }}>
            {category}
          </span>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>{term}</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '20px', fontSize: '0.9rem' }}>Click to flip</p>
        </div>

        {/* Back */}
        <div style={{
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
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>{definition}</p>
        </div>
      </motion.div>
    </div>
  );
}

function FlashcardsView() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  return (
    <motion.div 
      className="view-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
    >
      <h2>Flashcards Mode</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Test your memory on key election terms.</p>
      
      <div style={{ width: '100%', maxWidth: '500px', marginTop: '20px' }}>
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

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <button 
          onClick={prevCard}
          style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: 'var(--text-primary)', cursor: 'pointer' }}
        >
          Previous
        </button>
        <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
          {currentIndex + 1} / {FLASHCARDS.length}
        </span>
        <button 
          onClick={nextCard}
          style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer' }}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}

export default FlashcardsView;
