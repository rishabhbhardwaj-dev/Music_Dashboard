import { motion } from 'framer-motion';
import { TrendingUp, Eye, Heart, MessageCircle, Share2, Bookmark, Music, Calendar, Zap, Award, Users, Disc3 } from 'lucide-react';
import { songs } from '../data/songs';
import { formatNumber, totalViews, totalLikes, totalComments, totalShares, totalSaves, avgViews, avgEngagement, bestPerforming, uniqueArtists, uploadStreak, formatDate } from '../utils/helpers';

const stats = [
  { label: 'Total Covers', value: songs.length, icon: Music, color: 'accent' },
  { label: 'Total Views', value: totalViews(songs), icon: Eye, color: 'blue' },
  { label: 'Total Likes', value: totalLikes(songs), icon: Heart, color: 'rose' },
  { label: 'Total Comments', value: totalComments(songs), icon: MessageCircle, color: 'yellow' },
  { label: 'Total Shares', value: totalShares(songs), icon: Share2, color: 'green' },
  { label: 'Total Saves', value: totalSaves(songs), icon: Bookmark, color: 'purple' },
  { label: 'Avg Views', value: avgViews(songs), icon: TrendingUp, color: 'blue' },
  { label: 'Avg Engagement', value: avgEngagement(songs) + '%', icon: Zap, color: 'yellow' },
  { label: 'Artists Covered', value: uniqueArtists(songs).length, icon: Users, color: 'green' },
  { label: 'Upload Streak', value: uploadStreak(songs) + ' mo', icon: Calendar, color: 'accent' },
];

const colorMap = {
  accent: { bg: 'bg-accent-soft', text: 'text-accent', border: 'border-accent/20' },
  blue: { bg: 'bg-blue-soft', text: 'text-blue', border: 'border-blue/20' },
  rose: { bg: 'bg-rose-soft', text: 'text-rose', border: 'border-rose/20' },
  yellow: { bg: 'bg-yellow-soft', text: 'text-yellow', border: 'border-yellow/20' },
  green: { bg: 'bg-green-soft', text: 'text-green', border: 'border-green/20' },
  purple: { bg: 'bg-purple-soft', text: 'text-purple', border: 'border-purple/20' },
};

export default function Dashboard() {
  const best = bestPerforming(songs);
  const latest = [...songs].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))[0];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 via-bg-card to-purple-soft border border-border p-8 md:p-12">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple/5 rounded-full blur-3xl" />
        <div className="relative">
          <p className="text-text-secondary text-sm mb-2">Welcome back</p>
          <h1 className="text-display text-3xl md:text-4xl font-bold mb-2">Rishabh Bhardwaj</h1>
          <p className="text-text-secondary max-w-lg">Your music portfolio at a glance. {songs.length} covers, {formatNumber(totalViews(songs))} total views, and counting.</p>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {stats.map((s, i) => {
          const c = colorMap[s.color];
          return (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`stat-glow card-shine rounded-xl ${c.bg} border ${c.border} p-4 md:p-5`}>
              <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-4 h-4 ${c.text}`} />
              </div>
              <p className="text-xl md:text-2xl font-bold tracking-tight">{typeof s.value === 'number' ? formatNumber(s.value) : s.value}</p>
              <p className="text-[11px] text-text-muted mt-1 font-medium uppercase tracking-wider">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Featured cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Best Performing */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="rounded-xl bg-bg-card border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-yellow" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">Best Performing</h3>
          </div>
          <h2 className="text-display text-2xl font-bold mb-1">{best.title}</h2>
          <p className="text-text-secondary text-sm mb-4">{best.artist} · {best.movie}</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Views', val: best.views },
              { label: 'Likes', val: best.likes },
              { label: 'Shares', val: best.shares },
            ].map(d => (
              <div key={d.label} className="text-center p-3 rounded-lg bg-bg-hover">
                <p className="text-lg font-bold">{formatNumber(d.val)}</p>
                <p className="text-[10px] text-text-muted uppercase">{d.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Latest Upload */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="rounded-xl bg-bg-card border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Disc3 className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">Latest Upload</h3>
          </div>
          <h2 className="text-display text-2xl font-bold mb-1">{latest.title}</h2>
          <p className="text-text-secondary text-sm mb-1">{latest.artist} · {latest.movie}</p>
          <p className="text-text-muted text-xs mb-4">Uploaded {formatDate(latest.uploadDate)}</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Views', val: latest.views },
              { label: 'Likes', val: latest.likes },
              { label: 'Saves', val: latest.saves },
            ].map(d => (
              <div key={d.label} className="text-center p-3 rounded-lg bg-bg-hover">
                <p className="text-lg font-bold">{formatNumber(d.val)}</p>
                <p className="text-[10px] text-text-muted uppercase">{d.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent uploads list */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="rounded-xl bg-bg-card border border-border p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4">Recent Uploads</h3>
        <div className="space-y-2">
          {[...songs].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)).slice(0, 5).map((s, i) => (
            <div key={s.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-bg-hover transition-colors">
              <span className="text-text-muted text-sm w-5">{i + 1}</span>
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Music className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{s.title}</p>
                <p className="text-xs text-text-muted">{s.artist}</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{formatNumber(s.views)}</p>
                <p className="text-[10px] text-text-muted">views</p>
              </div>
              <span className="text-xs text-text-muted hidden md:block">{formatDate(s.uploadDate)}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
