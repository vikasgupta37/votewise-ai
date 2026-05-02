import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, UserCheck, Inbox, ShieldCheck } from 'lucide-react';

const SIMULATION_STEPS = [
  {
    title: "Polling Booth Entry",
    description: "You arrive at the polling booth. The First Polling Officer checks your identity against the electoral roll.",
    action: "Show Voter ID",
    icon: <UserCheck size={32} />
  },
  {
    title: "Verification & Ink",
    description: "The Second Polling Officer marks your left forefinger with indelible ink, gives you a voter slip, and takes your signature.",
    action: "Get Inked & Sign",
    icon: <CheckCircle2 size={32} />
  },
  {
    title: "Voting Compartment",
    description: "The Third Polling Officer takes your slip. You enter the voting compartment and press the blue button on the EVM next to your chosen candidate.",
    action: "Press EVM Button",
    icon: <Inbox size={32} />
  },
  {
    title: "VVPAT Verification",
    description: "A red light glows on the EVM, you hear a beep, and a printed slip appears in the VVPAT window for 7 seconds so you can verify your vote.",
    action: "Verify Vote",
    icon: <ShieldCheck size={32} />
  }
];

function SimulationView({ addXP }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < SIMULATION_STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      // Completed simulation
      addXP(50);
      setCurrentStep(SIMULATION_STEPS.length); // go to success state
    }
  };

  const resetSimulation = () => {
    setCurrentStep(0);
  };

  return (
    <motion.div 
      className="view-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <h2>Polling Day Simulation</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Experience the step-by-step process inside an Indian polling booth.</p>

      {/* Progress Bar */}
      <div 
        style={{ display: 'flex', gap: '5px', marginBottom: '10px' }} 
        role="progressbar" 
        aria-valuemin="0" 
        aria-valuemax={SIMULATION_STEPS.length} 
        aria-valuenow={currentStep}
        aria-label="Simulation Progress"
      >
        {SIMULATION_STEPS.map((_, idx) => (
          <div key={idx} style={{ 
            height: '6px', 
            flex: 1, 
            borderRadius: '3px',
            backgroundColor: idx <= currentStep && currentStep < SIMULATION_STEPS.length ? 'var(--primary)' : 'var(--border-color)',
            transition: 'background-color 0.3s'
          }} aria-hidden="true" />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentStep < SIMULATION_STEPS.length ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            role="region"
            aria-live="polite"
            style={{ 
              background: 'var(--surface-color)', 
              padding: '30px', 
              borderRadius: '16px', 
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '20px'
            }}
          >
            <div 
              style={{ color: 'var(--primary)', padding: '15px', background: 'var(--bg-color)', borderRadius: '50%' }}
              aria-hidden="true"
            >
              {SIMULATION_STEPS[currentStep].icon}
            </div>
            
            <h3 style={{ fontSize: '1.5rem' }}>{SIMULATION_STEPS[currentStep].title}</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              {SIMULATION_STEPS[currentStep].description}
            </p>

            <button 
              onClick={handleNextStep}
              aria-label={`Action: ${SIMULATION_STEPS[currentStep].action}`}
              style={{ 
                marginTop: '10px',
                padding: '12px 24px', 
                background: 'var(--primary)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.1s'
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {SIMULATION_STEPS[currentStep].action} <ChevronRight size={18} aria-hidden="true" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              background: 'var(--surface-color)', 
              padding: '40px', 
              borderRadius: '16px', 
              border: '2px solid var(--success)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <CheckCircle2 size={64} color="var(--success)" />
            <h2>Vote Cast Successfully!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>You have completed the polling simulation and earned +50 XP!</p>
            <button 
              onClick={resetSimulation}
              style={{ padding: '10px 20px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}
            >
              Restart Simulation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default SimulationView;
