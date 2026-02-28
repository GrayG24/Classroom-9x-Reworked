import React, { useState, useEffect } from 'react';
import { 
  X, Heart, Maximize2, Play, Info, Star, Share2, Monitor,
  Activity, Shield, Zap, ExternalLink, Gamepad2
} from 'lucide-react';
import { FPSCounter } from './FPSCounter.jsx';

export const GameModal = ({ game, isFavorite, onToggleFavorite, onClose }) => {
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 lg:p-6 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl" onClick={onClose}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--primary),transparent_70%)]"></div>
        </div>
      </div>

      <div className={`relative w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col bg-slate-900 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden ${isTheaterMode ? 'h-full max-w-none rounded-none' : 'max-w-7xl aspect-video rounded-[2rem]'}`}>
        
        <div className="h-16 shrink-0 px-6 flex items-center justify-between bg-slate-950 border-b border-white/5 z-50">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-theme/10 rounded-xl text-theme border border-theme/20">
              <Gamepad2 size={20} />
            </div>
            <div className="flex flex-col">
              <h2 className="font-orbitron font-black text-sm text-white uppercase tracking-widest italic leading-none">{game.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Neural Link Stable</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => onToggleFavorite(game.id)}
              className={`h-10 px-4 rounded-xl border transition-all flex items-center gap-2 active:scale-95 ${isFavorite ? 'bg-rose-500 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'bg-slate-800 border-white/5 text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Favorite</span>
            </button>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-slate-800 border border-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-rose-500 hover:text-white transition-all active:scale-90 group"
            >
              <X size={18} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden relative">
          <div className="flex-1 bg-black relative">
            {!isLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-slate-950">
                <div className="w-16 h-16 border-4 border-theme/20 border-t-theme rounded-full animate-spin mb-6 shadow-[0_0_30px_var(--primary-glow)]"></div>
                <p className="font-orbitron font-black text-theme animate-pulse uppercase tracking-[0.3em] text-[10px]">Initializing Session...</p>
              </div>
            )}
            
            <iframe 
              src={game.iframeUrl} 
              className="w-full h-full border-none relative z-10"
              title={game.title}
              allowFullScreen
            ></iframe>
          </div>

          <div className={`absolute inset-y-0 right-0 w-full md:w-80 bg-slate-950/98 backdrop-blur-3xl border-l border-white/10 z-[60] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${showInfo ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full flex flex-col p-8 overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-orbitron font-black text-lg text-white uppercase tracking-tighter italic">More</h3>
                <button onClick={() => setShowInfo(false)} className="text-slate-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Activity size={14} className="text-theme" />
                    <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Metadata</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Rating</p>
                      <div className="flex items-center gap-1 text-theme">
                        <Star size={10} fill="currentColor" />
                        <span className="text-xs font-orbitron font-bold">{game.rating}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Type</p>
                      <span className="text-xs font-orbitron font-bold text-white uppercase">{game.category}</span>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Gamepad2 size={14} className="text-theme" />
                    <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Controls</h4>
                  </div>
                  <div className="space-y-2">
                    {game.controls ? (
                      Object.entries(game.controls).map(([action, key]) => (
                        <div key={action} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{action}</span>
                          <span className="px-2 py-0.5 bg-slate-900 rounded text-[9px] font-black text-theme border border-theme/20 uppercase">{key}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Standard</span>
                        <span className="px-2 py-0.5 bg-slate-900 rounded text-[9px] font-black text-theme border border-theme/20 uppercase">WASD / SPACE</span>
                      </div>
                    )}
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={14} className="text-theme" />
                    <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Description</h4>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{game.description}</p>
                </section>

                <div className="pt-4 space-y-3">
                  <button 
                    onClick={() => {
                      const win = window.open('about:blank', '_blank');
                      if (win) {
                        win.document.body.style.margin = '0';
                        win.document.body.style.height = '100vh';
                        const iframe = win.document.createElement('iframe');
                        iframe.style.border = 'none';
                        iframe.style.width = '100%';
                        iframe.style.height = '100%';
                        iframe.src = game.iframeUrl;
                        win.document.body.appendChild(iframe);
                      }
                    }}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 border border-white/10 transition-all"
                  >
                    <ExternalLink size={14} />
                    External Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-14 shrink-0 px-6 flex items-center justify-between bg-slate-950 border-t border-white/5 z-50">
          <div className="flex items-center gap-4">
            <FPSCounter className="!bg-transparent !border-none !p-0" />
            <div className="w-px h-4 bg-white/10"></div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Latency: 12ms</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsTheaterMode(!isTheaterMode)}
              className={`h-9 px-4 rounded-xl border transition-all flex items-center gap-2 active:scale-95 ${isTheaterMode ? 'bg-theme border-theme/50 text-slate-950 shadow-theme' : 'bg-slate-800 border-white/5 text-slate-400 hover:text-white'}`}
            >
              <Monitor size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">Expand</span>
            </button>
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className={`h-9 px-4 rounded-xl border transition-all flex items-center gap-2 active:scale-95 ${showInfo ? 'bg-white text-slate-950' : 'bg-slate-800 border-white/5 text-slate-400 hover:text-white'}`}
            >
              <Info size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">More</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
