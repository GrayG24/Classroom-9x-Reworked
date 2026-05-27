import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ onComplete, onCosmicEvent }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stage, setStage] = useState('initializing');
  const [isWarping, setIsWarping] = useState(false);
  
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const warpSpeedRef = useRef(1);

  // Setup Starfield Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars only once to avoid jumping positions when effect re-triggers
    if (starsRef.current.length === 0) {
      const starCount = 250;
      const initStars = [];
      const baseW = window.innerWidth || 1200;
      const baseH = window.innerHeight || 800;
      for (let i = 0; i < starCount; i++) {
        initStars.push({
          x: Math.random() * baseW - baseW / 2,
          y: Math.random() * baseH - baseH / 2,
          z: Math.random() * baseW,
          color: `rgba(${200 + Math.random() * 55}, ${220 + Math.random() * 35}, 255, ${0.4 + Math.random() * 0.6})`,
          size: 0.5 + Math.random() * 1.5,
        });
      }
      starsRef.current = initStars;
    }

    // Animation Loop
    const animate = () => {
      // Create a trails look by clearing with semi-transparent background
      const baseAlpha = isWarping ? 0.25 : 0.85;
      ctx.fillStyle = `rgba(3, 4, 7, ${baseAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle background glowing ambiance
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.6
      );
      gradient.addColorStop(0, 'rgba(20, 10, 30, 0.4)');
      gradient.addColorStop(0.5, 'rgba(8, 4, 15, 0.15)');
      gradient.addColorStop(1, 'rgba(2, 2, 4, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Handle Stars
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const currentWarp = warpSpeedRef.current;

      starsRef.current.forEach((star) => {
        // Move star closer
        star.z -= currentWarp * 1.8;

        // Reset star if it gets past screen boundaries
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - cx;
          star.y = Math.random() * canvas.height - cy;
          star.z = canvas.width;
        }

        // Project coordinate 3D -> 2D
        const px = (star.x / star.z) * cx * 2 + cx;
        const py = (star.y / star.z) * cy * 2 + cy;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = (1 - star.z / canvas.width) * star.size * 2;
          
          if (isWarping) {
            // Draw warp lines
            const prevZ = star.z + currentWarp * 4.5;
            const ppx = (star.x / prevZ) * cx * 2 + cx;
            const ppy = (star.y / prevZ) * cy * 2 + cy;

            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(ppx, ppy);
            ctx.strokeStyle = `rgba(220, 235, 255, ${0.1 + (1 - star.z / canvas.width) * 0.5})`;
            ctx.lineWidth = size * 0.6;
            ctx.stroke();
          } else {
            // Draw point star
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.fill();
            
            // Subtle glow for brighter stars
            if (size > 1.8) {
              ctx.shadowBlur = 10;
              ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
              ctx.fillStyle = '#ffffff';
              ctx.fill();
              ctx.shadowBlur = 0; // reset
            }
          }
        }
      });

      // Handle Shooting Stars
      if (Math.random() < 0.003 && shootingStarsRef.current.length < 2 && !isWarping) {
        shootingStarsRef.current.push({
          x: Math.random() * (canvas.width * 0.4),
          y: Math.random() * (canvas.height * 0.3),
          len: 50 + Math.random() * 80,
          dx: 8 + Math.random() * 12,
          dy: 2 + Math.random() * 4,
          life: 1.0,
          color: `rgba(255, 245, 245, 1)`,
        });
        if (onCosmicEvent) {
          try { onCosmicEvent(); } catch (e) {}
        }
      }

      shootingStarsRef.current.forEach((ss, idx) => {
        ctx.beginPath();
        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.len, ss.y - (ss.len * ss.dy / ss.dx));
        grad.addColorStop(0, `rgba(255, 255, 255, ${ss.life})`);
        grad.addColorStop(0.3, `rgba(147, 197, 253, ${ss.life * 0.7})`);
        grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.len, ss.y - (ss.len * ss.dy / ss.dx));
        ctx.stroke();

        // Update shooting star physics
        ss.x += ss.dx;
        ss.y += ss.dy;
        ss.life -= 0.02;

        if (ss.life <= 0 || ss.x > canvas.width || ss.y > canvas.height) {
          shootingStarsRef.current.splice(idx, 1);
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isWarping, onCosmicEvent]);

  // Loading ticker simulator
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2800; // ~2.8s smooth deterministic beautiful progression

    const updateLoader = () => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(1, elapsed / duration);
      
      // Beautiful easeOutCubic curve for visual organic pacing
      const ease = 1 - Math.pow(1 - ratio, 3);
      setProgress(ease * 100);

      if (ratio < 1) {
        requestAnimationFrame(updateLoader);
      } else {
        setProgress(100);
        setStage('ready');
        setTimeout(() => setIsLoaded(true), 150);
      }
    };

    requestAnimationFrame(updateLoader);
  }, []);

  // Handle Konami sequence
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          // Trigger easter egg warp speed
          setIsWarping(true);
          warpSpeedRef.current = 18;
          
          if (onCosmicEvent) {
            try { onCosmicEvent(); } catch (e) {}
          }
          
          setTimeout(() => {
            setIsWarping(false);
            warpSpeedRef.current = 1;
          }, 3500);
          
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCosmicEvent]);

  // Handle keyboard ENTER to submit when fully loaded
  useEffect(() => {
    if (!isLoaded || stage !== 'ready') return;

    const handleEnterPress = (e) => {
      if (e.key === 'Enter') {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleEnterPress);
    return () => window.removeEventListener('keydown', handleEnterPress);
  }, [isLoaded, stage]);

  // Handle stage change of warp when user presses ENTER
  const handleEnter = () => {
    setStage('entering');
    setIsWarping(true);
    
    // Accelerate stars to hyperdrive
    let speed = 1;
    const accelInterval = setInterval(() => {
      speed += 1.5;
      warpSpeedRef.current = Math.min(30, speed);
    }, 30);

    setTimeout(() => {
      clearInterval(accelInterval);
      if (onComplete) onComplete();
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: stage === 'entering' ? 0 : 1,
        filter: stage === 'entering' ? 'blur(20px)' : 'blur(0px)',
      }}
      transition={{ 
        duration: 1.0, 
        ease: [0.16, 1, 0.3, 1]
      }}
      className="fixed inset-0 z-[99999] bg-[#030407] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* 2D Accelerated Ambient Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block z-0 pointer-events-none"
      />

      {/* Cinematic Vignette Inner Frame Shadow */}
      <div className="absolute inset-0 pointer-events-none z-1 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,2,4,0.85)_100%)]" />

      {/* Main Content Layout Container */}
      <div className="relative z-10 w-full max-w-xl px-6 flex flex-col items-center justify-between h-full py-24 pointer-events-none">
        {/* Top Space Filler (to balance beautiful vertical rhythm) */}
        <div className="w-full flex justify-between items-center opacity-40">
          <span className="text-[10px] font-black tracking-[0.4em] text-white/30 italic uppercase">
            UNBLOCKED GAMES
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
        </div>

        {/* Center Title Showcase Section */}
        <div className="flex flex-col items-center gap-12 w-full my-auto">
          <div className="relative flex flex-col items-center">
            {/* Ambient Background Glowing Orb behind title */}
            <div className="absolute -inset-10 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-5xl font-extrabold italic uppercase text-white tracking-[0.25em] font-sans drop-shadow-sm select-none">
                CLASSROOM
              </span>
              <span className="text-4xl md:text-5xl font-black italic uppercase text-white tracking-normal drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] font-sans select-none">
                9X
              </span>
            </div>

            {/* Microscopic Elegance Line */}
            <div className="h-[1px] w-36 bg-gradient-to-r from-transparent via-white/20 to-transparent mt-8" />
          </div>

          {/* Interactive Portal Display Button or Progress */}
          <div className="w-full max-w-xs flex flex-col items-center gap-8 min-h-[100px] justify-center">
            <AnimatePresence mode="wait">
              {!isLoaded ? (
                <motion.div 
                  key="loader-view"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-center gap-3"
                >
                  <div className="w-full flex justify-between items-end px-1">
                    <span className="text-[10px] font-black text-rose-500/70 tracking-[0.3em] uppercase italic animate-pulse">
                      {progress < 40 ? 'SECURE_LINK' : progress < 85 ? 'STABILIZING_MATRIX' : 'READY_TO_LAUNCH'}
                    </span>
                    <span className="text-[11px] font-black text-white/50 tracking-widest font-mono select-none">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  
                  {/* Microscopic Load Meter */}
                  <div className="w-full h-[2px] bg-white/[0.04] relative rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${progress}%` }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full transition-all duration-75 ease-out shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="enter-view"
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-2"
                >
                  <button
                    onClick={handleEnter}
                    disabled={stage === 'entering'}
                    className="pointer-events-auto px-12 py-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-white text-[11px] font-black tracking-[0.4em] uppercase italic transition-all duration-300 hover:bg-white hover:text-[#030407] hover:border-white shadow-[0_0_30px_rgba(255,255,255,0.05)] cursor-pointer active:scale-95 flex items-center justify-center"
                  >
                    ENTER
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Minimalist Spacer */}
        <div className="w-full h-8" />
      </div>
    </motion.div>
  );
};
