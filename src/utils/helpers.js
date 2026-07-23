export const formatNumber = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
};

export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const getMonthYear = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
};

export const getYear = (dateStr) => new Date(dateStr).getFullYear();

export const getMonth = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', { month: 'long' });

export const engagementRate = (song) => {
  const eng = song.likes + song.comments + song.shares + song.saves;
  return song.views > 0 ? ((eng / song.views) * 100).toFixed(1) : '0';
};

export const totalViews = (songs) => songs.reduce((s, c) => s + c.views, 0);
export const totalLikes = (songs) => songs.reduce((s, c) => s + c.likes, 0);
export const totalComments = (songs) => songs.reduce((s, c) => s + c.comments, 0);
export const totalShares = (songs) => songs.reduce((s, c) => s + c.shares, 0);
export const totalSaves = (songs) => songs.reduce((s, c) => s + c.saves, 0);

export const avgViews = (songs) => Math.round(totalViews(songs) / songs.length);

export const avgEngagement = (songs) => {
  const rates = songs.map(s => parseFloat(engagementRate(s)));
  return (rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(1);
};

export const bestPerforming = (songs) => songs.reduce((best, s) => s.views > best.views ? s : best, songs[0]);

export const uniqueArtists = (songs) => [...new Set(songs.map(s => s.artist))];

export const groupByArtist = (songs) => {
  const map = {};
  songs.forEach(s => {
    if (!map[s.artist]) map[s.artist] = [];
    map[s.artist].push(s);
  });
  return map;
};

export const groupByYear = (songs) => {
  const map = {};
  songs.forEach(s => {
    const y = getYear(s.uploadDate);
    if (!map[y]) map[y] = [];
    map[y].push(s);
  });
  return map;
};

export const groupByMonthYear = (songs) => {
  const map = {};
  songs.forEach(s => {
    const key = getMonthYear(s.uploadDate);
    if (!map[key]) map[key] = [];
    map[key].push(s);
  });
  return map;
};

export const groupByGenre = (songs) => {
  const map = {};
  songs.forEach(s => {
    if (!map[s.genre]) map[s.genre] = [];
    map[s.genre].push(s);
  });
  return map;
};

export const groupByMood = (songs) => {
  const map = {};
  songs.forEach(s => {
    if (!map[s.mood]) map[s.mood] = [];
    map[s.mood].push(s);
  });
  return map;
};

export const groupByLanguage = (songs) => {
  const map = {};
  songs.forEach(s => {
    if (!map[s.language]) map[s.language] = [];
    map[s.language].push(s);
  });
  return map;
};

export const uploadStreak = (songs) => {
  const sorted = [...songs].sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
  let streak = 1, maxStreak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].uploadDate);
    const curr = new Date(sorted[i].uploadDate);
    const diffDays = (curr - prev) / (1000 * 60 * 60 * 24);
    if (diffDays <= 31) { streak++; maxStreak = Math.max(maxStreak, streak); }
    else streak = 1;
  }
  return maxStreak;
};

export const getAchievements = (songs) => {
  const views = totalViews(songs);
  const likes = totalLikes(songs);
  const count = songs.length;
  const best = bestPerforming(songs);
  return [
    { id: 1, title: "First Upload", desc: "Your journey began", unlocked: count >= 1, icon: "🎵", progress: Math.min(count, 1), target: 1 },
    { id: 2, title: "10 Covers", desc: "Building momentum", unlocked: count >= 10, icon: "🔟", progress: Math.min(count, 10), target: 10 },
    { id: 3, title: "25 Covers", desc: "Quarter century of music", unlocked: count >= 25, icon: "💿", progress: Math.min(count, 25), target: 25 },
    { id: 4, title: "50 Covers", desc: "Half a hundred!", unlocked: count >= 50, icon: "🎯", progress: Math.min(count, 50), target: 50 },
    { id: 5, title: "10K Views", desc: "People are listening", unlocked: views >= 10000, icon: "👁️", progress: Math.min(views, 10000), target: 10000 },
    { id: 6, title: "100K Views", desc: "Viral potential", unlocked: views >= 100000, icon: "🔥", progress: Math.min(views, 100000), target: 100000 },
    { id: 7, title: "500K Views", desc: "Half a million eyes", unlocked: views >= 500000, icon: "💎", progress: Math.min(views, 500000), target: 500000 },
    { id: 8, title: "1M Views", desc: "Millionaire status", unlocked: views >= 1000000, icon: "👑", progress: Math.min(views, 1000000), target: 1000000 },
    { id: 9, title: "1000 Likes", desc: "Love is pouring in", unlocked: likes >= 1000, icon: "❤️", progress: Math.min(likes, 1000), target: 1000 },
    { id: 10, title: "10K Likes", desc: "Fan favorite", unlocked: likes >= 10000, icon: "💖", progress: Math.min(likes, 10000), target: 10000 },
    { id: 11, title: "Top Cover", desc: `Best: ${best.title}`, unlocked: best.views >= 30000, icon: "⭐", progress: best.views, target: 50000 },
    { id: 12, title: "Streak Master", desc: "Consistent uploads", unlocked: uploadStreak(songs) >= 5, icon: "📅", progress: uploadStreak(songs), target: 5 },
  ];
};

export const getInsights = (songs) => {
  const byArtist = groupByArtist(songs);
  const byGenre = groupByGenre(songs);
  const byMood = groupByMood(songs);
  const insights = [];

  // Best artist
  const artistPerf = Object.entries(byArtist).map(([a, s]) => ({ artist: a, avgViews: Math.round(totalViews(s) / s.length), count: s.length }));
  artistPerf.sort((a, b) => b.avgViews - a.avgViews);
  if (artistPerf.length > 0) {
    insights.push({ type: 'positive', text: `${artistPerf[0].artist} covers get ${Math.round(((artistPerf[0].avgViews / (artistPerf[1]?.avgViews || artistPerf[0].avgViews)) - 1) * 100)}% more views on average than your other covers.` });
  }

  // Best genre
  const genrePerf = Object.entries(byGenre).map(([g, s]) => ({ genre: g, avgViews: Math.round(totalViews(s) / s.length), count: s.length }));
  genrePerf.sort((a, b) => b.avgViews - a.avgViews);
  if (genrePerf.length > 1) {
    insights.push({ type: 'info', text: `${genrePerf[0].genre} songs perform best with an average of ${formatNumber(genrePerf[0].avgViews)} views.` });
  }

  // Best mood
  const moodPerf = Object.entries(byMood).map(([m, s]) => ({ mood: m, avgSaves: Math.round(totalSaves(s) / s.length) }));
  moodPerf.sort((a, b) => b.avgSaves - a.avgSaves);
  if (moodPerf.length > 0) {
    insights.push({ type: 'positive', text: `${moodPerf[0].mood} songs receive the highest saves — audiences connect deeply with these.` });
  }

  // Upload frequency
  const sorted = [...songs].sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
  const firstDate = new Date(sorted[0].uploadDate);
  const lastDate = new Date(sorted[sorted.length - 1].uploadDate);
  const monthsSpan = Math.max(1, (lastDate - firstDate) / (1000 * 60 * 60 * 24 * 30));
  const freq = (songs.length / monthsSpan).toFixed(1);
  insights.push({ type: 'info', text: `You average ${freq} covers per month. Keep the momentum going!` });

  // Weekend vs weekday
  let weekendViews = 0, weekdayViews = 0, weekendCount = 0, weekdayCount = 0;
  songs.forEach(s => {
    const day = new Date(s.uploadDate).getDay();
    if (day === 0 || day === 6) { weekendViews += s.views; weekendCount++; }
    else { weekdayViews += s.views; weekdayCount++; }
  });
  if (weekendCount > 0 && weekdayCount > 0) {
    const weAvg = weekendViews / weekendCount;
    const wdAvg = weekdayViews / weekdayCount;
    if (weAvg > wdAvg) {
      insights.push({ type: 'positive', text: `Weekend uploads get ${Math.round(((weAvg / wdAvg) - 1) * 100)}% more engagement than weekday uploads.` });
    }
  }

  // Neglected artists
  const allArtists = uniqueArtists(songs);
  allArtists.forEach(a => {
    const last = byArtist[a].sort((x, y) => new Date(y.uploadDate) - new Date(x.uploadDate))[0];
    const daysSince = (new Date() - new Date(last.uploadDate)) / (1000 * 60 * 60 * 24);
    if (daysSince > 180 && byArtist[a].length >= 2) {
      insights.push({ type: 'warning', text: `You haven't uploaded a ${a} cover in ${Math.round(daysSince / 30)} months. Your audience might be missing it.` });
    }
  });

  // Growth
  const firstHalf = songs.slice(0, Math.floor(songs.length / 2));
  const secondHalf = songs.slice(Math.floor(songs.length / 2));
  const firstAvg = totalViews(firstHalf) / firstHalf.length;
  const secondAvg = totalViews(secondHalf) / secondHalf.length;
  const growth = ((secondAvg / firstAvg - 1) * 100).toFixed(0);
  if (growth > 0) {
    insights.push({ type: 'positive', text: `Your average views grew by ${growth}% from your first half to second half of uploads. You're on an upward trend!` });
  }

  return insights;
};
