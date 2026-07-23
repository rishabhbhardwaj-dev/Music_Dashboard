import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { songs } from '../data/songs';
import { formatNumber, totalViews, totalLikes, groupByArtist, groupByGenre, groupByMood, groupByLanguage, engagementRate, groupByMonthYear, avgEngagement } from '../utils/helpers';

const COLORS = ['#e85d4a', '#60a5fa', '#4ade80', '#fbbf24', '#a78bfa', '#fb7185', '#2dd4bf', '#f97316', '#8b5cf6', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-elevated border border-border rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs font-medium text-text mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: {formatNumber(p.value)}</p>
      ))}
    </div>
  );
};

export default function Analytics() {
  const [tab, setTab] = useState('overview');

  const monthlyData = useMemo(() => {
    const map = {};
    songs.forEach(s => {
      const d = new Date(s.uploadDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!map[key]) map[key] = { month: key, uploads: 0, views: 0, likes: 0 };
      map[key].uploads++;
      map[key].views += s.views;
      map[key].likes += s.likes;
    });
    return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
  }, []);

  const topArtists = useMemo(() => {
    const grouped = groupByArtist(songs);
    return Object.entries(grouped).map(([name, list]) => ({
      name, views: totalViews(list), count: list.length
    })).sort((a, b) => b.views - a.views).slice(0, 8);
  }, []);

  const genreData = useMemo(() => {
    const grouped = groupByGenre(songs);
    return Object.entries(grouped).map(([name, list]) => ({
      name, value: list.length, views: totalViews(list)
    })).sort((a, b) => b.value - a.value);
  }, []);

  const moodData = useMemo(() => {
    const grouped = groupByMood(songs);
    return Object.entries(grouped).map(([name, list]) => ({
      name, value: list.length
    })).sort((a, b) => b.value - a.value);
  }, []);

  const langData = useMemo(() => {
    const grouped = groupByLanguage(songs);
    return Object.entries(grouped).map(([name, list]) => ({
      name, value: list.length
    }));
  }, []);

  const top10Views = useMemo(() => [...songs].sort((a, b) => b.views - a.views).slice(0, 10).map(s => ({ name: s.title.slice(0, 15), views: s.views })), []);
  const top10Likes = useMemo(() => [...songs].sort((a, b) => b.likes - a.likes).slice(0, 10).map(s => ({ name: s.title.slice(0, 15), likes: s.likes })), []);
  const top10Shares = useMemo(() => [...songs].sort((a, b) => b.shares - a.shares).slice(0, 10).map(s => ({ name: s.title.slice(0, 15), shares: s.shares })), []);

  const tabs = ['overview', 'top songs', 'artists', 'genres'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-display text-2xl font-bold">Control Room</h1>
          <p className="text-sm text-text-secondary mt-1">Deep dive into your music performance</p>
        </div>
        <div className="flex bg-bg-card border border-border rounded-lg overflow-hidden">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-2 text-xs font-medium capitalize transition-colors ${tab === t ? 'bg-accent text-white' : 'text-text-secondary hover:text-text'}`}>{t}</button>
          ))}
        </div>
      </div>

      {tab === 'overview' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Monthly uploads */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-bg-card border border-border p-5">
              <h3 className="text-sm font-semibold mb-4">Monthly Uploads</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="uploads" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Monthly views */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="rounded-xl bg-bg-card border border-border p-5">
              <h3 className="text-sm font-semibold mb-4">Monthly Views</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="views" stroke="var(--color-blue)" fill="var(--color-blue-soft)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Genre distribution */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="rounded-xl bg-bg-card border border-border p-5">
              <h3 className="text-sm font-semibold mb-4">Genre Distribution</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={genreData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {genreData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Mood distribution */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="rounded-xl bg-bg-card border border-border p-5">
              <h3 className="text-sm font-semibold mb-4">Mood Distribution</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={moodData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="var(--color-purple)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Language + Artist charts */}
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="rounded-xl bg-bg-card border border-border p-5">
              <h3 className="text-sm font-semibold mb-4">Top Artists by Views</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={topArtists}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: 'var(--color-text-muted)' }} angle={-30} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="views" fill="var(--color-green)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="rounded-xl bg-bg-card border border-border p-5">
              <h3 className="text-sm font-semibold mb-4">Growth Over Time</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="views" stroke="var(--color-blue)" strokeWidth={2} dot={{ fill: 'var(--color-blue)', r: 3 }} />
                  <Line type="monotone" dataKey="likes" stroke="var(--color-rose)" strokeWidth={2} dot={{ fill: 'var(--color-rose)', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      )}

      {tab === 'top songs' && (
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Most Viewed', data: top10Views, key: 'views', color: '#60a5fa' },
            { title: 'Most Liked', data: top10Likes, key: 'likes', color: '#fb7185' },
            { title: 'Most Shared', data: top10Shares, key: 'shares', color: '#4ade80' },
          ].map(chart => (
            <motion.div key={chart.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-bg-card border border-border p-5">
              <h3 className="text-sm font-semibold mb-4">{chart.title}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chart.data} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: 'var(--color-text-muted)' }} width={90} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey={chart.key} fill={chart.color} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 'artists' && (
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-bg-card border border-border p-5">
            <h3 className="text-sm font-semibold mb-4">Artist Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topArtists}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="views" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="count" fill="var(--color-blue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      )}

      {tab === 'genres' && (
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-bg-card border border-border p-5">
            <h3 className="text-sm font-semibold mb-4">Genre Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={genreData} dataKey="views" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={100} label>
                  {genreData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-xl bg-bg-card border border-border p-5">
            <h3 className="text-sm font-semibold mb-4">Language Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={langData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {langData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      )}
    </div>
  );
}
