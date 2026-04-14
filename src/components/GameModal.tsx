import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Star, Shield, Zap, Info } from 'lucide-react';

export const GameModal = ({ game, isFavorite, onToggleFavorite, onClose }) => {
  if (!game) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-8"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-slate-950 border border-white/10 rounded-[3rem] max-w-4xl w-full shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col md:flex-row"
      >
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
          <img 
            src={game.thumbnail} 
            alt={game.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-slate-950"></div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-10 sm:p-14 flex flex-col relative z-10">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] italic">{game.category}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star size={12} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-widest">4.9</span>
              </div>
            </div>
            
            <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none">{game.title}</h2>
            <p className="text-white/30 text-base leading-relaxed font-medium italic mb-8">{game.description}</p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                <Shield size={14} className="text-emerald-500" />
                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest italic">VERIFIED</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                <Zap size={14} className="text-cyan-400" />
                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest italic">HIGH PERFORMANCE</span>
              </div>
            </div>
          </div>
          
          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('play-game', { detail: game }))}
              className="flex-[2] py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-all italic shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3"
            >
              <Play size={16} fill="currentColor" />
              PLAY
            </button>
            <button 
              onClick={() => onToggleFavorite(game.id)} 
              className={`flex-1 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all italic border ${
                isFavorite 
                  ? 'bg-white/10 text-white border-white/20' 
                  : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:text-white'
              } flex items-center justify-center`}
            >
              <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
