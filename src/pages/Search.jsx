import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, Music, Eye, Heart, Clock, Bookmark } from 'lucide-react';
import { songs } from '../data/songs';
import { formatNumber, formatDate, engagementRate } from '../utils/helpers';
import { useSearchHistory, useFavorites, useBookmarks } from '../hooks/useStore';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('relevance');
  const { history, add, clear } = useSearchHistory();
  const { isFav, toggle: toggleFav } = useFavorites();
  const { isBookmarked, toggle: toggleBm } = useBookmarks();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    let list = songs.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      s.movie.toLowerCase().includes(q) ||
      s.genre.toLowerCase().includes(q) ||
      s.mood.toLowerCase().includes(q) ||
      s.language.toLowerCase().includes(q) ||
      s.originalSinger.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    );
    if (filter !== 'all') {
      list = list.filter(s => s.genre.toLowerCase() === filter || s.mood.toLowerCase() === filter);
    }
    switch (sort) {
      case 'views': list.sort((a, b) => b.views - a.views); break;
      case 'likes': list.sort((a, b) => b.likes - a.likes); break;
      case 'newest': list.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)); break;
      case 'oldest': list.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate)); break;
    }
    return list;
  }, [query, filter, sort]);

  const handleSearch = (term) => {
    setQuery(term);
    if (term.trim()) add(term.trim());
  };

  const allFilters = ['all', ...new Set(songs.flatMap(s => [s.genre, s.mood]))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-2xl font-bold">Search</h1>
        <p className="text-sm text-text-secondary mt-1">Find any song, artist, or genre</p>
      </div>

      {/* Search input */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input type="text" value={query} onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
          placeholder="Search songs, artists, movies, genres..."
          className="w-full pl-12 pr-10 py-3.5 bg-bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
          autoFocus />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2">
        {allFilters.slice(0, 12).map(f => (
          <button key={f} onClick={() => setFilter(f === filter ? 'all' : f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${f === filter ? 'bg-accent text-white' : 'bg-bg-card border border-border text-text-secondary hover:text-text'}`}>{f}</button>
        ))}
      </div>

      {/* Sort */}
      {query && (
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted">Sort:</span>
          {['relevance', 'views', 'likes', 'newest', 'oldest'].map(s => (
            <button key={s} onClick={() => setSort(s)}
              className={`text-xs font-medium capitalize transition-colors ${sort === s ? 'text-accent' : 'text-text-muted hover:text-text'}`}>{s}</button>
          ))}
          <span className="text-xs text-text-muted ml-auto">{results.length} results</span>
        </div>
      )}

      {/* Search history */}
      {!query && history.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-text-secondary">Recent Searches</h3>
            <button onClick={clear} className="text-xs text-text-muted hover:text-accent">Clear</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map(h => (
              <button key={h} onClick={() => handleSearch(h)}
                className="px-3 py-1.5 rounded-full bg-bg-card border border-border text-xs text-text-secondary hover:text-text hover:border-accent/30 transition-colors">{h}</button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <AnimatePresence mode="wait">
        {query && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="space-y-2">
            {results.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-text-muted text-sm">No results for "{query}"</p>
                <p className="text-text-muted text-xs mt-1">Try a different search term</p>
              </div>
            ) : (
              results.map((s, i) => (
                <motion.div key={s.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.3) }}
                  className="flex items-center gap-4 p-3 rounded-lg bg-bg-card border border-border hover:border-accent/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Music className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{s.title}</p>
                    <p className="text-xs text-text-muted">{s.artist} · {s.movie} · {s.genre} · {s.mood}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-4 text-xs text-text-secondary">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatNumber(s.views)}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{formatNumber(s.likes)}</span>
                    <span>{engagementRate(s)}%</span>
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
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!query && !history.length && (
        <div className="text-center py-16">
          <SearchIcon className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <p className="text-sm text-text-muted">Start typing to search your covers</p>
        </div>
      )}
    </div>
  );
}
