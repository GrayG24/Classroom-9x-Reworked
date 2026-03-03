import React, { useMemo, useState, useEffect } from 'react';
import { Calendar, Clock, Flame, ChevronRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Hero } from './Hero.jsx';
import { GameCard } from './GameCard.jsx';

export const Home = ({ 
  user, 
  games, 
  dailyPicks,
  favorites, 
  boosts,
  onToggleFavorite, 
  onPlayGame,
  onSwitchToLibrary
}) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const estNow = new Date(now.getTime() + (-5 * 60 * 60 * 1000));
      const estMidnight = new Date(estNow);
      estMidnight.setUTCHours(24, 0, 0, 0);
      
      const diff = estMidnight.getTime() - estNow.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const trendingGames = useMemo(() => games.slice(3, 7), [games]);

  return (
    <div className="space-y-16 md:space-y-32 pb-32 animate-in fade-in duration-1000">
      <Hero user={user} onBrowseLibrary={onSwitchToLibrary} />

      {boosts.length > 0 && (
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 md:px-6"
        >
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/20 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Zap className="animate-pulse" size={20} md:size={24} />
            </div>
            <h2 className="font-orbitron font-bold text-xl md:text-2xl uppercase tracking-tight">Active <span className="text-emerald-500">Boosts</span></h2>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {boosts.map(boost => (
              <motion.div 
                key={boost.id} 
                whileHover={{ scale: 1.05, y: -8, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative px-6 md:px-8 py-4 md:py-6 bg-slate-900/60 border border-emerald-500/30 rounded-[2rem] md:rounded-[2.5rem] flex items-center gap-6 md:gap-8 shadow-2xl overflow-hidden group hover-lift"
              >
                <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors"></div>
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap size={60} md:size={80} className="text-emerald-500" />
                </div>
                
                <div className="flex flex-col relative z-10">
                  <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none mb-2">{boost.name}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl md:text-3xl font-orbitron font-black text-emerald-500 tracking-tighter italic">{boost.multiplier}x</span>
                    <span className="text-[10px] md:text-xs font-black text-emerald-500/60 uppercase">EXP</span>
                  </div>
                </div>
                <div className="w-px h-10 md:h-12 bg-white/10 relative z-10"></div>
                <div className="flex flex-col relative z-10">
                  <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none mb-2">Time</span>
                  <div className="flex items-center gap-2">
                    <Clock size={12} md:size={14} className="text-white/40" />
                    <span className="text-base md:text-lg font-mono font-black text-white uppercase tracking-tight">
                      {Math.max(0, Math.floor((boost.expiresAt - Date.now()) / 60000))}m
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-theme/20 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center text-theme border border-theme/20 shadow-[0_0_20px_var(--primary-glow)]">
              <Calendar className="animate-pulse" size={24} md:size={28} />
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-2xl md:text-4xl uppercase tracking-tight section-header-glow">Daily <span className="text-theme">Picks</span></h2>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4 md:px-6 py-2 md:py-3 bg-slate-900/60 rounded-xl md:rounded-2xl border border-white/5 self-start md:self-auto shadow-2xl">
            <Clock size={14} md:size={16} className="text-theme" />
            <div className="flex flex-col">
              <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Next Rotation:</span>
              <span className="text-xs md:text-sm font-orbitron font-bold text-white tracking-wider">{timeLeft || 'Calculating...'}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {dailyPicks.length > 0 ? dailyPicks.map(game => (
            <GameCard 
              key={game.id}
              game={game}
              isFavorite={favorites.includes(game.id)}
              onToggleFavorite={onToggleFavorite}
              onPlay={onPlayGame}
            />
          )) : (
            <div className="col-span-full text-center py-20 md:py-32 bg-slate-900/40 rounded-[2rem] md:rounded-[3rem] border border-slate-800 border-dashed">
              <p className="text-slate-500 font-orbitron uppercase tracking-widest text-xs md:text-sm">Daily Database Empty</p>
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-theme/20 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center text-theme border border-theme/20">
              <Flame className="animate-bounce" size={24} md:size={28} />
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-2xl md:text-4xl uppercase tracking-tight section-header-glow">Hot <span className="text-theme">Trending</span></h2>
            </div>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            onClick={onSwitchToLibrary} 
            className="text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
          >
            View All
            <ChevronRight size={14} />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trendingGames.length > 0 ? trendingGames.map(game => (
            <GameCard 
              key={game.id}
              game={game}
              isFavorite={favorites.includes(game.id)}
              onToggleFavorite={onToggleFavorite}
              onPlay={onPlayGame}
            />
          )) : (
            <div className="col-span-full text-center py-20 md:py-32 bg-slate-900/40 rounded-[2rem] md:rounded-[3rem] border border-slate-800 border-dashed">
              <p className="text-slate-500 font-orbitron uppercase tracking-widest text-xs md:text-sm">No trending intel found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
