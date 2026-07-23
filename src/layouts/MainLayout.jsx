import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Music, Users, Clock, BarChart3, Search, ListMusic, Trophy, Lightbulb, Calendar, Sun, Moon, Menu, X, ChevronUp, Keyboard } from 'lucide-react';
import { useTheme, useKeyboard } from '../hooks/useStore';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Studio' },
  { to: '/library', icon: Music, label: 'Song Library' },
  { to: '/artists', icon: Users, label: 'Artists' },
  { to: '/timeline', icon: Clock, label: 'Musical Journey' },
  { to: '/analytics', icon: BarChart3, label: 'Control Room' },
  { to: '/playlists', icon: ListMusic, label: 'Collections' },
  { to: '/achievements', icon: Trophy, label: 'Wall of Fame' },
  { to: '/upcoming', icon: Calendar, label: 'Recording Queue' },
  { to: '/insights', icon: Lightbulb, label: 'Producer Notes' },
  { to: '/search', icon: Search, label: 'Search' },
];

export default function MainLayout() {
  const { theme, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const location = useLocation();

  useEffect(() => { setSidebarOpen(false); }, [location]);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useKeyboard({
    '1': () => window.location.hash = '/',
    '2': () => window.location.hash = '/library',
    '3': () => window.location.hash = '/artists',
    '4': () => window.location.hash = '/analytics',
    '5': () => window.location.hash = '/search',
    't': () => toggle(),
    'k': () => setShowKeys(s => !s),
    '/': (e) => { e.preventDefault(); window.location.hash = '/search'; },
  });

  return (
    <div className={`min-h-screen flex ${theme === 'light' ? 'bg-[#f5f5f7] text-[#1a1a2e]' : ''}`}>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-60 bg-bg-elevated border-r border-border`}>
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">MelodyVault</h1>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">Music Portfolio</p>
            </div>
            <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-bg-hover/50">
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-xs">🎤</span>
            </div>
            <span className="text-xs text-text-secondary">Rishabh Bhardwaj</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${isActive ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text hover:bg-bg-hover'}`}>
              <Icon className="w-[18px] h-[18px]" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          <button onClick={toggle}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-text-secondary hover:text-text hover:bg-bg-hover transition-colors">
            {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={() => setShowKeys(s => !s)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-text-secondary hover:text-text hover:bg-bg-hover transition-colors">
            <Keyboard className="w-[18px] h-[18px]" />
            Shortcuts
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 glass px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-semibold">Rishabh Bhardwaj</h1>
        </header>

        <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors">
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Keyboard shortcuts modal */}
      <AnimatePresence>
        {showKeys && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4" onClick={() => setShowKeys(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-bg-elevated border border-border rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
              <h2 className="text-lg font-semibold mb-4">Keyboard Shortcuts</h2>
              <div className="space-y-2 text-sm">
                {[
                  ['1-5', 'Navigate pages'],
                  ['T', 'Toggle theme'],
                  ['/', 'Open search'],
                  ['K', 'Toggle this panel'],
                ].map(([key, desc]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-text-secondary">{desc}</span>
                    <kbd className="px-2 py-0.5 rounded bg-bg-card border border-border text-[11px] font-mono">{key}</kbd>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowKeys(false)} className="mt-4 w-full py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
