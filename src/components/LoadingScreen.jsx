import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import { StaticDrawUsage, AdditiveBlending, DoubleSide } from 'three';

const ShootingStar = ({ onWitnessed, onImpact, onProximity, forceTrigger = false }) => {
  const meshRef = useRef();
  const trailRef = useRef();
  const [active, setActive] = useState(false);
  const impactTriggered = useRef(false);
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    const roll = Math.floor(Math.random() * 10000);
    if (roll === 777 || forceTrigger) {
      hasFired.current = true;
      const delay = forceTrigger ? 500 : 25000;
      setTimeout(() => {
        setActive(true);
        onWitnessed?.();
      }, delay);
    }
  }, [onWitnessed, forceTrigger]);

  const startTime = useRef(Date.now());

  useFrame(() => {
    if (!active || !meshRef.current) return;
    
    const elapsedTime = (Date.now() - startTime.current) / 1000;
    const speed = 1.2; // FASTER
    meshRef.current.position.x += speed; 
    meshRef.current.position.y -= speed * 0.4;
    meshRef.current.rotation.z += 0.2;

    if (trailRef.current) {
      trailRef.current.scale.set(1, 1, 1 + meshRef.current.position.x * 0.015);
    }

    if (meshRef.current.children[1]) {
      meshRef.current.children[1].intensity = 800 + Math.sin(elapsedTime * 30) * 300;
    }

    // Impact detection
    if (meshRef.current.position.x >= 0 && !impactTriggered.current) {
      impactTriggered.current = true;
      onImpact?.();
    }

    if (meshRef.current.position.x > 150) {
      setActive(false);
    }
  });

  if (!active) return null;

  return (
    <group>
      <mesh ref={meshRef} position={[-200, 100, -10]}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight intensity={1500} distance={2000} color="#60a5fa" />
        
        {/* Glow */}
        <mesh>
          <sphereGeometry args={[15, 16, 16]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.3} />
        </mesh>
        
        {/* Trail */}
        <group rotation={[0, 0, Math.PI / 4]} position={[-30, 15, 0]}>
          <mesh ref={trailRef} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 10, 120, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
          </mesh>
        </group>
      </mesh>
    </group>
  );
};

const Singularity = () => {
  const meshRef = useRef();
  
  const startTime = useRef(Date.now());
  
  useFrame(() => {
    const time = (Date.now() - startTime.current) / 1000;
    if (meshRef.current) {
      meshRef.current.rotation.z = time * 0.2;
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
};

const Particles = ({ count = 2000 }) => {
  const points = useRef();
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 6 + Math.random() * 12;
        pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  });

  const startTime = useRef(Date.now());

  useFrame(() => {
    const time = (Date.now() - startTime.current) / 1000;
    if (points.current) {
        points.current.rotation.y = time * 0.03;
        points.current.rotation.z = time * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          usage={StaticDrawUsage}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.015} 
        color="#ffffff" 
        transparent 
        opacity={0.3} 
        sizeAttenuation 
        blending={AdditiveBlending}
      />
    </points>
  );
};

const Shockwave = ({ active }) => {
  const meshRef = useRef();
  useFrame(() => {
    if (active && meshRef.current) {
      meshRef.current.scale.addScalar(0.6);
      meshRef.current.material.opacity *= 0.92;
    }
  });

  if (!active) return null;

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1, 1.2, 64]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={1} side={DoubleSide} />
    </mesh>
  );
};

export const LoadingScreen = ({ onComplete, onCosmicEvent }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stage, setStage] = useState('initializing');
  const [stargazerTriggered, setStargazerTriggered] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [proximityShake, setProximityShake] = useState(0);

  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setStargazerTriggered(true);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage('ready');
          setTimeout(() => setIsLoaded(true), 500);
          return 100;
        }
        const increment = Math.random() * 2.5;
        return Math.min(100, prev + increment);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setStage('entering');
    setTimeout(onComplete, 1500);
  };

  const handleImpact = () => {
    setIsDestroyed(true);
    setTimeout(() => setIsDestroyed(false), 3000); 
  };

  const getShake = (base) => {
    if (isDestroyed) return base * 4;
    if (proximityShake > 0) return base * 2 * proximityShake;
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: stage === 'entering' ? 0 : 1,
        scale: stage === 'entering' ? 1.1 : 1,
        filter: stage === 'entering' ? 'blur(20px)' : 'none',
        x: isDestroyed || proximityShake > 0 ? [
          0, 
          getShake(-6), getShake(6), 
          getShake(-10), getShake(10), 
          getShake(-6), 0
        ] : 0,
        y: isDestroyed || proximityShake > 0 ? [
          0, 
          getShake(10), getShake(-10), 
          getShake(6), getShake(-6), 
          getShake(10), 0
        ] : 0,
      }}
      transition={{ 
        duration: isDestroyed ? 0.6 : 0.1, 
        repeat: proximityShake > 0 && !isDestroyed ? Infinity : 0,
        ease: "linear"
      }}
      className={`fixed inset-0 z-[99999] bg-[#020305] flex flex-col items-center justify-center overflow-hidden ${stage === 'entering' ? 'pointer-events-none' : ''}`}
    >
      {/* Blast Flash */}
      <AnimatePresence>
        {isDestroyed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 bg-white z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0 text-white pointer-events-none">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <color attach="background" args={['#020305']} />
          <fog attach="fog" args={['#020305', 5, 25]} />
          
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            <Particles count={1500} />
            <Singularity />
            <Shockwave active={isDestroyed} />
            <ShootingStar 
              onWitnessed={onCosmicEvent} 
              onImpact={handleImpact} 
              onProximity={setProximityShake}
              forceTrigger={stargazerTriggered} 
            />
          </Suspense>

          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-32 pointer-events-none">
        <div className="flex flex-col items-center gap-8 mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
            }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center"
          >
          <div className="flex gap-[0.2em] relative">
              {"CLASSROOM 9X".split('').map((char, i) => (
                <motion.span
                  key={i}
                  animate={isDestroyed ? {
                    x: (Math.random() - 0.5) * window.innerWidth * 1.5,
                    y: (Math.random() - 0.5) * window.innerHeight * 1.5,
                    rotate: (Math.random() - 0.5) * 720,
                    scale: 0,
                    opacity: 0,
                    filter: 'blur(20px)'
                  } : {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)'
                  }}
                  transition={{ 
                    duration: isDestroyed ? 0.8 : 2.5, // Much smoother return
                    ease: isDestroyed ? [0.16, 1, 0.3, 1] : "circOut",
                    delay: isDestroyed ? 0 : i * 0.04
                  }}
                  className={`text-6xl font-black italic uppercase inline-block whitespace-pre ${
                    char === ' ' ? 'w-8' : ''
                  } text-white`}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <div className={`h-px transition-all duration-[60s] ease-out mt-12 w-64 bg-gradient-to-r from-transparent via-white/40 to-transparent ${
              isDestroyed ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
            }`} />
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-12 w-full max-w-md mb-12">
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex justify-between w-full px-2 mb-2">
              <span className="text-[14px] font-black text-white/60 tracking-widest uppercase italic">
                {stage === 'ready' ? 'System Ready' : 'Loading...'}
              </span>
              <span className="text-[14px] font-black text-white/60 tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-[3px] bg-white/5 relative overflow-hidden rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute inset-y-0 left-0 bg-white shadow-[0_0_20px_white]"
              />
            </div>
          </div>

          <AnimatePresence>
            {isLoaded && stage === 'ready' && (
              <motion.button
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                whileHover={{ scale: 1.05, letterSpacing: '0.4em' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="pointer-events-auto px-12 py-4 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-white text-[12px] font-black tracking-[0.3em] uppercase italic transition-all hover:bg-white hover:text-black hover:border-white shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                ENTER
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-[8px] font-black text-white/10 tracking-[0.5em] uppercase italic">
            AESTHETICALLY UNBOUNDED INTERFACE // VERSION 3.2.0
          </p>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-12 left-12 font-mono text-[8px] text-white/10 tracking-widest uppercase flex flex-col gap-1">
        <span>X-COORD: 0.041</span>
        <span>Y-COORD: 0.923</span>
      </div>
      <div className="absolute bottom-12 right-12 font-mono text-[8px] text-white/10 tracking-widest uppercase text-right flex flex-col gap-1">
        <span>STATUS: NOMINAL</span>
        <span>UPTIME: {Math.floor(progress * 100)}MS</span>
      </div>
    </motion.div>
  );
};
