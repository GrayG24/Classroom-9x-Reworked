import React, { useState, useEffect } from 'react';
import { House, Library, Sparkles, Settings, Crown, Shield, Ghost, Bot, Star, Cat, Rocket, Clock, User, Users, Trophy, Zap, ChevronRight, LayoutGrid, Search, Menu, X, ZapOff, MessageSquare, Music, Key, Gamepad2, Globe, Palette, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppRoute, CHARACTERS } from '../constants';

export const Sidebar = ({ 
  user, 
  currentView, 
  onViewChange,
  onProfileClick
}) => {
  const [isExpanded, setIsExpanded] = useState(!user.settings.sidebarAutoHide);
  const [time, setTime] = useState(new Date());
  const [onlineCount, setOnlineCount] = useState(1);

  useEffect(() => {
    setIsExpanded(!user.settings.sidebarAutoHide);
  }, [user.settings.sidebarAutoHide]);

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

  const isPotatoMode = user?.settings?.performanceMode;

  const rawMenuItems = [
    { id: AppRoute.HOME, label: 'Home', icon: House, isReleased: true },
    { id: AppRoute.LIBRARY, label: 'Games', icon: Gamepad2, isReleased: true },
    { id: AppRoute.SUMMER, label: 'Summer Countdown', icon: Sun, isReleased: true, accentColor: 'text-orange-400', beachBonus: true },
    { id: AppRoute.APPS, label: 'Apps', icon: LayoutGrid, isReleased: false },
    { id: AppRoute.CUSTOMIZATION, label: 'Customization', icon: Palette, isReleased: false },
    { id: AppRoute.SETTINGS, label: 'Settings', icon: Settings, isReleased: true },
  ];

  const menuItems = rawMenuItems.filter(item => {
    // If Hide Unreleased is enabled, strictly hide items where isReleased is false
    // Only exception: Admin might want to see them if they haven't explicitly asked to hide them, 
    // but the user says it's not working, so let's honor the setting even for admins if it's on.
    if (user.settings.hideUnreleased && item.isReleased === false) return false;
    
    if (user.isAdmin) return true;
    
    return true;
  });

  if (user.isAdmin) {
    menuItems.push({ id: AppRoute.ADMIN, label: 'Admin', icon: Shield, color: 'text-rose-500', isReleased: true });
  }

  return (
    <motion.div 
      onMouseEnter={() => user.settings.sidebarAutoHide && setIsExpanded(true)}
      onMouseLeave={() => user.settings.sidebarAutoHide && setIsExpanded(false)}
      initial={false}
      animate={isPotatoMode ? {} : { 
        width: isExpanded ? 280 : 88,
        height: isExpanded ? 'calc(100vh - 60px)' : '640px',
        maxHeight: isExpanded ? 'calc(100vh - 60px)' : '640px',
        top: isExpanded ? '30px' : 'calc(50% - 320px)',
        x: 20,
        borderRadius: isExpanded ? "2.5rem" : "2.8rem",
        opacity: 1
      }}
      transition={isPotatoMode ? { duration: 0 } : { 
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={isPotatoMode ? {
        width: isExpanded ? 280 : 88,
        height: isExpanded ? 'calc(100vh - 60px)' : '640px',
        maxHeight: isExpanded ? 'calc(100vh - 60px)' : '640px',
        left: 0,
        x: 20,
        top: isExpanded ? '30px' : 'calc(50% - 320px)',
        borderRadius: isExpanded ? "2.5rem" : "2.8rem",
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed'
      } : {}}
      className="fixed left-0 z-50 flex flex-col shadow-[20px_0_100px_rgba(0,0,0,0.2)] bg-black/40 backdrop-blur-[16px] border border-white/5"
    >
      {/* Logo Section */}
      <div className="p-8 pb-4 flex flex-col items-center w-full shrink-0">
        <div 
          className={`flex items-center gap-4 w-full h-16 ${isExpanded ? 'justify-start px-2' : 'justify-center'}`}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`w-12 h-12 rounded-xl border overflow-hidden flex items-center justify-center shrink-0 group cursor-pointer transition-colors ${
              currentView === AppRoute.SUMMER ? 'bg-white border-orange-200' : 'bg-black border-white/10'
            }`}
          >
            <img 
              src="https://1key.lol/images/ui/key-turning.gif" 
              alt="Logo" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <AnimatePresence mode="popLayout" initial={false}>
            {isExpanded && (
              <motion.div 
                key="logo-text"
                initial={{ opacity: 0, x: -10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="flex flex-col overflow-visible pr-8"
              >
                <span className="font-black text-xl tracking-tighter leading-tight italic whitespace-nowrap text-white">
                  CLASSROOM <span className="text-white/40">9X</span>
                </span>
                <span className="text-[7px] font-black uppercase tracking-[0.4em] mt-1 italic text-white/30">UNBLOCKED GAMES</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 px-4 space-y-2 mt-6 ${isExpanded ? 'items-start' : 'items-center'} flex flex-col w-full overflow-y-auto overflow-x-hidden scrollbar-hide`}>
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          const isRed = 'color' in item && item.color === 'text-rose-500';
          const isComingSoon = item.isReleased === false;
          
          return (
            <motion.button
              key={item.id}
              initial={false}
              animate={{
                width: isExpanded ? "100%" : "3.5rem",
                borderRadius: isExpanded ? "1.5rem" : "1.2rem",
                opacity: isComingSoon && !isActive ? 0.6 : 1
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ 
                scale: isComingSoon && !isActive ? 1.01 : 1.04,
                x: isExpanded ? 6 : 0
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!isComingSoon || user.isAdmin) {
                  onViewChange(item.id);
                }
              }}
              className={`h-14 flex items-center relative overflow-hidden transition-all duration-500 ${
                isActive 
                  ? `${isRed ? 'bg-rose-500 text-white shadow-[0_0_30px_rgba(244,63,94,0.3)]' : item.beachBonus ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400 text-yellow-300 shadow-[0_10px_30px_rgba(34,211,238,0.4)] border-b-2 border-yellow-300' : 'bg-white/20 text-white shadow-[0_0_40px_rgba(255,255,255,0.1)] border border-white/20'} font-black italic` 
                  : `${isRed ? 'text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/10' : item.beachBonus ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400 text-yellow-100 shadow-lg border border-white/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`
              } ${isExpanded ? 'px-4' : 'justify-center mx-auto'} ${isComingSoon && !isActive ? 'cursor-not-allowed grayscale' : ''}`}
            >
              {item.beachBonus && (
                 <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                   <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-cyan-400/40 to-transparent blur-sm" 
                   />
                   <motion.div 
                    animate={{ x: [-20, 20, -20], scale: [1, 1.2, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-yellow-400/30 blur-xl" 
                   />
                 </div>
              )}
              <div className={`w-6 h-6 flex items-center justify-center shrink-0 relative z-10 pointer-events-none ${isActive && item.beachBonus ? 'animate-pulse' : ''}`}>
                <item.icon size={20} className={isActive ? (isRed || item.beachBonus ? 'text-inherit' : 'text-inherit') : (isRed ? 'text-rose-500/60 group-hover:text-rose-500' : item.beachBonus ? 'text-yellow-200/80 group-hover:text-yellow-100' : 'text-white/40 group-hover:text-white')} />
              </div>
              <AnimatePresence mode="popLayout" initial={false}>
                  {isExpanded && (
                    <motion.div 
                      key={`${item.id}-label`}
                      initial={{ opacity: 0, x: -15, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: -15, filter: 'blur(4px)' }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="ml-4 flex flex-col items-start relative z-10 whitespace-nowrap pointer-events-none"
                    >
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] italic ${isActive ? (isRed || item.beachBonus ? 'text-inherit' : 'text-inherit') : ''}`}>
                        {item.label}
                      </span>
                      {isComingSoon && !isActive && (
                        <span className="text-[6px] font-black tracking-widest text-white/40 -mt-0.5">COMING SOON</span>
                      )}
                    </motion.div>
                  )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* Profile Section - LUXURY REWORK */}
      <div className={`p-4 mt-auto border-t border-white/10 flex flex-col gap-4 ${isExpanded ? 'items-start' : 'items-center'} w-full shrink-0`}>
        <motion.button 
          onClick={onProfileClick}
          className={`w-full flex items-center transition-all group overflow-hidden relative ${isExpanded ? 'gap-4 p-2.5 rounded-2xl bg-white/[0.03] border border-white/5' : 'justify-center p-0 w-12 h-12 rounded-xl bg-transparent border-transparent'} hover:bg-white/10 hover:border-white/20`}
        >
          {isExpanded && <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>}
          
          <div className="relative shrink-0 flex items-center justify-center z-10">
            <div className={`w-9 h-9 rounded-xl bg-black border border-white/20 overflow-hidden flex items-center justify-center text-white group-hover:scale-105 transition-all duration-500 shadow-2xl`}>
              {currentChar.img ? (
                <img src={currentChar.img} alt={currentChar.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <span className="text-lg font-black">{user.username[0]}</span>
              )}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-black z-20 ${!isExpanded ? 'w-2.5 h-2.5 -bottom-0.5 -right-0.5' : ''}`}></div>
          </div>
          
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div 
                key="profile-text"
                initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col min-w-0 z-10 text-left"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black text-white uppercase tracking-tight truncate italic">{user.username}</span>
                  {user.isAdmin && <Shield size={8} className="text-rose-500" />}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[7px] font-black text-white/30 uppercase tracking-[0.2em] italic leading-none">LVL {user.level}</span>
                  <div className="w-1 h-1 rounded-full bg-white/10"></div>
                  <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest italic leading-none">ONLINE</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              className="ml-auto group-hover:opacity-100 group-hover:translate-x-1 transition-all"
            >
              <ChevronRight size={14} className="text-white" />
            </motion.div>
          )}
        </motion.button>

        <div className={`flex flex-col gap-2 w-full ${isExpanded ? 'px-1' : 'items-center'}`}>
          <div 
            className={`flex items-center transition-all bg-white/[0.02] border border-white/5 shadow-inner ${isExpanded ? 'gap-3 px-3 py-2.5 rounded-xl w-full' : 'w-10 flex-col justify-center h-auto min-h-12 py-2 px-0 rounded-xl'}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isExpanded ? (
                <motion.div 
                  key="expanded-stats"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex flex-col text-left">
                    <span className="text-[7px] font-black text-white/20 uppercase tracking-widest italic mb-0.5">EST TIME</span>
                    <span className="text-[10px] font-black text-white/80 tabular-nums uppercase tracking-tighter italic">
                      {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York' })}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[7px] font-black text-white/20 uppercase tracking-widest italic mb-0.5">ACTIVE</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[10px] font-black text-emerald-500 tabular-nums italic">
                        {onlineCount}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="collapsed-stats"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-[8px] font-black text-white/40 tabular-nums">
                    {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false, timeZone: 'America/New_York' }).split(':')[0]}
                  </span>
                  <div className="w-4 h-px bg-white/5"></div>
                  <span className="text-[8px] font-black text-emerald-500 tabular-nums">{onlineCount}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
