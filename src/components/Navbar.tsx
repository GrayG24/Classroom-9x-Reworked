import React from 'react';
import { Search, Rocket, User as UserIcon, Zap as ZapIcon, Shield, Ghost, Crown, ZapOff, Bot, Star, Cat } from 'lucide-react';
import { CHARACTERS } from '../constants.ts';

export const Navbar = ({ user, onSearch, onLogoClick, onProfileClick }) => {
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
    <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 z-[60] px-4 md:px-8 flex items-center justify-between gap-4">
      <button onClick={onLogoClick} className="flex items-center gap-2 group shrink-0">
        <div className="p-2 bg-[var(--primary)]/10 rounded-lg group-hover:bg-[var(--primary)]/20 transition-colors">
          <Rocket className="text-theme w-5 h-5 md:w-6 md:h-6" />
        </div>
        <span className="font-orbitron font-black text-lg md:text-xl tracking-tighter text-white uppercase italic">
          Classroom<span className="text-theme not-italic">9x</span>
        </span>
      </button>

      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 text-xs md:text-sm transition-all text-slate-200"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <div 
          onClick={onProfileClick}
          className="flex items-center gap-2 md:gap-4 p-1 md:p-1.5 md:pr-4 bg-slate-900/40 rounded-xl md:rounded-2xl border border-white/5 shadow-2xl backdrop-blur-xl group/profile cursor-pointer hover:bg-slate-800/60 transition-all duration-500"
        >
          <div className="relative">
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-slate-950 flex items-center justify-center text-slate-950 font-black text-xs shadow-theme overflow-hidden border border-white/10 group-hover/profile:border-theme/50 transition-colors">
              {currentChar?.img ? (
                <img src={currentChar.img} alt={currentChar.name} className={`w-full h-full object-cover transition-transform duration-700 group-hover/profile:scale-110 ${user.currentTheme === 'spongebob' ? 'animate-float' : ''}`} referrerPolicy="no-referrer" />
              ) : (
                <CurrentAvatarIcon size={18} className="text-theme" />
              )}
            </div>
            <div className={`absolute -inset-1 frame-${user.currentFrame || 'solar'} pointer-events-none scale-110 opacity-70 group-hover/profile:opacity-100 transition-opacity`}></div>
          </div>
          
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-black text-white uppercase tracking-wider leading-none mb-1">{user.username}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-theme uppercase tracking-tighter">{user.level >= 999 ? 'MAX' : `LVL ${user.level}`}</span>
              <div className="w-1 h-1 rounded-full bg-slate-700"></div>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{Math.round((user.exp / (user.level * 200)) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
