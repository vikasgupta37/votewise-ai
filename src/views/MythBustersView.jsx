import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { MYTHS } from '../constants';

const MythCard = memo(({ item, index }) => (
  <motion.article
    className="myth-card"
    whileHover={{ y: -5, boxShadow: 'var(--shadow-md)' }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    aria-label={`Myth ${index + 1}: ${item.myth}`}
    style={{
      background: 'var(--surface-color)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'var(--shadow-sm)',
    }}
  >
    <div style={{ marginBottom: '15px' }}>
      <span
        role="img"
        aria-label="Myth label"
        style={{
          backgroundColor: 'var(--error)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
        }}
      >
        ❌ MYTH
      </span>
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>"{item.myth}"</p>
    </div>
    <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '15px' }}>
      <span
        role="img"
        aria-label="Fact label"
        style={{
          backgroundColor: 'var(--success)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
        }}
      >
        ✅ FACT
      </span>
      <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>{item.fact}</p>
    </div>
  </motion.article>
));
MythCard.displayName = 'MythCard';

function MythBustersView() {
  return (
    <motion.div
      className="view-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}
      role="main"
      aria-label="Myth vs Fact"
    >
      <header>
        <h2 style={{ color: 'var(--error)' }}>🔍 Myth vs Fact</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Uncover the truth behind common misconceptions about Indian elections.
        </p>
      </header>

      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}
        role="list"
        aria-label={`${MYTHS.length} myths about Indian elections`}
      >
        {MYTHS.map((item, index) => (
          <div key={index} role="listitem">
            <MythCard item={item} index={index} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default memo(MythBustersView);
