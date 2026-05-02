import React from 'react';
import { motion } from 'framer-motion';

const TIMELINE_EVENTS = [
  { phase: "Notification", desc: "ECI announces election dates and enforces the Model Code of Conduct." },
  { phase: "Nominations", desc: "Candidates file nomination papers and submit security deposits." },
  { phase: "Scrutiny & Withdrawal", desc: "Returning Officer checks papers. Candidates can withdraw names." },
  { phase: "Campaigning", desc: "Ends 48 hours before polling begins (Silence Period)." },
  { phase: "Polling Day", desc: "Voters cast votes via EVMs. Presiding officers seal machines." },
  { phase: "Counting Day", desc: "EVMs opened. VVPAT slips verified randomly. Results declared." }
];

function TimelineView() {
  return (
    <motion.div 
      className="view-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}
    >
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Election Lifecycle</h2>
      
      <div style={{ position: 'relative', paddingLeft: '30px' }}>
        {/* Vertical Line */}
        <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--border-color)' }} />
        
        {TIMELINE_EVENTS.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ position: 'relative', marginBottom: '25px', background: 'var(--surface-color)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          >
            {/* Dot */}
            <div style={{ position: 'absolute', left: '-25px', top: '20px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: '2px solid var(--bg-color)' }} />
            
            <h4 style={{ color: 'var(--primary)' }}>Step {index + 1}: {item.phase}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '5px' }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default TimelineView;
