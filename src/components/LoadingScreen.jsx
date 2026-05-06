import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Zap, Rocket, Trophy } from 'lucide-react';

export const LoadingScreen = ({ onComplete }) => {
  const [stage, setStage] = useState('singularity'); // singularity, bloom, active, ready
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Stage Transitions
    const timers = [
      setTimeout(() => setStage('bloom'), 1200),
      setTimeout(() => setStage('active'), 2500),
      setTimeout(() => setStage('ready'), 4000),
    ];

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        const diff = 100 - prev;
        const step = Math.max(0.5, diff * 0.1);
        return Math.min(100, prev + step);
      });
    }, 50);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, []);

  const handleEnter = () => {
    setStage('exiting');
    setTimeout(onComplete, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'exiting' ? 0 : 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Ambience & Rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden text-white">
        <motion.div 
          animate={{ 
            opacity: stage === 'singularity' ? 0 : [0.05, 0.15, 0.05],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_60%)]"
        />

        {/* Space Rays */}
        {(stage !== 'singularity') && [...Array(8)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            initial={{ opacity: 0, rotate: i * 45 }}
            animate={{ 
              opacity: [0, 0.1, 0],
              rotate: [i * 45, i * 45 + 15]
            }}
            transition={{ 
              duration: 10 + i, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.8
            }}
            className="absolute top-1/2 left-1/2 w-[200vw] h-[200px] bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-1/2 -translate-y-1/2 origin-center blur-3xl"
          />
        ))}
        
        {/* Distant stars */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: stage === 'singularity' ? 0 : [0.1, Math.random() * 0.9, 0.1],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 2 + Math.random() * 5, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)]"
            style={{
              width: Math.random() * 2.5 + 1 + 'px',
              height: Math.random() * 2.5 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* The Seed / Core */}
      <AnimatePresence mode="wait">
        {stage === 'singularity' && (
          <motion.div
            key="singularity"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: [1, 50], opacity: [1, 0], filter: 'blur(30px)' }}
            transition={{ 
              scale: { duration: 1.5, ease: "easeOut" },
              exit: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_40px_white]"
          />
        )}

        {(stage === 'bloom' || stage === 'active' || stage === 'ready') && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex flex-col items-center w-full px-4"
          >
            {/* Title Reveal - Star Wars Style Perspective */}
            <div className="perspective-[1000px] w-full flex justify-center py-20 overflow-visible">
              <motion.div
                initial={{ 
                  rotateX: 35, 
                  y: 600, 
                  z: -400, 
                  scale: 3,
                  opacity: 0,
                  filter: 'blur(20px)'
                }}
                animate={{ 
                  y: 0, 
                  z: 0, 
                  scale: 1,
                  opacity: 1,
                  filter: 'blur(0px)'
                }}
                transition={{ 
                  duration: 3.5, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="relative mb-16 flex flex-col items-center transform-gpu"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-[-60%] inset-y-[-60%] bg-white/10 blur-[120px] rounded-full pointer-events-none"
                />
                
                <h1 className="text-6xl sm:text-8xl md:text-[11rem] font-black text-white uppercase tracking-tighter italic leading-none text-center relative select-none drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] whitespace-nowrap">
                  CLASSROOM <span className="text-white/10">9X</span>
                </h1>
                
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: stage === 'ready' ? '130%' : '0%' }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                />
              </motion.div>
            </div>

            {/* Status & Progress */}
            <div className="flex flex-col items-center gap-12 group">
              <div className="h-4 overflow-hidden relative w-64 text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={stage}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="text-[10px] font-black text-white/30 uppercase tracking-[0.9em] italic"
                  >
                    {stage === 'bloom' ? "Initializing..." : 
                     stage === 'active' ? "SYNCING DATA..." : "STABLE CONNECTION"}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress Bar - Minimal */}
              <div className="w-56 h-px bg-white/5 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white/60"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              {/* Final Reveal - Enter Button */}
              <div className="h-32 mt-4 flex items-center justify-center">
                <AnimatePresence>
                  {stage === 'ready' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      className="perspective-1000"
                    >
                      <motion.button
                        whileHover={{ 
                          scale: 1.02, 
                          letterSpacing: '1em',
                          backgroundColor: 'rgba(255,255,255,1)',
                          color: 'black',
                          boxShadow: '0 0 70px rgba(255,255,255,0.5)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleEnter}
                        className="px-32 py-8 bg-transparent border border-white/20 text-white font-black text-xs uppercase tracking-[0.8em] italic rounded-full transition-all duration-700 shadow-2xl backdrop-blur-xl group"
                      >
                        <span className="relative z-10">ENTER</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Technical Metadata Overlay */}
      <div className="absolute top-12 left-12 flex flex-col gap-1 font-mono text-[8px] text-white/10 uppercase tracking-widest">
        <span>SYST_INIT_v.2.0.5</span>
        <motion.span
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          // KERNEL STATUS: OPTIMAL
        </motion.span>
      </div>
      
      <div className="absolute bottom-12 right-12 text-white/5 font-black text-[9px] uppercase tracking-[0.4em] italic pointer-events-none">
        DESIGNED FOR THE UNBOUNDED
      </div>

      {/* Decorative Accents */}
      <div className="fixed inset-0 pointer-events-none z-[100]">
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/5 m-12" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/5 m-12" />
      </div>
    </motion.div>
  );
};
