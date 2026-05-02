import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MYTHS = [
  { myth: "EVMs can be hacked via Bluetooth or WiFi.", fact: "Indian EVMs are standalone machines with no radio frequency transmission or reception capability." },
  { myth: "If I don't vote, someone else can vote in my name.", fact: "Polling officers verify identity rigorously. Also, VVPATs allow voters to verify their cast vote." },
  { myth: "NOTA votes can disqualify winning candidates.", fact: "Even if NOTA gets the highest votes, the candidate with the next highest votes is declared the winner." },
  { myth: "You need a Voter ID card to vote.", fact: "If your name is on the electoral roll, you can vote using 11 other alternate photo ID documents (like Aadhaar, Passport)." }
];

function MythBustersView() {
  return (
    <motion.div 
      className="view-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <h2 style={{ color: 'var(--error)' }}>Myth vs Fact</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Uncover the truth behind common misconceptions regarding Indian elections.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {MYTHS.map((item, index) => (
          <motion.div 
            key={index}
            className="myth-card"
            whileHover={{ y: -5 }}
            style={{
              background: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ marginBottom: '15px' }}>
              <span style={{ backgroundColor: 'var(--error)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>MYTH</span>
              <p style={{ marginTop: '10px', fontWeight: 'bold' }}>"{item.myth}"</p>
            </div>
            <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '15px' }}>
              <span style={{ backgroundColor: 'var(--success)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>FACT</span>
              <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>{item.fact}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default MythBustersView;
