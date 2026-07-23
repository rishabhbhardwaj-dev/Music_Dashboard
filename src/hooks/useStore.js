import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'music-dashboard-prefs';

const getPrefs = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
};

const savePrefs = (prefs) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch {}
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => getPrefs().favorites || []);

  const toggle = useCallback((id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      savePrefs({ ...getPrefs(), favorites: next });
      return next;
    });
  }, []);

  const isFav = useCallback((id) => favorites.includes(id), [favorites]);
  return { favorites, toggle, isFav };
};

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(() => getPrefs().bookmarks || []);

  const toggle = useCallback((id) => {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id];
      savePrefs({ ...getPrefs(), bookmarks: next });
      return next;
    });
  }, []);

  const isBookmarked = useCallback((id) => bookmarks.includes(id), [bookmarks]);
  return { bookmarks, toggle, isBookmarked };
};

export const useTheme = () => {
  const [theme, setTheme] = useState(() => getPrefs().theme || 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    savePrefs({ ...getPrefs(), theme });
  }, [theme]);

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  return { theme, toggle };
};

export const useSearchHistory = () => {
  const [history, setHistory] = useState(() => getPrefs().searchHistory || []);

  const add = useCallback((term) => {
    if (!term.trim()) return;
    setHistory(prev => {
      const next = [term, ...prev.filter(h => h !== term)].slice(0, 10);
      savePrefs({ ...getPrefs(), searchHistory: next });
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setHistory([]);
    savePrefs({ ...getPrefs(), searchHistory: [] });
  }, []);

  return { history, add, clear };
};

export const useKeyboard = (handlers) => {
  useEffect(() => {
    const fn = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      handlers[e.key]?.(e);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [handlers]);
};
