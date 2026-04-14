import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { House, Gamepad2, LayoutGrid, Globe, Shield, Palette, Settings as SettingsIcon, User, Users, Music, Key } from 'lucide-react';
import { AppRoute } from '../types';
import { FPSCounter } from './FPSCounter';
import { VaporMusicPlayer } from './VaporMusicPlayer';
import { Sidebar } from './Sidebar';

export const Layout = ({ 
  children, 
  onSearch, 
  onSetTheme, 
  currentView, 
  selectedCategoryId,
  onViewChange, 
  onProfileClick,
  user 
}) => {
  const [isVaporMusicOpen, setIsVaporMusicOpen] = useState(false);
  const [isVaporMusicFullScreen, setIsVaporMusicFullScreen] = useState(false);

  useEffect(() => {
    const handleToggle = (e: any) => {
      setIsVaporMusicOpen(true);
      if (e.detail?.fullScreen !== undefined) {
        setIsVaporMusicFullScreen(e.detail.fullScreen);
      } else {
        setIsVaporMusicFullScreen(prev => !prev);
      }
    };
    window.addEventListener('toggle-vapor-music', handleToggle);
    return () => window.removeEventListener('toggle-vapor-music', handleToggle);
  }, []);

  const navItems = [
    { id: AppRoute.HOME, icon: House, label: 'Home' },
    { id: AppRoute.LIBRARY, icon: Gamepad2, label: 'Games' },
    { id: AppRoute.APPS, icon: LayoutGrid, label: 'Apps' },
    { id: AppRoute.CODES, icon: Key, label: 'Codes' },
    { id: AppRoute.PROXY, icon: Globe, label: 'Proxy' },
    { id: AppRoute.CUSTOMIZATION, icon: Palette, label: 'Style' },
    { id: AppRoute.SETTINGS, icon: SettingsIcon, label: 'Config' },
  ];

  if (user?.isAdmin) {
    navItems.push({ id: AppRoute.ADMIN, icon: Shield, label: 'Admin' });
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white overflow-x-hidden font-sans">
      {/* Global Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.03),transparent_70%)]"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-white/[0.02] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-white/[0.02] rounded-full blur-[120px] animate-pulse delay-1000"></div>
        
        {/* Subtle Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed top-0 left-0 bottom-0 z-50">
        <Sidebar 
          user={user}
          currentView={currentView}
          onViewChange={onViewChange}
          onProfileClick={onProfileClick}
        />
      </div>

      {/* Mobile Bottom Navigation (Dock) */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
        <motion.nav 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[32px] p-2 flex items-center justify-around shadow-2xl overflow-x-auto no-scrollbar"
        >
          {navItems.map((item) => (
            <MobileNavItem 
              key={item.id}
              icon={<item.icon size={20} />} 
              label={item.label} 
              active={currentView === item.id} 
              onClick={() => onViewChange(item.id)} 
            />
          ))}
          <MobileNavItem 
            icon={<User size={20} />} 
            label="Profile" 
            active={false} 
            onClick={onProfileClick} 
          />
        </motion.nav>
      </div>

      {/* Main Content Shell */}
      <main className="relative z-10 min-h-screen transition-all duration-500 ease-in-out pb-24 lg:pb-0 lg:pl-20">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {user?.settings?.showFPS && (
                <div key="fps-widget" className={`fixed bottom-6 z-[100] hidden md:block transition-all duration-500 ${user?.isAdmin ? 'right-28' : 'right-6'}`}>
                  <FPSCounter />
                </div>
              )}
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <VaporMusicPlayer 
        isOpen={isVaporMusicOpen} 
        onClose={() => setIsVaporMusicOpen(false)} 
        isFullScreen={isVaporMusicFullScreen}
        onToggleFullScreen={() => setIsVaporMusicFullScreen(!isVaporMusicFullScreen)}
      />
    </div>
  );
};

const MobileNavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`relative flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 min-w-[64px] ${
      active ? 'text-primary' : 'text-white/40 hover:text-white/60'
    }`}
  >
    {active && (
      <motion.div 
        layoutId="mobile-active-pill"
        className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-2xl -z-10"
      />
    )}
    {icon}
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);
