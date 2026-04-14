import React, { useState, useEffect } from 'react';
import { House, Library, Sparkles, Settings, Crown, Shield, Ghost, Bot, Star, Cat, Rocket, Clock, User, Users, Trophy, Zap, ChevronRight, LayoutGrid, Search, Menu, X, ZapOff, MessageSquare, Music, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppRoute, CHARACTERS } from '../constants';

export const Sidebar = ({ 
  user, 
  currentView, 
  onViewChange,
  onProfileClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [time, setTime] = useState(new Date());
  const [onlineCount, setOnlineCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchStatus = () => {
      fetch('/api/system/status')
        .then(res => res.json())
        .then(data => setOnlineCount(data.activeUsers || 1))
        .catch(() => {});
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const currentChar = CHARACTERS.find(c => c.id === user.currentCharacter) || CHARACTERS[0];

  const menuItems = [
    { id: AppRoute.HOME, label: 'Home', icon: House },
    { id: AppRoute.LIBRARY, label: 'Games', icon: Library },
    { id: AppRoute.APPS, label: 'Apps', icon: LayoutGrid },
    { id: AppRoute.FRIENDS, label: 'Social', icon: Users },
    { id: AppRoute.CUSTOMIZATION, label: 'Customization', icon: Sparkles },
    { id: AppRoute.SETTINGS, label: 'Settings', icon: Settings },
  ];

  if (user.isAdmin) {
    menuItems.push({ id: AppRoute.ADMIN, label: 'Admin', icon: Shield, color: 'text-rose-500' });
  }

  return (
    <motion.div 
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      initial={false}
      animate={{ 
        width: isExpanded ? 280 : 88,
        x: 20,
        y: 20,
        height: 'calc(100% - 40px)'
      }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed left-0 top-0 bg-black/60 backdrop-blur-3xl border border-white/10 z-50 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] m-5"
    >
      {/* Logo Section */}
      <div className="p-6 pb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] shrink-0 group cursor-pointer">
            <Zap size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="font-black text-xl text-white tracking-tighter leading-none italic whitespace-nowrap">
                  CLASSROOM <span className="text-white/40">9X</span>
                </span>
                <span className="text-[7px] font-black text-white/30 uppercase tracking-[0.4em] mt-1 italic">ELITE GAMING</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          const isRed = 'color' in item && item.color === 'text-rose-500';
          return (
            <button
              key={item.id}
              onClick={() => {
                if ('action' in item && typeof item.action === 'function') {
                  item.action();
                } else {
                  onViewChange(item.id);
                }
              }}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all group relative overflow-hidden ${
                isActive 
                  ? isRed ? 'bg-rose-500 text-white shadow-[0_0_30px_rgba(244,63,94,0.4)]' : 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]' 
                  : isRed ? 'text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/10' : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="w-6 flex items-center justify-center shrink-0 relative z-10">
                <item.icon size={20} className={isActive ? isRed ? 'text-white' : 'text-black' : isRed ? 'text-rose-500/60 group-hover:text-rose-500 group-hover:scale-110 transition-all' : 'text-white/40 group-hover:text-white group-hover:scale-110 transition-all'} />
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-[11px] font-black uppercase tracking-[0.2em] italic whitespace-nowrap relative z-10"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Profile Section */}
      <div className="p-3 mt-auto border-t border-white/10 bg-white/[0.02]">
        <button 
          onClick={onProfileClick}
          className="w-full flex items-center gap-4 p-2 rounded-xl hover:bg-white/5 transition-all group"
        >
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-xl bg-black border border-white/20 overflow-hidden flex items-center justify-center text-white relative z-10 group-hover:scale-105 transition-transform shadow-2xl">
              {currentChar.img ? (
                <img src={currentChar.img} alt={currentChar.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-black shadow-[0_0_10px_rgba(16,185,129,0.8)] z-20" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-left flex-1 min-w-0"
              >
                <p className="text-[11px] font-black text-white uppercase tracking-tight truncate italic">{user.username}</p>
                <p className="text-[8px] font-black text-white/30 uppercase tracking-widest truncate italic">LVL {user.level}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <div className="flex flex-col gap-2 mt-6 px-2">
          <div className="flex items-center gap-2 px-2 py-2 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981] shrink-0"></div>
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.span 
                  key="expanded-online"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-[9px] font-black text-white/40 tabular-nums uppercase tracking-widest whitespace-nowrap"
                >
                  {onlineCount} ONLINE
                </motion.span>
              ) : (
                <motion.span 
                  key="collapsed-online"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[9px] font-black text-white/40 tabular-nums"
                >
                  {onlineCount}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-2 px-2 py-2 rounded-xl bg-white/[0.03] border border-white/5">
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="shrink-0"
                >
                  <Clock size={10} className="text-white/20" />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.span 
                  key="expanded-time"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-[9px] font-black text-white/40 tabular-nums uppercase tracking-widest whitespace-nowrap"
                >
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/New_York' })}
                </motion.span>
              ) : (
                <motion.span 
                  key="collapsed-time"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-black text-white/40 tabular-nums w-full text-center"
                >
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/New_York' })}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
