import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Shield, Star, Award, Zap, Crown, Activity, Flame, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import { CHARACTERS, BADGES } from '../constants';

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
          className="relative w-full max-w-5xl bg-[#020617] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
        >
          {/* Left Side - Fixed Profile Card */}
          <div className="lg:w-[340px] bg-white/[0.02] p-8 flex flex-col items-center text-center border-r border-white/10 shrink-0">
            <div className="relative mb-6 pt-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-36 h-36 rounded-[2.5rem] bg-black border border-white/10 overflow-hidden flex items-center justify-center text-white relative z-10 shadow-2xl"
              >
                {character.img ? (
                  <img src={character.img} alt={character.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <character.icon size={50} />
                )}
              </motion.div>
              <div className={`absolute -inset-4 frame-${user.currentFrame || 'obsidian'} pointer-events-none z-20`}></div>
            </div>

            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-1">{user.username}</h2>
            <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-6 italic">{user.currentTitle || 'PLAYER'}</p>

            <div className="w-full space-y-2 mb-8">
              <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[0.2em]">
                <span className="text-white/20">PROGRESS</span>
                <span className="text-white">LVL {user.level}</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (user.exp / (user.level * 200)) * 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 w-full gap-2 mb-4 relative group">
              <button 
                disabled={true}
                className="w-full py-4 rounded-3xl text-[9px] font-black uppercase tracking-widest transition-all italic flex items-center justify-center gap-2 shadow-2xl bg-black/40 text-white/20 border border-white/5 cursor-not-allowed opacity-50 overflow-hidden"
              >
                <Lock size={14} className="text-white/20" />
                LEVEL ROAD
                <div className="absolute inset-0 bg-rose-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[7px] font-black text-rose-500 uppercase tracking-[0.4em] italic shadow-2xl">COMING SOON</span>
                </div>
              </button>
            </div>

            <button 
              onClick={onClose}
              className="mt-auto w-full py-3 text-[8px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-white transition-all italic"
            >
              DISMISS
            </button>
          </div>

          {/* Right Side - Dynamic Content */}
          <div className="flex-1 p-8 lg:p-12 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {view === 'stats' ? (
                <motion.div
                  key="stats-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                      <div key={i} className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-all">
                        <stat.icon size={16} className={`${stat.color} mb-3`} />
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest block mb-1">{stat.label}</span>
                        <p className="text-xl font-black text-white italic tracking-tighter">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">ACHIEVEMENTS</span>
                      <div className="h-px flex-1 bg-white/5"></div>
                    </div>

                    {unlockedBadges.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {unlockedBadges.map((badge) => (
                          <motion.div 
                            key={badge.id}
                            whileHover={{ y: -5 }}
                            className="p-5 rounded-[2rem] bg-white/[0.03] border border-white/10 flex flex-col items-center text-center group transition-all"
                          >
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xl relative">
                              <badge.icon 
                                size={24} 
                                className={badge.color === 'rainbow' ? 'mythic-rainbow-text' : ''} 
                                style={{ color: badge.color !== 'rainbow' ? badge.color : undefined }} 
                              />
                            </div>
                            <span className="text-[10px] font-black text-white uppercase tracking-tight italic mb-1">{badge.name}</span>
                            <span className="text-[7px] font-black text-white/20 uppercase tracking-widest leading-tight">{badge.requirement}</span>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 border border-dashed border-white/5 rounded-[3rem] text-center">
                        <Activity size={32} className="text-white/5 mx-auto mb-4" />
                        <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em] italic">NO BADGES UNLOCKED</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="road-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">THE LEVEL ROAD</span>
                      <div className="h-px flex-1 bg-white/5"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {LEVEL_DATA.map((item) => {
                        const isUnlocked = user.level >= item.level;
                        const isNext = !isUnlocked && LEVEL_DATA.find(l => l.level > user.level)?.level === item.level;

                        return (
                          <div 
                            key={item.level}
                            className={`p-5 rounded-3xl border transition-all flex items-center justify-between group ${
                              isUnlocked 
                                ? 'bg-white/5 border-emerald-500/20' 
                                : isNext 
                                  ? 'bg-white/[0.05] border-white/20' 
                                  : 'bg-black/20 border-white/5 opacity-50'
                            }`}
                          >
                            <div className="flex items-center gap-6">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm italic ${
                                isUnlocked ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white/40'
                              }`}>
                                {item.level}
                              </div>
                              <div className="flex flex-col">
                                <span className={`text-[10px] font-black uppercase tracking-widest italic ${isUnlocked ? 'text-white' : 'text-white/40'}`}>
                                  {item.title}
                                </span>
                                <span className={`text-[8px] font-black uppercase tracking-tight ${isUnlocked ? 'text-emerald-500' : 'text-white/20'}`}>
                                  {item.unlock}
                                </span>
                              </div>
                            </div>
                            
                            {isUnlocked ? (
                              <CheckCircle2 size={18} className="text-emerald-500" />
                            ) : (
                              <Lock size={16} className="text-white/10" />
                            )}
                          </div>
                        );
                      })}
                    </div>
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


