import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Star, Trophy, Rocket } from 'lucide-react';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        const diff = 100 - prev;
        const step = Math.max(0.5, diff * 0.15);
        return Math.min(100, prev + step);
      });
    }, 40);

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onComplete, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-[#020617] z-[9999] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [null, Math.random() * -100 - 50],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute text-white/10"
          >
            {i % 4 === 0 ? <Star size={24} /> : i % 4 === 1 ? <Zap size={24} /> : i % 4 === 2 ? <Trophy size={24} /> : <Rocket size={24} />}
          </motion.div>
        ))}
      </div>

      {/* Center Piece */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-12"
        >
          <div className="absolute -inset-10 bg-white/5 blur-[80px] rounded-full"></div>
          <h1 className="text-7xl sm:text-9xl font-black text-white uppercase tracking-tighter italic leading-none text-center relative z-10">
            CLASSROOM <span className="text-white/20">9X</span>
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute -bottom-4 left-0 h-2 bg-gradient-to-r from-transparent via-white to-transparent"
          />
        </motion.div>

        {/* Fun Loading Text */}
        <div className="h-6 mb-8">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.8em] italic">
            {progress < 30 ? "Getting things ready..." : 
             progress < 60 ? "Loading the fun stuff..." : 
             progress < 90 ? "Just a few more seconds..." : "Ready to play"}
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-80 h-1.5 bg-white/5 rounded-full overflow-hidden mb-16 relative border border-white/5">
          <motion.div
            className="absolute inset-y-0 left-0 bg-white shadow-[0_0_20px_white]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Enter Button */}
        <div className="h-24 flex items-center justify-center">
          <AnimatePresence>
            {isReady && (
              <motion.button
                initial={{ opacity: 0, y: 30, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, scale: 1.1, filter: 'blur(10px)' }}
                whileHover={{ scale: 1.05, letterSpacing: '0.8em' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="px-20 py-6 bg-white text-black font-black text-sm uppercase tracking-[0.6em] italic rounded-2xl shadow-[0_30px_60px_rgba(255,255,255,0.1)] transition-all"
              >
                ENTER
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Accents */}
      <div className="absolute bottom-12 left-12 flex gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-white/10" />
        ))}
      </div>
      <div className="absolute top-12 right-12 text-white/10 font-black text-[10px] uppercase tracking-widest italic">
        CLASSROOM 9X // OFFICIAL
      </div>
    </motion.div>
  );
};
