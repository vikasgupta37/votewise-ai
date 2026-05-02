import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    difficulty: "Beginner",
    question: "Who appoints the Chief Election Commissioner of India?",
    options: ["Prime Minister", "President of India", "Chief Justice of India", "Parliament"],
    correctAnswer: 1,
    explanation: "Under Article 324 of the Constitution, the President appoints the CEC and other Election Commissioners.",
    wrongExplanation: "While the Parliament passes laws and PM advises, the formal appointment is strictly done by the President of India."
  },
  {
    id: 2,
    difficulty: "Intermediate",
    question: "Which Constitutional Amendment lowered the voting age from 21 to 18?",
    options: ["42nd Amendment", "44th Amendment", "61st Amendment", "73rd Amendment"],
    correctAnswer: 2,
    explanation: "The 61st Amendment Act of 1988 lowered the voting age from 21 to 18 years for Lok Sabha and Assembly elections.",
    wrongExplanation: "The 42nd is the 'Mini Constitution', 44th reversed it, and 73rd is Panchayati Raj. The 61st deals specifically with voting age."
  },
  {
    id: 3,
    difficulty: "UPSC Exam Mode",
    question: "According to the Anti-Defection Law (10th Schedule), who decides questions of disqualification of a member of Parliament?",
    options: ["Election Commission", "President", "Supreme Court", "Presiding Officer of the House"],
    correctAnswer: 3,
    explanation: "The 52nd Amendment (1985) states that the Chairman or the Speaker of the House makes the final decision on disqualification due to defection.",
    wrongExplanation: "The Election Commission advises the President on general disqualifications, but defection specifically is decided by the Speaker/Chairman."
  }
];

function QuizView({ addXP }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  
  const question = QUIZ_QUESTIONS[currentQIndex];

  const handleAnswer = (index) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === question.correctAnswer) {
      setStreak(s => s + 1);
      // Base XP + Streak Bonus
      addXP(10 + (streak * 5)); 
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  return (
    <motion.div 
      className="view-container"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Quiz Master</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="stats-badge">
            <Zap size={16} color="var(--secondary)" />
            Streak: {streak}
          </div>
          <div className="stats-badge" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}>
            {question.difficulty}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{ background: 'var(--surface-color)', padding: '25px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}
        >
          <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>{question.question}</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {question.options.map((opt, index) => {
              let btnStyle = {
                padding: '15px',
                borderRadius: '8px',
                border: '2px solid var(--border-color)',
                background: 'var(--bg-color)',
                color: 'var(--text-primary)',
                textAlign: 'left',
                cursor: isAnswered ? 'default' : 'pointer',
                transition: 'all 0.2s',
                fontWeight: '500'
              };

              if (isAnswered) {
                if (index === question.correctAnswer) {
                  btnStyle.background = 'var(--success)';
                  btnStyle.color = 'white';
                  btnStyle.borderColor = 'var(--success)';
                } else if (index === selectedAnswer) {
                  btnStyle.background = 'var(--error)';
                  btnStyle.color = 'white';
                  btnStyle.borderColor = 'var(--error)';
                }
              }

              return (
                <button 
                  key={index} 
                  style={btnStyle}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', background: 'var(--bg-color)', borderLeft: `4px solid ${selectedAnswer === question.correctAnswer ? 'var(--success)' : 'var(--error)'}` }}
            >
              <h4 style={{ color: selectedAnswer === question.correctAnswer ? 'var(--success)' : 'var(--error)', marginBottom: '8px' }}>
                {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
              </h4>
              <p style={{ fontSize: '0.95rem' }}>
                {selectedAnswer === question.correctAnswer ? question.explanation : question.wrongExplanation}
              </p>
              
              <button 
                onClick={handleNext}
                style={{ marginTop: '15px', padding: '10px 20px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Next Question
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default QuizView;
