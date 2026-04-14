import React from 'react';
import { motion } from 'motion/react';
import { Shield, Globe, Lock, Search, ChevronRight, Zap, Star, LayoutGrid } from 'lucide-react';

export const ProxyPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-12 text-center space-y-12">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-32 h-32 bg-white/5 rounded-[3rem] flex items-center justify-center border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.05)] relative group"
      >
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <Globe size={56} className="text-white relative z-10 animate-pulse" />
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-black border border-white/20 rounded-xl flex items-center justify-center text-rose-500 shadow-2xl z-20">
          <Lock size={20} />
        </div>
      </motion.div>

      <div className="space-y-6">
        <div className="space-y-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 text-primary"
          >
            <Shield size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">ENCRYPTION LAYER OFFLINE</span>
          </motion.div>
          <h1 className="text-7xl font-black text-white uppercase tracking-tighter italic leading-none">
            PROXY <span className="text-primary">NODE</span>
          </h1>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-white/10"></div>
          <p className="text-sm font-black text-white/40 uppercase tracking-[0.6em] italic">COMING SOON</p>
          <div className="h-px w-16 bg-white/10"></div>
        </div>
      </div>

      <p className="text-white/20 font-medium max-w-lg leading-relaxed uppercase text-[10px] tracking-[0.2em]">
        The secure web tunnel protocol is currently undergoing deep-kernel calibration. 
        Access to the external web through the Sector gateway will be available in the next system update.
      </p>

      <div className="pt-12 grid grid-cols-3 gap-12 opacity-10 grayscale">
        <div className="flex flex-col items-center gap-3">
          <Shield size={28} />
          <span className="text-[9px] font-black uppercase tracking-widest italic">Encrypted</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Lock size={28} />
          <span className="text-[9px] font-black uppercase tracking-widest italic">Anonymous</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Zap size={28} />
          <span className="text-[9px] font-black uppercase tracking-widest italic">High Speed</span>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-1 h-12 bg-gradient-to-b from-primary/40 to-transparent rounded-full"></div>
        <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.5em]">Awaiting Protocol Handshake</span>
      </div>
    </div>
  );
};
