import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Flame, ChevronRight, Zap, Trophy, MessageSquare, GraduationCap, Star, ChevronDown, User, Shield, Crown, Activity, Target, Award, Rocket, Play, X, Pin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Hero } from './Hero';
import { GameCard } from './GameCard';
import { Tilt } from './Tilt';
import { LeaderboardWidget as FullLeaderboardWidget } from './LeaderboardWidget';
import { CHARACTERS, BADGES } from '../constants';

const LEVEL_UP_BASE = 200;

const CompactLeaderboard = ({ leaderboardData, onLeaderboardClick }) => {
  const topPlayers = (leaderboardData || []).slice(0, 3);
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onLeaderboardClick}
      className="relative w-full rounded-[2.5rem] p-6 border border-white/5 bg-black/40 backdrop-blur-3xl group shadow-2xl h-full flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Trophy size={20} className="text-yellow-400" />
          <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.3em] italic">TOP PLAYERS</span>
        </div>
      </div>
      
      <div className="space-y-3 flex-1 flex flex-col justify-center">
        {topPlayers.map((player, i) => (
          <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black italic ${i === 0 ? 'bg-yellow-400/20 text-yellow-400' : 'bg-white/5 text-white/40'}`}>
              {i + 1}
            </div>
            <span className="text-sm font-bold text-white truncate flex-1 uppercase tracking-tight">{player.username}</span>
            <span className="text-xs font-black text-white/20 italic">{player.level} LVL</span>
          </div>
        ))}
        {topPlayers.length === 0 && (
           <div className="text-center py-10 text-white/10 text-[10px] font-black tracking-[0.4em] uppercase italic">SYNCING_DATA...</div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/5 text-[8px] font-black text-white/20 uppercase tracking-[0.4em] italic text-center">
        VIEW GLOBAL RANKINGS
      </div>
    </motion.div>
  );
};

const TiltCard = ({ game, rank, rankLabel, colorClass, shadowClass, onClick, isPotatoMode, delay = 0 }) => {
  const tiltOptions = useMemo(() => ({ 
    max: 35, 
    scale: 1.08, 
    speed: 1000, 
    glare: false, 
    perspective: 1000,
    easing: "cubic-bezier(.03,.98,.52,.99)" 
  }), []);

  const glowGradient = useMemo(() => {
    return 'bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.2),transparent_70%)] shadow-[0_0_80px_rgba(255,255,255,0.08)]';
  }, []);

  return (
    <motion.div 
      initial={isPotatoMode ? { opacity: 0 } : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`relative z-10 group ${rank === 1 ? 'md:order-2 md:-translate-y-8' : rank === 2 ? 'md:order-1 md:-translate-y-3' : 'md:order-3 md:translate-y-2'}`}
    >
      <Tilt 
        disabled={isPotatoMode}
        options={tiltOptions}
        className="cursor-pointer"
      >
        <button 
          className="relative block h-[420px] w-[280px] rounded-[2.5rem] bg-black/60 shadow-2xl active:scale-95 lg:h-[480px] lg:w-[320px]"
          onClick={onClick}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Clipped Base Layer */}
          <div className={`absolute inset-0 rounded-[2.5rem] overflow-hidden border ${colorClass} ${shadowClass} transition-colors duration-500`}>
            <img 
              alt={game.title} 
              loading="lazy" 
              className="object-cover transition-transform duration-700 group-hover:scale-110 absolute inset-0 h-full w-full pointer-events-none opacity-80" 
              src={game.thumbnail || null} 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          
          {/* Pop-out Content */}
          <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
            <div 
              className="absolute left-6 top-6 w-12 h-12 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-theme group-hover:border-theme/50"
              style={{ transform: 'translateZ(50px)' }}
            >
              <span className="text-xl font-black italic text-white">{rank}</span>
            </div>

            <div 
              className="absolute inset-x-0 bottom-0 p-10 text-left transition-all duration-500" 
              style={{ transform: 'translateZ(80px)' }}
            >
              <div className="flex flex-col gap-2">
                <p className="text-4xl font-black italic text-white uppercase tracking-tighter leading-[0.8] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                  {game.title}
                </p>
                <div className="w-12 h-1.5 bg-white/40 rounded-full mt-4 group-hover:w-24 group-hover:bg-theme transition-all duration-500" />
              </div>
            </div>
          </div>
          
          <div className="absolute -inset-2 border-2 border-white/0 group-hover:border-white/10 rounded-[2.8rem] transition-colors pointer-events-none"></div>
        </button>
      </Tilt>
      
      {!isPotatoMode && (
        <div className={`pointer-events-none absolute -inset-14 -z-10 ${glowGradient} blur-3xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-110 transition-all duration-700`}></div>
      )}
    </motion.div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Use UTC calculation to avoid local timezone issues for a "Global" weekly timer
      const now = new Date();
      
      // Target: Next Monday at 05:00:00 UTC (which is 12:00 AM EST)
      const targetDate = new Date(now);
      const day = targetDate.getUTCDay();
      const daysUntilMonday = (1 + 7 - day) % 7 || 7;
      targetDate.setUTCDate(targetDate.getUTCDate() + daysUntilMonday);
      targetDate.setUTCHours(5, 0, 0, 0);

      const diff = targetDate.getTime() - now.getTime();
      
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4">
      {[
        { label: 'DAYS', value: timeLeft.days },
        { label: 'HRS', value: timeLeft.hours },
        { label: 'MIN', value: timeLeft.minutes },
        { label: 'SEC', value: timeLeft.seconds }
      ].map((unit, i) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
            <span className="text-xl font-black text-white tabular-nums">{unit.value.toString().padStart(2, '0')}</span>
          </div>
          <span className="text-[8px] font-black text-white/30 mt-1 tracking-widest">{unit.label}</span>
        </div>
      ))}
    </div>
  );
};

export const Home = ({ 
  user, 
  games, 
  dailyPicks,
  favorites, 
  pinnedGames,
  leaderboardData,
  boosts,
  gameOfTheWeek,
  onToggleFavorite, 
  onTogglePin,
  onPlayGame,
  onSwitchToLibrary,
  onProfileClick,
  onLeaderboardClick,
  systemStats: propSystemStats
}) => {
  const [isPinnedMinimized, setIsPinnedMinimized] = useState(false);
  const [localSystemStats, setLocalSystemStats] = useState({ activeUsers: 0, totalPlayers: 0 });

  useEffect(() => {
    if (propSystemStats) return;
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/system/status');
        if (res.ok) {
          const data = await res.json();
          setLocalSystemStats(data);
        }
      } catch (err) {}
    };
    fetchStats();
    const interval = setInterval(fetchStats, 15000); // More frequent updates
    return () => clearInterval(interval);
  }, [propSystemStats]);

  const systemStats = propSystemStats || localSystemStats;

  const featuredGame = useMemo(() => {
    if (gameOfTheWeek) {
      const game = games.find(g => g.id === gameOfTheWeek.id);
      if (game) return game;
    }
    return games.find(g => g.id === 'ovo-classic') || (games && games.length > 0 ? games[0] : { title: 'Unknown', thumbnail: null, description: '' });
  }, [games, gameOfTheWeek]);

  const pinnedGamesList = useMemo(() => {
    return (pinnedGames || []).map(id => games.find(g => g.id === id)).filter(Boolean);
  }, [pinnedGames, games]);

  const popularGames = useMemo(() => {
    // Specifically ordered: Minecraft, Cookie Clicker, OvO
    const gameOrder = ['minecraft-classic-edition', 'cookie-clicker-new', 'ovo-classic'];
    const orderedGames = gameOrder.map((id, i) => {
      const g = games.find(game => game.id === id) || { title: id.replace(/-/g, ' ').toUpperCase(), thumbnail: null, description: '', id };
      return {
        game: g,
        rank: i + 1,
        label: "", // Removed small text as requested
        color: "border-white/10", // Removed yellow outline, used consistent neutral
        shadow: i === 0 ? "shadow-[0_20px_50px_rgba(255,255,255,0.1)]" : i === 1 ? "shadow-[0_20px_50px_rgba(255,255,255,0.08)]" : "shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
      };
    });
    
    return orderedGames;
  }, [games]);

  const isPotatoMode = user?.settings?.performanceMode;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isPotatoMode ? 0.05 : 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: isPotatoMode 
      ? { opacity: 0, y: 10 } 
      : { opacity: 0, y: 30, filter: 'blur(15px)', scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      scale: 1,
      transition: { 
        duration: isPotatoMode ? 0.35 : 1.1, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
  };

  const [isLeaderboardExpanded, setIsLeaderboardExpanded] = useState(false);
  const displayLeaderboardData = useMemo(() => {
    return isLeaderboardExpanded ? leaderboardData.slice(0, 25) : leaderboardData.slice(0, 5);
  }, [leaderboardData, isLeaderboardExpanded]);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pb-40 pt-12"
    >
      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 mb-12">
        <div className="flex justify-between items-center mb-8 bg-black/20 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-xl">
           <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-theme border border-white/10 shadow-2xl">
                 <Rocket size={24} />
              </div>
              <div>
                 <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase whitespace-nowrap">DASHBOARD</h2>
                 <p className="text-white/40 font-black uppercase tracking-[0.25em] text-xs mt-1">Welcome back, {user.username}</p>
              </div>
           </div>
        </div>

        <div className="mb-12">
          <motion.div variants={itemVariants}>
            <Hero user={user} onBrowseLibrary={onSwitchToLibrary} />
          </motion.div>
        </div>
      </div>

      {/* Featured Game Banner */}
      <motion.section variants={itemVariants} className="pb-20 relative z-10">
        <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-theme/20 via-white/5 to-theme/20 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
            <div className={`relative h-[400px] md:h-[600px] lg:h-[700px] rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/10 backdrop-blur-3xl shadow-2xl group ${isPotatoMode ? '' : 'hover:shadow-[0_0_80px_rgba(255,255,255,0.1)]'}`}>
              <img 
                src={featuredGame.thumbnail || null} 
                alt="Featured Game" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Premium Glass Header */}
              <div className="absolute top-0 inset-x-0 p-8 md:p-12 flex justify-between items-start z-30">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="px-6 py-3 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 flex items-center gap-3"
                >
                  <Trophy size={20} className="text-yellow-400 animate-pulse" />
                  <span className="text-xs font-black text-white uppercase tracking-[0.4em] italic">GAME OF THE WEEK</span>
                </motion.div>

                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="hidden xl:flex items-center gap-6"
                >
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2 italic">NEXT ROTATION</span>
                      <CountdownTimer />
                   </div>
                </motion.div>
              </div>

              {/* Dynamic Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-16 lg:p-24 z-20">
                <div className="max-w-4xl relative">
                  {/* Removed duplicate holographic decoration that might look like an outline */}

                  <div className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex flex-col gap-4 mb-8">
                      <div className="relative">
                        <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter italic leading-[0.85] group-hover:text-theme transition-colors duration-500 relative z-10">
                          {featuredGame.title}
                        </h2>
                      </div>
                    </div>

                    <p className="max-w-2xl text-white/60 text-lg md:text-xl leading-relaxed mb-12 font-medium italic line-clamp-2 md:line-clamp-none border-l-2 border-white/10 pl-8">
                      {featuredGame.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayGame(featuredGame);
                      }}
                      className="group/btn relative px-20 h-24 bg-white text-black rounded-[2rem] overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-[0_0_60px_rgba(255,255,255,0.4)] border-4 border-black/10"
                    >
                      <div className="absolute inset-0 bg-theme/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                      <div className="relative flex items-center gap-6 text-sm font-black uppercase tracking-[0.4em] italic">
                        PLAY NOW
                        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center group-hover/btn:rotate-12 transition-transform shadow-xl">
                          <Rocket size={24} />
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(featuredGame.id);
                      }}
                      className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all group/star"
                    >
                      <Pin size={28} className={`${favorites.includes(featuredGame.id) ? 'fill-white text-white shadow-[0_0_20px_white]' : ''} group-hover/star:scale-110 transition-transform`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Ambient Decoration */}
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-theme/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Leaderboard Section */}
      <motion.section variants={itemVariants} className="pb-32 relative z-10 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[100rem] mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-8">
            <div className="max-w-xl">
                <h3 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-4">GLOBAL RANKINGS</h3>
                <p className="text-white/40 font-bold uppercase tracking-[0.1em] text-xs italic border-l-2 border-white/10 pl-6">
                  Check out the top players in the community. Play games to earn score and climb the ranks.
                </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <FullLeaderboardWidget 
                leaderboardData={displayLeaderboardData} 
                onPlayerClick={onProfileClick}
              />
              <div className="flex justify-center">
                <button 
                  onClick={() => setIsLeaderboardExpanded(!isLeaderboardExpanded)}
                  className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all italic"
                >
                  {isLeaderboardExpanded ? 'MINIMIZE LEADERBOARD' : 'EXPAND TO TOP 25'}
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 flex flex-col justify-center gap-6 group hover:bg-white/[0.05] transition-colors relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] italic">ONLINE STATUS</span>
                <div className="flex items-center gap-6">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_20px_#10b981]" />
                  <div className="flex flex-col">
                    <span className="text-5xl font-black text-white italic tracking-tighter">
                      {systemStats.activeUsers.toLocaleString()}
                    </span>
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest mt-1 italic">ACTIVE PLAYERS</span>
                  </div>
                </div>
              </div>
              <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 flex flex-col justify-center gap-6 group hover:bg-white/[0.05] transition-colors relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] italic">SITE ACTIVITY</span>
                <div className="flex items-center gap-6">
                  <Activity size={32} className="text-rose-500" />
                  <div className="flex flex-col">
                    <span className="text-5xl font-black text-white italic tracking-tighter">
                      {systemStats.totalPlayers > 1000 ? `${(systemStats.totalPlayers / 1000).toFixed(0)}K` : systemStats.totalPlayers}
                    </span>
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest mt-1 italic">TOTAL PLAYERS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Popular Games Section */}
      <motion.section variants={itemVariants} className="pb-32 relative z-10">
        <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_16px_42px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <h2 className="mb-8 text-center text-3xl sm:text-4xl font-black italic tracking-tight text-white uppercase">Popular Games</h2>
            <div className="mt-14 grid grid-cols-1 items-end justify-items-center gap-7 md:grid-cols-3 lg:gap-10">
              {popularGames.map((pg, i) => (
                <TiltCard 
                  key={pg.game.id}
                  game={pg.game}
                  rank={pg.rank}
                  rankLabel={pg.label}
                  colorClass={pg.color}
                  shadowClass={pg.shadow}
                  onClick={() => onPlayGame(pg.game)}
                  isPotatoMode={isPotatoMode}
                  delay={i * 0.15}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};


