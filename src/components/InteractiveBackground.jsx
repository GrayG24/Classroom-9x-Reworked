import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';

export const InteractiveBackground = ({ enabled = true, user }) => {
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

    const isPotatoMode = user?.settings?.performanceMode;

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
              
              {/* Reactive Light Bloom - Simplified in Potato Mode */}
              {!isPotatoMode && (
                <>
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
                </>
              )}
  
              {/* Slow Drifting Distortion Layers - Disabled in Potato Mode */}
              {!isPotatoMode && (
                <motion.div
                  animate={{
                    x: [-100, 100],
                    y: [-50, 50],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vh] bg-gradient-radial from-white/[0.03] to-transparent blur-[200px] opacity-40"
                />
              )}
  
              {/* Static Texture Overlay - Simplified/Lighter opacity and removed heavy fractal filter */}
              <div 
                className={`absolute inset-0 mix-blend-overlay pointer-events-none opacity-[0.03]`}
                style={{ 
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
                  backgroundSize: '48px 48px'
                }}
              />
              
              {/* Cosmic Floating Dust - Reduced count for smoothness */}
              {!isPotatoMode && [...Array(15)].map((_, i) => (
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
