import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Shield, Star, Settings, Award, History, Zap, Crown, Heart, Activity, Trophy, Flame, MessageSquare, Rocket, ChevronRight } from 'lucide-react';
import { User as UserType } from '../types';
import { CHARACTERS } from '../constants';

interface ProfileModalProps {
  user: UserType;
  onUpdateUser: (user: UserType) => void;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, onUpdateUser, onClose }) => {
  const character = CHARACTERS.find(c => c.id === user.currentCharacter) || CHARACTERS[0];

  const stats = [
    { label: 'TOTAL EXP', value: user.score.toLocaleString(), icon: Zap, color: 'text-white', desc: 'Experience points earned' },
    { label: 'BADGES', value: (user?.unlockedBadges?.length || 0), icon: Award, color: 'text-white', desc: 'Achievements unlocked' },
    { label: 'FAVORITES', value: (user?.favorites?.length || 0), icon: Star, color: 'text-white', desc: 'Games in your library' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
        />
        
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-black/60 border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row h-[85vh] lg:h-auto max-h-[900px] backdrop-blur-3xl"
          >
            {/* Left Side - Identity */}
            <div className="lg:w-[400px] bg-white/[0.02] p-12 flex flex-col items-center text-center relative overflow-hidden border-r border-white/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              <div className="relative mb-10 group">
                <div className="absolute -inset-6 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="w-48 h-48 rounded-[3rem] bg-black border-2 border-white/10 overflow-hidden flex items-center justify-center text-white relative z-10 shadow-2xl transition-transform duration-700 group-hover:scale-105">
                  {character.img ? (
                    <img src={character.img} alt={character.name} className="w-full h-full object-cover transition-all duration-700" referrerPolicy="no-referrer" />
                  ) : (
                    <character.icon size={80} />
                  )}
                </div>
                <div className={`absolute -inset-6 frame-${user.currentFrame || 'obsidian'} pointer-events-none z-20`}></div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white rounded-2xl flex items-center justify-center border-4 border-black shadow-2xl z-30">
                  {user.isAdmin ? <Crown size={28} className="text-black" /> : <Shield size={28} className="text-black" />}
                </div>
              </div>

              <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-2">{user.username}</h2>
              <div className="flex items-center gap-3 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-10 italic">
                <span>LVL {user.level}</span>
                <div className="w-1 h-1 rounded-full bg-white/10"></div>
                <span>{user.currentTitle}</span>
              </div>

              <div className="w-full space-y-3 mb-10">
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] mb-1">
                  <span className="text-white/20 italic">EXP SYNC</span>
                  <span className="text-white tabular-nums">{user.exp.toLocaleString()} <span className="text-white/20">/</span> {(user.level * 1000).toLocaleString()}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(user.exp / (user.level * 1000)) * 100}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full bg-white rounded-full shadow-[0_0_15px_white]"
                  />
                </div>
              </div>

              <button 
                onClick={onClose}
                className="absolute top-6 left-6 p-2 rounded-xl bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 p-12 overflow-y-auto custom-scrollbar bg-black/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {stats.map((stat, i) => (
                  <div key={i} className="p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500">
                    <div className="flex items-center gap-5 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                        <stat.icon size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{stat.label}</span>
                      </div>
                    </div>
                    <p className="text-3xl font-black text-white italic tracking-tighter tabular-nums">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
                  <div className="flex items-center gap-3 text-white/20">
                    <Activity size={14} />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">STATUS: OPTIMAL</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
      </div>
    </AnimatePresence>
  );
};
