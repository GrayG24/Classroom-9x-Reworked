import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Maximize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SpotifyPlayer = ({ isExpanded = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    title: "NEURAL NETWORK",
    artist: "CYBERPUNK 2077",
    albumArt: "https://picsum.photos/seed/cyberpunk/200/200",
    progress: 45,
    duration: 180
  });

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 backdrop-blur-3xl transition-all duration-700 ${isExpanded ? 'p-8' : 'p-4'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className={`flex items-center gap-6 ${isExpanded ? 'flex-col sm:flex-row' : ''}`}>
        <div className="relative group">
          <div className={`relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:scale-105 ${isExpanded ? 'w-48 h-48 sm:w-32 sm:h-32' : 'w-16 h-16'}`}>
            <img 
              src={currentTrack.albumArt} 
              alt="Album Art" 
              className={`w-full h-full object-cover transition-transform duration-[2000ms] ${isPlaying ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}`}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          </div>
          <div className={`absolute -inset-2 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10 ${isPlaying ? 'animate-pulse' : ''}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Music size={12} className="text-primary animate-pulse" />
          </div>
          
          <h4 className={`font-black text-white uppercase tracking-tighter truncate italic ${isExpanded ? 'text-2xl mb-1' : 'text-sm mb-0.5'}`}>
            {currentTrack.title}
          </h4>
          <p className={`font-black text-white/40 uppercase tracking-widest truncate ${isExpanded ? 'text-xs mb-6' : 'text-[10px]'}`}>
            {currentTrack.artist}
          </p>

          {isExpanded && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_var(--primary-glow)]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${currentTrack.progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-black text-white/20 tabular-nums tracking-widest">
                  <span>0:45</span>
                  <span>3:00</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button className="text-white/40 hover:text-white transition-colors"><SkipBack size={20} /></button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 rounded-full bg-white text-slate-950 flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  >
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                  </button>
                  <button className="text-white/40 hover:text-white transition-colors"><SkipForward size={20} /></button>
                </div>
                <div className="flex items-center gap-4 text-white/40">
                  <Volume2 size={18} />
                  <Maximize2 size={18} className="cursor-pointer hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          )}
        </div>

        {!isExpanded && (
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all group"
          >
            {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
          </button>
        )}
      </div>
    </div>
  );
};
