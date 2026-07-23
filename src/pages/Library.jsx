import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Bookmark, ExternalLink, Eye, MessageCircle, Share2, Clock, Grid3X3, List, SlidersHorizontal, Download } from 'lucide-react';
import { songs } from '../data/songs';
import { formatNumber, formatDate, engagementRate, uniqueArtists } from '../utils/helpers';
import { useFavorites, useBookmarks } from '../hooks/useStore';

const genres = ['All', ...new Set(songs.map(s => s.genre))];
const moods = ['All', ...new Set(songs.map(s => s.mood))];
const languages = ['All', ...new Set(songs.map(s => s.language))];

export default function Library() {
  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('newest');
  const [genre, setGenre] = useState('All');
  const [mood, setMood] = useState('All');
  const [lang, setLang] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const { isFav, toggle: toggleFav } = useFavorites();
  const { isBookmarked, toggle: toggleBm } = useBookmarks();

  const filtered = useMemo(() => {
    let list = [...songs];
    if (genre !== 'All') list = list.filter(s => s.genre === genre);
    if (mood !== 'All') list = list.filter(s => s.mood === mood);
    if (lang !== 'All') list = list.filter(s => s.language === lang);
    switch (sort) {
      case 'newest': list.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)); break;
      case 'oldest': list.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate)); break;
      case 'views': list.sort((a, b) => b.views - a.views); break;
      case 'likes': list.sort((a, b) => b.likes - a.likes); break;
      case 'engagement': list.sort((a, b) => parseFloat(engagementRate(b)) - parseFloat(engagementRate(a))); break;
    }
    return list;
  }, [sort, genre, mood, lang]);

  const exportData = () => {
    const csv = ['Title,Artist,Movie,Genre,Mood,Views,Likes,Comments,Shares,Saves,Date',
      ...filtered.map(s => `"${s.title}","${s.artist}","${s.movie}",${s.genre},${s.mood},${s.views},${s.likes},${s.comments},${s.shares},${s.saves},${s.uploadDate}`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'songs-export.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-display text-2xl font-bold">Song Library</h1>
          <p className="text-sm text-text-secondary mt-1">{filtered.length} covers</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportData}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-bg-card border border-border text-text-secondary hover:text-text transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setShowFilters(f => !f)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${showFilters ? 'bg-accent text-white' : 'bg-bg-card border border-border text-text-secondary hover:text-text'}`}>
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <div className="flex bg-bg-card border border-border rounded-lg overflow-hidden">
            <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-accent/10 text-accent' : 'text-text-muted'}`}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'bg-accent/10 text-accent' : 'text-text-muted'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl bg-bg-card border border-border">
              <div>
                <label className="text-[11px] text-text-muted uppercase font-medium mb-1.5 block">Sort</label>
                <select value={sort} onChange={e => setSort(e.target.value)}
                  className="w-full bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="views">Most Viewed</option>
                  <option value="likes">Most Liked</option>
                  <option value="engagement">Best Engagement</option>
                </select>
              </div>
              {[
                { label: 'Genre', val: genre, set: setGenre, opts: genres },
                { label: 'Mood', val: mood, set: setMood, opts: moods },
                { label: 'Language', val: lang, set: setLang, opts: languages },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-[11px] text-text-muted uppercase font-medium mb-1.5 block">{f.label}</label>
                  <select value={f.val} onChange={e => f.set(e.target.value)}
                    className="w-full bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent">
                    {f.opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid view */}
      {view === 'grid' ? (
        <div className="grid sm:md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s, i) => (
            <motion.div key={s.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.5) }}
              className="card-shine rounded-xl bg-bg-card border border-border overflow-hidden group hover:border-accent/30 transition-all duration-300">
              {/* Thumbnail placeholder */}
              <div className="h-36 bg-gradient-to-br from-accent/5 to-purple/5 flex items-center justify-center relative">
                <span className="text-4xl">🎵</span>
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <button onClick={() => toggleFav(s.id)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isFav(s.id) ? 'bg-rose text-white' : 'bg-black/40 text-white/60 hover:text-white'}`}>
                    <Heart className="w-3.5 h-3.5" fill={isFav(s.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button onClick={() => toggleBm(s.id)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isBookmarked(s.id) ? 'bg-yellow text-white' : 'bg-black/40 text-white/60 hover:text-white'}`}>
                    <Bookmark className="w-3.5 h-3.5" fill={isBookmarked(s.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] font-medium">{s.genre}</span>
                  <span className="px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] font-medium">{s.mood}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm truncate">{s.title}</h3>
                <p className="text-text-secondary text-xs mt-0.5">{s.artist} · {s.movie}</p>
                <div className="flex items-center gap-3 mt-3 text-[11px] text-text-muted">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatNumber(s.views)}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{formatNumber(s.likes)}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{s.comments}</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-subtle">
                  <span className="text-[10px] text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(s.uploadDate)}</span>
                  {s.instagramUrl && (
                    <a href={s.instagramUrl} target="_blank" rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 text-[11px] font-medium flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Instagram
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List view */
        <div className="space-y-1">
          {filtered.map((s, i) => (
            <motion.div key={s.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.3) }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-bg-hover transition-colors group">
              <span className="text-text-muted text-sm w-5 hidden sm:block">{i + 1}</span>
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🎵</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{s.title}</p>
                <p className="text-xs text-text-muted">{s.artist} · {s.movie} · {s.genre}</p>
              </div>
              <div className="hidden md:flex items-center gap-6 text-xs text-text-secondary">
                <span>{formatNumber(s.views)} views</span>
                <span>{formatNumber(s.likes)} likes</span>
                <span>{engagementRate(s)}% eng.</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleFav(s.id)} className={`p-1.5 rounded-full transition-colors ${isFav(s.id) ? 'text-rose' : 'text-text-muted hover:text-rose'}`}>
                  <Heart className="w-3.5 h-3.5" fill={isFav(s.id) ? 'currentColor' : 'none'} />
                </button>
                <button onClick={() => toggleBm(s.id)} className={`p-1.5 rounded-full transition-colors ${isBookmarked(s.id) ? 'text-yellow' : 'text-text-muted hover:text-yellow'}`}>
                  <Bookmark className="w-3.5 h-3.5" fill={isBookmarked(s.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
