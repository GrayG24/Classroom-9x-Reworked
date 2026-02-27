import React from 'react';
import { 
  Palette, PanelsTopLeft, Eye, Lock, Check, 
  Crown, User, Zap, Ghost, Bot, ZapOff, Sparkles, Star
} from 'lucide-react';
import { CHARACTERS } from '../constants';

interface CustomizationProps {
  user: any;
  onSetTheme: (theme: string) => void;
  onSetFrame: (frame: string) => void;
  onSetBanner: (banner: string) => void;
  onSetCharacter: (char: string) => void;
}

export const Customization: React.FC<CustomizationProps> = ({
  user,
  onSetTheme,
  onSetFrame,
  onSetBanner,
  onSetCharacter
}) => {
  const themes = [
    { id: 'cyan', color: '#22d3ee', name: 'Cyan', level: 1 },
    { id: 'emerald', color: '#34d399', name: 'Emerald', level: 10 },
    { id: 'violet', color: '#a78bfa', name: 'Violet', level: 15 },
    { id: 'cobalt', color: '#3b82f6', name: 'Cobalt', level: 20 },
    { id: 'gold', color: 'linear-gradient(135deg, #FFF7AD, #FFD700, #B8860B)', name: 'Gold', level: 75 },
    { id: 'galaxy', color: 'linear-gradient(135deg, #c084fc, #818cf8, #ec4899)', name: 'Galaxy', level: 100 },
    { id: 'hologram', color: '#00ffff', name: 'Hologram', special: true, isCode: true },
    { id: 'rainbow', color: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)', name: 'Rainbow', special: true, isCode: true },
    { id: 'ironman', color: '#ef4444', name: 'Ironman', isCode: true },
    { id: 'spongebob', color: '#facc15', name: 'Spongebob', isCode: true },
    { id: 'kanye', color: '#d8b4fe', name: 'Graduation', isCode: true },
    { id: 'synthwave', color: '#ff00ff', name: 'Synthwave', isCode: true, special: true },
    { id: 'retrofuture', color: '#f59e0b', name: 'Retro Future', isCode: true, special: true },
    { id: 'tester', color: '#3b82f6', name: 'Tester', isCode: true, special: true },
    { id: 'owner', color: 'linear-gradient(135deg, #facc15, #eab308)', name: 'Owner', isCode: true, special: true },
  ];

  const frames = [
    { id: 'obsidian', name: 'Standard', level: 1 },
    { id: 'default', name: 'Outline', level: 5 },
    { id: 'neon', name: 'Neon Pulse', level: 10 },
    { id: 'solar', name: 'Solar Flare', level: 60 },
    { id: 'interstellar', name: 'Void Drifter', level: 100 },
    { id: 'glitch', name: 'Glitch', isCode: true },
    { id: 'hologram', name: 'Hologram', isCode: true },
    { id: 'deep-sea', name: 'Deep Sea', isCode: true },
    { id: 'diamond', name: 'Diamond', isCode: true },
    { id: 'cyberpunk', name: 'Cyberpunk', isCode: true },
    { id: 'matrix', name: 'Matrix', isCode: true },
    { id: 'tester', name: 'Tester', isCode: true },
    { id: 'owner', name: 'Owner', isCode: true },
  ];

  const characters = CHARACTERS;

  return (
    <div className="space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-theme/10 rounded-[2rem] flex items-center justify-center text-theme border border-theme/20 shadow-[0_0_30px_var(--primary-glow)]">
            <Sparkles size={32} />
          </div>
          <div>
            <h2 className="font-orbitron font-black text-4xl uppercase italic tracking-tighter text-white leading-none">
              Custom<span className="text-theme">ization</span>
            </h2>
            <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-theme animate-pulse"></span>
              Neural Interface Configuration
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-16">
        {/* Avatars Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-slate-900 rounded-2xl text-theme border border-white/5">
              <Eye size={24} />
            </div>
            <h3 className="font-orbitron font-black text-xl uppercase tracking-tight text-white italic">Neural Avatars</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
            {characters.filter(char => !char.isCode || user.unlockedCharacters.includes(char.id)).map(char => {
              const isUnlocked = user.unlockedCharacters.includes(char.id) || char.level <= user.level;
              const isActive = user.currentCharacter === char.id;
              return (
                <button 
                  key={char.id}
                  onClick={() => isUnlocked && onSetCharacter(char.id)}
                  className={`group relative flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border transition-all duration-500 ${isActive ? 'bg-slate-800/80 border-theme shadow-[0_0_40px_var(--primary-glow)]' : 'bg-slate-900/40 border-white/5 hover:border-white/20'} ${!isUnlocked && 'opacity-50 grayscale cursor-not-allowed'} active:scale-95`}
                >
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden ${isActive ? 'bg-theme/10 shadow-[inset_0_0_20px_var(--primary-glow)]' : 'bg-slate-800/50'}`}>
                    {char.img ? (
                      <img src={char.img} alt={char.name} className={`w-full h-full object-cover ${!isUnlocked ? 'opacity-30' : ''} ${user.currentTheme === 'spongebob' && isActive ? 'animate-float' : ''}`} referrerPolicy="no-referrer" />
                    ) : (
                      React.createElement(char.icon, { size: 32, className: isActive ? 'text-theme' : 'text-slate-400' })
                    )}
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                        <Lock size={24} className="text-white" />
                        <span className="text-[9px] font-black text-white uppercase">LVL {char.level}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <span className={`text-[10px] font-orbitron font-black tracking-tight block truncate w-full max-w-[100px] uppercase italic ${isActive ? 'text-theme' : 'text-slate-400'}`}>{char.name}</span>
                    <div className="mt-2 flex items-center justify-center gap-1.5 min-h-[12px]">
                      {isActive ? (
                        <span className="text-[8px] font-black text-theme uppercase tracking-widest">Active</span>
                      ) : isUnlocked ? (
                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Unlocked</span>
                      ) : (
                        <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest">Locked</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Frames Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-slate-900 rounded-2xl text-theme border border-white/5">
              <PanelsTopLeft size={24} />
            </div>
            <h3 className="font-orbitron font-black text-xl uppercase tracking-tight text-white italic">Neural Frames</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
            {frames.filter(frame => !frame.isCode || user.unlockedFrames.includes(frame.id)).map(frame => {
              const isUnlocked = user.unlockedFrames.includes(frame.id) || frame.level <= user.level;
              const isActive = user.currentFrame === frame.id;
              return (
                <button 
                  key={frame.id}
                  onClick={() => isUnlocked && onSetFrame(frame.id)}
                  className={`group relative flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border transition-all duration-500 ${isActive ? 'bg-slate-800/80 border-theme shadow-[0_0_40px_var(--primary-glow)]' : 'bg-slate-900/40 border-white/5 hover:border-white/20'} ${!isUnlocked && 'opacity-50 grayscale cursor-not-allowed'} active:scale-95`}
                >
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center relative ${isActive ? 'bg-theme/10' : 'bg-slate-800/50'}`}>
                    {isUnlocked ? (
                      <div className="relative w-12 h-12">
                        <div className="absolute inset-0 bg-slate-700/50 rounded-full flex items-center justify-center text-slate-500">
                          <User size={20} />
                        </div>
                        <div className={`absolute inset-0 frame-${frame.id} pointer-events-none opacity-100`}></div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Lock size={24} className="text-slate-600" />
                        <span className="text-[9px] font-black text-slate-500">LVL {frame.level}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <span className={`text-[10px] font-orbitron font-black tracking-tight block truncate w-full max-w-[100px] uppercase italic ${isActive ? 'text-theme' : 'text-slate-400'}`}>{frame.name}</span>
                    <div className="mt-2 flex items-center justify-center gap-1.5 min-h-[12px]">
                      {isActive ? (
                        <span className="text-[8px] font-black text-theme uppercase tracking-widest">Active</span>
                      ) : isUnlocked ? (
                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Unlocked</span>
                      ) : (
                        <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest">Locked</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Themes Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-slate-900 rounded-2xl text-theme border border-white/5">
              <Palette size={24} />
            </div>
            <h3 className="font-orbitron font-black text-xl uppercase tracking-tight text-white italic">Visual Themes</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
            {themes.filter(theme => !theme.isCode || user.unlockedThemes.includes(theme.id)).map(theme => {
              const isUnlocked = user.unlockedThemes.includes(theme.id) || theme.level <= user.level;
              const isActive = user.currentTheme === theme.id;
              return (
                <button 
                  key={theme.id}
                  onClick={() => isUnlocked && onSetTheme(theme.id)}
                  className={`group relative flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border transition-all duration-500 ${isActive ? 'bg-slate-800/80 border-theme shadow-[0_0_40px_var(--primary-glow)]' : 'bg-slate-900/40 border-white/5 hover:border-white/20'} ${!isUnlocked && 'opacity-50 grayscale cursor-not-allowed'} active:scale-95`}
                >
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden ${isActive ? 'bg-theme/10 shadow-[inset_0_0_20px_var(--primary-glow)]' : 'bg-slate-800/50'}`}>
                    {isUnlocked ? (
                      <div className="w-12 h-12 rounded-xl shadow-2xl flex items-center justify-center text-white/50" style={{ background: theme.color }}>
                        <Palette size={20} />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Lock size={24} className="text-slate-600" />
                        <span className="text-[9px] font-black text-slate-500">LVL {theme.level}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <span className={`text-[10px] font-orbitron font-black tracking-tight block truncate w-full max-w-[100px] uppercase italic ${isActive ? 'text-theme' : 'text-slate-400'}`}>{theme.name}</span>
                    <div className="mt-2 flex items-center justify-center gap-1.5 min-h-[12px]">
                      {isActive ? (
                        <span className="text-[8px] font-black text-theme uppercase tracking-widest">Active</span>
                      ) : isUnlocked ? (
                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Unlocked</span>
                      ) : (
                        <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest">Locked</span>
                      )}
                    </div>
                  </div>
                  {theme.special && isUnlocked && (
                    <div className="absolute top-2 right-2">
                      <Zap size={12} className="text-theme animate-pulse" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
