import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';

export const InteractiveBackground = ({ enabled = true }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 60, mass: 1 };
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
    <div className="fixed inset-0 z-[-3] overflow-hidden pointer-events-none bg-[#02040a]">
      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {/* Base Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050810] to-[#02040a]"></div>
            
            {/* Reactive Light Bloom */}
            <motion.div
              style={{
                left: smoothX,
                top: smoothY,
                x: '-50%',
                y: '-50%',
              }}
              className="absolute w-[100vw] h-[100vw] bg-white/[0.04] blur-[180px] rounded-full mix-blend-screen"
            />
            
            <motion.div
              style={{
                left: smoothX,
                top: smoothY,
                x: '-50%',
                y: '-50%',
              }}
              className="absolute w-[40vw] h-[40vw] bg-white/[0.06] blur-[120px] rounded-full mix-blend-overlay"
            />

            {/* Slow Drifting Distortion Layers */}
            <motion.div
              animate={{
                x: [-100, 100],
                y: [-50, 50],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vh] bg-gradient-radial from-white/[0.03] to-transparent blur-[200px] opacity-40"
            />

            {/* Static Texture Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
            />
            
            {/* Cosmic Floating Dust */}
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 100 + '%', 
                  y: Math.random() * 100 + '%',
                  opacity: 0 
                }}
                animate={{
                  y: [null, (Math.random() - 0.5) * 200 + 'px'],
                  opacity: [0, Math.random() * 0.4 + 0.1, 0]
                }}
                transition={{
                  duration: 15 + Math.random() * 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 10
                }}
                className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
              />
            ))}

            {/* Global Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
