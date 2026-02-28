import React from 'react';
import { Play, Heart, Star, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export const GameCard = ({ game, isFavorite, onToggleFavorite, onPlay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -15, scale: 1.02, rotate: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="group relative bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-theme/30 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] card-float"
      id={`game-card-${game.id}`}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <motion.img 
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>

        {game.isFeatured && (
          <div className="absolute top-5 left-5 z-10">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="px-4 py-1.5 bg-theme text-slate-950 text-[10px] font-black uppercase rounded-xl shadow-[0_0_20px_var(--primary-glow)] flex items-center gap-2"
            >
              <Flame size={12} className="animate-bounce" />
              HOT
            </motion.div>
          </div>
        )}

        <div className="absolute top-5 right-5 z-10 flex flex-col gap-2 translate-x-16 group-hover:translate-x-0 transition-transform duration-500">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(game.id); }}
            className={`p-3 rounded-2xl backdrop-blur-xl border transition-all active:scale-90 ${isFavorite ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.6)] scale-110' : 'bg-slate-950/60 text-white border-white/10 hover:bg-slate-950 hover:border-theme/50 hover:scale-110'}`}
          >
            <Heart size={20} className={`${isFavorite ? 'fill-current animate-pulse' : ''} transition-all`} />
          </button>
        </div>
      </div>

      <div className="p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{game.category}</span>
          </div>
          <div className="flex items-center gap-1.5 text-theme">
            <Star size={14} fill="currentColor" className="drop-shadow-[0_0_5px_var(--primary-glow)]" />
            <span className="text-sm font-black font-orbitron">{game.rating}</span>
          </div>
        </div>
        <h3 className="font-orbitron font-black text-2xl text-white uppercase tracking-tighter group-hover:text-theme transition-colors line-clamp-1 leading-none">{game.title}</h3>
        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity font-medium">{game.description}</p>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onPlay(game)}
          className="w-full py-4 bg-slate-800 hover:bg-theme text-slate-400 hover:text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group/btn shadow-lg btn-hover-effect"
        >
          <Play size={14} fill="currentColor" className="group-hover/btn:scale-110 transition-transform" />
          Play Now
        </motion.button>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-theme to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"></div>
      <button onClick={() => onPlay(game)} className="absolute inset-0 z-0 w-full h-full text-left bg-transparent border-none appearance-none cursor-pointer"></button>
    </motion.div>
  );
};
