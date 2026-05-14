import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { X, GripHorizontal, Music, ExternalLink, Minus, Maximize2 } from 'lucide-react';

export const SpotifyWindow = ({ 
  isOpen, 
  onClose, 
  isFullScreen = false,
  onToggleFullScreen 
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [size, setSize] = useState({ width: 600, height: 750 });
  const constraintsRef = useRef(null);
  const dragControls = useDragControls();

  // If we are in full screen, we are never minimized
  const effectiveMinimized = isMinimized && !isFullScreen;

  // Handle Resizing
  const resizeRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!resizeRef.current) return;
      setSize(prev => ({
        width: Math.max(300, Math.min(window.innerWidth - 48, e.clientX - (window.innerWidth - prev.width - 24))),
        height: Math.max(200, Math.min(window.innerHeight - 100, e.clientY - (window.innerHeight - prev.height - 24)))
      }));
    };
    const handleMouseUp = () => {
      resizeRef.current = false;
      document.body.style.cursor = 'default';
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {!isFullScreen && <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[999]" />}
          <motion.div
            drag={!isFullScreen}
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={constraintsRef}
            initial={{ opacity: 0, scale: 0.9, x: 'calc(100vw - 474px)', y: 'calc(100vh - 624px)' }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: isFullScreen ? 0 : undefined,
              y: isFullScreen ? 0 : undefined,
              height: isFullScreen ? 'calc(100vh - 120px)' : effectiveMinimized ? '64px' : `${size.height}px`,
              width: isFullScreen ? 'calc(100% - 320px)' : effectiveMinimized ? '300px' : `${size.width}px`,
              bottom: isFullScreen ? '40px' : '24px',
              right: isFullScreen ? '40px' : '24px',
              borderRadius: isFullScreen ? '40px' : '32px',
              zIndex: isFullScreen ? 40 : 1000
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bg-black/90 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className={`h-16 shrink-0 px-6 flex items-center justify-between border-b border-white/5 bg-white/5 ${!isFullScreen ? 'cursor-grab active:cursor-grabbing' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/20 overflow-hidden relative">
                   <Music className="text-green-500 w-4 h-4" />
                </div>
                {!effectiveMinimized && (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Spotify Player</span>
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
            <div className={`flex-1 relative transition-all duration-500 ${effectiveMinimized ? 'opacity-0 pointer-events-none' : 'opacity-100 p-2'}`}>
              <iframe 
                key="spotify-persistent-iframe"
                style={{ borderRadius: isFullScreen ? '32px' : '20px' }} 
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM3M" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Player"
                className="bg-black/20 shadow-inner w-full h-full"
              ></iframe>
            </div>

            {/* Resize Handle */}
            {!isFullScreen && !effectiveMinimized && (
              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                  resizeRef.current = true;
                  document.body.style.cursor = 'nwse-resize';
                }}
                className="absolute bottom-0 right-0 w-8 h-8 cursor-nwse-resize flex items-center justify-center z-50 p-2 group"
              >
                <div className="w-1.5 h-1.5 bg-white/20 group-hover:bg-white/50 rounded-full transition-colors" />
                <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-white/20 group-hover:border-white/50 rounded-br-md transition-colors" />
              </div>
            )}

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
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                      <Music size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Active Session</span>
                      <span className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Spotify Playing</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

