import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const InteractiveBackground = ({ enabled = true }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 120 };
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

  if (!enabled) return (
    <div className="fixed inset-0 z-0 bg-[#020617] pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.01),transparent_70%)]"></div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden pointer-events-none">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20"></div>
      
      {/* Primary Glow */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          x: '-50%',
          y: '-50%',
        }}
        className="absolute w-[1000px] h-[1000px] bg-white/[0.02] blur-[180px] rounded-full"
      />

      {/* Floating Interactive Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.01, 0.03, 0.01]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bg-white rounded-full blur-[80px]"
          style={{
            width: Math.random() * 400 + 200,
            height: Math.random() * 400 + 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Reactive Dust Particles */}
      {[...Array(15)].map((_, i) => {
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        return (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${initialX}%`,
              top: `${initialY}%`,
              x: useSpring(mouseX, { damping: 50 + i * 2, stiffness: 20 + i }),
              y: useSpring(mouseY, { damping: 50 + i * 2, stiffness: 20 + i }),
            }}
          />
        );
      })}
    </div>
  );
};
