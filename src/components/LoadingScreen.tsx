import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const StarField = ({ isSucking, isBlast, phase }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const particles = React.useRef<any[]>([]);
  const planets = React.useRef<any[]>([]);
  const animationRef = React.useRef<number>();
  const initialized = React.useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    if (!initialized.current) {
      // Create Stars
      particles.current = Array.from({ length: 400 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random(),
        color: '#ffffff',
        vx: 0,
        vy: 0,
        life: 1,
        hasReachedCenter: false
      }));

      // Create Planets
      planets.current = Array.from({ length: 12 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 5,
        speed: Math.random() * 0.2 + 0.05,
        color: `hsl(${Math.random() * 360}, 40%, 60%)`,
        vx: 0,
        vy: 0,
        life: 1,
        hasReachedCenter: false,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        hasRings: Math.random() > 0.7
      }));

      initialized.current = true;
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const drawEntity = (p: any, isPlanet: boolean) => {
        if (phase === 'blast') {
          if (p.vx === 0) {
            const angle = Math.atan2(p.y - centerY, p.x - centerX);
            const force = isPlanet ? (Math.random() * 40 + 25) : (Math.random() * 80 + 50);
            p.vx = Math.cos(angle) * force;
            p.vy = Math.sin(angle) * force;
            p.life = 1;
            p.hasReachedCenter = false;
          }
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.008; // Slower fade for longer blast
          p.size *= isPlanet ? 1.03 : 1.08; // Slower growth
        } else if (isSucking) {
          if (!p.hasReachedCenter) {
            const dx = centerX - p.x;
            const dy = centerY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 5) {
              const force = (isPlanet ? 4 : 8) / (dist / 30 + 1);
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
              p.x += p.vx;
              p.y += p.vy;
              p.vx *= 0.94;
              p.vy *= 0.94;
            } else {
              p.hasReachedCenter = true;
              p.life = 0;
              p.x = centerX;
              p.y = centerY;
            }
          }
        } else {
          p.y += p.speed;
          if (p.y > canvas.height) p.y = 0;
        }

        if (p.life > 0 && (phase === 'blast' || !p.hasReachedCenter)) {
          ctx.save();
          ctx.translate(p.x, p.y);
          if (isPlanet) {
            p.rotation += p.rotationSpeed;
            ctx.rotate(p.rotation);
          }
          
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = (isPlanet ? 0.8 : p.opacity) * p.life;
          
          if (phase === 'blast') {
            ctx.shadowBlur = isPlanet ? 30 : 15;
            ctx.shadowColor = isPlanet ? p.color : '#ffffff';
          }
          
          ctx.fill();

          if (isPlanet && p.hasRings) {
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 2, p.size * 0.5, 0, 0, Math.PI * 2);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          ctx.restore();
        }
      };

      particles.current.forEach(p => drawEntity(p, false));
      planets.current.forEach(p => drawEntity(p, true));

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [phase, isSucking]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'sucking' | 'shaking' | 'collapse' | 'blast' | 'reveal'>('sucking');
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) return 100;
        // Faster at start, slower at end for organic feel
        const remaining = 100 - prev;
        const increment = Math.max(0.1, remaining * 0.02);
        return prev + increment;
      });
    }, 30);

    const timer1 = setTimeout(() => setPhase('shaking'), 3500);
    const timer2 = setTimeout(() => setPhase('collapse'), 5000);
    const timer3 = setTimeout(() => setPhase('blast'), 5300);
    const timer4 = setTimeout(() => setPhase('reveal'), 7500);
    const timer5 = setTimeout(() => setShowButton(true), 9500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const title = "CLASSROOM 9X";

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isExiting ? 0 : 1,
        backgroundColor: phase === 'blast' ? ['#000', '#fff', '#000'] : '#000'
      }}
      transition={{ 
        opacity: { duration: 0.8 },
        backgroundColor: { duration: 0.3 }
      }}
      className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center overflow-hidden"
    >
      <StarField isSucking={phase === 'sucking' || phase === 'shaking' || phase === 'collapse'} isBlast={phase === 'blast'} phase={phase} />
      
      {/* Loading Indicator */}
      {(phase === 'sucking' || phase === 'shaking') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-[100] w-full max-w-md px-12"
        >
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="text-[10px] font-black text-white/40 uppercase tracking-[1em] italic text-center w-full">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                LOADING
              </motion.span>
            </div>
            <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative backdrop-blur-sm">
              <motion.div 
                className="h-full bg-white shadow-[0_0_20px_white]"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Black Hole - Gargantua Style */}
      <AnimatePresence>
        {(phase === 'sucking' || phase === 'shaking' || phase === 'collapse') && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: phase === 'collapse' ? 0.01 : phase === 'shaking' ? 1.2 : 1.0, 
              opacity: 1,
              rotate: phase === 'shaking' ? [0, 2, -2, 0] : 0,
            }}
            transition={phase === 'shaking' ? {
              rotate: { repeat: Infinity, duration: 0.1 },
              scale: { duration: 1 }
            } : phase === 'collapse' ? {
              duration: 0.3,
              ease: "circIn"
            } : { duration: 3, ease: "easeOut" }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute w-[30rem] h-[30rem] flex items-center justify-center z-50 pointer-events-none"
          >
            {/* Accretion Disk */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute w-[250%] h-[10%] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[40px] rotate-[20deg] opacity-70"
            />
            
            {/* Lensing Effect */}
            <motion.div 
              animate={{ 
                rotate: -360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute w-[220%] h-[120%] border-[10px] border-white/10 rounded-[50%] blur-[30px] rotate-[20deg] opacity-30"
            />

            {/* The Singularity */}
            <motion.div 
              animate={{ 
                scale: phase === 'shaking' ? [1, 1.1, 0.9, 1] : 1,
              }}
              transition={{ duration: 0.2, repeat: Infinity }}
              className="relative w-64 h-64 rounded-full bg-black shadow-[0_0_100px_rgba(255,255,255,0.4),inset_0_0_60px_rgba(255,255,255,0.1)] border border-white/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_70%)]"></div>
              <div className="absolute inset-8 rounded-full bg-black shadow-[inset_0_0_40px_rgba(255,255,255,0.2)]"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Supernova Blast Effect */}
      {phase === 'blast' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[100]">
          {/* Core Fireball */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 150, opacity: 0 }}
            transition={{ duration: 2.5, ease: "circOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white blur-[180px]"
          />
          
          {/* Primary Shockwave */}
          <motion.div
            initial={{ scale: 0, opacity: 1, borderWidth: '4px' }}
            animate={{ scale: 250, opacity: 0, borderWidth: '400px' }}
            transition={{ duration: 1.8, ease: "circOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-white"
          />

          {/* Secondary Shockwave */}
          <motion.div
            initial={{ scale: 0, opacity: 0.8, borderWidth: '2px' }}
            animate={{ scale: 300, opacity: 0, borderWidth: '200px' }}
            transition={{ duration: 2.2, delay: 0.1, ease: "circOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-white/50"
          />

          {/* Tertiary Shockwave (Distortion) */}
          <motion.div
            initial={{ scale: 0, opacity: 0.5, borderWidth: '1px' }}
            animate={{ scale: 350, opacity: 0, borderWidth: '100px' }}
            transition={{ duration: 2.8, delay: 0.2, ease: "circOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-white/30 blur-sm"
          />

          {/* Debris Fragments */}
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={`blast-frag-${i}`}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{ 
                x: (Math.random() - 0.5) * 10000, 
                y: (Math.random() - 0.5) * 10000,
                scale: 0,
                opacity: 0,
                rotate: Math.random() * 7200
              }}
              transition={{ duration: 3.0, ease: "circOut", delay: Math.random() * 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white blur-[40px] rounded-full"
            />
          ))}

          {/* Screen Flash - Quick and Sharp */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "linear" }}
            className="absolute inset-0 bg-white z-[110]"
          />
        </div>
      )}

      <motion.div 
        animate={phase === 'blast' ? {
          x: [0, -50, 50, -50, 50, 0],
          y: [0, 50, -50, 50, -50, 0],
        } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-[120] flex flex-col items-center justify-center min-h-screen w-full px-4 select-none"
      >
        {/* Animated Text - FLY OUT FROM CENTER */}
        <div className="flex justify-center items-center gap-x-2 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 mb-12 w-full max-w-[95vw] overflow-visible whitespace-nowrap">
          {title.split("").map((char, charIdx) => (
            <motion.span
              key={charIdx}
              initial={{ 
                opacity: 0, 
                x: 0,
                y: 0,
                scale: 0,
                filter: 'blur(100px)',
                rotate: Math.random() * 720 - 360
              }}
              animate={phase === 'reveal' ? { 
                opacity: 1, 
                x: 0,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                rotate: 0,
                color: '#ffffff',
                textShadow: [
                  '0 0 20px rgba(255,255,255,1)',
                  '0 0 50px rgba(255,255,255,0.8)',
                  '0 0 20px rgba(255,255,255,1)'
                ]
              } : phase === 'blast' ? {
                opacity: 1,
                scale: [0, 5, 2.5],
                x: (charIdx - title.length / 2) * 200,
                y: (Math.random() - 0.5) * 1000,
                filter: 'blur(15px)',
                color: '#ffffff',
                textShadow: '0 0 50px rgba(255,255,255,1)'
              } : {}}
              transition={phase === 'reveal' ? { 
                duration: 3.5, 
                delay: charIdx * 0.12,
                ease: [0.16, 1, 0.3, 1]
              } : {
                duration: 1.2,
                ease: "easeOut"
              }}
              className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white uppercase tracking-tighter italic leading-none ${char === ' ' ? 'w-4 sm:w-8 md:w-12' : ''}`}
              style={{
                textShadow: '0 0 40px rgba(255,255,255,1)',
                WebkitTextStroke: '1px rgba(255,255,255,0.2)'
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {phase === 'reveal' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            className="text-[10px] font-black text-white/40 uppercase tracking-[1em] italic mb-12"
          >
            SYSTEM REBOOT COMPLETE
          </motion.div>
        )}

        {/* Enter Button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="flex flex-col items-center gap-8"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  color: '#000',
                  boxShadow: '0 0 100px rgba(255, 255, 255, 0.9)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="px-32 py-8 border-2 border-white/40 text-white font-black text-lg uppercase tracking-[0.8em] rounded-full transition-all duration-500 italic backdrop-blur-xl relative group overflow-hidden"
              >
                <span className="relative z-10">ENTER</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[8px] text-white/20 tracking-[0.5em] uppercase font-bold"
              >
                Click to initialize system
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
