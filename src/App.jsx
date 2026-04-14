import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AppRoute } from './constants';
import { GAMES_DATA, BADGES, QUEST_POOL, CHARACTERS } from './constants';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { GameModal } from './components/GameModal';
import { ProfileModal } from './components/ProfileModal';
import { MiniProfile } from './components/MiniProfile';
import { CategoryPage } from './components/CategoryPage';
import { Library } from './components/Library';
import { Settings } from './components/Settings';
import { Customization } from './components/Customization';
import { Leaderboard } from './components/Leaderboard';
import { LeaderboardWidget } from './components/LeaderboardWidget';
import { GlobalChat } from './components/GlobalChat';
import { InitialNameModal } from './components/InitialNameModal';
import { EducationalCloak } from './components/EducationalCloak';
import { AdminPanel } from './components/AdminPanel';
import { AppsPage } from './components/AppsPage';
import { ProxyPage } from './components/ProxyPage';
import { CodesPage } from './components/CodesPage';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { Friends } from './components/Friends';
import { GameView } from './components/GameView';
import { Bell, Star, Zap, Shield, Trophy, Palette, Layers, Bot, X, Crown, ZapOff, ShieldAlert, MessageSquare, Users, Send, Trash2, Megaphone, Settings as SettingsIcon, Activity, Sparkles, Ghost, BrainCircuit, Rocket, Plus, Award, Flame, User, AlertTriangle, Lock, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const EXP_PER_PLAY = 25;
const LEVEL_UP_BASE = 200;

const LockedPage = ({ title, onReturn }) => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-12 text-center space-y-8">
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-24 h-24 bg-rose-500/20 rounded-[2.5rem] flex items-center justify-center border border-rose-500/20 shadow-[0_0_50px_rgba(244,63,94,0.2)]"
    >
      <Lock size={48} className="text-rose-500" />
    </motion.div>
    <div className="space-y-4">
      <h1 className="text-6xl font-black text-white uppercase tracking-tighter italic">Coming <span className="text-rose-500">Soon</span></h1>
      <div className="flex items-center justify-center gap-3">
        <div className="h-px w-12 bg-rose-500/30"></div>
        <p className="text-xs font-black text-rose-500 uppercase tracking-[0.5em]">Unauthorized Access Detected</p>
        <div className="h-px w-12 bg-rose-500/30"></div>
      </div>
    </div>
    <p className="text-slate-400 font-medium max-w-md leading-relaxed uppercase text-[10px] tracking-widest">
      This page is not complete. Admin access only.
    </p>
    <button 
      onClick={onReturn}
      className="px-10 py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-rose-500 hover:text-white transition-all italic"
    >
      RETURN TO HOME
    </button>
  </div>
);

const getRandomQuests = (pool, count) => {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const DEFAULT_USER = {
  username: 'Player',
  email: 'softball_chik_007@yahoo.com',
  exp: 0,
  level: 1,
  gamesPlayed: 0,
  currentTheme: 'void',
  unlockedThemes: ['void', 'cyan', 'black-white'],
  currentFrame: 'obsidian',
  unlockedFrames: ['obsidian'],
  currentCharacter: 'agent-x',
  unlockedCharacters: ['agent-x'],
  unlockedCursors: ['default'],
  unlockedBadges: [],
  redeemedCodes: [],
  favorites: [],
  pinnedGames: [],
  friends: [],
  friendRequests: [],
  sentRequests: [],
  titles: ['New Recruit'],
  currentTitle: 'New Recruit',
  featuredBadgeId: null,
  score: 0,
  uid: 'user-' + Math.random().toString(36).substr(2, 9),
  hasSetProfile: false,
  isAdmin: false,
  streak: 1,
  lastLoginDate: new Date().toISOString().split('T')[0],
  customTheme: {
    primary: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.6)',
    bg: '#020617'
  },
  settings: {
    customCursor: false,
    cursorStyle: 'default',
    animatedBg: true,
    uiOpacity: 0.8,
    notifications: true,
    homeBanner: true,
    lagNotifications: true,
    performanceMode: false,
    showOnlinePlayers: true,
    showFPS: true,
    reducedMotion: false,
    lowQualityParticles: false,
    publicProfile: true,
    sidebarAutoHide: true,
    showChat: true,
    backgroundEffects: true,
    soundEnabled: true,
    liquidGlass: false,
    disableGlow: false,
    highContrast: false,
    compactMode: false,
    showTooltips: true,
    betaFeatures: {
      experimentalAnimations: false,
      debugOverlay: false,
      earlyAccessFeatures: false,
      aiChatAssistant: false
    }
  }
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      
      const target = e.target;
      const isClickable = target.closest('button, a, [role="button"], .cursor-pointer, input, select, textarea');
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div 
      className={`proto-cursor ${isHovering ? 'proto-cursor-hover' : ''}`}
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isMouseDown ? 0.8 : (isHovering ? 1.2 : 1),
        boxShadow: isHovering ? '0 0 20px var(--primary-glow)' : '0 0 10px rgba(255,255,255,0.1)'
      }}
      transition={{ 
        type: "spring", 
        damping: 30, 
        stiffness: 400, 
        mass: 0.5,
      }}
      style={{ translateX: '-50%', translateY: '-50%' }}
    />
  );
};

const EpilepsyWarning = ({ onProceed, onSkip }) => {
  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center p-6">
      <div className="max-w-xl w-full p-12 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl text-center relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="w-24 h-24 rounded-[2rem] bg-rose-500/20 flex items-center justify-center text-rose-500 mx-auto mb-10 border border-rose-500/30 shadow-[0_0_50px_rgba(244,63,94,0.2)]">
          <AlertTriangle size={48} strokeWidth={2.5} />
        </div>
        
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic mb-8">EPILEPSY WARNING</h2>
        
        <div className="space-y-6 mb-12">
          <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed italic text-left">
            This loading screen may contain flashing lights, rapid patterns, or visual effects that could trigger seizures for people with photosensitive epilepsy or other light-sensitive conditions.
          </p>
          <p className="text-white/40 text-[10px] font-medium leading-relaxed uppercase tracking-widest text-left">
            Viewer discretion is advised. If you have a history of epilepsy or seizures, or experience symptoms such as dizziness, altered vision, eye or muscle twitching, loss of awareness, or convulsions, please press skip loading screen.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={onProceed}
            className="w-full py-6 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] italic hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95"
          >
            CONTINUE TO LOADING SCREEN
          </button>
          <button 
            onClick={onSkip}
            className="w-full py-6 bg-red-500 text-white border border-red-500/50 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] italic hover:bg-red-600 transition-all shadow-[0_0_40px_rgba(239,68,68,0.3)] active:scale-95"
          >
            SKIP LOADING SCREEN
          </button>
        </div>
      </div>
    </div>
  );
};

const InteractiveBackground = ({ performanceMode, lowQualityParticles, currentTheme }) => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const createParticles = () => {
      particles = [];
      const count = performanceMode ? 40 : (lowQualityParticles ? 80 : 150);
      
      for (let i = 0; i < count; i++) {
        let color = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
        let size = Math.random() * 1.5 + 0.5;
        let speedX = (Math.random() - 0.5) * (performanceMode ? 0.2 : 0.4);
        let speedY = (Math.random() - 0.5) * (performanceMode ? 0.2 : 0.4);

        if (currentTheme === 'void') {
          color = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
          size = Math.random() * 1.2 + 0.5;
        } else if (currentTheme === 'fire') {
          color = `rgba(255, ${Math.random() * 100 + 50}, 0, ${Math.random() * 0.5})`;
          speedY = -Math.random() * 1.5 - 0.5;
        } else if (currentTheme === 'galaxy') {
          const colors = ['#60a5fa', '#f472b6', '#c084fc', '#ffffff'];
          color = colors[Math.floor(Math.random() * colors.length)] + '33';
          size = Math.random() * 2 + 1;
        } else if (currentTheme === 'supernova') {
          const colors = ['#ff8c00', '#ff4500', '#00ffff', '#ffffff'];
          color = colors[Math.floor(Math.random() * colors.length)] + '55';
          size = Math.random() * 3 + 1;
          speedX *= 1.5;
          speedY *= 1.5;
        } else if (currentTheme === 'gold') {
          color = `rgba(251, 191, 36, ${Math.random() * 0.4})`;
        }

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size,
          speedX: speedX,
          speedY: speedY,
          color: color,
          originalSize: size,
          density: (Math.random() * 20) + 1,
          glow: Math.random() > 0.9
        });
      }
    };

    createParticles();

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Mouse Glow
      const gradient = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, 300
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // Movement
        p.x += p.speedX;
        p.y += p.speedY;

        // Boundary check
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse Interaction - Reactive
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const directionX = (dx / distance) * force * p.density * 0.5;
          const directionY = (dy / distance) * force * p.density * 0.5;
          
          p.x -= directionX;
          p.y -= directionY;
          p.size = p.originalSize * (1 + force * 3);
        } else {
          p.size = p.originalSize;
        }

        ctx.fillStyle = p.color;
        
        if (p.glow) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentTheme, performanceMode, lowQualityParticles]);

  return <canvas ref={canvasRef} className="interactive-bg-canvas" />;
};

const BossEvent = ({ onDefeat }) => {
  const [health, setHealth] = useState(100);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isHit, setIsHit] = useState(false);
  const [shake, setShake] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAttack = () => {
    const nextHealth = health - 5;
    if (nextHealth <= 0) {
      setHealth(0);
      onDefeat();
      return;
    }
    setHealth(nextHealth);
    setIsHit(true);
    setShake(5);
    setTimeout(() => {
      setIsHit(false);
      setShake(0);
    }, 100);
  };

  if (health <= 0) return null;

  return (
    <motion.div 
      animate={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        x: shake ? [0, -shake, shake, 0] : 0
      }}
      transition={{ 
        left: { duration: 2, ease: "easeInOut" },
        top: { duration: 2, ease: "easeInOut" },
        x: { duration: 0.1, repeat: Infinity }
      }}
      className="fixed z-[9999] pointer-events-auto cursor-crosshair"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <div 
        onClick={handleAttack}
        className={`relative group transition-transform ${isHit ? 'scale-95' : 'hover:scale-110'}`}
      >
        {/* Phase Effects */}
        {health < 50 && (
          <div className="absolute inset-0 bg-rose-600/30 blur-[100px] rounded-full animate-pulse"></div>
        )}
        
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-6 bg-slate-950 rounded-full border-2 border-white/10 overflow-hidden shadow-2xl">
          <motion.div 
            initial={{ width: '100%' }}
            animate={{ 
              width: `${health}%`,
              backgroundColor: health < 30 ? '#ef4444' : health < 60 ? '#f59e0b' : '#10b981'
            }}
            className="h-full shadow-[0_0_20px_rgba(239,68,68,0.5)]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] drop-shadow-md">VOID ENTITY CORE: {health}%</span>
          </div>
        </div>
        
        <div className="relative">
          <div className={`absolute inset-0 bg-rose-500/20 blur-3xl rounded-full ${health < 50 ? 'animate-ping' : 'animate-pulse'}`}></div>
          <div className={`w-48 h-48 bg-slate-950 rounded-full border-8 ${health < 30 ? 'border-rose-600 shadow-[0_0_100px_#ef4444]' : 'border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.5)]'} flex items-center justify-center transition-all duration-300 ${isHit ? 'brightness-150' : ''}`}>
            <Ghost size={96} className={`${health < 30 ? 'text-rose-600' : 'text-rose-500'} ${health < 50 ? 'animate-bounce' : ''}`} />
          </div>
          <div className="absolute -inset-8 border-4 border-dashed border-rose-500/30 rounded-full animate-spin-slow"></div>
          <div className="absolute -inset-12 border-2 border-dotted border-rose-500/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
        </div>

        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="px-6 py-2 bg-rose-500 text-slate-950 font-black text-xs uppercase tracking-[0.3em] rounded-full shadow-[0_0_30px_rgba(239,68,68,0.5)] border-2 border-white/20"
          >
            TERMINATE ENTITY
          </motion.div>
        </div>

        {/* Damage Particles */}
        {isHit && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 200, 
                  y: (Math.random() - 0.5) * 200, 
                  opacity: 0,
                  scale: 0
                }}
                className="absolute w-2 h-2 bg-rose-500 rounded-full"
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const MatrixRain = ({ performanceMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101";
    const fontSize = performanceMode ? 20 : 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "var(--primary)";
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, performanceMode ? 80 : 40);
    return () => clearInterval(interval);
  }, [performanceMode]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

const StarRain = ({ onCollect }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (items.length < 25) {
        setItems(prev => [...prev, {
          id: Math.random(),
          x: Math.random() * 90,
          delay: Math.random() * 2,
          rotation: Math.random() * 360,
          speed: Math.random() * 2 + 3,
          scale: Math.random() * 0.5 + 0.8
        }]);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {items.map(item => (
          <motion.div
            key={item.id}
            initial={{ y: -100, opacity: 0, rotate: item.rotation }}
            animate={{ 
              y: '110vh', 
              opacity: 1, 
              rotate: item.rotation + 360,
              x: [0, 30, -30, 0]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              y: { duration: item.speed, ease: "linear", delay: item.delay },
              rotate: { duration: item.speed, ease: "linear", delay: item.delay },
              x: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            onAnimationComplete={() => setItems(prev => prev.filter(i => i.id !== item.id))}
            className="absolute pointer-events-auto cursor-pointer p-8" // Increased padding for easier click
            style={{ left: `${item.x}%` }}
            onClick={() => {
              onCollect();
              setItems(prev => prev.filter(i => i.id !== item.id));
            }}
          >
            <div className="relative group" style={{ scale: item.scale }}>
              <div className="absolute -inset-4 bg-white/10 blur-2xl rounded-full group-hover:bg-white/20 transition-colors animate-pulse"></div>
              <div className="relative p-4 bg-black/90 backdrop-blur-md border-2 border-white rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.2)] group-hover:scale-125 transition-all duration-300">
                <Star size={40} className="text-white fill-white group-hover:rotate-12 transition-transform" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-black">
                  <Plus size={16} className="text-black font-bold" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const ExpRain = ({ onCollect }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (items.length < 30) {
        setItems(prev => [...prev, {
          id: Math.random(),
          amount: Math.floor(Math.random() * 8000) + 2000,
          x: Math.random() * 90,
          delay: Math.random() * 1.5,
          speed: Math.random() * 1.5 + 2.5
        }]);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {items.map(item => (
          <motion.div
            key={item.id}
            initial={{ y: -100, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: '110vh', 
              opacity: [0, 1, 1, 0], 
              scale: [0.5, 1.2, 1, 0.8],
              x: [0, -30, 30, 0]
            }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ 
              y: { duration: item.speed, ease: "linear", delay: item.delay },
              opacity: { duration: item.speed, ease: "linear", delay: item.delay },
              scale: { duration: item.speed, ease: "linear", delay: item.delay },
              x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
            onAnimationComplete={() => setItems(prev => prev.filter(i => i.id !== item.id))}
            className="absolute pointer-events-auto cursor-pointer p-10" // Massive padding for easy click
            style={{ left: `${item.x}%` }}
            onClick={() => {
              onCollect(item.amount);
              setItems(prev => prev.filter(i => i.id !== item.id));
            }}
          >
            <div className="flex flex-col items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-white blur-2xl opacity-40 group-hover:opacity-80 transition-opacity"></div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.8)] group-hover:scale-150 transition-transform border-4 border-black/30 relative z-10">
                  <Zap size={32} className="text-black animate-pulse" />
                </div>
              </div>
              <div className="mt-2 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full border border-white/50">
                <span className="text-xs font-black text-white tracking-tighter">+{item.amount.toLocaleString()} EXP</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};


const App = () => {
  const [currentView, setCurrentView] = useState(AppRoute.HOME);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
  }, [currentView]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(DEFAULT_USER);

  // Sync unlocks and check for admin status
  useEffect(() => {
    const themeUnlocks = { 10: 'emerald', 25: 'rose' };
    const frameUnlocks = { 5: 'neon', 15: 'emerald', 30: 'gold', 60: 'solar', 100: 'interstellar' };
    const charUnlocks = { 15: 'viper', 30: 'ghost', 50: 'phantom', 75: 'titan', 90: 'nova', 100: 'overlord' };

    setUser(prev => {
      let updated = false;
      const unlockedThemes = [...prev.unlockedThemes];
      const unlockedFrames = [...(prev.unlockedFrames || ['obsidian'])];
      const unlockedCharacters = [...(prev.unlockedCharacters || ['agent-x'])];
      
      // Check for admin status based on existing isAdmin
      // Note: In a real app, this would be handled by a secure backend
      const isAdmin = prev.isAdmin;

      Object.entries(themeUnlocks).forEach(([lvl, theme]) => {
        if (prev.level >= parseInt(lvl) && !unlockedThemes.includes(theme)) {
          unlockedThemes.push(theme);
          updated = true;
        }
      });

      Object.entries(frameUnlocks).forEach(([lvl, frame]) => {
        if (prev.level >= parseInt(lvl) && !unlockedFrames.includes(frame)) {
          unlockedFrames.push(frame);
          updated = true;
        }
      });

      Object.entries(charUnlocks).forEach(([lvl, char]) => {
        if (prev.level >= parseInt(lvl) && !unlockedCharacters.includes(char)) {
          unlockedCharacters.push(char);
          updated = true;
        }
      });

      if (updated || isAdmin !== prev.isAdmin) {
        return { 
          ...prev, 
          unlockedThemes, 
          unlockedFrames, 
          unlockedCharacters,
          isAdmin
        };
      }
      return prev;
    });
  }, [user.level]);

  useEffect(() => {
    const root = document.documentElement;
    const themes = {
      cyan: { primary: '#22d3ee', glow: 'rgba(34, 211, 238, 0.6)' },
      emerald: { primary: '#34d399', glow: 'rgba(52, 211, 153, 0.6)' },
      violet: { primary: '#a78bfa', glow: 'rgba(167, 139, 250, 0.6)' },
      cobalt: { primary: '#3b82f6', glow: 'rgba(59, 130, 246, 0.6)' },
      gold: { primary: '#fbbf24', glow: 'rgba(251, 191, 36, 0.8)' },
      fire: { primary: '#ef4444', glow: 'rgba(239, 68, 68, 0.6)' },
      rainbow: { primary: '#ff00ff', glow: 'rgba(255, 0, 255, 0.6)' },
      tester: { primary: '#3b82f6', glow: 'rgba(59, 130, 246, 0.6)' },
      owner: { primary: '#facc15', glow: 'rgba(250, 204, 21, 0.8)' },
      'black-white': { primary: '#ffffff', glow: 'rgba(255, 255, 255, 0.4)' },
      galaxy: { primary: '#c084fc', glow: 'rgba(192, 132, 252, 0.6)' },
      supernova: { primary: '#ff8c00', glow: 'rgba(255, 140, 0, 0.8)' },
      hologram: { primary: '#00ffff', glow: 'rgba(0, 255, 255, 0.6)' },
      ironman: { primary: '#ef4444', glow: 'rgba(239, 68, 68, 0.6)' },
      spongebob: { primary: '#facc15', glow: 'rgba(250, 204, 21, 0.6)' },
      kanye: { primary: '#d8b4fe', glow: 'rgba(216, 180, 254, 0.6)' },
      synthwave: { primary: '#ff00ff', glow: 'rgba(255, 0, 255, 0.6)' },
      usa: { primary: '#ef4444', glow: 'rgba(239, 68, 68, 0.6)' },
      retrofuture: { primary: '#f59e0b', glow: 'rgba(245, 158, 11, 0.6)' },
      void: { primary: '#ffffff', glow: 'rgba(255, 255, 255, 0.4)' }
    };

    const theme = user.currentTheme === 'custom' ? user.customTheme : themes[user.currentTheme] || themes.cyan;
    
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--accent', theme.primary);
    root.style.setProperty('--ring', theme.primary);
    
    // Apply theme class for specific styles if needed
    root.className = `font-sans antialiased bg-background text-foreground theme-${user.currentTheme}`;
  }, [user.currentTheme, user.customTheme]);
  const [activeGame, setActiveGame] = useState(null);
  const [playingGame, setPlayingGame] = useState(null);

  useEffect(() => {
    const handlePlayGame = (e) => {
      setPlayingGame(e.detail);
      setActiveGame(null);
    };
    window.addEventListener('play-game', handlePlayGame);
    return () => window.removeEventListener('play-game', handlePlayGame);
  }, []);
  const [chatMessages, setChatMessages] = useState([
    { username: 'SYSTEM', text: 'VOID NETWORK INITIALIZED. WELCOME EXPLORER.', timestamp: new Date().toISOString() },
    { username: 'ADMIN', text: 'REWORKED EDITION IS NOW LIVE. ENJOY THE EXPERIENCE.', timestamp: new Date().toISOString() }
  ]);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [adminAnnouncement, setAdminAnnouncement] = useState(null);
  const [gameOfTheWeek, setGameOfTheWeek] = useState({ id: 'classroom-9x', name: 'Classroom 9x' });
  const ws = useRef(null);
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [initialModalError, setInitialModalError] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isCloaked, setIsCloaked] = useState(false);
  const [isExitingCloak, setIsExitingCloak] = useState(false);
  const [isGlitched, setIsGlitched] = useState(false);
  const [isRainbowChaos, setIsRainbowChaos] = useState(false);
  const [isFireStorm, setIsFireStorm] = useState(false);
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [isMatrixRain, setIsMatrixRain] = useState(false);
  const [isGravityChaos, setIsGravityChaos] = useState(false);
  const [isChatOnFire, setIsChatOnFire] = useState(false);
  const [isVoidStorm, setIsVoidStorm] = useState(false);
  const [isSystemOverload, setIsSystemOverload] = useState(false);
  const [isGoldenHour, setIsGoldenHour] = useState(false);
  const [showBoss, setShowBoss] = useState(false);
  const [showBadgeRain, setShowBadgeRain] = useState(false);
  const [showExpRain, setShowExpRain] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [quests, setQuests] = useState([]);
  const [boosts, setBoosts] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const isModalOpen = !!(
    activeGame || 
    isProfileModalOpen || 
    selectedPlayer || 
    showInitialModal ||
    isMaintenanceMode
  );

  const lastNotifiedLevel = useRef(user?.level || 1);
  const lastNotifiedThemesCount = useRef(user?.unlockedThemes?.length || 0);
  const lastNotifiedFramesCount = useRef(user?.unlockedFrames?.length || 0);
  const lastNotifiedCharsCount = useRef(user?.unlockedCharacters?.length || 0);
  const fpsHistory = useRef([]);
  const lastLagNotification = useRef(0);

  useEffect(() => {
    const fetchLeaderboard = () => {
      const url = '/api/leaderboard';
      fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      })
        .then(async res => {
          const contentType = res.headers.get('content-type');
          if (!res.ok || !contentType || !contentType.includes('application/json')) {
            const text = await res.text();
            throw new Error(`HTTP ${res.status}: ${text.substring(0, 100)}`);
          }
          return res.json();
        })
        .then(setLeaderboardData)
        .catch(err => {
          console.error('Leaderboard fetch error:', err);
          if (err instanceof Error && err.message === 'Failed to fetch') {
            console.warn('Network error or server unreachable. Retrying in 5s...');
            setTimeout(fetchLeaderboard, 5000);
          }
        });
    };
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    ws.current = new WebSocket(`${protocol}//${window.location.host}`);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WS Message Received:', data.type, data);
      if (data.type === 'CHAT_MESSAGE') {
        setChatMessages((prev) => [...prev, data].slice(-50));
      } else if (data.type === 'DELETE_MESSAGE') {
        setChatMessages((prev) => prev.filter(msg => msg.id !== data.messageId));
      } else if (data.type === 'ADMIN_ANNOUNCEMENT') {
        setAdminAnnouncement({ text: data.text, sender: data.sender });
        setTimeout(() => setAdminAnnouncement(null), 10000);
      } else if (data.type === 'SYSTEM_MAINTENANCE') {
        setIsMaintenanceMode(data.enabled);
      } else if (data.type === 'GAME_OF_THE_WEEK') {
        setGameOfTheWeek({ id: data.gameId, name: data.gameName });
        addNotification('GAME OF THE WEEK', `NEW FEATURED TITLE: ${data.gameName.toUpperCase()}!`, 'success', <Star className="text-amber-400" />);
      } else if (data.type === 'CLEAR_CHAT') {
        setChatMessages([]);
        addNotification('System', 'Chat history has been cleared by an administrator.', 'system', <MessageSquare size={14} />);
      } else if (data.type === 'LEADERBOARD_WIPED') {
        setLeaderboardData([]);
        addNotification('System', 'The global leaderboard has been wiped by an administrator.', 'system', <Trophy size={14} />);
      } else if (data.type === 'ADMIN_ACTION') {
        const { actionType, target, abuseType, sender } = data;
        console.log('WS Admin Action Received:', actionType, target, abuseType);

        // Handle Global Events or Admin Abuse
        if (target === 'GLOBAL' || actionType === 'ADMIN_ABUSE') {
          if (abuseType) {
            const eventName = abuseType.replace(/_/g, ' ').toLowerCase();
            setAdminAnnouncement({
              text: `${sender?.username || 'SYSTEM'} STARTED ${eventName.toUpperCase()} EVENT!`,
              sender: sender || { username: 'SYSTEM', characterId: 'agent-x', frameId: 'obsidian' },
              timestamp: new Date().toISOString()
            });
            setTimeout(() => setAdminAnnouncement(null), 8000);
          }

          if (abuseType === 'RAINBOW_CHAOS') {
            setIsRainbowChaos(true);
            addNotification('ADMIN ABUSE', 'RAINBOW CHAOS ENABLED! RAINBOW THEME UNLOCKED!', 'system', <Palette className="text-indigo-400" />);
            setUser(prev => ({
              ...prev,
              unlockedThemes: Array.from(new Set([...(prev.unlockedThemes || []), 'rainbow']))
            }));
            setTimeout(() => setIsRainbowChaos(false), 30000);
          } else if (abuseType === 'GIVE_ALL_BADGE') {
            setShowBadgeRain(true);
            addNotification('ADMIN ABUSE', 'ALL BADGES GRANTED BY THE GODS!', 'system', <Award className="text-amber-400" />);
            setUser(prev => ({
              ...prev,
              unlockedBadges: Array.from(new Set([...(prev.unlockedBadges || []), 'tester', 'owner', 'early_adopter', 'bug_hunter', 'top_player', 'social_butterfly', 'wealthy', 'legendary']))
            }));
            setTimeout(() => setShowBadgeRain(false), 30000);
          } else if (abuseType === 'EXP_EXPLOSION') {
            setShowExpRain(true);
            addNotification('ADMIN ABUSE', 'EXP EXPLOSION! COLLECT THE ORBS!', 'system', <Zap className="text-cyan-400" />);
            setTimeout(() => setShowExpRain(false), 20000);
          } else if (abuseType === 'SYSTEM_GLITCH') {
            setIsGlitched(true);
            addNotification('ADMIN ABUSE', 'CRITICAL SYSTEM FAILURE DETECTED!', 'error', <ShieldAlert className="text-rose-500" />);
            setTimeout(() => setIsGlitched(false), 10000);
          } else if (abuseType === 'PARTY_MODE') {
            setIsPartyMode(true);
            setIsRainbowChaos(true);
            addNotification('ADMIN ABUSE', 'PARTY MODE ACTIVATED! ENJOY THE CHAOS!', 'success', <Sparkles className="text-yellow-400" />);
            setTimeout(() => {
              setIsPartyMode(false);
              setIsRainbowChaos(false);
            }, 30000);
          } else if (abuseType === 'NUKE_CHAT') {
            setIsChatOnFire(true);
            addNotification('ADMIN ABUSE', 'CHAT IS ON FIRE!', 'system', <ZapOff className="text-rose-600" />);
            setTimeout(() => setIsChatOnFire(false), 20000);
          } else if (abuseType === 'BOOST_ALL') {
            setBoosts(prev => [...prev, { id: 'admin-boost-' + Date.now(), name: 'ADMIN BOOST', multiplier: 5, expiresAt: Date.now() + 600000 }]);
            addNotification('ADMIN ABUSE', 'GLOBAL 5x EXP BOOST GRANTED!', 'system', <Zap className="text-amber-500" />);
          } else if (abuseType === 'BOSS_SPAWN') {
            setShowBoss(true);
            setChatMessages(prev => [...prev, {
              id: 'boss-' + Date.now() + '-' + Math.random(),
              username: 'VOID ENTITY',
              text: 'I HAVE ARRIVED TO CONSUME YOUR DATA. DEFEAT ME IF YOU CAN.',
              character: 'glitch',
              frame: 'glitch',
              timestamp: new Date().toISOString(),
              isBoss: true
            }]);
            addNotification('BOSS SPAWNED', 'A VOID ENTITY HAS ENTERED THE CHAT!', 'error', <Ghost className="text-white" />);
          } else if (abuseType === 'MATRIX_RAIN') {
            setIsMatrixRain(true);
            addNotification('ADMIN ABUSE', 'MATRIX OVERRIDE INITIATED!', 'system', <BrainCircuit className="text-emerald-500" />);
            setTimeout(() => setIsMatrixRain(false), 15000);
          } else if (abuseType === 'GRAVITY_CHAOS') {
            setIsGravityChaos(true);
            addNotification('ADMIN ABUSE', 'GRAVITY PROTOCOL OFFLINE!', 'system', <Rocket className="text-cyan-400" />);
            setTimeout(() => setIsGravityChaos(false), 15000);
          } else if (abuseType === 'FIRE_STORM') {
            setIsFireStorm(true);
            addNotification('ADMIN ABUSE', 'FIRE STORM INITIATED! FIRE THEME UNLOCKED!', 'system', <Zap className="text-orange-500" />);
            setUser(prev => ({
              ...prev,
              unlockedThemes: Array.from(new Set([...(prev.unlockedThemes || []), 'fire']))
            }));
            setTimeout(() => setIsFireStorm(false), 15000);
          } else if (abuseType === 'VOID_STORM') {
            setIsVoidStorm(true);
            addNotification('ADMIN ABUSE', 'VOID STORM INCOMING! REALITY COLLAPSING!', 'system', <Ghost className="text-purple-500" />);
            setTimeout(() => setIsVoidStorm(false), 20000);
          } else if (abuseType === 'SYSTEM_OVERLOAD') {
            setIsSystemOverload(true);
            addNotification('ADMIN ABUSE', 'SYSTEM OVERLOAD! ENERGY SURGE DETECTED!', 'system', <Zap className="text-amber-500" />);
            setTimeout(() => setIsSystemOverload(false), 15000);
          } else if (abuseType === 'GOLDEN_HOUR') {
            setIsGoldenHour(true);
            addNotification('ADMIN ABUSE', 'GOLDEN HOUR! ALL REWARDS TRIPLED!', 'system', <Star className="text-yellow-400" />);
            setTimeout(() => setIsGoldenHour(false), 60000);
          }
        }

        // Handle Targeted Actions
        if (target === user.username) {
          if (actionType === 'GIVE_EXP') {
            setUser(prev => ({ ...prev, score: prev.score + (data.amount || 0) }));
          } else if (actionType === 'GIVE_LEVEL') {
            setUser(prev => ({ ...prev, level: prev.level + (data.amount || 0) }));
          } else if (actionType === 'GIVE_BADGE') {
            setUser(prev => ({ 
              ...prev, 
              unlockedBadges: prev.unlockedBadges.includes(data.badgeId) 
                ? prev.unlockedBadges 
                : [...prev.unlockedBadges, data.badgeId] 
            }));
          } else if (actionType === 'RESET_STATS') {
            setUser(prev => ({ ...prev, score: 0, level: 1 }));
            addNotification('System Reset', 'Your stats have been reset by an administrator.', 'system', <Shield className="text-rose-500" />);
          } else if (actionType === 'TOGGLE_ADMIN') {
            setUser(prev => ({ ...prev, isAdmin: !prev.isAdmin }));
            addNotification('Security Update', 'Your administrative privileges have been updated.', 'system', <Shield className="text-theme" />);
          } else if (actionType === 'BAN_PLAYER') {
            setUser(prev => ({ ...prev, isBanned: true }));
          } else if (actionType === 'GIVE_ITEM') {
            const { itemType, itemId } = data;
            setUser(prev => {
              const key = itemType === 'theme' ? 'unlockedThemes' : itemType === 'frame' ? 'unlockedFrames' : 'unlockedCharacters';
              return {
                ...prev,
                [key]: Array.from(new Set([...(prev[key] || []), itemId]))
              };
            });
            addNotification('Item Received', `Admin granted you a new ${itemType}: ${itemId}`, 'system', <Star className="text-theme" />);
          } else if (actionType === 'GIFT_BOOST') {
            addNotification('2x EXP Boost!', 'An administrator granted you a temporary 2x Experience Boost!', 'system', <Zap className="text-amber-500" />);
          }
        }
      }
    };

    return () => ws.current?.close();
  }, []);

  const sendChatMessage = (text) => {
    if (!text.trim() || !ws.current) return;
    ws.current.send(JSON.stringify({
      type: 'CHAT_MESSAGE',
      id: Math.random().toString(36).substr(2, 9),
      username: user.username,
      text: text,
      character: user.currentCharacter,
      frame: user.currentFrame
    }));
  };

  const deleteChatMessage = (messageId) => {
    if (!ws.current || !user.isAdmin) return;
    ws.current.send(JSON.stringify({
      type: 'DELETE_MESSAGE',
      messageId
    }));
  };

  useEffect(() => {
    if (!user.settings.lagNotifications) return;

    let lastTime = performance.now();
    let frameCount = 0;

    const checkLag = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        fpsHistory.current.push(fps);
        if (fpsHistory.current.length > 5) fpsHistory.current.shift();

        const avgFps = fpsHistory.current.reduce((a, b) => a + b, 0) / fpsHistory.current.length;
        
        if (avgFps < 30 && Date.now() - lastLagNotification.current > 60000) {
          addNotification('Lag Detected', 'The experience could be laggy. Try closing other tabs.', 'system', <ZapOff className="text-rose-500" />);
          lastLagNotification.current = Date.now();
        }

        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(checkLag);
    };

    const animId = requestAnimationFrame(checkLag);
    return () => cancelAnimationFrame(animId);
  }, [user.settings.lagNotifications]);

  useEffect(() => {
    if (user.level > lastNotifiedLevel.current) {
      addNotification('Level Up!', `You reached Level ${user.level}`, 'level', <Zap className="text-theme" />);
      lastNotifiedLevel.current = user.level;
    }
  }, [user.level]);

  useEffect(() => {
    if (user.unlockedThemes.length > lastNotifiedThemesCount.current) {
      const newTheme = user.unlockedThemes[user.unlockedThemes.length - 1];
      addNotification('Theme Unlocked!', `New theme: ${newTheme}`, 'system', <Star className="text-theme" />);
      lastNotifiedThemesCount.current = user.unlockedThemes.length;
    }
  }, [user.unlockedThemes]);

  useEffect(() => {
    if (user.unlockedFrames.length > lastNotifiedFramesCount.current) {
      const newFrame = user.unlockedFrames[user.unlockedFrames.length - 1];
      addNotification('Frame Unlocked!', `New frame: ${newFrame}`, 'system', <Shield className="text-theme" />);
      lastNotifiedFramesCount.current = user.unlockedFrames.length;
    }
  }, [user.unlockedFrames]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  useEffect(() => {
    if (user.unlockedCharacters.length > lastNotifiedCharsCount.current) {
      const newChar = user.unlockedCharacters[user.unlockedCharacters.length - 1];
      addNotification('Avatar Unlocked!', `New character: ${newChar}`, 'system', <Zap className="text-theme" />);
      lastNotifiedCharsCount.current = user.unlockedCharacters.length;
    }
  }, [user.unlockedCharacters]);

  const lastCompletedQuestsCount = useRef((Array.isArray(quests) ? quests : []).filter(q => q.isCompleted).length);

  useEffect(() => {
    const completedQuests = (Array.isArray(quests) ? quests : []).filter(q => q.isCompleted);
    if (completedQuests.length > lastCompletedQuestsCount.current) {
      const latestQuest = completedQuests[completedQuests.length - 1];
      addNotification('Quest Completed!', latestQuest.title, 'system', <Trophy className="text-theme" />);
      lastCompletedQuestsCount.current = completedQuests.length;
    }
  }, [quests]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setBoosts(prev => (Array.isArray(prev) ? prev : []).filter(b => b.expiresAt > now));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedQuests = localStorage.getItem('classroom9x_quests_v1');
    const lastQuestDate = localStorage.getItem('classroom9x_quest_date');
    const today = new Date().toISOString().split('T')[0];

    const parsedQuests = savedQuests ? JSON.parse(savedQuests) : null;
    if (lastQuestDate === today && Array.isArray(parsedQuests) && parsedQuests.length > 0) {
      setQuests(parsedQuests);
    } else {
      const dailyQuests = getRandomQuests(QUEST_POOL, 3);
      localStorage.setItem('classroom9x_quest_date', today);
      localStorage.setItem('classroom9x_quests_v1', JSON.stringify(dailyQuests));
      setQuests(dailyQuests);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('classroom9x_quests_v1', JSON.stringify(quests));
  }, [quests]);

  useEffect(() => {
    if (user.username !== 'Player' && user.hasSetProfile) {
      const url = `${window.location.origin}/api/leaderboard/update`;
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.username,
          level: user.level,
          score: user.score,
          characterId: user.currentCharacter,
          featuredBadgeId: user.featuredBadgeId,
          gamesPlayed: user.gamesPlayed,
          frameId: user.currentFrame,
          unlockedBadges: user.unlockedBadges,
          currentTheme: user.currentTheme
        })
      }).catch(err => {
        console.error('Leaderboard sync error:', err);
      });
    }
  }, [user.score, user.level, user.username, user.hasSetProfile, user.currentCharacter, user.featuredBadgeId, user.gamesPlayed, user.currentFrame, user.unlockedBadges, user.currentTheme]);

  const updateQuestProgress = (type, amount = 1) => {
    setQuests(prev => prev.map(q => {
      if (q.questType === type && !q.isCompleted) {
        const newProgress = Math.min(q.progress + amount, q.target);
        const isCompleted = newProgress === q.target;
        return { ...q, progress: newProgress, isCompleted };
      }
      return q;
    }));
  };

  const handleClaimQuestReward = (questId) => {
    const quest = quests.find(q => q.id === questId);
    if (quest && quest.isCompleted) {
      if (quest.type === 'exp') {
        const multiplier = boosts.reduce((acc, b) => acc + (b.multiplier - 1), 1);
        const finalReward = Math.floor(quest.reward * multiplier);
        setUser(prev => ({ ...prev, exp: prev.exp + finalReward }));
        addNotification('Reward Claimed!', `+${finalReward} EXP Added`, 'level', <Zap className="text-theme" />);
      } else if (quest.type === 'rare') {
        setUser(prev => ({ ...prev, score: prev.score + 1000 }));
        addNotification('Rare Reward!', 'Score Boost Activated', 'badge', <Star className="text-amber-400" />);
        setBoosts(prev => [...prev, { id: Math.random().toString(), name: 'Rare Boost', multiplier: 2.0, expiresAt: Date.now() + 3600000 }]);
      } else if (quest.type === 'item' && quest.rewardItem) {
        const item = quest.rewardItem;
        setUser(prev => {
          const updates = {};
          if (item.type === 'frame') updates.unlockedFrames = Array.from(new Set([...(prev.unlockedFrames || []), item.id]));
          if (item.type === 'character') updates.unlockedCharacters = Array.from(new Set([...(prev.unlockedCharacters || []), item.id]));
          if (item.type === 'theme') updates.unlockedThemes = Array.from(new Set([...(prev.unlockedThemes || []), item.id]));
          return { ...prev, ...updates };
        });
        addNotification('Item Unlocked!', item.name, 'system', <Trophy className="text-theme" />);
      }
      setQuests(prev => prev.map(q => {
        if (q.id === questId) {
          return { ...q, claimed: true };
        }
        return q;
      }));
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => (Array.isArray(prev) ? prev : []).filter(n => n.id !== id));
  };










  const addNotification = (title, message, type, icon, color) => {
    if (title === 'ADMIN ANNOUNCEMENT') return;
    if (!user.settings.notifications) return;
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, title, message, type, icon, color }]);
    setTimeout(() => {
      removeNotification(id);
    }, 8000);
  };


  useEffect(() => {
    document.documentElement.style.setProperty('--ui-opacity', user.settings.uiOpacity.toString());
  }, [user.settings.uiOpacity]);

  useEffect(() => {
    const savedStats = localStorage.getItem('classroom9x_local_profile_v4');
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        if (!parsed.uid) {
          parsed.uid = 'user-' + Math.random().toString(36).substr(2, 9);
        }
        
        // Streak Logic
        const today = new Date().toISOString().split('T')[0];
        const lastLogin = parsed.lastLoginDate;
        let newStreak = parsed.streak || 1;
        
        if (lastLogin && lastLogin !== today) {
          const lastDate = new Date(lastLogin);
          const currentDate = new Date(today);
          const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        }
        
        const mergedUser = { 
          ...DEFAULT_USER, 
          ...parsed, 
          settings: { ...DEFAULT_USER.settings, ...(parsed.settings || {}) },
          streak: newStreak, 
          lastLoginDate: today 
        };
        setUser(mergedUser);
        if (!mergedUser.hasSetProfile) {
          setShowInitialModal(true);
        }
      } catch (e) {
        console.error("Failed to load profile", e);
        setShowInitialModal(true);
      }
    } else {
      setShowInitialModal(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('classroom9x_local_profile_v4', JSON.stringify(user));

    const body = document.getElementById('app-body');
    if (body) {
      body.setAttribute('data-theme', user.currentTheme);
      
      if (user.currentTheme === 'custom' && user.customTheme) {
        body.classList.add('custom-theme');
        body.style.setProperty('--primary', user.customTheme.primary);
        body.style.setProperty('--primary-glow', user.customTheme.glow);
        body.style.setProperty('--bg-dark', user.customTheme.bg);
      } else {
        body.classList.remove('custom-theme');
        body.style.removeProperty('--primary');
        body.style.removeProperty('--primary-glow');
        body.style.removeProperty('--bg-dark');
      }

      if (activeGame || isProfileModalOpen || showInitialModal) {
        if (!isCloaked) {
          body.style.overflow = 'hidden';
          body.classList.add('modal-open');
        } else {
          body.style.overflow = 'auto';
          body.classList.remove('modal-open');
        }
      } else {
        body.style.overflow = 'auto';
        body.classList.remove('modal-open');
      }

      const styles = ['default', 'amongus', 'star', 'crosshair', 'sword', 'neon', 'ring'];
      styles.forEach(s => body.classList.remove(`cursor-${s}`));

      if (user.settings.customCursor && !activeGame && user.currentTheme !== 'spongebob' && !isCloaked) {
        body.classList.add('custom-cursor-enabled');
        body.classList.add(`cursor-${user.settings.cursorStyle}`);
      } else {
        body.classList.remove('custom-cursor-enabled');
      }

      if (user.settings.animatedBg) {
        body.classList.add('animated-bg-enabled');
      } else {
        body.classList.remove('animated-bg-enabled');
      }

      if (user.settings.liquidGlass) {
        body.classList.add('liquid-glass');
      } else {
        body.classList.remove('liquid-glass');
      }
    }
  }, [user, activeGame, isCloaked]);

  const dailyPicks = useMemo(() => {
    const now = new Date();
    const estOffset = -5;
    const estDate = new Date(now.getTime() + (estOffset * 60 * 60 * 1000));
    const dateString = estDate.toISOString().split('T')[0];
    
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
      hash |= 0;
    }
    
    const seededRandom = () => {
      hash = Math.sin(hash) * 10000;
      return hash - Math.floor(hash);
    };

    const shuffled = [...GAMES_DATA].sort(() => seededRandom() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  useEffect(() => {
    if (!user) return;

    const checkBadge = (id) => {
      if (!user.unlockedBadges.includes(id)) {
        const badge = BADGES.find(b => b.id === id);
        if (badge) {
          setUser(prev => ({
            ...prev,
            unlockedBadges: [...prev.unlockedBadges, id]
          }));
          addNotification('Badge Unlocked!', badge.name, 'badge', <badge.icon className={badge.color === 'rainbow' ? 'mythic-rainbow-text' : ''} style={{ color: badge.color !== 'rainbow' ? badge.color : undefined }} />, badge.color);
        }
      }
    };

    if (user.gamesPlayed >= 1) checkBadge('first-contact');
    if (user.gamesPlayed >= 50) checkBadge('warlord');
    if (user.gamesPlayed >= 100) checkBadge('endurance');
    
    if (user.level >= 10) checkBadge('sentinel');
    if (user.level >= 50) checkBadge('elite-squad');
    if (user.level >= 100) checkBadge('overlord-badge');
    
    if (user.favorites.length >= 5) checkBadge('archivist');
    if (user.favorites.length >= 10) checkBadge('data-hoarder');
    
    if ((user?.unlockedThemes?.length || 0) >= 8) checkBadge('chameleon');
    if ((user?.unlockedFrames?.length || 0) >= 4) checkBadge('aesthetician');
    if ((user?.unlockedCharacters?.length || 0) >= 4) checkBadge('recruiter');
    
    if (user?.unlockedCharacters?.includes('glitch')) checkBadge('the-glitch');
  }, [
    user?.level, 
    user?.gamesPlayed, 
    user?.favorites?.length, 
    user?.unlockedThemes?.length, 
    user?.unlockedFrames?.length, 
    user?.unlockedCharacters?.length
  ]);

  const addExpAndTrackPlay = (game) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'GAME_START', gameId: game.id, gameName: game.name }));
    }
    setUser(prev => {
      const multiplier = boosts.reduce((acc, b) => acc + (b.multiplier - 1), 1);
      const baseExp = 50;
      const bonusExp = Math.floor(Math.random() * 25);
      const earnedExp = Math.floor((baseExp + bonusExp) * multiplier);
      
      const newExp = prev.exp + earnedExp;
      const requiredForNext = prev.level * LEVEL_UP_BASE;
      const newGamesPlayed = (prev.gamesPlayed || 0) + 1;

      let newLevel = prev.level;
      let unlockedThemes = [...prev.unlockedThemes];
      let unlockedFrames = [...(prev.unlockedFrames || ['obsidian'])];
      let unlockedCharacters = [...(prev.unlockedCharacters || ['agent-x'])];

      const themeUnlocks = {
        10: 'emerald', 25: 'rose'
      };
      const frameUnlocks = {
        5: 'neon', 15: 'emerald', 30: 'gold', 60: 'solar', 100: 'interstellar'
      };
      const charUnlocks = {
        15: 'viper', 30: 'ghost', 50: 'phantom', 75: 'titan', 90: 'nova', 100: 'overlord'
      };

      // Handle multiple level ups if enough EXP is earned
      while (newExp >= newLevel * LEVEL_UP_BASE && newLevel < 999) {
        newLevel += 1;
        
        if (themeUnlocks[newLevel] && !unlockedThemes.includes(themeUnlocks[newLevel])) {
          unlockedThemes.push(themeUnlocks[newLevel]);
        }

        if (frameUnlocks[newLevel] && !unlockedFrames.includes(frameUnlocks[newLevel])) {
          unlockedFrames.push(frameUnlocks[newLevel]);
        }

        if (charUnlocks[newLevel] && !unlockedCharacters.includes(charUnlocks[newLevel])) {
          unlockedCharacters.push(charUnlocks[newLevel]);
        }
      }

      return { 
        ...prev, 
        exp: newLevel >= 999 ? 0 : newExp, 
        level: newLevel, 
        score: prev.score + (earnedExp * 5),
        unlockedThemes,
        unlockedFrames,
        unlockedCharacters,
        gamesPlayed: newGamesPlayed 
      };
    });
  };

  const setTheme = (theme) => {
    if (typeof theme !== 'string') return;
    setUser(prev => ({ ...prev, currentTheme: theme }));
  };
  const setFrame = (frameId) => {
    if (typeof frameId !== 'string') return;
    setUser(prev => ({ ...prev, currentFrame: frameId }));
  };
  const setCharacter = (charId) => {
    if (typeof charId !== 'string') return;
    setUser(prev => ({ ...prev, currentCharacter: charId }));
  };

  const setFeaturedBadge = (badgeId) => {
    setUser(prev => ({ 
      ...prev, 
      featuredBadgeId: prev.featuredBadgeId === badgeId ? null : badgeId 
    }));
  };

  const setProfileTitle = (title) => {
    setUser(prev => ({ ...prev, currentTitle: title }));
    addNotification('Title Updated', `Current title: ${title}`, 'system', <Star size={14} />);
  };

  const toggleFriend = (username) => {
    setUser(prev => {
      const isFriend = (prev.friends || []).includes(username);
      const isSent = (prev.sentRequests || []).includes(username);
      
      if (isFriend) {
        // Remove friend
        return { 
          ...prev, 
          friends: (prev.friends || []).filter(f => f !== username) 
        };
      } else if (isSent) {
        // Cancel request
        return { 
          ...prev, 
          sentRequests: (prev.sentRequests || []).filter(r => r !== username) 
        };
      } else {
        // Send request
        addNotification('FRIEND REQUEST', `Friend request sent to ${username}`, 'success', <Users size={14} />);
        return { 
          ...prev, 
          sentRequests: [...(prev.sentRequests || []), username] 
        };
      }
    });
  };

  const acceptFriendRequest = (username) => {
    setUser(prev => ({
      ...prev,
      friendRequests: (prev.friendRequests || []).filter(r => r !== username),
      friends: [...(prev.friends || []), username]
    }));
    addNotification('FRIEND ADDED', `You are now friends with ${username}`, 'success', <Users size={14} />);
  };

  const rejectFriendRequest = (username) => {
    setUser(prev => ({
      ...prev,
      friendRequests: (prev.friendRequests || []).filter(r => r !== username)
    }));
  };

  const updateSettings = (settings) => {
    setUser(prev => ({ ...prev, settings: { ...prev.settings, ...settings } }));
  };

  const redeemCode = (code) => {
    const cleanCode = code.trim().toLowerCase();
    const alreadyRedeemed = user.redeemedCodes?.includes(cleanCode);

    if (alreadyRedeemed && cleanCode !== 'codes211') {
      return { success: false, message: 'DECRYPTION KEY ALREADY USED' };
    }

    if (cleanCode === 'admin6') {
      setUser(prev => ({
        ...prev,
        isAdmin: true,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'admin6']))
      }));
      addNotification('Security Override', 'ADMINISTRATIVE PRIVILEGES GRANTED', 'system', <Shield className="text-rose-500" />);
      return { success: true, message: 'ACCESS GRANTED: ADMIN CONSOLE UNLOCKED' };
    }

    if (cleanCode === 'codes211') {
      setQuests(prev => prev.map(q => ({ ...q, progress: q.target, isCompleted: true })));
      addNotification('Daily Override', 'ALL DAILY OBJECTIVES COMPLETED', 'system', <Zap className="text-theme" />);
      return { success: true, message: 'OVERRIDE SUCCESSFUL: DAILY QUESTS COMPLETED' };
    }

    if (cleanCode === 'glitch') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'glitch'])),
        unlockedFrames: Array.from(new Set([...(prev.unlockedFrames || []), 'glitch'])),
        unlockedCharacters: Array.from(new Set([...(prev.unlockedCharacters || []), 'glitch']))
      }));
      addNotification('Connection Established', 'PROTOCOL: GLITCH EXPANSION LOADED', 'system', <Zap className="text-theme" />);
      return { success: true, message: 'PROTOCOL BREACH: GLITCH CHARACTER ACQUIRED' };
    }

    if (cleanCode === 'rainbow') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'rainbow'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'rainbow']))
      }));
      addNotification('Connection Established', 'PROTOCOL: SPECTRUM MODE ACTIVE', 'system', <Palette className="text-theme" />);
      return { success: true, message: 'PROTOCOL INITIATED: SPECTRUM MODE UNLOCKED' };
    }

    if (cleanCode === 'spongebob') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'spongebob'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'spongebob'])),
        unlockedCharacters: Array.from(new Set([...(prev.unlockedCharacters || []), 'spongebob']))
      }));
      addNotification('Connection Established', 'PROTOCOL: BIKINI BOTTOM LINKED', 'system', <Star className="text-yellow-500" />);
      return { success: true, message: 'WHO LIVES IN A PINEAPPLE UNDER THE SEA? SPONGEBOB THEME & AVATAR UNLOCKED!' };
    }

    if (cleanCode === 'hologram') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'hologram'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'hologram'])),
        unlockedFrames: Array.from(new Set([...(prev.unlockedFrames || []), 'hologram']))
      }));
      addNotification('Connection Established', 'PROTOCOL: HOLO MATRIX SYNCED', 'system', <Layers className="text-theme" />);
      return { success: true, message: 'VIRTUAL DEPLOYMENT: HOLOGRAM MODULE & FRAME ACTIVATED' };
    }

    if (cleanCode === 'jarvis') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'jarvis'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'ironman'])),
        unlockedCharacters: Array.from(new Set([...(prev.unlockedCharacters || []), 'stark']))
      }));
      addNotification('Connection Established', 'PROTOCOL: JARVIS ONLINE', 'system', <Bot className="text-theme" />);
      return { success: true, message: 'WELCOME HOME, SIR: STARK AVATAR UNLOCKED' };
    }

    if (cleanCode === 'merica') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'merica'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'usa'])),
        unlockedFrames: Array.from(new Set([...(prev.unlockedFrames || []), 'usa'])),
        unlockedCharacters: Array.from(new Set([...(prev.unlockedCharacters || []), 'patriot']))
      }));
      addNotification('Connection Established', 'PROTOCOL: FREEDOM SYNCED', 'system', <Zap className="text-theme" />);
      return { success: true, message: 'PROTOCOL INITIATED: USA THEME, FRAME & PATRIOT AVATAR UNLOCKED' };
    }

    if (cleanCode === '9xisback') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), '9xisback'])),
        level: prev.level + 10
      }));
      addNotification('Code Redeemed!', 'PROFILE CLEARANCE GRANTED', 'system', <Shield className="text-theme" />);
      return { success: true, message: 'PROFILE CLEARANCE GRANTED: +10 LEVELS' };
    }

    if (cleanCode === 'classroom9x') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'classroom9x'])),
        score: prev.score + 100000,
        level: prev.level + 5
      }));
      addNotification('Classroom 9x Access', 'LEGACY PROTOCOL ACTIVATED', 'system', <Crown className="text-theme" />);
      return { success: true, message: '9X PROTOCOL: +100,000 EXP & +5 LEVELS' };
    }

    if (cleanCode === 'admin6') {
      const allThemes = ['cyan', 'emerald', 'violet', 'cobalt', 'gold', 'galaxy', 'hologram', 'rainbow', 'ironman', 'spongebob', 'owner', 'synthwave', 'retrofuture', 'kanye', 'tester', 'usa'];
      const allFrames = ['obsidian', 'default', 'neon', 'solar', 'interstellar', 'glitch', 'hologram', 'deep-sea', 'owner', 'diamond', 'cyberpunk', 'matrix', 'tester', 'usa'];
      const allChars = ['agent-x', 'viper', 'ghost', 'phantom', 'titan', 'nova', 'overlord', 'spongebob', 'stark', 'glitch', 'doge-king', 'cyber-samurai', 'royal-knight', 'neon-cat', 'space-ranger', 'kanye', 'ye-mask', 'patriot'];
      const allBadges = BADGES.map(b => b.id);
      const allCodes = ['glitch', 'rainbow', 'spongebob', 'hologram', 'jarvis', '9xisback', 'admin6', 'imagenius', 'tester9832', 'owner', 'CODES211', 'merica'];
      
      setUser(prev => ({
        ...prev,
        level: 999,
        isAdmin: true,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), ...allCodes])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, ...allThemes])),
        unlockedFrames: Array.from(new Set([...(prev.unlockedFrames || []), ...allFrames])),
        unlockedCharacters: Array.from(new Set([...(prev.unlockedCharacters || []), ...allChars])),
        unlockedBadges: Array.from(new Set([...(prev.unlockedBadges || []), ...allBadges])),
        currentTheme: 'owner',
        currentFrame: 'owner',
        score: 999999
      }));
      addNotification('ADMIN ACCESS GRANTED', 'WELCOME BACK, OWNER', 'system', <Crown className="text-theme" />);
      return { success: true, message: 'ADMIN PROTOCOL ACTIVATED: EVERYTHING UNLOCKED' };
    }

    if (cleanCode === 'imagenius') {
      const kanyeThemes = ['kanye'];
      const kanyeChars = ['kanye', 'ye-mask'];
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'imagenius'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, ...kanyeThemes])),
        unlockedCharacters: Array.from(new Set([...(prev.unlockedCharacters || []), ...kanyeChars])),
      }));
      addNotification('IMAGENIUS ACTIVATED', 'I AM A GOD', 'system', <Star className="text-theme" />);
      return { success: true, message: 'KANYE EXCLUSIVES UNLOCKED: GRADUATION THEME, YE, YE MASK' };
    }

    if (cleanCode === 'tester9832') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'tester9832'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'tester'])),
        unlockedFrames: Array.from(new Set([...(prev.unlockedFrames || []), 'tester'])),
        unlockedBadges: Array.from(new Set([...(prev.unlockedBadges || []), 'tester-badge'])),
      }));
      addNotification('Early Access Granted', 'WELCOME TESTER', 'system', <Trophy className="text-theme" />);
      return { success: true, message: 'EARLY ACCESS ITEMS UNLOCKED: TESTER THEME, TESTER FRAME, TESTER BADGE' };
    }
    return { success: false, message: 'INVALID DECRYPTION KEY' };
  };

  const toggleFavorite = (gameId) => {
    if (typeof gameId !== 'string') return;
    const isAdding = !(user.favorites || []).includes(gameId);
    
    setUser(prev => {
      const newFavorites = isAdding 
        ? [...(prev.favorites || []), gameId]
        : (prev.favorites || []).filter(id => id !== gameId);
      
      // Also pin/unpin when favoriting
      const newPinned = isAdding
        ? [...new Set([...(prev.pinnedGames || []), gameId])]
        : (prev.pinnedGames || []).filter(id => id !== gameId);
        
      return { ...prev, favorites: newFavorites, pinnedGames: newPinned };
    });

    if (isAdding) {
      addNotification('Game Pinned', 'Added to your quick access.', 'system', <Star size={14} className="text-primary" />);
    }
  };

  const togglePin = (gameId) => {
    if (typeof gameId !== 'string') return;
    const isAdding = !(user.pinnedGames || []).includes(gameId);
    const newPinned = isAdding 
      ? [...(user.pinnedGames || []), gameId]
      : (user.pinnedGames || []).filter(id => id !== gameId);
    setUser({ ...user, pinnedGames: newPinned });
    addNotification(isAdding ? 'Game Pinned' : 'Game Unpinned', isAdding ? 'Added to your quick access.' : 'Removed from quick access.', 'system', <Star size={14} className="text-primary" />);
  };

  const handleGameSelect = (game) => {
    setActiveGame(game);
    addExpAndTrackPlay(game);
    updateQuestProgress('play', 1);
    updateQuestProgress('score', 250);
  };

  const handleUpdateUsername = (newName) => {
    const FORBIDDEN_WORDS = [
      'fuck', 'shit', 'ass', 'bitch', 'cunt', 'dick', 'pussy', 'nigger', 'faggot', 'bastard',
      'slut', 'whore', 'cock', 'cum', 'penis', 'vagina', 'porn', 'sex', 'hitler', 'nazi'
    ];
    const cleanName = newName.trim().toLowerCase();
    if (cleanName === 'player') {
      addNotification('System Error', 'CHOOSE A MORE UNIQUE USERNAME', 'error', <ShieldAlert className="text-rose-500" />);
      return;
    }
    if (FORBIDDEN_WORDS.some(word => cleanName.includes(word))) {
      addNotification('System Error', 'INAPPROPRIATE USERNAME DETECTED', 'error', <ShieldAlert className="text-rose-500" />);
      return;
    }
    // Check if username is already taken in the leaderboard
    const isTaken = leaderboardData.some(entry => entry.username.toLowerCase() === cleanName && entry.uid !== user.uid);
    if (isTaken) {
      addNotification('System Error', 'USERNAME ALREADY TAKEN', 'error', <ShieldAlert className="text-rose-500" />);
      return;
    }
    setUser(prev => ({ ...prev, username: newName }));
    addNotification('Identity Updated', `New username: ${newName}`, 'system', <Star className="text-theme" />);
  };

  const handleResetProgress = () => {
    setUser({
      ...DEFAULT_USER,
      username: user.username, // Keep username if they want? Or full reset? 
      // User said "permanently erase ALL of your data", so let's do a full reset but maybe keep the username they just set?
      // Actually, DEFAULT_USER has 'Player', so let's just reset everything.
      uid: user.uid // Keep UID for consistency if needed, but they said "ALL of your data"
    });
    setCurrentView(AppRoute.HOME);
    addNotification('System Reset', 'All progress has been erased.', 'error', <Trash2 className="text-rose-500" />);
  };

  const handleInitialNameSubmit = (name) => {
    const FORBIDDEN_WORDS = [
      'fuck', 'shit', 'ass', 'bitch', 'cunt', 'dick', 'pussy', 'nigger', 'faggot', 'bastard',
      'slut', 'whore', 'cock', 'cum', 'penis', 'vagina', 'porn', 'sex', 'hitler', 'nazi'
    ];
    const cleanName = name.trim().toLowerCase();
    if (FORBIDDEN_WORDS.some(word => cleanName.includes(word))) {
      setInitialModalError('INAPPROPRIATE USERNAME DETECTED');
      return;
    }
    // Check if username is already taken in the leaderboard
    const isTaken = leaderboardData.some(entry => entry.username.toLowerCase() === cleanName);
    if (isTaken) {
      setInitialModalError('USERNAME ALREADY TAKEN');
      return;
    }
    setInitialModalError(null);
    setUser(prev => ({ ...prev, username: name, hasSetProfile: true }));
    setShowInitialModal(false);
  };

  const filteredGames = useMemo(() => {
    if (!searchQuery) return GAMES_DATA;
    return (GAMES_DATA || []).filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleFlameClick = () => {
    if (!user.unlockedThemes.includes('fire')) {
      setUser(prev => ({
        ...prev,
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'fire']))
      }));
      addNotification('Theme Unlocked!', 'You caught a flame! Fire theme unlocked.', 'badge', <Flame className="text-orange-500" />);
    }
  };

  const renderContent = () => {
    if (searchQuery) return <Library games={filteredGames} favorites={user.favorites} pinnedGames={user.pinnedGames} onToggleFavorite={toggleFavorite} onTogglePin={togglePin} onPlayGame={handleGameSelect} />;
    switch (currentView) {
      case AppRoute.CATEGORY: return <CategoryPage categoryId={selectedCategoryId || ''} games={GAMES_DATA} favorites={user.favorites} pinnedGames={user.pinnedGames} onToggleFavorite={toggleFavorite} onTogglePin={togglePin} onPlayGame={handleGameSelect} />;
      case AppRoute.LIBRARY: return <Library games={GAMES_DATA} favorites={user.favorites} pinnedGames={user.pinnedGames} onToggleFavorite={toggleFavorite} onTogglePin={togglePin} onPlayGame={handleGameSelect} />;
      case AppRoute.APPS: 
        if (!user.isAdmin) return <LockedPage title="Apps" onReturn={() => setCurrentView(AppRoute.HOME)} />;
        return (
          <AppsPage 
            user={user} 
            messages={chatMessages} 
            sendMessage={sendChatMessage} 
            deleteMessage={deleteChatMessage} 
            isFire={isChatOnFire} 
            onFlameClick={handleFlameClick} 
            onToggleChat={() => setIsChatOpen(prev => !prev)}
          />
        );
      case AppRoute.PROXY: return <ProxyPage />;
      case AppRoute.CUSTOMIZATION: 
        if (!user.isAdmin) return <LockedPage title="Customization" onReturn={() => setCurrentView(AppRoute.HOME)} />;
        return (
          <Customization 
            user={user}
            onUpdateUser={setUser}
            onUpdateUsername={handleUpdateUsername}
          />
        );
      case AppRoute.SETTINGS: return <Settings user={user} onUpdateSettings={updateSettings} onSetTheme={setTheme} onRedeemCode={redeemCode} onResetProgress={handleResetProgress} onUpdateUsername={handleUpdateUsername} />;
      case AppRoute.LEADERBOARD: 
        if (!user.isAdmin) return <LockedPage title="Leaderboard" onReturn={() => setCurrentView(AppRoute.HOME)} />;
        return <Leaderboard user={user} onPlayerClick={setSelectedPlayer} leaderboardData={leaderboardData} />;
      case AppRoute.FRIENDS: 
        if (!user.isAdmin) return <LockedPage title="Social" onReturn={() => setCurrentView(AppRoute.HOME)} />;
        return <Friends user={user} onUpdateUser={setUser} />;
      case AppRoute.ADMIN: return <AdminPanel user={user} onClose={() => setCurrentView(AppRoute.HOME)} />;
      default: return (
        <Home 
          user={user} 
          games={GAMES_DATA} 
          dailyPicks={dailyPicks} 
          favorites={user.favorites}
          pinnedGames={user.pinnedGames}
          boosts={boosts} 
          gameOfTheWeek={gameOfTheWeek}
          onToggleFavorite={toggleFavorite}
          onTogglePin={togglePin}
          onPlayGame={handleGameSelect}
          onSwitchToLibrary={() => setCurrentView(AppRoute.LIBRARY)}
          onProfileClick={() => setIsProfileModalOpen(true)}
          onLeaderboardClick={() => setCurrentView(AppRoute.LEADERBOARD)}
        />
      );
    }
  };

  const handleSetCustomTheme = (config) => {
    setUser(prev => ({
      ...prev,
      customTheme: config,
      currentTheme: 'custom'
    }));
  };

  const handleToggleCloak = () => {
    if (isCloaked) {
      setIsExitingCloak(true);
      setIsCloaked(false);
    } else {
      setIsCloaked(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Shift + G to toggle cloak
      if (e.shiftKey && e.key === 'G') {
        e.preventDefault();
        handleToggleCloak();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCloaked]);

  const handleLoadingComplete = React.useCallback(() => {
    setIsInitialLoading(false);
    setIsExitingCloak(false);
  }, []);

  if (isInitialLoading || isExitingCloak) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (isCloaked) {
    return <EducationalCloak onToggleCloak={handleToggleCloak} />;
  }

  return (
    <div className={`proto-shell theme-${user.currentTheme} ${isModalOpen ? 'modal-active' : ''} ${user.settings.customCursor ? 'custom-cursor-active' : ''} ${user.settings.disableGlow ? 'disable-glow' : ''} ${user.settings.highContrast ? 'high-contrast' : ''} ${user.settings.compactMode ? 'compact-mode' : ''}`}>
      <div className="proto-backdrop" />
      <div className="proto-grid" />
      
      {user.settings.animatedBg && <InteractiveBackground performanceMode={user.settings.performanceMode} lowQualityParticles={user.settings.lowQualityParticles} currentTheme={user.currentTheme} />}
      {user.settings.customCursor && <CustomCursor />}
      
      <div className="proto-content-shell">
        <div className={`min-h-screen bg-background/40 text-white font-inter selection:bg-theme selection:text-slate-950 overflow-x-hidden ${isGlitched ? 'glitch-active' : ''} ${isPartyMode ? 'party-mode-active' : ''}`}>
          {/* Background Effects */}
          {isMatrixRain && <MatrixRain performanceMode={user.settings.performanceMode} />}
          {isRainbowChaos && <div className="rainbow-chaos-overlay" />}
          
          <div className={`relative z-10 ${isGravityChaos ? 'gravity-chaos-active' : ''}`}>
            <Layout 
              user={user}
              onSearch={setSearchQuery} 
              onSetTheme={setTheme}
              currentView={currentView}
              selectedCategoryId={selectedCategoryId}
              onViewChange={(view, param) => {
                if (view === AppRoute.ADMIN) {
                  setIsAdminPanelOpen(prev => !prev);
                  return;
                }
                setCurrentView(view);
                setSelectedCategoryId(param || null);
                setSearchQuery('');
              }}
              onProfileClick={() => setIsProfileModalOpen(true)}
            >
              <>
                <AnimatePresence>
                  {isChatOpen && (
                    <GlobalChat 
                      messages={chatMessages} 
                      onSendMessage={(text) => {
                        const newMsg = { username: user.username, text, timestamp: new Date().toISOString() };
                        setChatMessages(prev => [...prev, newMsg].slice(-50));
                      }}
                      user={user}
                      onClose={() => setIsChatOpen(false)}
                    />
                  )}
                </AnimatePresence>
                {user.isBanned && (
                  <div key="banned-overlay" className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center p-8 text-center">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="max-w-md space-y-8"
                    >
                      <div className="w-24 h-24 bg-rose-500/20 rounded-3xl flex items-center justify-center text-rose-500 border border-rose-500/20 mx-auto shadow-[0_0_50px_rgba(244,63,94,0.3)]">
                        <Shield size={48} />
                      </div>
                      <div className="space-y-4">
                        <h1 className="text-4xl font-orbitron font-black text-white uppercase tracking-tighter">Sector <span className="text-rose-500">Lockout</span></h1>
                        <p className="text-slate-400 font-medium leading-relaxed">Your access to this sector has been terminated by the system administrator. Protocol breach detected.</p>
                      </div>
                      <div className="pt-8 border-t border-white/5">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Status: Permanent Suspension</p>
                      </div>
                    </motion.div>
                  </div>
                )}

                {isMaintenanceMode && !user.isAdmin && (
                  <div key="maintenance-overlay" className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center p-8 text-center">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="max-w-md space-y-8"
                    >
                      <div className="w-24 h-24 bg-amber-500/20 rounded-3xl flex items-center justify-center text-amber-500 border border-amber-500/20 mx-auto shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                        <SettingsIcon size={48} className="animate-spin-slow" />
                      </div>
                      <div className="space-y-4">
                        <h1 className="text-4xl font-orbitron font-black text-white uppercase tracking-tighter">System <span className="text-amber-500">Maintenance</span></h1>
                        <p className="text-slate-400 font-medium leading-relaxed">The sector is currently undergoing scheduled maintenance. Please stand by for system restoration.</p>
                      </div>
                      <div className="pt-8 border-t border-white/5">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Status: Offline for Calibration</p>
                      </div>
                    </motion.div>
                  </div>
                )}

                <AnimatePresence key="view-presence" mode="wait">
                  <motion.div
                    key={currentView + (selectedCategoryId || '') + searchQuery}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>

                <Footer key="footer" />
                
                <div key="notifications-container" className="fixed bottom-8 right-8 z-[200] flex flex-col gap-4 pointer-events-none">
                  <AnimatePresence mode="popLayout">
                    {notifications.map(n => (
                      <motion.div 
                        key={n.id} 
                        layout
                        initial={{ opacity: 0, x: 100, scale: 0.8, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: 50, scale: 0.9, filter: 'blur(5px)' }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="group relative flex items-center gap-5 p-5 bg-slate-950/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto min-w-[340px] overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
                        
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden ${
                          n.type === 'level' ? 'bg-primary/20 text-primary border border-primary/30' : 
                          n.type === 'badge' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 
                          'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                        }`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                          {n.type === 'level' ? <Zap size={28} className="animate-pulse relative z-10" /> : n.type === 'badge' ? <Award size={28} className="relative z-10" /> : <Star size={28} className="relative z-10" />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40 mb-1">{n.type === 'level' ? 'System Upgrade' : n.type === 'badge' ? 'Achievement' : 'Notification'}</p>
                          <p className="text-sm font-black text-white truncate tracking-tight uppercase italic">{n.message}</p>
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(n.id);
                          }}
                          onPointerDown={(e) => e.stopPropagation()}
                          className="p-2 text-white/20 hover:text-white hover:bg-white/5 rounded-xl transition-all relative z-20 pointer-events-auto"
                        >
                          <X size={16} />
                        </button>

                        <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                          <motion.div 
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            className={`h-full ${
                              n.type === 'level' ? 'bg-primary' : 
                              n.type === 'badge' ? 'bg-amber-500' : 
                              'bg-emerald-500'
                            } shadow-[0_0_10px_currentColor]`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            </Layout>
          </div>
        </div>
      </div>

      {/* Modals outside effect containers */}
      {activeGame && <GameModal game={activeGame} isFavorite={user.favorites.includes(activeGame.id)} onToggleFavorite={toggleFavorite} onClose={() => setActiveGame(null)} />}
      {playingGame && <GameView game={playingGame} onClose={() => setPlayingGame(null)} />}
      {isProfileModalOpen && (
        <ProfileModal 
          user={user} 
          onUpdateUser={setUser}
          onClose={() => setIsProfileModalOpen(false)} 
          onLogout={() => {
            localStorage.removeItem('classroom9x_local_profile_v4');
            window.location.reload();
          }}
        />
      )}
      {isAdminPanelOpen && <AdminPanel user={user} onClose={() => setIsAdminPanelOpen(false)} />}
      
      {showBoss && (
        <BossEvent onDefeat={() => {
          setShowBoss(false);
          setUser(prev => ({ ...prev, score: prev.score + 500000 }));
          addNotification('VICTORY', 'VOID ENTITY DEFEATED! +500,000 EXP FOR EVERYONE!', 'success', <Trophy className="text-amber-400" />);
        }} />
      )}
      {showBadgeRain && user.settings.backgroundEffects && (
        <StarRain onCollect={() => {
          setUser(prev => ({ ...prev, score: prev.score + 25000 }));
          addNotification('STAR COLLECTED', `+25,000 EXP! Catch them all!`, 'success', <Star className="text-amber-400" />);
        }} />
      )}
      {showExpRain && user.settings.backgroundEffects && (
        <ExpRain onCollect={(amount) => {
          setUser(prev => ({ ...prev, score: prev.score + amount }));
          addNotification('EXP COLLECTED', `+${amount} EXP!`, 'success', <Zap size={14} className="text-cyan-400" />);
        }} />
      )}

      <AnimatePresence>
        {adminAnnouncement && (
          <motion.div 
            initial={{ opacity: 0, y: -120, x: '-50%', scale: 0.9 }}
            animate={{ opacity: 1, y: 30, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: -120, x: '-50%', scale: 0.9 }}
            transition={{ type: "spring", damping: 15 }}
            className="fixed top-0 left-1/2 z-[300] w-full max-w-3xl px-4 pointer-events-none"
          >
            <div className="relative group overflow-hidden rounded-[2.5rem] bg-slate-950/90 backdrop-blur-3xl border-2 border-amber-500/40 p-6 shadow-[0_0_80px_rgba(245,158,11,0.3)] pointer-events-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/20 animate-pulse"></div>
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 animate-[shimmer_3s_infinite]"></div>
              
              <div className="relative flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <Megaphone size={32} className="animate-bounce" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-[11px] font-black text-amber-500 uppercase tracking-[0.4em]">
                      Admin Message {adminAnnouncement.sender?.username ? `• ${adminAnnouncement.sender.username}` : ''}
                    </p>
                    <div className="h-px flex-1 bg-amber-500/20"></div>
                  </div>
                  <p className="text-xl font-black text-white leading-tight italic uppercase tracking-tight">{adminAnnouncement.text}</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></div>
                  <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Active</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isFireStorm && (
        <div className="fixed inset-0 z-[2000] pointer-events-none overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-orange-600/30 via-red-600/20 to-transparent animate-pulse"
          />
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 20, 
                scale: 0,
                opacity: 0
              }}
              animate={{ 
                y: -100,
                scale: [0, 1.5, 1, 0],
                opacity: [0, 1, 0.5, 0],
                x: (Math.random() - 0.5) * 300 + (Math.random() * window.innerWidth)
              }}
              transition={{ 
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeOut"
              }}
              className="absolute"
              style={{ color: Math.random() > 0.5 ? '#f97316' : '#ef4444' }}
            >
              <Flame size={16 + Math.random() * 32} className="animate-pulse" />
            </motion.div>
          ))}
        </div>
      )}

      {isRainbowChaos && (
        <div className="fixed inset-0 z-[2000] pointer-events-none overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-green-500/20 to-blue-500/20 animate-[rainbow-bg_5s_linear_infinite] blur-[100px]"
          />
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -20, 
                scale: 0,
                rotate: 0,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`
              }}
              animate={{ 
                y: window.innerHeight + 20,
                scale: [0, 1, 1, 0],
                rotate: 360,
                x: (Math.random() - 0.5) * 200 + (Math.random() * window.innerWidth)
              }}
              transition={{ 
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
              className="absolute text-2xl"
            >
              <Palette size={24 + Math.random() * 24} />
            </motion.div>
          ))}
        </div>
      )}

      {isVoidStorm && (
        <div className="fixed inset-0 z-[2000] pointer-events-none overflow-hidden bg-purple-950/20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.2, 0.5, 0] }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="absolute inset-0 bg-white/5"
          />
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                scale: 0,
                opacity: 0
              }}
              animate={{ 
                scale: [0, 4, 0],
                opacity: [0, 0.3, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
              className="absolute text-purple-500/30"
            >
              <Ghost size={100 + Math.random() * 200} />
            </motion.div>
          ))}
        </div>
      )}

      {isSystemOverload && (
        <div className="fixed inset-0 z-[2000] pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              backgroundColor: ['rgba(245,158,11,0)', 'rgba(245,158,11,0.1)', 'rgba(245,158,11,0)']
            }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0"
          />
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                scale: 0,
                opacity: 0
              }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: (Math.random() - 0.5) * 1000 + (Math.random() * window.innerWidth),
                y: (Math.random() - 0.5) * 1000 + (Math.random() * window.innerHeight)
              }}
              transition={{ 
                duration: 0.5 + Math.random() * 1,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "circOut"
              }}
              className="absolute text-amber-500"
            >
              <Zap size={20 + Math.random() * 40} />
            </motion.div>
          ))}
        </div>
      )}

      {isGoldenHour && (
        <div className="fixed inset-0 z-[2000] pointer-events-none overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-yellow-500/10"
          />
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -20, 
                scale: 0,
                rotate: 0
              }}
              animate={{ 
                y: window.innerHeight + 20,
                scale: [0, 1, 1, 0],
                rotate: 720,
                x: (Math.random() - 0.5) * 100 + (Math.random() * window.innerWidth)
              }}
              transition={{ 
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
              }}
              className="absolute text-yellow-400"
            >
              <Star size={16 + Math.random() * 16} fill="currentColor" />
            </motion.div>
          ))}
        </div>
      )}

      {selectedPlayer && (
        <MiniProfile 
          player={selectedPlayer} 
          currentUser={user}
          isFriend={(user.friends || []).includes(selectedPlayer.username)}
          isSent={(user.sentRequests || []).includes(selectedPlayer.username)}
          onToggleFriend={() => toggleFriend(selectedPlayer.username)}
          onClose={() => setSelectedPlayer(null)} 
        />
      )}
      {showInitialModal && <InitialNameModal onSubmit={handleInitialNameSubmit} error={initialModalError} />}
    </div>
  );
};

export default App;
