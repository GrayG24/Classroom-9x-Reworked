import React from 'react';
import { Search, Rocket, User as UserIcon, Zap as ZapIcon, Shield, Ghost, Crown, ZapOff, Bot, Star, Cat } from 'lucide-react';
import { CHARACTERS } from '../constants.js';

export const Navbar = ({ user, onSearch, onLogoClick }) => {
  // Avatar Icon Mapping
  const avatarIcons = {
    'agent-x': UserIcon,
    'viper': ZapIcon,
    'ghost': Ghost,
    'phantom': ZapOff,
    'titan': Shield,
    'nova': Star,
    'overlord': Crown,
    'stark': Bot,
    'glitch': ZapOff,
    'spongebob': Star,
    'ye-mask': Star,
    'doge-king': Crown,
    'cyber-samurai': Shield,
    'royal-knight': Shield,
    'neon-cat': Cat,
    'space-ranger': Rocket
  };

  const currentChar = CHARACTERS.find(c => c.id === user.currentCharacter);
  const CurrentAvatarIcon = avatarIcons[user.currentCharacter || 'agent-x'] || UserIcon;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 z-[60] px-4 md:px-8 flex items-center justify-between">
      <button onClick={onLogoClick} className="flex items-center gap-2 group">
        <div className="p-2 bg-[var(--primary)]/10 rounded-lg group-hover:bg-[var(--primary)]/20 transition-colors">
          <Rocket className="text-theme w-6 h-6" />
        </div>
        <span className="font-orbitron font-black text-xl tracking-tighter text-white uppercase italic">
          Classroom<span className="text-theme not-italic">9x</span>
        </span>
      </button>

      <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search for games..." 
          className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 text-sm transition-all text-slate-200"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-xs font-black text-white uppercase tracking-wider">{user.username}</span>
            <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${user.level >= 999 ? 'text-amber-500 animate-pulse' : 'text-theme opacity-70'}`}>
              {user.level >= 999 ? 'MAX LEVEL REACHED' : 'OPERATOR ACTIVE'}
            </span>
          </div>
          
          <div className="flex items-center gap-4 p-1.5 pr-4 bg-slate-900/40 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-xl group/profile cursor-pointer hover:bg-slate-800/60 transition-all duration-500">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-slate-950 flex items-center justify-center text-slate-950 font-black text-xs shadow-theme overflow-hidden border border-white/10 group-hover/profile:border-theme/50 transition-colors">
                {currentChar?.img ? (
                  <img src={currentChar.img} alt={currentChar.name} className={`w-full h-full object-cover transition-transform duration-700 group-hover/profile:scale-110 ${user.currentTheme === 'spongebob' ? 'animate-float' : ''}`} referrerPolicy="no-referrer" />
                ) : (
                  <CurrentAvatarIcon size={20} className="text-theme" />
                )}
              </div>
              <div className={`absolute -inset-1 frame-${user.currentFrame || 'solar'} pointer-events-none scale-110 opacity-70 group-hover/profile:opacity-100 transition-opacity`}></div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-black text-white uppercase tracking-tighter">{user.level >= 999 ? 'MAX' : `LVL ${user.level}`}</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{Math.round((user.exp / (user.level * 200)) * 100)}%</span>
              </div>
              <div className="w-24 h-1.5 bg-black/60 rounded-full overflow-hidden p-[1px] border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 bg-[length:200%_100%] animate-[gold-liquid-pan_3s_linear_infinite] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)] transition-all duration-1000" 
                  style={{ width: user.level >= 999 ? '100%' : `${(user.exp / (user.level * 200)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
