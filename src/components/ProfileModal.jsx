import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Shield, Star, Award, Zap, Crown, Activity } from 'lucide-react';
import { CHARACTERS, BADGES } from '../constants';

export const ProfileModal = ({ user, onClose }) => {
  const character = CHARACTERS.find(c => c.id === user.currentCharacter) || CHARACTERS[0];
  const unlockedBadges = BADGES.filter(b => (user.unlockedBadges || []).includes(b.id));

  const stats = [
    { label: 'EXPERIENCE', value: user.exp.toLocaleString(), icon: Zap, color: 'text-white' },
    { label: 'ACHIEVEMENTS', value: unlockedBadges.length, icon: Award, color: 'text-white' }
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
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          className="relative w-full max-w-5xl bg-[#020617] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
        >
          {/* Left Side */}
          <div className="lg:w-[380px] bg-white/[0.02] p-10 flex flex-col items-center text-center border-r border-white/10">
            <div className="relative mb-8 pt-4">
              <div className="w-40 h-40 rounded-[2.5rem] bg-black border-2 border-white/10 overflow-hidden flex items-center justify-center text-white relative z-10 shadow-2xl">
                {character.img ? (
                  <img src={character.img} alt={character.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <character.icon size={60} />
                )}
              </div>
              <div className={`absolute -inset-4 frame-${user.currentFrame || 'obsidian'} pointer-events-none z-20`}></div>
              <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-white rounded-2xl flex items-center justify-center border-4 border-black shadow-2xl z-30">
                {user.isAdmin ? <Crown size={24} className="text-black" /> : <Shield size={24} className="text-black" />}
              </div>
            </div>

            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-1">{user.username}</h2>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-8 italic">{user.currentTitle}</p>

            <div className="w-full space-y-3 mb-10">
              <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[0.2em] mb-1">
                <span className="text-white/20">PROGRESS</span>
                <span className="text-white">LVL {user.level}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(user.exp / (user.level * 1000)) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-white shadow-[0_0_10px_white]"
                />
              </div>
            </div>

            <button 
              onClick={onClose}
              className="mt-auto px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white/40 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all italic"
            >
              CLOSE PROFILE
            </button>
          </div>

          {/* Right Side */}
          <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <stat.icon size={20} className="text-white" />
                    </div>
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{stat.label}</span>
                  </div>
                  <p className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-white/5"></div>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic">YOUR BADGES</span>
                <div className="h-px flex-1 bg-white/5"></div>
              </div>

              {unlockedBadges.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {unlockedBadges.map((badge) => (
                    <div 
                      key={badge.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center group hover:bg-white/[0.05] transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <badge.icon 
                          size={24} 
                          className={badge.color === 'rainbow' ? 'mythic-rainbow-text' : ''} 
                          style={{ color: badge.color !== 'rainbow' ? badge.color : undefined }} 
                        />
                      </div>
                      <span className="text-[9px] font-black text-white uppercase tracking-tight italic">{badge.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 border-2 border-dashed border-white/5 rounded-3xl text-center">
                  <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] italic">NO BADGES YET</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

