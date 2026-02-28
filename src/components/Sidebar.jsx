import React from 'react';
import { House, Library, Heart, Sword, Car, BrainCircuit, Target, Gamepad2, Zap, Settings, Crown, Sparkles, User, ZapOff, Shield, Ghost, Bot, Star, Cat, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { AppRoute } from '../types.js';
import { CHARACTERS } from '../constants.js';

export const Sidebar = ({ 
  user, 
  currentView, 
  selectedCategoryId,
  onViewChange,
  onProfileClick
}) => {
  const avatarIcons = {
    'agent-x': User,
    'viper': Zap,
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

  const currentChar = CHARACTERS.find(c => c.id === user.currentCharacter) || CHARACTERS[0];
  const CurrentAvatarIcon = avatarIcons[user.currentCharacter || 'agent-x'] || User;
  const menuItems = [
    { id: AppRoute.HOME, label: 'Home Page', icon: House },
    { id: AppRoute.LIBRARY, label: 'Library', icon: Library },
    { id: AppRoute.FAVORITES, label: 'Favorites', icon: Heart },
    { id: AppRoute.CUSTOMIZATION, label: 'Customization', icon: Sparkles },
  ];

  const categories = [
    { id: 'action', label: 'Action', icon: Sword },
    { id: 'driving', label: 'Driving', icon: Car },
    { id: 'puzzle', label: 'Puzzle', icon: BrainCircuit },
    { id: 'sports', label: 'Sports', icon: Target },
    { id: 'classic', label: 'Classics', icon: Gamepad2 },
    { id: 'casual', label: 'Casual', icon: Zap },
  ];

  return (
    <div className="p-4 flex flex-col gap-8 h-full">
      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Menu</p>
        {menuItems.map((item) => (
          <motion.button 
            key={item.id}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${currentView === item.id ? 'bg-[var(--primary)]/10 text-theme' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
          >
            <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-theme' : 'group-hover:text-theme'}`} />
            <span className="font-bold text-sm tracking-tight">{item.label}</span>
            {currentView === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-theme shadow-theme"></div>}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Categories</p>
        {categories.map((cat) => (
          <motion.button 
            key={cat.id}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange(AppRoute.CATEGORY, cat.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${selectedCategoryId === cat.id ? 'bg-[var(--primary)]/10 text-theme' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
          >
            <span className={`${selectedCategoryId === cat.id ? 'text-theme' : 'group-hover:text-theme'} shrink-0 transition-colors`}>
              <cat.icon size={18} />
            </span>
            <span className="font-bold text-sm tracking-tight">{cat.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-auto space-y-4">
        <button 
          onClick={() => onViewChange(AppRoute.SETTINGS)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${currentView === AppRoute.SETTINGS ? 'bg-[var(--primary)]/10 text-theme' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
        >
          <Settings className={`w-5 h-5 ${currentView === AppRoute.SETTINGS ? 'text-theme' : 'group-hover:text-theme'}`} />
          <span className="font-bold text-sm tracking-tight">Settings</span>
        </button>
        
        <div className="px-4 pb-4">
          <button 
            onClick={onProfileClick}
            className="w-full text-left p-5 bg-slate-900/80 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group hover:border-theme/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_var(--primary-glow)] transition-all active:scale-95 duration-500 card-float"
          >
            <div className="absolute inset-0 bg-theme/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-4 relative z-10 mb-3">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-theme/5 flex items-center justify-center text-theme border border-theme/20 shadow-[inset_0_0_10px_var(--primary-glow)] relative z-10 overflow-hidden">
                  {currentChar.img ? (
                    <img src={currentChar.img} alt={currentChar.name} className={`w-full h-full object-cover ${user.currentTheme === 'spongebob' ? 'animate-float' : ''}`} referrerPolicy="no-referrer" />
                  ) : (
                    <CurrentAvatarIcon size={16} />
                  )}
                </div>
                <div className={`absolute inset-0 frame-${user.currentFrame || 'obsidian'} pointer-events-none z-20 opacity-40 group-hover:opacity-100 transition-opacity`}></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Profile</span>
                  <span className="text-[10px] font-black text-theme uppercase">LVL {user.level}</span>
                </div>
                <div className="text-[11px] font-orbitron font-bold text-white uppercase truncate">{user.username}</div>
              </div>
            </div>
            <div className="space-y-2 relative z-10">
              <div className="flex justify-between text-[8px] font-bold text-slate-500 uppercase tracking-wider items-center">
                <span>EXP BAR</span>
                <div className="flex items-center gap-1 font-black">
                  <span className="text-white">{user.level}</span>
                  <span className="text-theme opacity-50">→</span>
                  <span className="text-slate-400">{user.level + 1}</span>
                </div>
              </div>
              <div className="relative h-2 bg-black/60 rounded-full border border-white/5 overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-theme to-white/40 transition-all duration-1000 shadow-[0_0_10px_var(--primary-glow)]"
                  style={{ width: `${Math.min(100, (user.exp / (user.level * 200)) * 100)}%` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] pointer-events-none"></div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
