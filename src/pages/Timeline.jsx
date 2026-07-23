import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Music, Eye, Heart, Calendar } from 'lucide-react';
import { songs } from '../data/songs';
import { formatNumber, formatDate, getYear, getMonth } from '../utils/helpers';

export default function Timeline() {
  const grouped = useMemo(() => {
    const byYear = {};
    songs.forEach(s => {
      const y = getYear(s.uploadDate);
      const m = getMonth(s.uploadDate);
      if (!byYear[y]) byYear[y] = {};
      if (!byYear[y][m]) byYear[y][m] = [];
      byYear[y][m].push(s);
    });
    return byYear;
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-2xl font-bold">Musical Journey</h1>
        <p className="text-sm text-text-secondary mt-1">Your musical journey chronologically</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

        {Object.entries(grouped).sort(([a], [b]) => b - a).map(([year, months]) => (
          <div key={year} className="mb-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="relative flex items-center gap-4 mb-6">
              <div className="w-8 md:w-16 flex justify-center z-10">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
              </div>
              <h2 className="text-display text-3xl font-bold">{year}</h2>
            </motion.div>

            {Object.entries(months).sort(([, a], [, b]) => new Date(b[0].uploadDate) - new Date(a[0].uploadDate)).map(([month, monthSongs]) => (
              <div key={month} className="mb-6">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className="relative flex items-center gap-4 mb-3 ml-4 md:ml-8">
                  <div className="w-4 md:w-8 flex justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-blue border-2 border-bg" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">{month}</h3>
                  <span className="text-xs text-text-muted">({monthSongs.length} covers)</span>
                </motion.div>

                <div className="ml-8 md:ml-16 space-y-2">
                  {monthSongs.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)).map((s, i) => (
                    <motion.div key={s.id}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-bg-card border border-border hover:border-accent/20 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Music className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{s.title}</p>
                        <p className="text-xs text-text-muted">{s.artist} · {s.genre}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-3 text-xs text-text-secondary">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatNumber(s.views)}</span>
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{formatNumber(s.likes)}</span>
                      </div>
                      <span className="text-[10px] text-text-muted hidden md:block">{formatDate(s.uploadDate)}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
