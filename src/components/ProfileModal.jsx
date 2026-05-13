import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Shield, Star, Award, Zap, Crown, Activity, Flame, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import { CHARACTERS, BADGES } from '../constants';

const LEVEL_UP_BASE = 200;
const LEVEL_DATA = [
  { level: 1, title: 'NEWBIE', unlock: 'Standard Access' },
  { level: 5, title: 'ROOKIE', unlock: 'Neon Frame' },
  { level: 10, title: 'GUARDIAN', unlock: 'Emerald Theme' },
  { level: 15, title: 'SCOUT', unlock: 'Viper & Emerald Frame' },
  { level: 25, title: 'ELITE', unlock: 'Rose Theme' },
  { level: 30, title: 'PHANTOM', unlock: 'Ghost & Gold Frame' },
  { level: 50, title: 'LEGEND', unlock: 'Phantom Character' },
  { level: 60, title: 'SOLARIS', unlock: 'Solar Frame' },
  { level: 75, title: 'TITAN', unlock: 'Titan Character' },
  { level: 90, title: 'NOVA', unlock: 'Nova Character' },
  { level: 100, title: 'OVERLORD', unlock: 'Overlord & Interstellar' }
];

export const ProfileModal = ({ user, onClose }) => {
  const [view, setView] = useState('stats'); // 'stats' or 'road'
  const character = CHARACTERS.find(c => c.id === user.currentCharacter) || CHARACTERS[0];
  const unlockedBadges = BADGES.filter(b => (user.unlockedBadges || []).includes(b.id));

  const stats = [
    { label: 'STREAK', value: `${user.streak || 1} DAYS`, icon: Flame, color: 'text-orange-500' },
    { label: 'EXPERIENCE', value: user.exp.toLocaleString(), icon: Zap, color: 'text-cyan-400' },
    { label: 'BADGES', value: unlockedBadges.length, icon: Award, color: 'text-emerald-400' },
    { label: 'PLAYS', value: user.gamesPlayed || 0, icon: Activity, color: 'text-rose-500' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-black border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
        >
          {/* Left Side - Fixed Profile Card */}
          <div className="lg:w-[380px] bg-white/[0.03] p-10 flex flex-col items-center text-center border-r border-white/5 shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
            
            <div className="relative mb-8 pt-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="w-44 h-44 rounded-[3rem] bg-black border border-white/10 overflow-hidden flex items-center justify-center text-white relative z-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
              >
                {character.img ? (
                  <img src={character.img} alt={character.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <character.icon size={60} />
                )}
              </motion.div>
              <div className={`absolute -inset-6 frame-${user.currentFrame || 'obsidian'} scale-110 pointer-events-none z-20`}></div>
            </div>

            <div className="space-y-1 mb-8">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">{user.username}</h2>
              <div className="flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic">{user.currentTitle || 'PLAYER'}</p>
              </div>
            </div>

            <div className="w-full bg-black/40 rounded-[2rem] p-6 border border-white/5 mb-8">
              <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] mb-3">
                <span className="text-white/30 italic">LEVEL</span>
                <span className="text-white font-mono italic">LVL {user.level}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (user.exp / (user.level * LEVEL_UP_BASE)) * 100)}%` }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-gradient-to-r from-theme via-theme/80 to-theme shadow-[0_0_15px_var(--primary-glow)] rounded-full"
                />
              </div>
              <p className="text-[7px] font-bold text-white/20 uppercase tracking-[0.1em] mt-3 italic text-left">PATH TO LVL {user.level + 1} • {user.level * LEVEL_UP_BASE} EXP NEEDED</p>
            </div>

            <div className="grid grid-cols-1 w-full gap-3 relative group">
              <button 
                disabled={true}
                className="w-full py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all italic flex items-center justify-center gap-3 border bg-black/40 text-white/20 border-white/5 cursor-not-allowed opacity-50 overflow-hidden relative"
              >
                <Lock size={14} className="text-white/20" />
                LEVEL ROAD
                <div className="absolute inset-0 bg-rose-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[7px] font-black text-rose-500 uppercase tracking-[0.4em] italic">COMING SOON</span>
                </div>
              </button>
            </div>

            <button 
              onClick={onClose}
              className="mt-auto pt-8 text-[9px] font-black text-white/10 uppercase tracking-[0.4em] hover:text-white/40 transition-all italic"
            >
              EXIT INTERFACE
            </button>
          </div>

          {/* Right Side - Dynamic Content */}
          <div className="flex-1 p-10 lg:p-14 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.02),transparent)]">
            <AnimatePresence mode="wait">
              {view === 'stats' ? (
                <motion.div
                  key="stats-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-14"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                      <div key={i} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                        <stat.icon size={18} className={`${stat.color} mb-4 opacity-80 group-hover:opacity-100 transition-opacity`} />
                        <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] block mb-2">{stat.label}</span>
                        <p className="text-2xl font-black text-white italic tracking-tighter">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <span className="text-[11px] font-black text-white uppercase tracking-[0.5em] italic shrink-0">COLLECTED BADGES</span>
                      <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent"></div>
                    </div>

                    {unlockedBadges.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                        {unlockedBadges.map((badge) => (
                          <motion.div 
                            key={badge.id}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col items-center text-center hover:bg-white/[0.05] transition-all"
                          >
                            <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center mb-4 shadow-xl">
                              <badge.icon 
                                size={28} 
                                className={badge.color === 'rainbow' ? 'mythic-rainbow-text' : ''} 
                                style={{ color: badge.color !== 'rainbow' ? badge.color : undefined }} 
                              />
                            </div>
                            <span className="text-[11px] font-black text-white uppercase tracking-tight italic mb-1.5">{badge.name}</span>
                            <span className="text-[8px] font-medium text-white/30 uppercase tracking-widest">{badge.rarity}</span>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-24 border-2 border-dashed border-white/[0.03] rounded-[4rem] text-center bg-black/20">
                        <Activity size={40} className="text-white/5 mx-auto mb-5" />
                        <p className="text-[11px] font-black text-white/10 uppercase tracking-[0.6em] italic">RECORDS EMPTY</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="road-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10 relative min-h-[400px]"
                >
                  {/* Lock Overlay */}
                  <div className="absolute inset-x-[-2rem] inset-y-[-2rem] z-50 bg-black/40 backdrop-blur-md rounded-[3rem] flex flex-col items-center justify-center border border-white/5 shadow-2xl">
                    <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center text-white/20 border border-white/10 mb-8">
                       <Lock size={48} className="animate-pulse" />
                    </div>
                    <span className="text-[14px] font-black text-white uppercase tracking-[0.6em] italic mb-4">ACCESS RESTRICTED</span>
                    <div className="px-8 py-3 bg-white text-black font-black text-[10px] uppercase tracking-[0.5em] italic rounded-full shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                      COMING SOON
                    </div>
                    <p className="text-[10px] font-bold text-white/20 mt-8 uppercase tracking-[0.3em] italic">FEATURE CURRENTLY IN CALIBRATION</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-[11px] font-black text-white uppercase tracking-[0.5em] italic shrink-0">THE PROGRESSION ROAD</span>
                    <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {LEVEL_DATA.map((item) => {
                      const isUnlocked = user.level >= item.level;
                      const isNext = !isUnlocked && LEVEL_DATA.find(l => l.level > user.level)?.level === item.level;

                      return (
                        <div 
                          key={item.level}
                          className={`p-6 rounded-[2rem] border transition-all flex items-center justify-between group ${
                            isUnlocked 
                              ? 'bg-emerald-500/5 border-emerald-500/30' 
                              : isNext 
                                ? 'bg-white/[0.04] border-white/20' 
                                : 'bg-black/40 border-white/5 opacity-40'
                          }`}
                        >
                          <div className="flex items-center gap-8">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-base italic shadow-xl transition-transform group-hover:scale-105 ${
                              isUnlocked ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/40 border border-white/5'
                            }`}>
                              {item.level}
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className={`text-[12px] font-black uppercase tracking-widest italic ${isUnlocked ? 'text-white' : 'text-white/40'}`}>
                                {item.title}
                              </span>
                              <div className="flex items-center gap-3">
                                <Shield size={10} className={isUnlocked ? 'text-emerald-500' : 'text-white/20'} />
                                <span className={`text-[9px] font-black uppercase tracking-tight ${isUnlocked ? 'text-white/60' : 'text-white/20'}`}>
                                  {item.unlock}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="pr-2">
                            {isUnlocked ? (
                              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <CheckCircle2 size={20} className="text-emerald-500" />
                              </div>
                            ) : (
                              <Lock size={18} className="text-white/10" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


