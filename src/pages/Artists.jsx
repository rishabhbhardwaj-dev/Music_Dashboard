import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Music, Eye, Heart, ArrowLeft, TrendingUp } from 'lucide-react';
import { songs } from '../data/songs';
import { formatNumber, totalViews, totalLikes, groupByArtist, bestPerforming, avgViews } from '../utils/helpers';

export default function Artists() {
  const [selected, setSelected] = useState(null);
  const grouped = useMemo(() => groupByArtist(songs), []);

  const artistList = useMemo(() =>
    Object.entries(grouped).map(([name, list]) => ({
      name,
      count: list.length,
      totalViews: totalViews(list),
      avgView: Math.round(totalViews(list) / list.length),
      best: bestPerforming(list),
      songs: list,
    })).sort((a, b) => b.totalViews - a.totalViews),
  [grouped]);

  if (selected) {
    const artist = artistList.find(a => a.name === selected);
    return (
      <div className="space-y-6">
        <button onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-text-secondary hover:text-text text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Artists
        </button>

        <div className="rounded-xl bg-bg-card border border-border p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-2xl">🎤</div>
            <div>
              <h1 className="text-display text-2xl font-bold">{artist.name}</h1>
              <p className="text-sm text-text-secondary mt-1">{artist.count} covers · {formatNumber(artist.totalViews)} total views</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Covers', value: artist.count, color: 'accent' },
              { label: 'Total Views', value: formatNumber(artist.totalViews), color: 'blue' },
              { label: 'Avg Views', value: formatNumber(artist.avgView), color: 'green' },
              { label: 'Best Song', value: artist.best.title, color: 'yellow' },
            ].map(s => (
              <div key={s.label} className="p-3 rounded-lg bg-bg-hover text-center">
                <p className="text-lg font-bold">{s.value}</p>
                <p className="text-[10px] text-text-muted uppercase">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {artist.songs.sort((a, b) => b.views - a.views).map((s, i) => (
              <div key={s.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-bg-hover transition-colors">
                <span className="text-text-muted text-sm w-5">{i + 1}</span>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Music className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{s.title}</p>
                  <p className="text-xs text-text-muted">{s.movie} · {s.genre}</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs text-text-secondary">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatNumber(s.views)}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{formatNumber(s.likes)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-2xl font-bold">Artists</h1>
        <p className="text-sm text-text-secondary mt-1">{artistList.length} artists covered</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {artistList.map((a, i) => (
          <motion.button key={a.name} onClick={() => setSelected(a.name)}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.04, 0.5) }}
            className="card-shine text-left rounded-xl bg-bg-card border border-border p-5 hover:border-accent/30 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-xl group-hover:bg-accent/20 transition-colors">🎤</div>
              <div>
                <h3 className="font-semibold">{a.name}</h3>
                <p className="text-xs text-text-muted">{a.count} covers</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-bg-hover text-center">
                <p className="text-sm font-bold">{formatNumber(a.totalViews)}</p>
                <p className="text-[9px] text-text-muted uppercase">Views</p>
              </div>
              <div className="p-2 rounded-lg bg-bg-hover text-center">
                <p className="text-sm font-bold">{formatNumber(a.avgView)}</p>
                <p className="text-[9px] text-text-muted uppercase">Avg Views</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border-subtle">
              <p className="text-xs text-text-muted">Best: <span className="text-text font-medium">{a.best.title}</span></p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
