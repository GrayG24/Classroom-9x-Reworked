import React from 'react';
import { motion } from 'motion/react';
import { Music, Headphones, Volume2, Sparkles, Disc } from 'lucide-react';

const MusicPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full w-full flex flex-col p-4 md:p-8 space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-theme/20 rounded-xl">
               <Music className="text-theme w-6 h-6" />
             </div>
             <span className="text-[10px] font-black tracking-[0.3em] text-theme uppercase italic">Audio Hub</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic text-white drop-shadow-2xl">
            SPOTIFY
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-[600px] flex flex-col md:flex-row gap-8">
        {/* The Player Iframe Container */}
        <div className="flex-1 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden relative shadow-2xl group p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-theme/10 via-transparent to-transparent opacity-50 pointer-events-none" />
          
          <iframe 
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM3M" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allowFullScreen={true} 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Player"
            className="w-full h-full relative z-10 bg-transparent min-h-[500px] opacity-20 grayscale"
          ></iframe>

          {/* Broken Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center bg-black/40 backdrop-blur-sm">
             <div className="w-20 h-20 bg-rose-500/20 rounded-3xl flex items-center justify-center border border-rose-500/30 mb-6 animate-pulse">
                <Music className="text-rose-500 w-10 h-10" />
             </div>
             <h2 className="text-3xl font-black italic text-white mb-2 uppercase tracking-tighter">APP BROKEN</h2>
             <p className="text-white/40 max-w-sm text-sm font-medium uppercase tracking-widest italic">
                Our Spotify integration is currently experiencing technical difficulties. We apologize for the inconvenience.
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPage;
