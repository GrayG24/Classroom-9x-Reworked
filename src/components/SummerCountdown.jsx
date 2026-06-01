import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, Palmtree, Shell } from 'lucide-react';

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

const SummerCountdown = ({ user }) => {
  const isPotatoMode = user?.settings?.performanceMode === true;
  const { width, height } = useWindowSize();
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

      // May 1st start date for overall progress
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
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const m = Math.floor((difference / 1000 / 60) % 60);
        const s = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({
          days: d,
          hours: h,
          minutes: m,
          seconds: s
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

          {/* Realistic Textured Sand Layer with layered dunes and real shoreline shadows */}
          <div className="absolute bottom-0 inset-x-0 h-[65%] bg-gradient-to-b from-[#f5d79e] to-[#edd093] shadow-[inset_0_40px_80px_rgba(0,0,0,0.18)] z-20 overflow-hidden">
             {/* Back Sand Dune - curved path layer */}
             <svg className="absolute inset-x-0 top-0 h-28 -translate-y-4 fill-[#ebd2a0] opacity-90" viewBox="0 0 1440 200" preserveAspectRatio="none">
               <path d="M0,120 Q360,60 720,130 T1440,80 L1440,200 L0,200 Z" />
             </svg>
             
             {/* Wet Sand Horizon near the shoreline */}
             <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-[#c2a774]/35 to-transparent blur-[2px]" />

             {/* Sand Texture - Micro-noise and realistic grain shading */}
             <div className="absolute inset-0 opacity-45 pointer-events-none" 
                  style={{ 
                    backgroundImage: 'radial-gradient(#cc9d6c 1px, transparent 0)', 
                    backgroundSize: '10px 10px' 
                  }} />
             
             {/* Soft shadows from Palm trees & environment */}
             <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.12),transparent_60%)]" />
             <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.12),transparent_60%)]" />
             
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

      {/* Sun Layer - Explicitly above elements but below main UI */}
      <div className="absolute inset-x-0 top-0 h-[65vh] pointer-events-none z-30">
        {!isPotatoMode && <SunBeams />}
        <Sun isPotatoMode={isPotatoMode} />
      </div>

      {/* Realistic Palmtrees - Left and Right framing */}
      <div className="absolute inset-x-0 bottom-0 top-0 z-20 pointer-events-none overflow-hidden">
         {/* Left Palm Tree */}
         <DetailedPalmtree 
           bottom="-5%" 
           left="-8%" 
           scale={width < 768 ? 0.6 : width < 1024 ? 0.9 : 1.3} 
         />
         {/* Right Palm Tree (Flipped) */}
         <DetailedPalmtree 
           bottom="-5%" 
           right="-8%" 
           scale={width < 768 ? 0.6 : width < 1024 ? 0.9 : 1.3} 
           flip={true} 
         />
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
              <div className="flex flex-wrap md:flex-nowrap justify-center items-end gap-3 sm:gap-6 md:gap-12 lg:gap-16 w-full max-w-5xl px-2">
                {stats.map((stat, i) => (
                  <Popsicle 
                    key={stat.label} 
                    stat={stat} 
                    index={i} 
                    meltProgress={meltProgress}
                    isPotatoMode={isPotatoMode}
                    screenWidth={width}
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
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, rotate: 120 + i * 12 }}
        animate={{ 
          opacity: [0, 0.5, 0],
          rotate: [120 + i * 12, 125 + i * 12, 120 + i * 12]
        }}
        transition={{ 
          duration: 7 + Math.random() * 7, 
          repeat: Infinity, 
          delay: Math.random() * 5,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 md:top-24 md:right-24 h-[300vh] w-[2px] bg-gradient-to-b from-white via-yellow-200/20 to-transparent origin-top"
        style={{ 
          boxShadow: '0 0 60px 20px rgba(255,255,255,0.2)',
        }}
      />
    ))}
  </div>
);

const Popsicle = ({ stat, index, meltProgress, isPotatoMode, screenWidth }) => {
  const isMobile = screenWidth < 768;
  const isSmallHeight = window.innerHeight < 700;
  
  // Popsicle Body Heights
  const fullHeight = isMobile ? (isSmallHeight ? 140 : 180) : 250;
  const remainingHeightScale = Math.max(0.12, 1 - meltProgress);
  const bodyHeight = fullHeight * remainingHeightScale;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 + index * 0.1, type: "spring", damping: 15 }}
      className="flex flex-col items-center group relative origin-bottom flex-shrink-0"
      style={{ 
        width: isMobile ? '70px' : '150px',
        margin: '0 auto'
      }}
    >
      <div 
        className="relative flex flex-col justify-end items-center" 
        style={{ 
          width: '100%', 
          height: `${fullHeight + (isMobile ? 40 : 80)}px` 
        }}
      >
        {/* Longer, Sturdy, Crafted Popsicle Stick */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#d7b282] via-[#e2c69f] to-[#be9a6e] rounded-b-2xl border-b-4 border-black/20 shadow-lg overflow-hidden"
          style={{ 
            width: isMobile ? '16px' : '28px', 
            height: isMobile ? '65px' : '110px',
            bottom: isMobile ? '0px' : '10px',
            zIndex: 10
          }}
        >
           {/* Wood grains */}
           {!isPotatoMode && [...Array(6)].map((_, i) => (
              <div key={i} className="absolute inset-x-0 h-[1.5px] bg-[#8a5d2e]/20" style={{ top: `${15 + i * 15}%` }} />
           ))}
           {/* Shadow tint inside frozen bar */}
           <div 
             className="absolute top-0 inset-x-0 h-1/2 mix-blend-multiply opacity-40" 
             style={{ backgroundColor: stat.dripColor }} 
           />
        </div>
        
        {/* Main Frozen Body */}
        <motion.div 
          animate={{ 
            height: bodyHeight,
            borderBottomLeftRadius: isMobile ? 12 : 24,
            borderBottomRightRadius: isMobile ? 12 : 24
          }}
          className={`absolute inset-x-0 bg-gradient-to-b ${stat.color} rounded-t-[2.5rem] md:rounded-t-[5rem] shadow-xl transition-all duration-350 flex flex-col items-center border-t border-white/30 z-20`}
          style={{ 
            bottom: isMobile ? '40px' : '75px',
            overflow: 'visible' 
          }}
        >
          {/* Specular Wet Shine Highlights */}
          <div className="absolute top-[8%] left-[10%] right-[10%] h-[35%] bg-gradient-to-b from-white/25 via-white/5 to-transparent rounded-t-[2rem] blur-xs pointer-events-none" />
          <div className="absolute top-[4%] left-[12%] w-1.5 md:w-2.5 h-[50%] bg-white/40 rounded-full blur-[1px] pointer-events-none opacity-80" />
          <div className="absolute top-[25%] right-[12%] w-1 h-[20%] bg-white/25 rounded-full blur-[0.5px] pointer-events-none opacity-50" />

          {/* Sticky dripping runs down the surface */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-[2.5rem] md:rounded-t-[5rem]">
            <DripPath color={stat.dripColor} delay={0.5} left="25%" height={bodyHeight * 0.4} />
            {!isPotatoMode && <DripPath color={stat.dripColor} delay={2.5} left="75%" height={bodyHeight * 0.45} />}
          </div>

          {/* Falling liquid drips */}
          {!isPotatoMode && remainingHeightScale > 0.1 && (
            <div className="absolute -bottom-12 inset-x-0 flex justify-around pointer-events-none overflow-visible">
               {[...Array(2)].map((_, j) => (
                  <motion.div
                    key={j}
                    animate={{ 
                      y: [0, 120],
                      opacity: [0, 1, 1, 0],
                      scale: [0.6, 1.1, 0.7, 0.1],
                    }}
                    transition={{ 
                      duration: 2.0 + Math.random() * 0.7, 
                      repeat: Infinity, 
                      delay: j * 1.1 + Math.random(),
                      times: [0, 0.05, 0.85, 1],
                      ease: "easeInOut"
                    }}
                    className="w-1 md:w-1.5 h-2 md:h-4 shadow-sm"
                    style={{ backgroundColor: stat.dripColor, opacity: 0.9, borderRadius: '50%' }}
                  />
               ))}
            </div>
          )}
        </motion.div>

        {/* Stable text indicators overlay */}
        <div 
          className="absolute inset-x-0 flex flex-col items-center justify-center pointer-events-none z-30"
          style={{ 
            height: `${bodyHeight}px`,
            bottom: isMobile ? '40px' : '75px'
          }}
        >
           <motion.span 
             initial={{ scale: 0.5 }}
             animate={{ scale: 1 }}
             className="text-[28px] md:text-[64px] font-black text-white tracking-tighter drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)] leading-none"
           >
             {String(stat.value).padStart(2, '0')}
           </motion.span>
           <span className="text-[7px] md:text-[10px] font-black text-white/95 uppercase tracking-widest italic mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
             {stat.label}
           </span>
        </div>
      </div>
    </motion.div>
  );
};

const DripPath = ({ color, delay, left, height = 90 }) => (
  <motion.div 
    initial={{ height: 0, opacity: 0 }}
    animate={{ 
      height: [0, height, height],
      opacity: [1, 1, 0]
    }}
    transition={{ 
      duration: 5.5, 
      repeat: Infinity, 
      delay,
      times: [0, 0.7, 1]
    }}
    className="absolute w-1 rounded-full blur-[0.2px]"
    style={{ left, top: '15%', backgroundColor: color, opacity: 0.75 }}
  >
    <motion.div 
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
      style={{ backgroundColor: color }}
    />
  </motion.div>
);

const SharkFin = ({ bottom, left, right, delay, isPotatoMode }) => (
  <motion.div
    animate={{ 
      x: [-45, 45, -45],
      scaleX: [1, 1, -1, -1, 1],
      rotate: [-6, 6, -6]
    }}
    transition={{ duration: isPotatoMode ? 14 : 9, repeat: Infinity, ease: "easeInOut", delay }}
    style={{ bottom, left, right }}
    className="absolute z-10 pointer-events-none"
  >
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path d="M5 50C5 50 14 44 21 32C28 20 50 3 50 3C50 3 45 27 34 38C23 49 5 50 5 50Z" fill="#1e293b" />
      <path d="M8 48C8 48 16 42 22 32C28 22 44 8 44 8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <path d="M6 49.5C10 49.5 20 48 24 44" stroke="#0f172a" strokeWidth="2.5" />
      
      {!isPotatoMode && (
        <>
          <motion.ellipse 
            cx="22" cy="50" rx="18" ry="5.5" 
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="1.2"
            fill="none"
            animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </>
      )}
    </svg>
  </motion.div>
);

const BeachShell = ({ bottom, left, right, rotate }) => (
  <div 
    style={{ bottom, left, right, transform: `rotate(${rotate}deg)` }}
    className="absolute opacity-70 pointer-events-none"
  >
    <Shell size={16} className="text-[#fefbf3] fill-[#fefbf3] drop-shadow-[0_2px_4px_rgba(139,69,19,0.25)]" />
  </div>
);

const RealisticLeaf = ({ rotate, scale = 1, color, delay = 0 }) => (
  <g transform={`scale(${scale})`}>
    <motion.g
      animate={{ 
        rotate: [rotate - 3, rotate + 3, rotate - 3],
      }}
      transition={{ 
        duration: 9 + Math.random() * 5, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
      style={{ transformOrigin: '0px 0px' }}
    >
      {/* Elegant, Curved Leaf stem */}
      <path 
        d="M 0,0 Q 80 -60 250 60" 
        stroke={color} 
        strokeWidth="4" 
        fill="none" 
        strokeLinecap="round" 
        opacity="0.95" 
      />
      {/* Intricately detailed, multi-shade cascade fronds */}
      {[...Array(32)].map((_, idx) => {
        const t = (idx + 1) / 33; 
        const x = (1-t)*(1-t)*0 + 2*(1-t)*t*80 + t*t*250;
        const y = (1-t)*(1-t)*0 + 2*(1-t)*t*(-60) + t*t*60;
        
        const length = 55 * Math.sin(t * Math.PI) + 12; 
        const angle = 40 + t * 50; 
        const lx = x + length * Math.sin(angle * Math.PI / 180);
        const ly = y + length * Math.cos(angle * Math.PI / 180);
        
        // Multi-toned greens for enhanced realism
        const frondColor = idx % 3 === 0 ? '#15803d' : idx % 3 === 1 ? '#166534' : '#22c55e';
        
        return (
          <path 
            key={idx}
            d={`M ${x},${y} Q ${lx - 12},${ly + 12} ${lx},${ly}`}
            stroke={frondColor}
            strokeWidth="2.0"
            strokeLinecap="round"
            fill="none"
            opacity={0.85 + 0.15 * Math.sin(t * Math.PI)}
          />
        );
      })}
    </motion.g>
  </g>
);

const DetailedPalmtree = ({ bottom, left, right, scale, flip, className = "" }) => (
  <motion.div 
    animate={{ rotate: flip ? [-0.8, 0.8, -0.8] : [0.8, -0.8, 0.8] }}
    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute pointer-events-none ${className}`} 
    style={{ 
      bottom, 
      left, 
      right, 
      scale, 
      transform: flip ? 'scaleX(-1)' : 'none', 
      transformOrigin: 'bottom center',
    }}
  >
    <svg width="400" height="600" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
      <defs>
        <linearGradient id="trunk-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3d2314" />
          <stop offset="35%" stopColor="#4e311f" />
          <stop offset="70%" stopColor="#5c3f30" />
          <stop offset="100%" stopColor="#2c170b" />
        </linearGradient>
      </defs>
      
      {/* Tapered curved trunk with rich texture */}
      <path 
        d="M 175,600 C 180,480 185,350 180,180 L 210,180 C 215,350 210,480 225,600 Z" 
        fill="url(#trunk-grad)" 
        stroke="#1c0d06"
        strokeWidth="2.5"
      />
      
      {/* Detailed Trunk Bark Ring segments with organic overlapping shade */}
      {[...Array(26)].map((_, i) => {
        const t = i / 26;
        const cy = 600 - t * 420;
        const cx = 200 - Math.pow(t, 2) * 15;
        const width = 45 - t * 20;
        
        return (
          <path 
            key={i} 
            d={`M ${cx - width/2},${cy} Q ${cx},${cy + 5} ${cx + width/2},${cy}`} 
            stroke="#211107" 
            strokeWidth="4" 
            opacity="0.85"
            fill="none"
          />
        );
      })}
      
      {/* Beautiful Volumetric Fan leaves */}
      <g className="leaf-group" transform="translate(200, 180)">
        {/* Layer 1: Darkest background leaves */}
        <g transform="scale(1, 1)">
          <RealisticLeaf rotate={30} scale={1.2} color="#14532d" delay={0.2} />
          <RealisticLeaf rotate={60} scale={1.0} color="#14532d" delay={0.7} />
          <RealisticLeaf rotate={90} scale={0.8} color="#052e16" delay={1.4} />
        </g>
        <g transform="scale(-1, 1)">
          <RealisticLeaf rotate={30} scale={1.2} color="#14532d" delay={0.4} />
          <RealisticLeaf rotate={60} scale={1.0} color="#14532d" delay={1.6} />
          <RealisticLeaf rotate={90} scale={0.8} color="#052e16" delay={0.9} />
        </g>
        
        {/* Layer 2: Midground bright tropical leaves */}
        <g transform="scale(1, 1)">
          <RealisticLeaf rotate={12} scale={1.25} color="#15803d" delay={0} />
          <RealisticLeaf rotate={42} scale={1.05} color="#22c55e" delay={0.5} />
          <RealisticLeaf rotate={72} scale={0.85} color="#166534" delay={1.1} />
        </g>
        <g transform="scale(-1, 1)">
          <RealisticLeaf rotate={12} scale={1.25} color="#15803d" delay={0.3} />
          <RealisticLeaf rotate={42} scale={1.05} color="#22c55e" delay={1.3} />
          <RealisticLeaf rotate={72} scale={0.85} color="#166534" delay={0.8} />
        </g>
        
        {/* Layer 3: Dynamic high-contrast foreground crowns */}
        <RealisticLeaf rotate={-40} scale={0.9} color="#4ade80" delay={1.5} />
        <RealisticLeaf rotate={-120} scale={0.9} color="#16a34a" delay={1.0} />
        <RealisticLeaf rotate={-80} scale={0.95} color="#22c55e" delay={2.0} />
      </g>
      
      {/* Volumetric cluster of Coconuts */}
      <g transform="translate(182, 168)">
        <circle cx="8" cy="18" r="12" fill="#2d1508" stroke="#1c0c04" strokeWidth="2" />
        <circle cx="28" cy="12" r="10" fill="#381b0a" stroke="#220f04" strokeWidth="2" />
        <circle cx="18" cy="26" r="13" fill="#2d1508" stroke="#1c0c04" strokeWidth="2" />
        <path d="M 6,18 Q 10,22 12,20 M 24,11 Q 28,14 30,12" stroke="#120601" strokeWidth="1" />
      </g>
    </svg>
  </motion.div>
);

const Sun = ({ isPotatoMode }) => (
  <>
    {/* Deep Atmospheric Glow */}
    {!isPotatoMode && (
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20vh] -right-[20vw] w-[1400px] h-[1400px] rounded-full bg-orange-400/10 blur-[250px] pointer-events-none z-0"
      />
    )}
    
    {/* Primary Warm Halo */}
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-50px] right-[-50px] md:top-0 md:right-0 w-80 h-80 md:w-[600px] md:h-[600px] bg-yellow-400/10 rounded-full blur-[100px] pointer-events-none z-0"
    />

    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      className="absolute top-8 right-8 md:top-24 md:right-24 w-40 h-40 md:w-56 md:h-56 pointer-events-none z-20"
    >
      {/* Sun Core with intense multi-layer glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300 via-white to-orange-100 rounded-full shadow-[0_0_150px_rgba(255,255,255,0.9)] md:shadow-[0_0_220px_rgba(253,224,71,1)]">
         {/* Hot Core Glare */}
         <div className="absolute top-6 left-6 w-20 h-20 bg-white/80 rounded-full blur-xl" />
         {/* Chromatic Aberration Detail */}
         <div className="absolute inset-0 rounded-full border-[10px] border-orange-500/10 blur-[2px]" />
         
         {!isPotatoMode && (
            <motion.div 
               animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1], filter: ['blur(15px)', 'blur(30px)', 'blur(15px)'] }} 
               transition={{ duration: 3, repeat: Infinity }}
               className="absolute -inset-4 bg-white/40 rounded-full blur-2xl" 
            />
         )}
      </div>

      {/* Dynamic Solar Flares - Fixed rotation clobber with wrapper div element container */}
      {!isPotatoMode && [...Array(32)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-48 md:w-3 md:h-80 origin-top"
          style={{ transform: `translate(-50%, 0%) rotate(${i * (360/32)}deg) translateY(2rem)` }}
        >
          <motion.div
            animate={{ 
              opacity: [0.3, 0.7, 0.3], 
              scaleY: [1, 1.8, 1],
            }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: i * 0.15 }}
            className="w-full h-full bg-gradient-to-t from-yellow-50/60 via-yellow-200/10 to-transparent rounded-full origin-top"
          />
        </div>
      ))}
    </motion.div>
    
    {/* Lens Flare Components */}
    {!isPotatoMode && (
      <div className="absolute inset-0 pointer-events-none z-[100]">
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[40%] w-12 h-12 rounded-full bg-cyan-400/20 blur-md border border-cyan-400/30"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[60%] right-[60%] w-8 h-8 rounded-full bg-rose-400/10 blur-sm"
        />
        <motion.div 
          animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[80%] right-[80%] w-16 h-16 rounded-full bg-orange-400/10 blur-lg border border-orange-400/20"
        />
      </div>
    )}
  </>
);

const LensFlare = () => (
  <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
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
            d="M 0 100 C 100 130 300 70 400 100 C 500 130 700 70 800 105"
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

