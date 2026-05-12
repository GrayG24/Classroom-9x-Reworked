import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Flame, ChevronRight, Zap, Trophy, MessageSquare, GraduationCap, Star, ChevronDown, User, Shield, Crown, Activity, Target, Award, Rocket, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Hero } from './Hero';
import { GameCard } from './GameCard';
import { Tilt } from './Tilt';
import { CHARACTERS, BADGES } from '../constants';

const ProfileWidget = ({ user, onProfileClick }) => {
  const character = CHARACTERS.find(c => c.id === user.currentCharacter) || (CHARACTERS && CHARACTERS.length > 0 ? CHARACTERS[0] : { name: 'Unknown', icon: User, img: null });
  const isPotatoMode = user?.settings?.performanceMode === true;
  
  return (
    <motion.div 
      initial={false}
      whileHover={isPotatoMode ? {} : { y: -4, scale: 1.01 }}
      whileTap={isPotatoMode ? {} : { scale: 0.99 }}
      onClick={onProfileClick}
      className={`relative w-full rounded-[2.5rem] p-1 border border-white/5 bg-slate-950/40 backdrop-blur-3xl cursor-pointer group shadow-2xl overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-theme/10 via-transparent to-theme/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative z-10 flex items-center p-5 gap-6">
        <div className="relative shrink-0">
          <div className="relative w-20 h-20">
            <div className={`absolute -inset-4 frame-${user.currentFrame || 'obsidian'} z-20 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity`}></div>
            <div className="relative w-full h-full rounded-[1.5rem] bg-black border-2 border-white/10 overflow-hidden flex items-center justify-center shadow-2xl z-10">
              {character.img ? (
                <img src={character.img} alt={character.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              ) : (
                <User size={32} className="text-white/20" />
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 px-4 py-1.5 bg-white text-black rounded-xl border border-white/20 flex flex-col items-center justify-center font-black z-30 shadow-[0_8px_25px_rgba(0,0,0,0.5)] min-w-[50px] group-hover:scale-110 transition-transform">
              <span className="text-[7px] leading-none opacity-40 uppercase tracking-widest mb-0.5">LVL</span>
              <span className="text-[14px] leading-none italic">{user.level}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-tight group-hover:text-theme transition-colors truncate">{user.username}</h4>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, ((user.exp - (user.level - 1) * 200) / 200) * 100))}%` }}
                className="h-full bg-theme shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
              />
            </div>
            <span className="text-[7px] font-black text-white/30 uppercase tracking-[0.2em] italic shrink-0">
              {Math.floor(user.exp - (user.level - 1) * 200)} / 200 XP
            </span>
          </div>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 group-hover:bg-theme group-hover:text-black transition-all duration-300">
          <ChevronRight size={20} />
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

      {/* Featured Game Banner - REWORKED */}
      <motion.section variants={itemVariants} className="pb-20 relative z-10">
        <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-theme/20 via-white/5 to-theme/20 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
            <div className={`relative h-[400px] md:h-[600px] lg:h-[700px] rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/10 backdrop-blur-3xl shadow-2xl group ${isPotatoMode ? '' : 'hover:shadow-[0_0_80px_rgba(255,255,255,0.1)]'}`}>
              <img 
                src={featuredGame.thumbnail} 
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
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-8 md:p-16 lg:p-24 z-20">
                <div className="max-w-4xl relative">
                  {/* Removed duplicate holographic decoration that might look like an outline */}

                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="flex flex-col gap-4 mb-8"
                  >
                    <div className="relative">
                      <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter italic leading-[0.85] group-hover:text-theme transition-colors duration-500 relative z-10">
                        {featuredGame.title}
                      </h2>
                    </div>
                  </motion.div>

                  <p className="max-w-2xl text-white/60 text-lg md:text-xl leading-relaxed mb-12 font-medium italic line-clamp-2 md:line-clamp-none border-l-2 border-white/10 pl-8">
                    {featuredGame.description}
                  </p>

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
                      <Star size={28} className={`${favorites.includes(featuredGame.id) ? 'fill-white text-white shadow-[0_0_20px_white]' : ''} group-hover/star:scale-110 transition-transform`} />
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


