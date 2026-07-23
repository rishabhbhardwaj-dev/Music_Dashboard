import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListMusic, Music, Eye, Heart, ChevronRight, ArrowLeft } from 'lucide-react';
import { songs, playlists } from '../data/songs';
import { formatNumber, totalViews, totalLikes } from '../utils/helpers';

export default function Playlists() {
  const [selected, setSelected] = useState(null);

  const playlistSongs = useMemo(() => {
    if (!selected) return [];
    const pl = playlists.find(p => p.id === selected);
    return pl ? pl.songIds.map(id => songs.find(s => s.id === id)).filter(Boolean) : [];
  }, [selected]);

  if (selected) {
    const pl = playlists.find(p => p.id === selected);
    return (
      <div className="space-y-6">
        <button onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-text-secondary hover:text-text text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Collections
        </button>

        <div className="rounded-xl bg-bg-card border border-border p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-3xl">{pl.emoji}</div>
            <div>
              <h1 className="text-display text-2xl font-bold">{pl.name}</h1>
              <p className="text-sm text-text-secondary">{playlistSongs.length} songs · {formatNumber(totalViews(playlistSongs))} views</p>
            </div>
          </div>

          <div className="space-y-2">
            {playlistSongs.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-bg-hover transition-colors">
                <span className="text-text-muted text-sm w-5">{i + 1}</span>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Music className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{s.title}</p>
                  <p className="text-xs text-text-muted">{s.artist} · {s.movie}</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs text-text-secondary">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatNumber(s.views)}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{formatNumber(s.likes)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-2xl font-bold">Collections</h1>
        <p className="text-sm text-text-secondary mt-1">Curated playlists for every mood</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((pl, i) => {
          const plSongs = pl.songIds.map(id => songs.find(s => s.id === id)).filter(Boolean);
          return (
            <motion.button key={pl.id} onClick={() => setSelected(pl.id)}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="card-shine text-left rounded-xl bg-bg-card border border-border p-5 hover:border-accent/30 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{pl.emoji}</div>
                <div className="flex-1">
                  <h3 className="font-semibold">{pl.name}</h3>
                  <p className="text-xs text-text-muted">{plSongs.length} songs</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
              </div>
              <div className="flex gap-2 overflow-hidden">
                {plSongs.slice(0, 3).map(s => (
                  <span key={s.id} className="text-[10px] px-2 py-0.5 rounded-full bg-bg-hover text-text-secondary truncate max-w-[100px]">{s.title}</span>
                ))}
                {plSongs.length > 3 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg-hover text-text-muted">+{plSongs.length - 3}</span>}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
