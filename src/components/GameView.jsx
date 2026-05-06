import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Minimize2, RefreshCw, Shield, Zap, ExternalLink, Share2, Info, Settings } from 'lucide-react';

export const GameView = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Could add a toast here if available
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] bg-black flex flex-col"
    >
      {/* Game Header */}
      <div className="h-16 bg-slate-950 border-b border-white/10 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
            <Zap size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-tighter italic leading-none">{game.title}</h3>
            <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1 italic">{game.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 mr-4">
             <button 
              className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              title="Game Info"
            >
              <Info size={18} />
            </button>
            <button 
              onClick={() => window.open(game.iframeUrl, '_blank')}
              className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              title="Open in New Tab"
            >
              <ExternalLink size={18} />
            </button>
            <button 
              onClick={handleCopyLink}
              className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              title="Share Link"
            >
              <Share2 size={18} />
            </button>
          </div>

          <div className="w-px h-6 bg-white/10 mx-2 hidden md:block"></div>

          <button 
            onClick={() => window.location.reload()}
            className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
            title="Reload Game"
          >
            <RefreshCw size={18} />
          </button>
          <button 
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <div className="w-px h-6 bg-white/10 mx-2"></div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-[0_0_20px_rgba(244,63,94,0.1)]"
            title="Close Game"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Game Iframe */}
      <div className="flex-1 bg-black relative">
        <iframe
          src={game.iframeUrl}
          className="w-full h-full border-none"
          title={game.title}
          allow="autoplay; fullscreen; keyboard"
          referrerPolicy="no-referrer"
        ></iframe>
      </div>
    </motion.div>
  );
};
