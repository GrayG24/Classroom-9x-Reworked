import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Flame, ChevronRight, Zap, Trophy, MessageSquare, GraduationCap, Star, ChevronDown, User, Shield, Crown, Activity, Target, Award, Rocket, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Hero } from './Hero';
import { GameCard } from './GameCard';
import { Tilt } from './Tilt';
import { CHARACTERS, BADGES } from '../constants';

const ProfileWidget = ({ user, onProfileClick }) => {
  const character = CHARACTERS.find(c => c.id === user.currentCharacter) || (CHARACTERS && CHARACTERS.length > 0 ? CHARACTERS[0] : { name: 'Unknown', icon: User, img: null });
  const nextLevelExp = user.level * 1000;
  const progress = (user.exp / nextLevelExp) * 100;
  const unlockedBadges = BADGES.filter(b => (user.unlockedBadges || []).includes(b.id));
  
  const isPotatoMode = user?.settings?.performanceMode === true;
  
  return (
    <motion.div 
      whileHover={isPotatoMode ? {} : { y: -8, scale: 1.02 }}
      whileTap={isPotatoMode ? {} : { scale: 0.98 }}
      onClick={onProfileClick}
      className={`rounded-[40px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl cursor-pointer group relative overflow-hidden ${isPotatoMode ? '' : 'shadow-[0_30px_60px_rgba(0,0,0,0.4)]'}`}
    >
      {!isPotatoMode && <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>}
      
      <div className="flex items-center gap-8 relative z-10">
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-[2rem] bg-black border-2 border-white/10 overflow-hidden flex items-center justify-center text-white relative z-10 shadow-2xl group-hover:border-white/40 transition-all duration-500">
            {character.img ? (
              <img src={character.img} alt={character.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" referrerPolicy="no-referrer" />
            ) : (
              <character.icon size={40} className="text-white/20" />
            )}
          </div>
          <div className={`absolute -inset-4 frame-${user.currentFrame || 'obsidian'} pointer-events-none z-20 opacity-40 group-hover:opacity-100 transition-opacity duration-500`}></div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-xs font-black z-30 shadow-2xl border-4 border-black italic">
            {user.level}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h4 className="text-3xl font-black text-white truncate uppercase tracking-tighter italic leading-none">{user.username}</h4>
              <div className="flex gap-1">
                {unlockedBadges.slice(0, 3).map(badge => (
                  <badge.icon key={badge.id} size={14} style={{ color: badge.color }} className={badge.color === 'rainbow' ? 'mythic-rainbow-text' : ''} />
                ))}
                {unlockedBadges.length > 3 && <span className="text-[8px] font-black text-white/20">+{unlockedBadges.length - 3}</span>}
              </div>
            </div>
            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic">{user.currentTitle}</span>
          </div>
          
          <div className="space-y-3">
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-white shadow-[0_0_20px_white]"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] italic">EXPERIENCE: {user.exp} / {nextLevelExp}</span>
              <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] italic">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
        
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/10 group-hover:text-white group-hover:bg-white/10 transition-all duration-500 border border-white/5">
          <ChevronRight size={28} />
        </div>
      </div>
    </motion.div>
  );
};

const TiltCard = ({ game, rank, rankLabel, colorClass, shadowClass, onClick, isPotatoMode, delay = 0 }) => {
  return (
    <motion.div 
      initial={isPotatoMode ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative ${rank === 1 ? 'md:order-2' : rank === 2 ? 'md:order-1' : 'md:order-3'}`}
    >
      <Tilt 
        disabled={isPotatoMode}
        options={{ max: 25, scale: 1.05, speed: 1000, glare: true, "max-glare": 0.2, transition: true, easing: "cubic-bezier(.03,.98,.52,.99)" }}
      >
        <button 
          className={`proto-tilt-card group relative block h-[398px] w-[252px] sm:h-[424px] sm:w-[268px] overflow-hidden rounded-3xl border bg-card/78 text-left ${colorClass} ${shadowClass}`}
          onClick={onClick}
        >
          <img 
            alt={game.title} 
            loading="lazy" 
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03] absolute inset-0 h-full w-full" 
            src={game.thumbnail} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/72 via-background/22 to-transparent"></div>
          <div className="proto-tilt-shine"></div>
          <div className="absolute left-3 top-3 rounded-full border border-border/80 bg-background/75 px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-foreground/85">
            #{rank}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="text-xl font-semibold leading-tight text-foreground">{game.title}</p>
            <p className="mt-1 text-xs text-foreground/62">{rankLabel}</p>
          </div>
        </button>
      </Tilt>
      {rank === 1 && !isPotatoMode && (
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] bg-[radial-gradient(circle_at_50%_18%,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_58%)] blur-[1px]"></div>
      )}
    </motion.div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Get current date in NY time (EST/EDT)
      const now = new Date();
      const nyDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
      
      // Target next Monday 00:00:00 EST
      const targetStr = nyDate.toLocaleString("en-US", {timeZone: "America/New_York"});
      const targetDate = new Date(targetStr);
      targetDate.setDate(targetDate.getDate() + (1 + 7 - targetDate.getDay()) % 7 || 7); 
      targetDate.setHours(0, 0, 0, 0);

      // We need the absolute time difference. 
      // The most reliable way is to find when that specific "Next Monday 12AM EST" happens in UTC.
      const diff = targetDate.getTime() - nyDate.getTime();
      
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
          <div className="w-12 h-12 rounded-xl bg-slate-950/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
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
  boosts,
  gameOfTheWeek,
  onToggleFavorite, 
  onTogglePin,
  onPlayGame,
  onSwitchToLibrary,
  onProfileClick,
  onLeaderboardClick
}) => {
  const [isPinnedMinimized, setIsPinnedMinimized] = useState(false);
  const featuredGame = useMemo(() => {
    if (gameOfTheWeek) {
      const game = games.find(g => g.id === gameOfTheWeek.id);
      if (game) return game;
    }
    return games.find(g => g.id === 'ovo-classic') || (games && games.length > 0 ? games[0] : { title: 'Unknown', thumbnail: '', description: '' });
  }, [games, gameOfTheWeek]);

  const pinnedGamesList = useMemo(() => {
    return (pinnedGames || []).map(id => games.find(g => g.id === id)).filter(Boolean);
  }, [pinnedGames, games]);

  const popularGames = useMemo(() => {
    // Sort games by rating to get "actually" most popular
    const sorted = [...games].sort((a, b) => b.rating - a.rating);
    const top3 = sorted.slice(0, 3);
    
    return [
      { 
        game: top3[0] || { title: 'Unknown', thumbnail: '', description: '', id: 'unknown-1' }, 
        rank: 1, 
        label: "",
        color: "border-white/50",
        shadow: "shadow-[0_26px_56px_rgba(255,255,255,0.1)]"
      },
      { 
        game: top3[1] || { title: 'Unknown', thumbnail: '', description: '', id: 'unknown-2' }, 
        rank: 2, 
        label: "",
        color: "border-white/30",
        shadow: "shadow-[0_20px_38px_rgba(255,255,255,0.05)]"
      },
      { 
        game: top3[2] || { title: 'Unknown', thumbnail: '', description: '', id: 'unknown-3' }, 
        rank: 3, 
        label: "",
        color: "border-white/10",
        shadow: "shadow-[0_18px_34px_rgba(255,255,255,0.02)]"
      }
    ];
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

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pb-40"
    >
      <motion.div variants={itemVariants}>
        <Hero user={user} onBrowseLibrary={onSwitchToLibrary} />
      </motion.div>

      {/* Pinned Games Section - Top Right Floating */}
      {pinnedGamesList.length > 0 && (
        <div className="fixed top-8 right-8 z-[60] flex flex-col items-end gap-4 pointer-events-none">
          <motion.div 
            variants={itemVariants}
            onClick={() => setIsPinnedMinimized(!isPinnedMinimized)}
            className="flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-2xl pointer-events-auto cursor-pointer hover:bg-white/10 transition-all"
          >
            <Star size={14} className="text-white fill-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] italic">PINNED ACCESS</span>
            {isPinnedMinimized ? <ChevronDown size={14} className="text-white/40" /> : <X size={14} className="text-white/40" />}
          </motion.div>
          <AnimatePresence>
            {!isPinnedMinimized && (
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="flex flex-col gap-3 pointer-events-auto"
              >
                {pinnedGamesList.slice(0, 4).map(game => (
                  <motion.button
                    key={game.id}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onPlayGame(game)}
                    className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group"
                  >
                    <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play size={16} fill="currentColor" className="text-white ml-0.5" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Featured Game Banner - REWORKED */}
      <motion.section variants={itemVariants} className="pb-20 relative z-10">
        <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
            <div className={`relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/10 backdrop-blur-3xl shadow-2xl group cursor-pointer ${isPotatoMode ? '' : 'hover:shadow-[0_0_80px_rgba(255,255,255,0.1)]'}`}
              onClick={() => onPlayGame(featuredGame)}
            >
              <img 
                src={featuredGame.thumbnail} 
                alt="Featured Game" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              {/* Persistent Weekly Badge & Timer */}
              <div className="absolute inset-0 pointer-events-none p-16 sm:p-24 flex flex-col justify-between z-20">
                <div className="flex justify-between items-start w-full">
                  <div className="px-6 py-3 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center gap-3 pointer-events-auto">
                    <Trophy size={20} className="text-white animate-bounce" />
                    <span className="text-xs font-black text-white uppercase tracking-[0.4em] italic">WEEKLY GAME</span>
                  </div>

                  <div className="hidden xl:flex flex-col items-end gap-12 pointer-events-auto">
                    <div className="text-right p-10 bg-black/60 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl relative">
                      <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 animate-ping" />
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-8 italic">WEEKLY REFRESH IN</p>
                      <CountdownTimer />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Interactions */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent flex flex-col justify-center p-16 sm:p-24 transition-all duration-700 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] z-10">
                <div className="flex items-center justify-between w-full">
                  <div className="max-w-3xl">
                    <p 
                      className="max-w-xl text-white/60 text-xl leading-relaxed mb-12 font-medium italic translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100"
                    >
                      {featuredGame.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-8 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-200">
                      <button 
                        onClick={() => onPlayGame(featuredGame)}
                        className="inline-flex items-center justify-center gap-4 whitespace-nowrap text-xs font-black transition-all h-20 rounded-[1.5rem] px-16 bg-white text-black hover:bg-white/90 hover:scale-105 uppercase tracking-[0.3em] shadow-[0_20px_60px_rgba(255,255,255,0.2)] italic group/btn"
                      >
                        PLAY NOW
                        <Rocket size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(featuredGame.id);
                        }}
                        className="w-20 h-20 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <Star size={28} className={favorites.includes(featuredGame.id) ? 'fill-white text-white' : ''} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Community Section */}
      <motion.section variants={itemVariants} className="pb-32 relative z-10">
        <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ProfileWidget user={user} onProfileClick={onProfileClick} />
            
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-8 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] flex items-center justify-between group grayscale opacity-60 transition-all shadow-2xl relative overflow-hidden cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 backdrop-blur-sm">
                <div className="px-6 py-2 bg-white text-black font-black text-[10px] uppercase tracking-[0.5em] italic rounded-full shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                  COMING SOON
                </div>
              </div>
              <div className="flex items-center gap-8 relative z-10">
                <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center text-white border border-white/10">
                  <Trophy size={48} />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-2 block italic">COMPETITIVE ARENA</span>
                  <h4 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">GLOBAL <span className="text-white/40">LEADERBOARD</span></h4>
                  <p className="text-[10px] font-bold text-white/10 mt-4 uppercase tracking-[0.2em] italic">See who is the best in the world</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Popular Games Section */}
      <motion.section variants={itemVariants} className="pb-32 relative z-10">
        <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center mb-16 relative z-10">
            <h2 
              className="text-6xl font-black text-white uppercase tracking-tighter italic leading-none"
            >
              POPULAR <span className="text-white/40">GAMES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 items-end justify-items-center gap-12 md:grid-cols-3 relative z-10">
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
      </motion.section>
    </motion.div>
  );
};


