import React from 'react';
import { motion } from 'motion/react';
import { Zap, Shield, Trophy, ChevronRight, Play, Star, Award, Rocket, Ghost, BrainCircuit, Bot } from 'lucide-react';

export const Hero = ({ user, onBrowseLibrary }) => {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-30 lg:pr-20"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/5 mb-10 backdrop-blur-xl"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_white]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50">VOID NETWORK // PROTOCOL 4.5.0</span>
              </motion.div>
              
              <div className="flex justify-center lg:justify-start items-center gap-x-1 sm:gap-x-2 md:gap-x-3 lg:gap-x-4 mb-8 w-full overflow-visible whitespace-nowrap">
                {"CLASSROOM 9X".split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + charIdx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none italic drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] ${char === ' ' ? 'w-3 sm:w-6' : ''}`}
                    style={{
                      backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px), radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
                      backgroundSize: '15px 15px, 25px 25px',
                      backgroundPosition: '0 0, 5px 5px',
                      WebkitBackgroundClip: 'text',
                      textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="text-[10px] font-black text-white/40 uppercase tracking-[1em] italic mb-12 pl-2"
            >
              REWORKED EDITION
            </motion.div>
            
            <p className="text-xl text-white/30 max-w-xl leading-relaxed mb-16 font-medium tracking-tight pl-2">
              The premier unblocked gaming ecosystem. High-performance architecture, social integration, and a curated library of the finest titles.
            </p>
            
            <div className="flex flex-wrap gap-8 items-center pl-2">
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 60px rgba(255,255,255,0.3)',
                  backgroundColor: 'rgba(255,255,255,1)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={onBrowseLibrary}
                className="inline-flex items-center justify-center gap-4 whitespace-nowrap text-sm font-black transition-all h-20 rounded-full px-16 bg-white/90 text-black uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(255,255,255,0.1)] group italic"
              >
                EXPLORE GAME LIBRARY
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden lg:block lg:pl-12 min-h-[600px] flex items-center justify-center"
          >
            {/* Pulsing Magical Vine Line */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <motion.path
                  d="M350 100C300 150 250 50 200 300C150 550 100 450 50 500"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="10 10"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0.1, 0.4, 0.1],
                    strokeWidth: [2, 6, 2],
                    d: [
                      "M350 100C300 150 250 50 200 300C150 550 100 450 50 500",
                      "M350 120C320 170 270 70 220 320C170 570 120 470 70 520",
                      "M350 100C300 150 250 50 200 300C150 550 100 450 50 500"
                    ]
                  }}
                  transition={{ 
                    pathLength: { duration: 3, ease: "easeInOut" },
                    opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    strokeWidth: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    d: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="blur-[3px]"
                />
                <motion.path
                  d="M350 100C300 150 250 50 200 300C150 550 100 450 50 500"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0.3, 0.8, 0.3],
                    d: [
                      "M350 100C300 150 250 50 200 300C150 550 100 450 50 500",
                      "M350 120C320 170 270 70 220 320C170 570 120 470 70 520",
                      "M350 100C300 150 250 50 200 300C150 550 100 450 50 500"
                    ]
                  }}
                  transition={{ 
                    pathLength: { duration: 3, ease: "easeInOut", delay: 0.5 },
                    opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    d: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                {/* Magical Glow Points */}
                {[0.1, 0.3, 0.5, 0.7, 0.9].map((pos, i) => (
                  <motion.circle
                    key={i}
                    r="5"
                    fill="white"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.5, 2, 0.5],
                      filter: ["blur(0px)", "blur(4px)", "blur(0px)"]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity, 
                      delay: i * 0.5,
                      ease: "easeInOut" 
                    }}
                  >
                    <animateMotion
                      path="M350 100C300 150 250 50 200 300C150 550 100 450 50 500"
                      dur="12s"
                      repeatCount="indefinite"
                      rotate="auto"
                      begin={`${i * 2.4}s`}
                    />
                  </motion.circle>
                ))}
              </svg>
            </div>

            {/* Floating Tips */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-48 h-48 rounded-[3rem] bg-black/60 backdrop-blur-3xl border border-white/10 p-8 shadow-2xl flex flex-col items-center justify-center gap-3 z-20"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10">
                <Trophy size={24} />
              </div>
              <span className="text-[9px] font-black text-white uppercase tracking-[0.2em] text-center">TOP RATED GAMES</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-10 w-56 h-56 rounded-[4rem] bg-black/60 backdrop-blur-3xl border border-white/10 p-8 shadow-2xl z-20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10">
                  <Shield size={20} />
                </div>
                <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">SECURE ACCESS</span>
              </div>
              <p className="text-[10px] text-white/30 leading-relaxed font-medium uppercase tracking-wider">End-to-end encryption for all session data and user profiles.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
