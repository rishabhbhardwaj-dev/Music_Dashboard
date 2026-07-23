import { motion } from 'framer-motion';
import { Calendar, Clock, AlertCircle, CheckCircle, Circle, ArrowUpCircle } from 'lucide-react';
import { upcomingCovers } from '../data/songs';

const statusConfig = {
  'Idea': { icon: Circle, color: 'text-text-muted', bg: 'bg-bg-hover' },
  'Planned': { icon: Calendar, color: 'text-blue', bg: 'bg-blue-soft' },
  'In Progress': { icon: ArrowUpCircle, color: 'text-yellow', bg: 'bg-yellow-soft' },
  'Recording': { icon: Clock, color: 'text-accent', bg: 'bg-accent-soft' },
  'Done': { icon: CheckCircle, color: 'text-green', bg: 'bg-green-soft' },
};

const priorityColors = {
  High: 'bg-rose/10 text-rose border-rose/20',
  Medium: 'bg-yellow/10 text-yellow border-yellow/20',
  Low: 'bg-blue/10 text-blue border-blue/20',
};

export default function Upcoming() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-2xl font-bold">Recording Queue</h1>
        <p className="text-sm text-text-secondary mt-1">Your planning board</p>
      </div>

      {/* Kanban-style columns */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {['Idea', 'Planned', 'In Progress', 'Recording', 'Done'].map(status => {
          const config = statusConfig[status];
          const items = upcomingCovers.filter(c => c.status === status);
          return (
            <div key={status} className="space-y-3">
              <div className="flex items-center gap-2">
                <config.icon className={`w-4 h-4 ${config.color}`} />
                <h3 className="text-sm font-semibold">{status}</h3>
                <span className="text-xs text-text-muted">({items.length})</span>
              </div>
              {items.map((c, i) => (
                <motion.div key={c.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card-shine rounded-xl bg-bg-card border border-border p-4 hover:border-accent/20 transition-colors">
                  <h4 className="font-medium text-sm mb-1">{c.songName}</h4>
                  <p className="text-xs text-text-muted mb-3">{c.artist}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${priorityColors[c.priority]}`}>{c.priority}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-text-muted">
                    <Calendar className="w-3 h-3" />
                    {new Date(c.expectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </div>
                  {c.notes && <p className="text-[11px] text-text-muted mt-2 italic">"{c.notes}"</p>}
                </motion.div>
              ))}
              {items.length === 0 && (
                <div className="rounded-xl border border-dashed border-border p-4 text-center">
                  <p className="text-xs text-text-muted">No items</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
