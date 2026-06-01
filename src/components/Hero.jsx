import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Shield, Trophy, ChevronRight, Play, Star, Award, Rocket, Ghost, BrainCircuit, Bot } from 'lucide-react';
import { TypewriterText } from './TypewriterText';

export const Hero = ({ user, onBrowseLibrary }) => {
  const isPotatoMode = user?.settings?.performanceMode;
  const messages = React.useMemo(() => [
    "Unblocked and ready for class",
    "Bored in class? We got you.",
    "Fast, simple, and clean.",
    "No more boring lectures.",
    "Defeat the boredom.",
    "Your secret study break.",
    "Ready to play?",
    "King arth likes to sleep",
    "I used AI on my essay - griffin K",
    "bean",
    "sorry for the wait",
    "90 Gen 90 Gen 90 Gen!!",
    "\"everybody\" - wyatt",
    "Grih🥀",
    "want your own quote up here? send me your qoutes and ill add them"
  ], []);

  const welcomeText = "WELCOME";

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 min-h-[60vh] flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
        {!isPotatoMode && <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse"></div>}
      </div>

      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-30 lg:pr-20 text-center lg:text-left"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/5 mb-6 md:mb-10 backdrop-blur-xl"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 italic">
                  <TypewriterText messages={messages} />
                </span>
              </motion.div>
              
              <div className="flex justify-center lg:justify-start items-center gap-x-1 sm:gap-x-2 md:gap-x-3 lg:gap-x-4 mb-4 md:mb-8 w-full overflow-visible whitespace-nowrap">
                {welcomeText.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + charIdx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none italic drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] ${char === ' ' ? 'w-2 sm:w-6' : ''}`}
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
              className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.6em] md:tracking-[1em] italic mb-6 md:mb-12 pl-2"
            >
              REWORKED EDITION
            </motion.div>
            
            <p className="text-lg md:text-xl text-white/30 max-w-xl leading-relaxed mb-8 md:mb-16 font-medium tracking-tight pl-2 mx-auto lg:mx-0">
              The best place for fun and unblocked games. Fast, simple, and full of great games and activities for everyone.
            </p>
            
            <div className="flex flex-wrap gap-4 md:gap-8 items-center justify-center lg:justify-start pl-2">
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 60px rgba(255,255,255,0.3)',
                  backgroundColor: 'rgba(255,255,255,1)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={onBrowseLibrary}
                className="inline-flex items-center justify-center gap-4 whitespace-nowrap text-[10px] md:text-sm font-black transition-all h-16 md:h-20 rounded-full px-12 md:px-16 bg-white/90 text-black uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(255,255,255,0.1)] group italic"
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
            className="relative hidden lg:flex lg:pl-12 min-h-[400px] md:min-h-[600px] items-center justify-center"
          >
            {/* Pulsing Magical Vine Line - Lighter in Potato Mode */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
              {!isPotatoMode ? (
                <svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Connection Line */}
                  <motion.path
                    d="M310 130 C 260 250, 140 100, 110 470"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    animate={{ 
                      opacity: [0.05, 0.2, 0.05],
                      strokeWidth: [1, 2, 1]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    filter="url(#glow)"
                  />
  
                  {/* Flowing Energy Pulse */}
                  <motion.path
                    d="M310 130 C 260 250, 140 100, 110 470"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="80 1200"
                    animate={{ 
                      strokeDashoffset: [1280, -1280],
                      opacity: [0.1, 0.8, 0.1]
                    }}
                    transition={{ 
                      strokeDashoffset: { duration: 4, repeat: Infinity, ease: "linear" },
                      opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    filter="url(#glow)"
                  />
  
                  {/* Particles */}
                  {[...Array(5)].map((_, i) => (
                    <motion.circle
                      key={i}
                      r="1.5"
                      fill="white"
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0.5]
                      }}
                      transition={{ 
                        duration: 3 + i, 
                        repeat: Infinity, 
                        delay: i * 0.8 
                      }}
                    >
                      <animateMotion
                        path="M310 130 C 260 250, 140 100, 110 470"
                        dur={`${6 + i * 2}s`}
                        repeatCount="indefinite"
                      />
                    </motion.circle>
                  ))}
                </svg>
              ) : (
                <svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
                  <path
                    d="M310 130 C 260 250, 140 100, 110 470"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              )}
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
                  <Play size={20} />
                </div>
                <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">UNLIMITED ACCESS</span>
              </div>
              <p className="text-[10px] text-white/30 leading-relaxed font-black uppercase tracking-widest italic">A huge catalog of fun games to fulfill your boredom.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
