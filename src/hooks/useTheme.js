import { useState, useCallback, useEffect } from 'react';

const THEME_KEY = 'votewise-theme';

function useTheme() {
    const [theme, setTheme] = useState(() => {
          try { return localStorage.getItem(THEME_KEY) || 'light'; }
          catch { return 'light'; }
    });

  useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem(THEME_KEY, theme); } catch {}
  }, [theme]);

  const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return { theme, toggleTheme, isDark: theme === 'dark' };
}

export default useTheme;
