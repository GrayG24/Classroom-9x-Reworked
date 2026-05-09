import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';

export const InteractiveBackground = ({ enabled = true }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 80 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none">
      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {/* Neural Interactive Fields */}
            <motion.div
              style={{
                left: smoothX,
                top: smoothY,
                x: '-50%',
                y: '-50%',
              }}
              className="absolute w-[1400px] h-[1400px] bg-white/[0.08] blur-[220px] rounded-full mix-blend-screen opacity-100"
            />
            
            <motion.div
              style={{
                left: smoothX,
                top: smoothY,
                x: '-50%',
                y: '-50%',
              }}
              className="absolute w-[600px] h-[600px] bg-white/[0.1] blur-[100px] rounded-full mix-blend-overlay opacity-80"
            />

            {/* Cinematic Grain & Grit */}
            <div 
              className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
            
            {/* Drifting Nebula Clouds */}
            <motion.div
              animate={{
                x: [-150, 150],
                y: [-80, 80],
                scale: [1, 1.3, 1],
                opacity: [0.08, 0.18, 0.08]
              }}
              transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] h-[160vh] bg-white/[0.04] blur-[250px] rounded-full"
            />

            {/* Micro Dust Particles */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -1200],
                  x: [0, Math.sin(i) * 300],
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 10 + Math.random() * 12,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.4
                }}
                className="absolute w-[2px] h-[2px] bg-white/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `-20px`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
