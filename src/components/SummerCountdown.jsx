import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, Palmtree, Shell } from 'lucide-react';

const SummerCountdown = ({ user }) => {
  const isPotatoMode = user?.settings?.performanceMode === true;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [meltProgress, setMeltProgress] = useState(0);

  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // June 5th, 2026 at 11:50 AM EDT
      const targetDate = new Date('2026-06-05T11:50:00-04:00');
      const now = new Date();
      const difference = targetDate - now;

      // For melting logic: assume summer countdown starts May 1st
      const startDate = new Date('2026-05-01T00:00:00-04:00');
      const totalDuration = targetDate - startDate;
      const elapsed = now - startDate;
      const progress = Math.max(0, Math.min(1, elapsed / totalDuration));
      setMeltProgress(progress);

      if (difference <= 0) {
        setIsFinished(true);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      } else {
        setIsFinished(false);
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Days', value: timeLeft.days, color: 'from-rose-400 to-rose-600', dripColor: '#e11d48' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-orange-400 to-orange-600', dripColor: '#ea580c' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-yellow-300 to-yellow-500', dripColor: '#ca8a04' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-cyan-400 to-cyan-600', dripColor: '#0891b2' }
  ];

  return (
    <div className="min-h-screen bg-[#fdf5e6] overflow-hidden relative font-sans">
      {/* Sky Section */}
      <div className="absolute top-0 inset-x-0 h-[65vh] bg-gradient-to-b from-[#0e7490] via-[#0ea5e9] to-[#7dd3fc]">
        {!isPotatoMode && <SunBeams />}
        <Sun isPotatoMode={isPotatoMode} />
        
        {/* Clouds */}
        <FloatingCloud delay={0} top="10%" left="5%" scale={1.2} />
        {!isPotatoMode && <FloatingCloud delay={5} top="20%" left="30%" scale={0.7} />}
        <FloatingCloud delay={2} top="15%" right="15%" scale={1.4} />
      </div>

      {/* Ocean & Beach Section - Fixed positioning */}
      <div className="absolute bottom-0 inset-x-0 h-[45vh] z-10">
        {/* Unified High-Detail Ocean & Sand Mix */}
        <div className="h-full bg-gradient-to-b from-[#0ea5e9]/95 via-[#06b6d4]/60 to-[#fde1aa] relative overflow-hidden">
          {!isPotatoMode && <WaterSparkles />}
          {!isPotatoMode && <WaterCaustics />}
          {/* Wave System - Placed BEHIND palm trees */}
          <div className="absolute top-0 inset-x-0 h-64 -mt-32 pointer-events-none overflow-hidden z-20">
            <Wave color="rgba(255,255,255,0.4)" duration={10} delay={0} scale={1.4} height={140} foam={!isPotatoMode} />
            <Wave color="rgba(103,232,249,0.3)" duration={15} delay={-2} scale={1.3} height={120} />
            {!isPotatoMode && <Wave color="rgba(14,165,233,0.2)" duration={20} delay={-5} scale={1.2} height={100} />}
          </div>

          {/* Ocean Elements - Positioned strictly within the blue zone */}
          <SharkFin bottom="75%" left="15%" delay={1} isPotatoMode={isPotatoMode} />
          {!isPotatoMode && <SharkFin bottom="85%" right="25%" delay={4} isPotatoMode={isPotatoMode} />}

          {/* Realistic Textured Sand Layer */}
          <div className="absolute bottom-0 inset-x-0 h-[65%] bg-[#fde1aa] shadow-[inset_0_40px_80px_rgba(0,0,0,0.15)] z-20">
             {/* Sand Texture - Micro-noise and shading */}
             <div className="absolute inset-0 opacity-60 pointer-events-none" 
                  style={{ 
                    backgroundImage: 'radial-gradient(#d9b38c 0.8px, transparent 0)', 
                    backgroundSize: '8px 8px' 
                  }} />
             <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-t from-black/5 to-transparent" />
             
             {/* Visual element placeholder */}
             <div className="absolute bottom-6 md:bottom-12 inset-x-0 flex justify-center opacity-10 pointer-events-none z-40 px-4">
                <div className="w-12 h-1 bg-[#8b4513]/20 rounded-full" />
             </div>

             {/* Scattered Elements */}
             <BeachShell bottom="25%" left="15%" rotate={45} />
             <BeachShell bottom="40%" left="55%" rotate={-20} />
             <BeachShell bottom="50%" right="25%" rotate={110} />
             {!isPotatoMode && <BeachShell bottom="20%" right="40%" rotate={10} />}
          </div>
        </div>
      </div>

      {/* Realistic Palmtrees - Pushed further to edges to clear text */}
      <div className="absolute inset-x-0 bottom-0 top-0 z-20 pointer-events-none overflow-hidden">
         <DetailedPalmtree bottom="0%" left="-20%" scale={0.7} className="md:scale-[1.1] lg:scale-[1.6]" />
         <DetailedPalmtree bottom="2%" right="-15%" scale={0.6} className="md:scale-[1.0] lg:scale-[1.4]" flip />
      </div>

      {/* Main Content Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-40 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pb-[10vh] pt-24 md:pt-16"
      >
        <AnimatePresence mode="wait">
          {isFinished ? (
            <motion.div
              key="finished"
              initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              className="text-center bg-white/20 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[4rem] border-4 border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.2)] max-w-4xl mx-auto"
            >
              <h1 className="text-[40px] md:text-[90px] font-black text-white italic tracking-tighter leading-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
                SUMMER BREAK <br/> IS HERE!
              </h1>
              <div className="h-1.5 md:h-2 w-24 md:w-32 bg-yellow-300 rounded-full mx-auto my-6 md:my-8" />
              <p className="text-[18px] md:text-[40px] font-black text-white/90 italic drop-shadow-lg leading-tight uppercase tracking-wider">
                Enjoy your summer <br/> away from school!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center w-full max-w-7xl mx-auto"
            >
              <div className="text-center mb-8 md:mb-12">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <h1 className="text-[40px] md:text-[110px] font-black text-white italic tracking-tighter leading-[0.8] drop-shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
                    SUMMER <br/> <span className="text-white text-[30px] md:text-[110px]">VACATION</span>
                  </h1>
                  <div className="h-1 md:h-2 w-32 md:w-64 bg-yellow-300/60 rounded-full mt-4 md:mt-8 blur-sm" />
                  <p className="text-white font-black uppercase tracking-[0.2em] md:tracking-[0.8em] text-[10px] md:text-base mt-2 md:mt-4 leading-relaxed max-w-xl text-center px-4">
                    The closer summer break gets,<br/>the more the popsicles melt
                  </p>
                </motion.div>
              </div>

              {/* Detailed Popsicle Countdown - Responsive layout */}
              <div className="flex flex-wrap md:flex-nowrap justify-center items-end gap-4 md:gap-16">
                {stats.map((stat, i) => (
                  <Popsicle 
                    key={stat.label} 
                    stat={stat} 
                    index={i} 
                    meltProgress={meltProgress}
                    isPotatoMode={isPotatoMode}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const SunBeams = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ 
          duration: 5 + Math.random() * 5, 
          repeat: Infinity, 
          delay: Math.random() * 10 
        }}
        className="absolute top-12 right-12 md:top-24 md:right-24 h-[200vh] w-[1px] bg-white origin-top"
        style={{ 
          transform: `rotate(${120 + i * 15}deg)`,
          boxShadow: '0 0 40px 10px rgba(255,255,255,0.4)',
          maskImage: 'linear-gradient(to bottom, white, transparent)'
        }}
      />
    ))}
  </div>
);

const Popsicle = ({ stat, index, meltProgress, isPotatoMode }) => {
  // Each unit (days, hours, mins, secs) can melt slightly differently if desired
  const visualMeltHeight = meltProgress * 110; 

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 + index * 0.1, type: "spring", damping: 15 }}
      className="flex flex-col items-center group relative scale-50 sm:scale-75 md:scale-100 origin-bottom flex-shrink-0 min-w-[120px] md:min-w-[180px]"
    >
      <div className="relative">
        {/* Popsicle Stick - Detailed with grain */}
        <div className="absolute -bottom-12 md:-bottom-16 left-1/2 -translate-x-1/2 w-6 md:w-10 h-24 md:h-32 bg-[#d2b48c] rounded-b-xl md:rounded-b-2xl border-b-4 md:border-b-8 border-black/10 shadow-xl overflow-hidden">
           {/* Wood grain details */}
           {!isPotatoMode && [...Array(5)].map((_, i) => (
             <div key={i} className="absolute inset-x-0 h-[1px] bg-[#bc8f8f]/30" style={{ top: `${20 + i * 15}%` }} />
           ))}
           <div className="absolute inset-y-0 left-2 w-[1px] bg-[#bc8f8f]/20" />
           <div className="absolute inset-y-0 right-2 w-[1px] bg-[#bc8f8f]/20" />
        </div>
        
        {/* Main Body */}
        <motion.div 
          animate={{ 
            height: (window.innerHeight < 700 ? 140 : (window.innerWidth < 768 ? 180 : 288)) - visualMeltHeight,
            borderBottomLeftRadius: 24 + (visualMeltHeight * 0.4),
            borderBottomRightRadius: 24 + (visualMeltHeight * 0.4)
          }}
          className={`w-24 sm:w-32 md:w-44 bg-gradient-to-br ${stat.color} rounded-t-[4rem] md:rounded-t-[6rem] relative shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 flex flex-col items-center justify-center border-t-2 border-white/20`}
          style={{ overflow: 'visible' }}
        >
          {/* Surface highlights for 3D look */}
          <div className="absolute top-4 left-6 right-6 h-32 bg-white/10 rounded-t-[4rem] blur-xl pointer-events-none" />
          {!isPotatoMode && <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/30 rounded-full blur-md opacity-40 pointer-events-none" />}

          {/* Sticky drip paths on the front surface */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-[4rem] md:rounded-t-[6rem]">
            <DripPath color={stat.dripColor} delay={0.5} left="25%" />
            {!isPotatoMode && <DripPath color={stat.dripColor} delay={2.5} left="70%" height={120} />}
          </div>

          {/* Falling Drips Reworked - Viscous motion */}
          {!isPotatoMode && (
            <div className="absolute -bottom-16 inset-x-0 flex justify-around pointer-events-none overflow-visible">
               {[...Array(3)].map((_, j) => (
                  <motion.div
                    key={j}
                    animate={{ 
                      y: [0, 180],
                      opacity: [0, 1, 1, 0],
                      scale: [0.8, 1.8, 1.4, 0.4],
                      borderRadius: ["50% 50% 50% 50%", "50% 50% 20% 20%", "50% 50% 50% 50%"]
                    }}
                    transition={{ 
                      duration: 2.5 + Math.random(), 
                      repeat: Infinity, 
                      delay: j * 0.8 + Math.random(),
                      times: [0, 0.05, 0.85, 1],
                      ease: [0.45, 0, 0.55, 1]
                    }}
                    className="w-3 md:w-4 h-5 md:h-7 shadow-lg"
                    style={{ backgroundColor: stat.dripColor, opacity: 0.9 }}
                  />
               ))}
            </div>
          )}

          {/* Drip "Nubs" attached to body - Elastic feel */}
          {!isPotatoMode && (
            <div className="absolute -bottom-4 left-4 right-4 flex justify-around pointer-events-none">
               <motion.div 
                 animate={{ height: [12, 45, 12], y: [0, 8, 0], scaleX: [1, 0.8, 1] }}
                 transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                 className="w-3 md:w-5 rounded-full opacity-90 shadow-sm"
                 style={{ backgroundColor: stat.dripColor }}
               />
               <motion.div 
                 animate={{ height: [18, 65, 18], y: [0, 15, 0], scaleX: [1, 0.7, 1] }}
                 transition={{ duration: 3.5, repeat: Infinity, delay: 0.7, ease: "easeInOut" }}
                 className="w-4 md:w-6 rounded-full opacity-95 shadow-sm"
                 style={{ backgroundColor: stat.dripColor }}
               />
            </div>
          )}

          {/* Ice Texture / Frost Crystals */}
          {!isPotatoMode && (
            <div className="absolute inset-0 opacity-20 pointer-events-none">
               <div className="absolute top-8 left-1/4 w-1.5 h-36 bg-gradient-to-b from-white/60 to-transparent rounded-full blur-[3px]" />
               <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            </div>
          )}

          {/* Centers Numbers and Labels - Centered inside the dynamic height body */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
             <motion.span 
               initial={{ scale: 0.5 }}
               animate={{ scale: 1 }}
               className="text-[50px] md:text-[100px] font-black text-white tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] leading-none"
             >
               {String(stat.value).padStart(2, '0')}
             </motion.span>
             <span className="text-[8px] md:text-[12px] font-black text-white/90 uppercase tracking-[0.2em] md:tracking-[0.4em] italic mt-1 md:mt-2 drop-shadow-sm">
               {stat.label}
             </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const DripPath = ({ color, delay, left, height = 80 }) => (
  <motion.div 
    initial={{ height: 0, opacity: 0 }}
    animate={{ 
      height: [0, height, height],
      opacity: [1, 1, 0]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay,
      times: [0, 0.7, 1]
    }}
    className="absolute w-2 rounded-full blur-[1px]"
    style={{ left, top: '20%', backgroundColor: color, opacity: 0.6 }}
  >
    <motion.div 
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
      style={{ backgroundColor: color }}
    />
  </motion.div>
);

const SharkFin = ({ bottom, left, right, delay, isPotatoMode }) => (
  <motion.div
    animate={{ 
      x: [-30, 30, -30],
      scaleX: [1, 1, -1, -1, 1], // Turn around
      rotate: [-5, 5, -5]
    }}
    transition={{ duration: isPotatoMode ? 12 : 8, repeat: Infinity, ease: "easeInOut", delay }}
    style={{ bottom, left, right }}
    className="absolute z-10 pointer-events-none"
  >
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      {/* Higher detail fin */}
      <path d="M5 45C5 45 12 40 18 30C24 20 45 5 45 5C45 5 40 25 30 35C20 45 5 45 5 45Z" fill="#334155" />
      <path d="M8 43C8 43 15 38 20 30C25 22 40 8 40 8" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {/* Water ripple at base */}
      {!isPotatoMode && (
        <motion.ellipse 
          cx="20" cy="45" rx="15" ry="5" 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="1"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </svg>
  </motion.div>
);

const BeachShell = ({ bottom, left, right, rotate }) => (
  <div 
    style={{ bottom, left, right, transform: `rotate(${rotate}deg)` }}
    className="absolute opacity-60 pointer-events-none"
  >
    <Shell size={16} className="text-[#fdf5e6] fill-[#fdf5e6] drop-shadow-sm" />
  </div>
);

const DetailedPalmtree = ({ bottom, left, right, scale, flip, className = "" }) => (
  <motion.div 
    animate={{ rotate: flip ? [-0.5, 1, -0.5] : [0.5, -1, 0.5] }}
    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute pointer-events-none ${className}`} 
    style={{ bottom, left, right, scale, transform: flip ? 'scaleX(-1)' : 'none', transformOrigin: 'bottom' }}
  >
    <svg width="400" height="600" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
      <defs>
        <linearGradient id="trunk-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4a2c20" />
          <stop offset="50%" stopColor="#5d4037" />
          <stop offset="100%" stopColor="#3e241c" />
        </linearGradient>
        <filter id="leafShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="4" dy="4" stdDeviation="6" floodOpacity="0.3" />
        </filter>
        {/* Added texture to the trunk segments */}
        <pattern id="trunk-texture" width="10" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 Q 5 12 10 10" stroke="#3a1a03" strokeWidth="1" opacity="0.3" fill="none" />
        </pattern>
      </defs>
      
      {/* Textured tapered trunk with better curvature */}
      <path d="M200 600C210 500 215 400 200 180" stroke="url(#trunk-grad)" strokeWidth="16" strokeLinecap="round" fill="none" />
      <path d="M200 600C210 500 215 400 200 180" stroke="url(#trunk-texture)" strokeWidth="16" strokeLinecap="round" fill="none" />
      
      {[...Array(18)].map((_, i) => (
        <path 
          key={i} 
          d={`M${200 + Math.sin(i)*1.5} ${585 - i*22} Q ${210 + Math.cos(i)*3} ${580 - i*22} ${200 - Math.sin(i)*1.5} ${575 - i*22}`} 
          stroke="#2d1d1a" 
          strokeWidth="3.5" 
          opacity="0.5"
          fill="none"
        />
      ))}
      
      {/* High-detail realistic leaves - Radially symmetrical and drooping structure */}
      <g className="leaf-group" filter="url(#leafShadow)" transform="translate(100, 80)">
        {/* Right side - Arching out and down */}
        <RealisticLeaf d="M100 100C180 100 280 140 300 220" color="#044d3b" delay={0} />
        <RealisticLeaf d="M100 100C150 120 220 200 180 300" color="#065f46" delay={0.5} />
        <RealisticLeaf d="M100 100C120 140 150 250 130 350" color="#044d3b" delay={1.2} />
        
        {/* Left side - Arching out and down */}
        <RealisticLeaf d="M100 100C20 100 -80 140 -100 220" color="#044d3b" delay={0.3} />
        <RealisticLeaf d="M100 100C50 120 -20 200 20 300" color="#059669" delay={1.5} />
        <RealisticLeaf d="M100 100C80 140 50 250 70 350" color="#065f46" delay={0.8} />
        
        {/* Center/Top layers - Shorter and more horizontal */}
        <RealisticLeaf d="M100 100C140 105 200 120 220 160" color="#10b981" delay={1.8} />
        <RealisticLeaf d="M100 100C60 105 0 120 -20 160" color="#34d399" delay={1.1} />
      </g>
      
      {/* Coconuts with more detail */}
      <g transform="translate(100, 80)">
        <circle cx="95" cy="112" r="8" fill="#2d1302" />
        <circle cx="112" cy="104" r="7" fill="#3a1a03" />
        <circle cx="103" cy="122" r="9" fill="#2d1302" />
      </g>
    </svg>
  </motion.div>
);

const RealisticLeaf = ({ d, color, delay = 0 }) => (
  <motion.g
    animate={{ 
      rotate: [-0.3, 0.6, -0.3],
      y: [0, 0.5, 0]
    }}
    transition={{ 
      duration: 5 + Math.random() * 3, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
    style={{ transformOrigin: '100px 100px' }}
  >
    {/* Simplified Leaf structure */}
    <path d={d} stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d={d} stroke={color} strokeWidth="12" strokeDasharray="2 6" strokeLinecap="butt" fill="none" opacity="0.6" />
    <path d={d} stroke="rgba(255,255,255,0.05)" strokeWidth="8" strokeDasharray="1 12" strokeLinecap="butt" fill="none" />
  </motion.g>
);

const Sun = ({ isPotatoMode }) => (
  <>
    {/* Cinematic Outer Glow */}
    {!isPotatoMode && (
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[1000px] h-[1000px] rounded-full bg-yellow-200/20 blur-[200px] pointer-events-none z-0"
      />
    )}
    
    {/* Multiple Warm Halos */}
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 right-0 md:top-10 md:right-10 w-64 h-64 md:w-96 md:h-96 bg-orange-500/15 rounded-full blur-[80px] pointer-events-none z-0"
    />

    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      className="absolute top-12 right-12 md:top-24 md:right-24 w-32 h-32 md:w-40 md:h-40 pointer-events-none z-20"
    >
      {/* Sun Core with intense glow and glare */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300 via-white to-orange-200 rounded-full shadow-[0_0_120px_rgba(253,224,71,0.8)] md:shadow-[0_0_180px_rgba(253,224,71,1)]">
         {/* Internal primary glare */}
         <div className="absolute top-4 left-4 w-16 h-16 bg-white/60 rounded-full blur-lg" />
         {/* Secondary sparkle core */}
         {!isPotatoMode && (
           <motion.div 
             animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }} 
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute inset-4 bg-white rounded-full blur-xl" 
           />
         )}
      </div>

      {/* Realistic Volumetric Sun Rays */}
      {!isPotatoMode && [...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            opacity: [0.2, 0.5, 0.2], 
            scaleY: [1, 1.4, 1],
            rotate: i * 15
          }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: i * 0.1 }}
          className="absolute top-1/2 left-1/2 w-1.5 h-32 md:w-2 md:h-48 bg-gradient-to-t from-yellow-100/40 via-yellow-300/10 to-transparent rounded-full -translate-x-1/2 origin-top"
          style={{ transform: `rotate(${i * 15}deg) translateY(4.5rem)` }}
        />
      ))}
    </motion.div>
    
    {/* Cinematic Lens Flare Effect */}
    {!isPotatoMode && <LensFlare />}
    
    {/* Distant Light Leaks */}
    {!isPotatoMode && (
      <>
        <div className="absolute top-1/4 right-1/4 w-[2px] h-[300vh] bg-white/20 blur-[5px] -rotate-45 pointer-events-none opacity-40 mix-blend-overlay" />
        <div className="absolute top-1/3 right-1/2 w-[1px] h-[300vh] bg-white/5 blur-[10px] -rotate-30 pointer-events-none opacity-30" />
      </>
    )}
  </>
);

const LensFlare = () => (
  <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
    {/* Main hex flares */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.3, 0.1], x: [0, 50, 0], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
        className="absolute rounded-full bg-white/10 blur-[10px] mix-blend-screen"
        style={{ 
          width: 20 + i * 40, 
          height: 20 + i * 40,
          left: `${60 - i * 15}%`,
          top: `${40 + i * 10}%`
        }}
      />
    ))}
    {/* Rainbow ring fragment */}
    <div className="absolute top-48 right-48 w-96 h-96 border-[40px] border-orange-500/5 rounded-full blur-[40px] mix-blend-overlay" />
    <div className="absolute top-40 right-40 w-[500px] h-[500px] border-[20px] border-blue-400/5 rounded-full blur-[60px] mix-blend-overlay" />
  </div>
);

const WaterCaustics = () => (
  <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          x: [-20, 20, -20],
          y: [-10, 10, -10],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 10 + i * 2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: i * 2.5
        }}
        className="absolute inset-0"
        style={{ 
          background: `radial-gradient(circle at ${25 + i * 15}% ${20 + i * 10}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          filter: 'blur(20px)'
        }}
      />
    ))}
  </div>
);

const WaterSparkles = () => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 0.4, 0], 
          scale: [0, 0.6, 0]
        }}
        transition={{ 
          duration: 4 + Math.random() * 2, 
          repeat: Infinity, 
          delay: Math.random() * 5
        }}
        className="absolute w-1 h-1 bg-white rounded-full blur-[0.5px]"
        style={{ 
          left: `${Math.random() * 100}%`, 
          top: `${Math.random() * 50}%` 
        }}
      />
    ))}
  </div>
);

const FloatingCloud = ({ delay, top, left, right, scale }) => (
  <motion.div
    initial={{ x: -200, opacity: 0 }}
    animate={{ x: 200, opacity: 1 }}
    transition={{ 
      duration: 30, 
      delay, 
      repeat: Infinity, 
      ease: "linear",
      repeatType: "reverse"
    }}
    style={{ top, left, right, scale }}
    className="absolute pointer-events-none"
  >
    <div className="w-64 h-20 bg-white rounded-full blur-3xl opacity-70" />
  </motion.div>
);

const Wave = ({ color, duration, delay, scale, height = 32, foam = false }) => (
  <motion.div
    animate={{ 
      x: ['0%', '-50%'],
      y: [0, 15, 0] 
    }}
    transition={{ 
      x: { duration, repeat: Infinity, ease: "linear", delay },
      y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }
    }}
    style={{ scale, height: height * 2.5 }}
    className="absolute top-0 left-0 w-[200%] flex pointer-events-none"
  >
    <div className="relative w-full h-full flex">
      <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
        <path
          d="M 0 100 C 100 160 300 40 400 100 C 500 160 700 40 800 100 V 200 H 0 Z"
          fill={color}
        />
        {foam && (
          <path
            d="M 0 100 C 100 130 300 70 400 100 C 500 130 700 70 800 100"
            stroke="white"
            strokeWidth="4"
            fill="none"
            opacity="0.4"
            className="blur-[2px]"
          />
        )}
      </svg>
      <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
        <path
          d="M 0 100 C 100 160 300 40 400 100 C 500 160 700 40 800 100 V 200 H 0 Z"
          fill={color}
        />
        {foam && (
          <path
            d="M 0 100 C 100 130 300 70 400 100 C 500 130 700 70 800 100"
            stroke="white"
            strokeWidth="4"
            fill="none"
            opacity="0.4"
            className="blur-[2px]"
          />
        )}
      </svg>
    </div>
  </motion.div>
);

export default SummerCountdown;
