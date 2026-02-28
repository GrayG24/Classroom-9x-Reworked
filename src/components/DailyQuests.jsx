import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, Circle, Star, Zap, Trophy, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const DailyQuests = ({ quests, onClaimReward }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-slate-500">
          <Clock size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Resets in: <span className="text-theme">{timeLeft}</span></span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quests.map((quest, index) => (
          <motion.div 
            key={quest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`group relative p-6 rounded-[2rem] border transition-all duration-500 overflow-hidden ${quest.claimed ? 'bg-slate-950/80 border-white/5 opacity-60' : quest.isCompleted ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'bg-slate-900/40 border-white/5 hover:border-theme/30'}`}
          >
            <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-2xl text-[8px] font-black uppercase tracking-[0.2em] z-10 ${
              quest.rarity === 'legendary' ? 'bg-amber-500 text-slate-950' :
              quest.rarity === 'epic' ? 'bg-purple-600 text-white' :
              quest.rarity === 'rare' ? 'bg-blue-600 text-white' :
              'bg-slate-700 text-slate-300'
            }`}>
              {quest.rarity}
            </div>

            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${quest.claimed ? 'bg-slate-800 text-slate-500' : quest.isCompleted ? 'bg-emerald-500/20 text-emerald-500' : 'bg-theme/10 text-theme'}`}>
                  {quest.claimed ? <CheckCircle2 size={20} /> : quest.isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                  {quest.type === 'exp' ? <Zap size={12} className="text-theme" /> : 
                   quest.type === 'rare' ? <Star size={12} className="text-amber-400" /> :
                   <Trophy size={12} className="text-theme" />}
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">
                    {quest.type === 'item' ? quest.rewardItem?.name : `+${quest.reward} ${quest.type === 'exp' ? 'EXP' : 'RARE'}`}
                  </span>
                </div>
              </div>

              <h3 className="font-orbitron font-black text-lg text-white uppercase tracking-tighter mb-2 group-hover:text-theme transition-colors">{quest.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6 flex-1">{quest.description}</p>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <span>{quest.claimed ? 'Completed' : 'Progress'}</span>
                  <span className={quest.claimed ? 'text-slate-500' : quest.isCompleted ? 'text-emerald-500' : 'text-theme'}>{quest.progress} / {quest.target}</span>
                </div>
                <div className="relative h-2 bg-black/40 rounded-full border border-white/5 p-0.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(quest.progress / quest.target) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${quest.claimed ? 'bg-slate-700' : quest.isCompleted ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-theme shadow-[0_0_10px_var(--primary-glow)]'}`}
                  ></motion.div>
                </div>
              </div>

              {quest.isCompleted && !quest.claimed && (
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onClaimReward(quest.id)}
                  className="mt-6 w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  Claim Reward
                </motion.button>
              )}

              {quest.claimed && (
                <div className="mt-6 w-full py-3 bg-slate-800 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest text-center border border-white/5">
                  Reward Claimed
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
