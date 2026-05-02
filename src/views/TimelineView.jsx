import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_EVENTS } from '../constants';

const TimelineItem = memo(({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    style={{
      position: 'relative',
      marginBottom: '25px',
      background: 'var(--surface-color)',
      padding: '15px',
      borderRadius: '8px',
      border: '1px solid var(--border-color)',
    }}
    role="listitem"
  >
    {/* Dot */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-25px',
        top: '20px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        border: '2px solid var(--bg-color)',
      }}
    />
    <h3 style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '4px' }}>
      Step {index + 1}: {item.phase}
    </h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '5px' }}>{item.desc}</p>
  </motion.div>
));
TimelineItem.displayName = 'TimelineItem';

function TimelineView() {
  return (
    <motion.div
      className="view-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}
      role="main"
      aria-label="Election Lifecycle Timeline"
    >
      <h2 style={{ marginBottom: '8px', textAlign: 'center' }}>📅 Election Lifecycle</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '24px' }}>
        The step-by-step journey of a General Election in India.
      </p>

      <ol
        style={{ position: 'relative', paddingLeft: '30px', listStyle: 'none', margin: 0, padding: '0 0 0 30px' }}
        aria-label="Election process steps"
        role="list"
      >
        {/* Vertical Line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '11px',
            top: '10px',
            bottom: '10px',
            width: '2px',
            backgroundColor: 'var(--border-color)',
          }}
        />
        {TIMELINE_EVENTS.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </ol>
    </motion.div>
  );
}

export default memo(TimelineView);
