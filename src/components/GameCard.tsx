import React from 'react';
import { motion } from 'motion/react';
import { Star, Zap, Pin, Play, Users, Trophy } from 'lucide-react';

export const GameCard = ({ game, isPinned, onTogglePin, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative bg-slate-950/40 border border-white/10 rounded-[2rem] overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl transition-all duration-700 hover:border-white/40 hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
    >
      <div className="aspect-[3/4] relative overflow-hidden" onClick={() => onClick(game)}>
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-xl flex items-center gap-2 border border-white/10 shadow-2xl">
            <Star size={12} className="text-white fill-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{game.rating}</span>
          </div>
        </div>

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_40px_rgba(255,255,255,0.4)]">
            <Play size={24} fill="currentColor" className="ml-1" />
          </div>
        </div>
      </div>

      <div className="p-6 bg-black/40 border-t border-white/5" onClick={() => onClick(game)}>
        <h3 className="font-black text-lg text-white uppercase tracking-tighter italic leading-none mb-2 truncate group-hover:text-white transition-colors">{game.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] italic">{game.category || 'ACTION'}</span>
          <div className="flex items-center gap-1.5">
            <Users size={10} className="text-white/20" />
            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.1em] italic">1.2K</span>
          </div>
        </div>
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          onTogglePin(game.id);
        }}
        className={`absolute top-4 right-4 p-3 rounded-xl border transition-all duration-500 z-20 ${
          isPinned 
            ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
            : 'bg-black/60 text-white/40 border-white/10 hover:bg-white/10 hover:text-white opacity-0 group-hover:opacity-100 backdrop-blur-xl'
        }`}
      >
        <Pin size={14} className={isPinned ? 'fill-current' : ''} />
      </button>
    </motion.div>
  );
};
