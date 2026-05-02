import React, { useState, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap, CheckCircle, XCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants';

// Memoized option button
const OptionButton = memo(({ opt, index, isAnswered, isCorrect, isSelected, onAnswer }) => {
  const getStyle = () => {
    const base = {
      padding: '15px',
      borderRadius: '8px',
      border: '2px solid var(--border-color)',
      background: 'var(--bg-color)',
      color: 'var(--text-primary)',
      textAlign: 'left',
      cursor: isAnswered ? 'default' : 'pointer',
      transition: 'all 0.2s',
      fontWeight: '500',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    };
    if (isAnswered && isCorrect) {
      return { ...base, background: 'var(--success)', color: 'white', borderColor: 'var(--success)' };
    }
    if (isAnswered && isSelected && !isCorrect) {
      return { ...base, background: 'var(--error)', color: 'white', borderColor: 'var(--error)' };
    }
    return base;
  };

  return (
    <button
      style={getStyle()}
      onClick={() => onAnswer(index)}
      disabled={isAnswered}
      aria-pressed={isSelected}
      aria-label={`Option ${index + 1}: ${opt}`}
    >
      {isAnswered && isCorrect && <CheckCircle size={18} aria-hidden="true" />}
      {isAnswered && isSelected && !isCorrect && <XCircle size={18} aria-hidden="true" />}
      {opt}
    </button>
  );
});
OptionButton.displayName = 'OptionButton';

function QuizView({ addXP }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);

  const question = useMemo(() => QUIZ_QUESTIONS[currentQIndex], [currentQIndex]);

  const handleAnswer = useCallback((index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === question.correctAnswer) {
      const xpEarned = 10 + streak * 5;
      setStreak(s => s + 1);
      setScore(s => s + xpEarned);
      addXP(xpEarned);
    } else {
      setStreak(0);
    }
  }, [isAnswered, question.correctAnswer, streak, addXP]);

  const handleNext = useCallback(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQIndex(prev => (prev + 1) % QUIZ_QUESTIONS.length);
  }, []);

  return (
    <motion.div
      className="view-container"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}
      role="main"
      aria-label="Quiz Mode"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Quiz Master</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="stats-badge" aria-label={`Current streak: ${streak}`}>
            <Zap size={16} color="var(--secondary)" aria-hidden="true" />
            Streak: {streak}
          </div>
          <div className="stats-badge" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}>
            {question.difficulty}
          </div>
          <div className="stats-badge" aria-label={`Score: ${score} points`}>
            <Award size={16} aria-hidden="true" /> {score} pts
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div
        style={{ display: 'flex', gap: '4px', marginBottom: '15px' }}
        role="progressbar"
        aria-valuenow={currentQIndex + 1}
        aria-valuemin={1}
        aria-valuemax={QUIZ_QUESTIONS.length}
        aria-label={`Question ${currentQIndex + 1} of ${QUIZ_QUESTIONS.length}`}
      >
        {QUIZ_QUESTIONS.map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              background: i <= currentQIndex ? 'var(--primary)' : 'var(--border-color)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          role="region"
          aria-labelledby="quiz-question"
          style={{ background: 'var(--surface-color)', padding: '25px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Question {currentQIndex + 1} of {QUIZ_QUESTIONS.length}
          </p>
          <h3 id="quiz-question" style={{ marginBottom: '20px', fontSize: '1.2rem' }}>{question.question}</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {question.options.map((opt, index) => (
              <OptionButton
                key={index}
                opt={opt}
                index={index}
                isAnswered={isAnswered}
                isCorrect={index === question.correctAnswer}
                isSelected={index === selectedAnswer}
                onAnswer={handleAnswer}
              />
            ))}
          </div>

          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              role="alert"
              aria-live="assertive"
              style={{
                marginTop: '20px',
                padding: '15px',
                borderRadius: '8px',
                background: 'var(--bg-color)',
                borderLeft: `4px solid ${selectedAnswer === question.correctAnswer ? 'var(--success)' : 'var(--error)'}`,
              }}
            >
              <h4 style={{ color: selectedAnswer === question.correctAnswer ? 'var(--success)' : 'var(--error)', marginBottom: '8px' }}>
                {selectedAnswer === question.correctAnswer
                  ? `✅ Correct! +${10 + (streak - 1) * 5} XP`
                  : '❌ Incorrect'}
              </h4>
              <p style={{ fontSize: '0.95rem' }}>
                {selectedAnswer === question.correctAnswer ? question.explanation : question.wrongExplanation}
              </p>
              <button
                onClick={handleNext}
                aria-label="Proceed to next question"
                style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Next Question →
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default memo(QuizView);
