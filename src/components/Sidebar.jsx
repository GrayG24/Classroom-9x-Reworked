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

  const rawMenuItems = [
    { id: AppRoute.HOME, label: 'Home', icon: House, isReleased: true },
    { id: AppRoute.LIBRARY, label: 'Games', icon: Library, isReleased: true },
    { id: AppRoute.APPS, label: 'Apps', icon: LayoutGrid, isReleased: false },
    { id: AppRoute.CUSTOMIZATION, label: 'Customization', icon: Sparkles, isReleased: false },
    { id: AppRoute.SETTINGS, label: 'Settings', icon: Settings, isReleased: true },
  ];

  const menuItems = rawMenuItems.filter(item => {
    if (user.settings.hideUnreleased && !item.isReleased) return false;
    return true;
  });

  if (user.isAdmin) {
    menuItems.push({ id: AppRoute.ADMIN, label: 'Admin', icon: Shield, color: 'text-rose-500', isReleased: true });
  }

  return (
    <motion.div 
      layout
      onMouseEnter={() => user.settings.sidebarAutoHide && setIsExpanded(true)}
      onMouseLeave={() => user.settings.sidebarAutoHide && setIsExpanded(false)}
      initial={false}
      animate={{ 
        width: isExpanded ? 280 : 88,
        height: isExpanded ? 'calc(100% - 60px)' : 'calc(100% - 130px)',
        x: 20,
        y: isExpanded ? 30 : 65,
      }}
      transition={{ 
        type: "spring", 
        damping: 30, 
        stiffness: 220, 
        mass: 1,
        layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } 
      }}
      className={`fixed left-0 top-0 bg-black/40 backdrop-blur-[40px] border border-white/5 z-50 flex flex-col shadow-[20px_0_100px_rgba(0,0,0,0.6)] ${isExpanded ? 'rounded-[2rem] sidebar-expanded' : 'rounded-[2.5rem] sidebar-collapsed'}`}
    >
      {/* Logo Section */}
      <motion.div layout className="p-6 flex flex-col items-center w-full shrink-0">
        <motion.div 
          layout
          className={`flex items-center gap-4 w-full ${isExpanded ? 'justify-start px-2' : 'justify-center'}`}
        >
          <motion.div 
            layout
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 rounded-xl bg-black border border-white/10 overflow-hidden flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)] shrink-0 group cursor-pointer"
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
                layout
                initial={{ opacity: 0, x: -10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -10, filter: 'blur(8px)' }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col"
              >
                <span className="font-black text-xl text-white tracking-tighter leading-none italic whitespace-nowrap">
                  CLASSROOM <span className="text-white/40">9X</span>
                </span>
                <span className="text-[7px] font-black text-white/30 uppercase tracking-[0.4em] mt-1 italic">UNBLOCKED GAMES</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <motion.nav layout className={`flex-1 px-4 space-y-2 mt-6 ${isExpanded ? 'items-start' : 'items-center'} flex flex-col w-full overflow-y-auto overflow-x-hidden scrollbar-hide`}>
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          const isRed = 'color' in item && item.color === 'text-rose-500';
          
          return (
            <motion.button
              key={item.id}
              layout
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 12 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if ('action' in item && typeof item.action === 'function') {
                  item.action();
                } else {
                  onViewChange(item.id);
                }
              }}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl group relative ${
                isActive 
                  ? `${isRed ? 'bg-rose-500 text-white' : 'bg-white text-black'} shadow-[0_0_40px_rgba(255,255,255,0.15)] font-black italic` 
                  : `${isRed ? 'text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/10' : 'text-white/40 hover:text-white hover:bg-white/5'}`
              } ${!isExpanded ? 'justify-center w-14 h-14 p-0' : ''} proto-rail-link`}
            >
              <motion.div layout className="w-6 h-6 flex items-center justify-center shrink-0 relative z-10 pointer-events-none">
                <item.icon size={20} className={isActive ? (isRed ? 'text-white' : 'text-black') : (isRed ? 'text-rose-500/60 group-hover:text-rose-500' : 'text-white/40 group-hover:text-white')} />
              </motion.div>
              <AnimatePresence mode="popLayout" initial={false}>
                {isExpanded && (
                  <motion.span 
                    key={`${item.id}-label`}
                    layout
                    initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`text-[10px] font-black uppercase tracking-[0.2em] italic relative z-10 whitespace-nowrap pointer-events-none ${isActive ? (isRed ? 'text-white' : 'text-black') : ''}`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </motion.nav>

      {/* Profile Section */}
      <motion.div layout className={`p-4 mt-auto border-t border-white/10 bg-white/[0.02] flex flex-col gap-4 ${isExpanded ? 'items-start' : 'items-center'} w-full shrink-0`}>
        <motion.button 
          layout
          onClick={onProfileClick}
          className={`w-full flex items-center gap-4 p-2 rounded-xl hover:bg-white/5 transition-all group ${!isExpanded ? 'justify-center p-0 w-12 h-12' : ''}`}
        >
          <motion.div layout className="relative shrink-0 flex items-center justify-center">
            <div className={`w-10 h-10 rounded-xl bg-black border border-white/20 overflow-hidden flex items-center justify-center text-white relative z-10 group-hover:scale-105 transition-transform shadow-2xl`}>
              {currentChar.img ? (
                <img src={currentChar.img} alt={currentChar.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <span className="text-lg font-black">{user.username[0]}</span>
              )}
            </div>
          </motion.div>
          <AnimatePresence mode="popLayout" initial={false}>
            {isExpanded && (
              <motion.div 
                key="profile-text"
                layout
                initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col min-w-0"
              >
                <span className="text-[10px] font-black text-white uppercase tracking-tighter truncate italic">{user.username}</span>
                <span className="text-[7px] font-black text-white/30 uppercase tracking-[0.2em] italic">LVL {user.level}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.div layout className={`flex flex-col gap-2 w-full ${isExpanded ? 'px-2' : 'items-center'}`}>
          <motion.div layout className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 ${!isExpanded ? 'w-10 flex-col justify-center h-auto min-h-10 py-2 px-0' : 'w-full'}`}>
            {isExpanded && <motion.div layout className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981] shrink-0" />}
            <AnimatePresence mode="popLayout" initial={false}>
              {isExpanded ? (
                <motion.span 
                  key="expanded-online"
                  layout
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ duration: 0.25 }}
                  className="text-[9px] font-black text-emerald-500 tabular-nums uppercase tracking-widest whitespace-nowrap italic"
                >
                  {onlineCount} ONLINE
                </motion.span>
              ) : (
                <motion.span 
                  key="collapsed-online"
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                  className="text-[8px] font-black text-emerald-500/80 tabular-nums"
                >
                  {onlineCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div layout className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 ${!isExpanded ? 'w-10 justify-center h-10 p-0' : 'w-full'}`}>
            <AnimatePresence mode="popLayout" initial={false}>
              {isExpanded && (
                <motion.div
                  key="expanded-time"
                  layout
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-start"
                >
                  <span className="text-[9px] font-black text-white/60 tabular-nums italic uppercase tracking-widest">
                    {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York' })}
                  </span>
                </motion.div>
              )}
              {!isExpanded && (
                <motion.span 
                  key="collapsed-time"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[8px] font-black text-white/40 tabular-nums text-center"
                >
                   {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).split(' ')[0]}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
