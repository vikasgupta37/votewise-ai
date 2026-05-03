import { useState, useCallback } from 'react';
import { logAnalyticsEvent } from '../services/firebase';

const XP_PER_LEVEL = 100;

function useGamification() {
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [streak, setStreak] = useState(0);

  const addXP = useCallback((amount) => {
        setXp(prev => {
                const newXp = prev + amount;
                const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
                if (newLevel > level) {
                          setLevel(newLevel);
                          logAnalyticsEvent('level_up', { new_level: newLevel });
                }
                logAnalyticsEvent('xp_earned', { amount, total_xp: newXp });
                return newXp;
        });
  }, [level]);

  const incrementStreak = useCallback(() => setStreak(s => s + 1), []);
    const resetStreak = useCallback(() => setStreak(0), []);
    const levelProgress = Math.min(100, ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100);

  return { xp, level, streak, addXP, incrementStreak, resetStreak, levelProgress };
}

export default useGamification;
