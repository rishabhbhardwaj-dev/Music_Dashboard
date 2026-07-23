import { motion } from 'framer-motion';
import { Trophy, Lock, CheckCircle2 } from 'lucide-react';
import { songs } from '../data/songs';
import { getAchievements } from '../utils/helpers';

export default function Achievements() {
  const achievements = getAchievements(songs);
  const unlocked = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-2xl font-bold">Achievements</h1>
        <p className="text-sm text-text-secondary mt-1">{unlocked}/{achievements.length} milestones unlocked</p>
      </div>

      {/* Progress bar */}
      <div className="rounded-xl bg-bg-card border border-border p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm text-accent font-semibold">{Math.round(unlocked / achievements.length * 100)}%</span>
        </div>
        <div className="h-2 rounded-full bg-bg-hover overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${(unlocked / achievements.length) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-accent to-rose" />
        </div>
      </div>

      {/* Achievement cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((a, i) => {
          const progress = Math.min((a.progress / a.target) * 100, 100);
          return (
            <motion.div key={a.id}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`card-shine rounded-xl border p-5 transition-all duration-300 ${a.unlocked ? 'bg-bg-card border-accent/20' : 'bg-bg-elevated border-border opacity-60'}`}>
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${a.unlocked ? 'bg-accent/10' : 'bg-bg-hover'}`}>
                  {a.unlocked ? a.icon : <Lock className="w-5 h-5 text-text-muted" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{a.title}</h3>
                    {a.unlocked && <CheckCircle2 className="w-4 h-4 text-green" />}
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">{a.desc}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-text-muted">{a.progress.toLocaleString()} / {a.target.toLocaleString()}</span>
                  <span className="text-[10px] font-medium text-accent">{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-bg-hover overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className={`h-full rounded-full ${a.unlocked ? 'bg-gradient-to-r from-accent to-rose' : 'bg-text-muted'}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
