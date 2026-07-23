import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle, Info, Sparkles, BarChart3, Music, Clock } from 'lucide-react';
import { songs } from '../data/songs';
import { getInsights, formatNumber, totalViews, avgEngagement, bestPerforming, groupByArtist, uploadStreak } from '../utils/helpers';

const typeConfig = {
  positive: { icon: TrendingUp, color: 'text-green', bg: 'bg-green-soft', border: 'border-green/20' },
  warning: { icon: AlertTriangle, color: 'text-yellow', bg: 'bg-yellow-soft', border: 'border-yellow/20' },
  info: { icon: Info, color: 'text-blue', bg: 'bg-blue-soft', border: 'border-blue/20' },
  negative: { icon: TrendingDown, color: 'text-rose', bg: 'bg-rose-soft', border: 'border-rose/20' },
};

export default function Insights() {
  const insights = useMemo(() => getInsights(songs), []);
  const best = bestPerforming(songs);
  const streak = uploadStreak(songs);
  const grouped = groupByArtist(songs);
  const topArtist = Object.entries(grouped).sort(([, a], [, b]) => totalViews(b) - totalViews(a))[0];

  const quickStats = [
    { label: 'Avg Engagement', value: avgEngagement(songs) + '%', icon: BarChart3, color: 'accent' },
    { label: 'Best Song', value: best.title, icon: Music, color: 'blue' },
    { label: 'Upload Streak', value: streak + ' months', icon: Clock, color: 'green' },
    { label: 'Top Artist', value: topArtist[0], icon: Sparkles, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-2xl font-bold">Insights</h1>
        <p className="text-sm text-text-secondary mt-1">AI-powered observations about your music journey</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickStats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl bg-bg-card border border-border p-4">
            <s.icon className={`w-5 h-5 text-${s.color} mb-2`} />
            <p className="text-sm font-bold truncate">{s.value}</p>
            <p className="text-[10px] text-text-muted uppercase mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Insights list */}
      <div className="space-y-3">
        {insights.map((insight, i) => {
          const config = typeConfig[insight.type] || typeConfig.info;
          return (
            <motion.div key={i}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-start gap-4 p-4 rounded-xl border ${config.border} ${config.bg}`}>
              <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                <config.icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <p className="text-sm leading-relaxed">{insight.text}</p>
            </motion.div>
          );
        })}
      </div>

      {/* AI recommendation placeholder */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl bg-gradient-to-br from-accent/5 to-purple/5 border border-border p-6 text-center">
        <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
        <h3 className="font-semibold mb-1">AI Recommendations Coming Soon</h3>
        <p className="text-sm text-text-secondary max-w-md mx-auto">
          Future versions will analyze your patterns and suggest optimal upload times, song choices, and audience engagement strategies.
        </p>
      </motion.div>
    </div>
  );
}
