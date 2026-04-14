import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, GripHorizontal, Music, ExternalLink, Minus, Maximize2 } from 'lucide-react';

export const VaporMusicPlayer = ({ 
  isOpen, 
  onClose, 
  isFullScreen = false,
  onToggleFullScreen 
}) => {
  const [isMinimized, setIsMinimized] = React.useState(false);

  // If we are in full screen, we are never minimized
  const effectiveMinimized = isMinimized && !isFullScreen;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          drag={!isFullScreen}
          dragMomentum={false}
          dragElastic={0.1}
          dragConstraints={{ 
            left: -(window.innerWidth - (effectiveMinimized ? 300 : 450) - 48), 
            right: 0, 
            top: -(window.innerHeight - (effectiveMinimized ? 64 : 600) - 100), 
            bottom: 0 
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            height: isFullScreen ? 'calc(100vh - 120px)' : effectiveMinimized ? '64px' : '600px',
            width: isFullScreen ? 'calc(100% - 320px)' : effectiveMinimized ? '300px' : '450px',
            bottom: isFullScreen ? '40px' : '24px',
            right: isFullScreen ? '40px' : '24px',
            borderRadius: isFullScreen ? '40px' : '32px',
            zIndex: isFullScreen ? 40 : 1000
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bg-slate-950/90 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className={`h-16 shrink-0 px-6 flex items-center justify-between border-b border-white/5 bg-white/5 ${!isFullScreen ? 'cursor-grab active:cursor-grabbing' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/20 overflow-hidden relative">
                <img 
                  src="https://vaperisveryeducational.dinprima.ro/favicon.ico" 
                  alt="Vapor Music" 
                  className="w-5 h-5 object-contain relative z-10"
                  referrerPolicy="no-referrer"
                  onLoad={(e) => {
                    e.currentTarget.style.display = 'block';
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent && !parent.querySelector('.fallback-icon')) {
                      const icon = document.createElement('div');
                      icon.className = 'text-purple-400 animate-pulse fallback-icon';
                      icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>';
                      parent.appendChild(icon);
                    }
                  }}
                />
              </div>
              {!effectiveMinimized && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Vapor Music Player</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {!isFullScreen && (
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                >
                  {effectiveMinimized ? <Maximize2 size={14} /> : <Minus size={14} />}
                </button>
              )}
              {isFullScreen ? (
                <button 
                  onClick={onToggleFullScreen}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest"
                >
                  <ExternalLink size={12} />
                  <span>Pop Out</span>
                </button>
              ) : (
                !effectiveMinimized && onToggleFullScreen && (
                  <button 
                    onClick={onToggleFullScreen}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                    title="Full Screen"
                  >
                    <Maximize2 size={14} />
                  </button>
                )
              )}
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-destructive hover:bg-destructive/10 transition-all"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className={`flex-1 relative transition-all duration-500 ${effectiveMinimized ? 'opacity-0 pointer-events-none' : 'opacity-100 p-4'}`}>
            <iframe 
              key="vapor-persistent-iframe"
              style={{ borderRadius: isFullScreen ? '32px' : '24px' }} 
              src="https://vaperisveryeducational.dinprima.ro/page/music/" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allowFullScreen={true} 
              loading="lazy"
              title="Vapor Music Player"
              className="bg-black/20 shadow-inner"
            ></iframe>
          </div>

          {/* Minimized View Overlay */}
          <AnimatePresence>
            {effectiveMinimized && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center px-6 pointer-events-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <Music size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Active Session</span>
                    <span className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Playing in background</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
