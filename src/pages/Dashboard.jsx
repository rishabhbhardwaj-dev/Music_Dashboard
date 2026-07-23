import { motion } from 'framer-motion';
import { TrendingUp, Eye, Heart, MessageCircle, Share2, Bookmark, Music, Calendar, Zap, Award, Users, Disc3, Play, Instagram, Youtube, ExternalLink } from 'lucide-react';
import { songs } from '../data/songs';
import { formatNumber, totalViews, totalLikes, totalComments, totalShares, totalSaves, avgViews, avgEngagement, bestPerforming, uniqueArtists, uploadStreak, formatDate } from '../utils/helpers';

const stats = [
  { label: 'Total Covers', value: songs.length, icon: Music, color: 'accent', suffix: '' },
  { label: 'Total Views', value: totalViews(songs), icon: Eye, color: 'blue', suffix: '' },
  { label: 'Total Likes', value: totalLikes(songs), icon: Heart, color: 'rose', suffix: '' },
  { label: 'Total Comments', value: totalComments(songs), icon: MessageCircle, color: 'yellow', suffix: '' },
  { label: 'Total Shares', value: totalShares(songs), icon: Share2, color: 'green', suffix: '' },
  { label: 'Total Saves', value: totalSaves(songs), icon: Bookmark, color: 'purple', suffix: '' },
  { label: 'Avg Views', value: avgViews(songs), icon: TrendingUp, color: 'blue', suffix: '' },
  { label: 'Avg Engagement', value: avgEngagement(songs), icon: Zap, color: 'yellow', suffix: '%' },
  { label: 'Artists Covered', value: uniqueArtists(songs).length, icon: Users, color: 'green', suffix: '' },
  { label: 'Upload Streak', value: uploadStreak(songs), icon: Calendar, color: 'accent', suffix: ' mo' },
];

const colorMap = {
  accent: { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20', glow: 'shadow-accent/20' },
  blue: { bg: 'bg-blue/10', text: 'text-blue', border: 'border-blue/20', glow: 'shadow-blue/20' },
  rose: { bg: 'bg-rose/10', text: 'text-rose', border: 'border-rose/20', glow: 'shadow-rose/20' },
  yellow: { bg: 'bg-yellow/10', text: 'text-yellow', border: 'border-yellow/20', glow: 'shadow-yellow/20' },
  green: { bg: 'bg-green/10', text: 'text-green', border: 'border-green/20', glow: 'shadow-green/20' },
  purple: { bg: 'bg-purple/10', text: 'text-purple', border: 'border-purple/20', glow: 'shadow-purple/20' },
};

// Waveform animation component
const Waveform = () => (
  <div className="flex items-end gap-[3px] h-8">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="w-[3px] bg-accent/40 rounded-full"
        animate={{ height: ['40%', '100%', '40%'] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: i * 0.1,
          ease: 'easeInOut',
        }}
        style={{ minHeight: '8px' }}
      />
    ))}
  </div>
);

export default function Dashboard() {
  const best = bestPerforming(songs);
  const latest = [...songs].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))[0];
  const recentSongs = [...songs].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Immersive Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a0a0a] via-[#0d0d1a] to-[#0a0a1a] border border-white/5 min-h-[400px]"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-purple/5" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="relative p-8 md:p-12 flex flex-col lg:flex-row items-start gap-8">
          {/* Left Content */}
          <div className="flex-1">
            {/* Profile Section */}
            <div className="flex items-center gap-6 mb-8">
              {/* Profile Photo */}
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent via-rose to-purple p-[3px]">
                  <div className="w-full h-full rounded-full bg-bg-elevated flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-accent/20 to-purple/20 flex items-center justify-center">
                      <span className="text-5xl">🎤</span>
                    </div>
                  </div>
                </div>
                {/* Online Indicator */}
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green rounded-full border-4 border-bg-elevated" />
              </div>

              {/* Name & Title */}
              <div>
                <h1 className="text-display text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  Rishabh Bhardwaj
                </h1>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
                    Singer
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-sm font-medium">
                    Cover Artist
                  </span>
                </div>
                <p className="text-white/50 text-sm italic">
                  "Turning emotions into melodies, one cover at a time"
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5">
                <p className="text-2xl font-bold text-white">{songs.length}</p>
                <p className="text-xs text-white/40 uppercase tracking-wider">Covers</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5">
                <p className="text-2xl font-bold text-white">{formatNumber(totalViews(songs))}</p>
                <p className="text-xs text-white/40 uppercase tracking-wider">Views</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5">
                <p className="text-2xl font-bold text-white">{uniqueArtists(songs).length}</p>
                <p className="text-xs text-white/40 uppercase tracking-wider">Artists</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                <Instagram className="w-4 h-4" />
                Follow on Instagram
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all">
                <Youtube className="w-4 h-4" />
                YouTube
              </a>
            </div>
          </div>

          {/* Right Content - Featured Cover */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-white/40 uppercase tracking-wider">Featured Cover</span>
                <Waveform />
              </div>
              
              {/* Album Art Placeholder */}
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-accent/20 to-purple/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white font-semibold">{best.title}</p>
                  <p className="text-white/60 text-sm">{best.artist}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-white">{formatNumber(best.views)}</p>
                  <p className="text-[10px] text-white/40 uppercase">Views</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-white">{formatNumber(best.likes)}</p>
                  <p className="text-[10px] text-white/40 uppercase">Likes</p>
                </div>
              </div>
            </div>

            {/* Latest Upload */}
            <div className="mt-4 bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Disc3 className="w-4 h-4 text-accent animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-xs text-white/40 uppercase tracking-wider">Latest Upload</span>
              </div>
              <p className="text-white font-medium mb-1">{latest.title}</p>
              <p className="text-white/50 text-sm mb-2">{latest.artist} · {latest.movie}</p>
              <p className="text-white/30 text-xs">{formatDate(latest.uploadDate)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-6 bg-accent rounded-full" />
          <h2 className="text-lg font-semibold">Performance Overview</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {stats.map((s, i) => {
            const c = colorMap[s.color];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-xl bg-bg-card border ${c.border} p-4 md:p-5 hover:shadow-lg ${c.glow} transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <s.icon className={`w-5 h-5 ${c.text}`} />
                </div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">
                  {typeof s.value === 'number' ? formatNumber(s.value) : s.value}
                  <span className="text-sm font-normal text-text-muted">{s.suffix}</span>
                </p>
                <p className="text-[11px] text-text-muted mt-1 font-medium uppercase tracking-wider">{s.label}</p>
                
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity -z-10`} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Featured Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Best Performing */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="group relative overflow-hidden rounded-2xl bg-bg-card border border-border p-6 hover:border-accent/30 transition-all"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[60px] group-hover:bg-accent/10 transition-colors" />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-yellow/10 flex items-center justify-center">
                <Award className="w-4 h-4 text-yellow" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">Top Performer</h3>
            </div>
            
            <h2 className="text-display text-2xl font-bold mb-1">{best.title}</h2>
            <p className="text-text-secondary text-sm mb-1">{best.artist}</p>
            <p className="text-text-muted text-xs mb-5">{best.movie} · {best.genre}</p>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Views', val: best.views, icon: Eye },
                { label: 'Likes', val: best.likes, icon: Heart },
                { label: 'Shares', val: best.shares, icon: Share2 },
              ].map(d => (
                <div key={d.label} className="bg-bg-hover/50 rounded-xl p-3 text-center">
                  <d.icon className="w-4 h-4 text-text-muted mx-auto mb-1" />
                  <p className="text-lg font-bold">{formatNumber(d.val)}</p>
                  <p className="text-[10px] text-text-muted uppercase">{d.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Latest Upload */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="group relative overflow-hidden rounded-2xl bg-bg-card border border-border p-6 hover:border-purple/30 transition-all"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple/5 rounded-full blur-[60px] group-hover:bg-purple/10 transition-colors" />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Disc3 className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">Latest Upload</h3>
            </div>
            
            <h2 className="text-display text-2xl font-bold mb-1">{latest.title}</h2>
            <p className="text-text-secondary text-sm mb-1">{latest.artist} · {latest.movie}</p>
            <p className="text-text-muted text-xs mb-5">Uploaded {formatDate(latest.uploadDate)}</p>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Views', val: latest.views, icon: Eye },
                { label: 'Likes', val: latest.likes, icon: Heart },
                { label: 'Saves', val: latest.saves, icon: Bookmark },
              ].map(d => (
                <div key={d.label} className="bg-bg-hover/50 rounded-xl p-3 text-center">
                  <d.icon className="w-4 h-4 text-text-muted mx-auto mb-1" />
                  <p className="text-lg font-bold">{formatNumber(d.val)}</p>
                  <p className="text-[10px] text-text-muted uppercase">{d.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Uploads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl bg-bg-card border border-border p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-purple rounded-full" />
            <h3 className="text-lg font-semibold">Recent Uploads</h3>
          </div>
          <button className="text-sm text-accent hover:text-accent/80 transition-colors">
            View All →
          </button>
        </div>
        
        <div className="space-y-2">
          {recentSongs.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="group flex items-center gap-4 p-3 rounded-xl hover:bg-bg-hover/50 transition-all"
            >
              <span className="text-text-muted text-sm w-6 text-center font-mono">{String(i + 1).padStart(2, '0')}</span>
              
              {/* Album Art Placeholder */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-purple/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-accent/10 transition-all">
                <Music className="w-5 h-5 text-accent" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-accent transition-colors">{s.title}</p>
                <p className="text-xs text-text-muted">{s.artist} · {s.movie}</p>
              </div>
              
              <div className="hidden sm:flex items-center gap-6 text-xs text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  {formatNumber(s.views)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  {formatNumber(s.likes)}
                </span>
              </div>
              
              <span className="text-xs text-text-muted hidden md:block">{formatDate(s.uploadDate)}</span>
              
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-text-muted hover:text-accent transition-colors" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
