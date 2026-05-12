import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { House, Gamepad2, LayoutGrid, Globe, Shield, Palette, Settings as SettingsIcon, User, Users, Music, Key } from 'lucide-react';
import { AppRoute } from '../constants'; // Changed from types to constants
import { FPSCounter } from './FPSCounter';
import { VaporMusicPlayer } from './VaporMusicPlayer';
import { Sidebar } from './Sidebar';

const WaveTransition = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '-100%' }}
        exit={{ y: '-100%' }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] pointer-events-none"
      >
        <div className="absolute inset-0 bg-white" />
        <div className="absolute top-0 inset-x-0 h-48 -translate-y-full">
           <svg viewBox="0 0 800 200" className="w-full h-48 fill-white" preserveAspectRatio="none">
             <path d="M 0 100 C 200 150 600 50 800 100 V 200 H 0 Z" />
           </svg>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

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
  const [showWave, setShowWave] = useState(false);
  const [prevView, setPrevView] = useState(currentView);

  useEffect(() => {
    if (currentView === AppRoute.SUMMER && prevView !== AppRoute.SUMMER) {
      setShowWave(true);
      const timer = setTimeout(() => setShowWave(false), 2000);
      return () => clearTimeout(timer);
    }
    setPrevView(currentView);
  }, [currentView, prevView]);

  const [isVaporMusicOpen, setIsVaporMusicOpen] = useState(false);
  const [isVaporMusicFullScreen, setIsVaporMusicFullScreen] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Use 1600px as the target desktop width for "perfect" fit
      // If screen is smaller, we scale down everything proportionally
      // We only scale between 1024px and 1600px for desktop-ish views
      if (window.innerWidth >= 1024 && window.innerWidth < 1600) {
        setScale(window.innerWidth / 1600);
      } else {
        setScale(1);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleToggle = (e) => {
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

  const isPotatoMode = user?.settings?.performanceMode;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white font-sans relative overflow-x-hidden">
      <WaveTransition isVisible={showWave} />
      {/* Scaling Content Wrapper */}
      <div 
        style={scale !== 1 ? {
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: `${100 / scale}%`,
          marginLeft: `${(1 - 1 / scale) * 50}%`,
        } : {}}
        className="min-h-screen"
      >
        {/* Global Background Effects */}
        {user?.settings?.backgroundEffects && (
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.02),transparent_70%)]"></div>
            
            {!isPotatoMode && (
              <>
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-white/[0.01] rounded-full blur-[80px]"></div>
                <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-white/[0.01] rounded-full blur-[80px]"></div>
              </>
            )}
            
            {/* Subtle Scanline Effect - Disabled in Potato Mode */}
            {!isPotatoMode && (
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
            )}
          </div>
        )}

        {/* Main Content Shell */}
        <main className="relative z-10 min-h-screen transition-all duration-700 ease-[0.22,1,0.36,1] pb-24 lg:pb-0 lg:pl-[88px]">
          <div className="max-w-[140rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={currentView === AppRoute.SUMMER ? { opacity: 0, scale: 1.05, filter: 'brightness(2) blur(20px)' } : { opacity: 0, y: 20, scale: 0.98, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', brightness: 1 }}
                exit={currentView === AppRoute.SUMMER ? { opacity: 0, scale: 0.95, filter: 'brightness(0.5) blur(20px)' } : { opacity: 0, y: -20, scale: 0.98, filter: 'blur(10px)' }}
                transition={{ 
                  duration: currentView === AppRoute.SUMMER ? 1.2 : (isPotatoMode ? 0.3 : 0.6), 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="w-full h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* FIXED HUD ELEMENTS - STAY OUTSIDE SCALING WRAPPER */}
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed top-0 left-0 bottom-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Sidebar 
            user={user}
            currentView={currentView}
            onViewChange={onViewChange}
            onProfileClick={onProfileClick}
          />
        </div>
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

      {/* FPS Widget */}
      {user?.settings?.showFPS && (
        <div key="fps-widget" className={`fixed bottom-6 z-[100] hidden md:block transition-all duration-500 ${user?.isAdmin ? 'right-28' : 'right-6'}`}>
          <FPSCounter />
        </div>
      )}

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
