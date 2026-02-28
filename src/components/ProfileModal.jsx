import React from 'react';
import { 
  X, Crown, Trophy, Gamepad2, Award, Star, Heart, Layers, Target, 
  Flame, Sparkles, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CHARACTERS, BADGES } from '../constants.js';
import { DailyQuests } from './DailyQuests.jsx';

export const ProfileModal = ({ 
  user, 
  quests,
  onClaimQuestReward,
  onSetFeaturedBadge,
  onClose 
}) => {
  const currentChar = CHARACTERS.find(c => c.id === user.currentCharacter) || CHARACTERS[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl"
        ></motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh]"
        >
          <div className="w-full md:w-80 bg-slate-950/50 border-r border-white/5 p-8 flex flex-col items-center text-center">
            <div className="relative mb-6 group">
              <div className="w-32 h-32 rounded-full bg-theme/10 flex items-center justify-center text-theme border border-theme/20 shadow-[inset_0_0_30px_var(--primary-glow)] relative z-10 overflow-hidden">
                {currentChar.img ? (
                  <img src={currentChar.img} alt={currentChar.name} className={`w-full h-full object-cover ${user.currentTheme === 'spongebob' ? 'animate-float' : ''}`} referrerPolicy="no-referrer" />
                ) : (
                  React.createElement(currentChar.icon, { size: 48 })
                )}
              </div>
              <div className={`absolute -inset-4 frame-${user.currentFrame || 'obsidian'} pointer-events-none z-20`}></div>
              
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 border-2 border-dashed border-theme/20 rounded-full"
              ></motion.div>
            </div>

            <div className="space-y-1 mb-8">
              <div className="flex items-center justify-center gap-2 text-theme mb-1">
                <Sparkles size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Level {user.level} Profile</span>
              </div>
              <h2 className="text-3xl font-orbitron font-black text-white uppercase tracking-tighter">{user.username}</h2>
              <p className="text-slate-500 text-xs font-medium px-4">{currentChar.desc}</p>
            </div>

            <div className="w-full space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <span>Experience</span>
                  <span className="text-theme">{user.exp} / {user.level * 200}</span>
                </div>
                <div className="relative h-3 bg-black/60 rounded-full border border-white/5 overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(user.exp / (user.level * 200)) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-theme to-white/40 shadow-[0_0_15px_var(--primary-glow)]"
                  ></motion.div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Games</div>
                  <div className="text-xl font-orbitron font-bold text-white">{user.gamesPlayed || 0}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Badges</div>
                  <div className="text-xl font-orbitron font-bold text-white">{user.unlockedBadges?.length || 0}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden bg-slate-900/40">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-theme/10 rounded-2xl flex items-center justify-center text-theme border border-theme/20">
                  <Trophy size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-orbitron font-black text-white uppercase tracking-tight">Mission <span className="text-theme">Control</span></h3>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Daily Objectives & Achievements</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-white/5 rounded-2xl transition-colors text-slate-500 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="space-y-12">
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Target size={18} className="text-theme" />
                    <h4 className="font-orbitron font-bold text-sm uppercase tracking-widest text-white">Daily Quests</h4>
                  </div>
                  <DailyQuests quests={quests} onClaimReward={onClaimQuestReward} />
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Crown size={18} className="text-theme" />
                    <h4 className="font-orbitron font-bold text-sm uppercase tracking-widest text-white">Unlocked Badges</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...BADGES].sort((a, b) => {
                      const order = { 'Common': 0, 'Uncommon': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4, 'Mythic': 5 };
                      return order[a.rarity] - order[b.rarity];
                    }).map(badge => {
                      const isUnlocked = user.unlockedBadges?.includes(badge.id);
                      const isFeatured = user.featuredBadgeId === badge.id;
                      const rarityColor = {
                        'Common': 'text-slate-400',
                        'Uncommon': 'text-emerald-400',
                        'Rare': 'text-blue-400',
                        'Epic': 'text-purple-400',
                        'Legendary': 'text-yellow-400',
                        'Mythic': 'mythic-rainbow-text'
                      }[badge.rarity] || 'text-slate-400';

                      return (
                        <motion.div 
                          key={badge.id}
                          whileHover={isUnlocked ? { y: -12, scale: 1.05, rotate: 1 } : {}}
                          onClick={() => isUnlocked && onSetFeaturedBadge(badge.id)}
                          className={`p-8 rounded-[3rem] border transition-all flex flex-col items-center text-center gap-5 relative overflow-hidden cursor-pointer group ${
                            isUnlocked 
                              ? 'bg-slate-800/80 border-theme/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
                              : 'bg-slate-950/40 border-white/5 opacity-40 grayscale cursor-not-allowed'
                          }`}
                        >
                          {isFeatured && (
                            <div className="absolute inset-0 bg-gradient-to-b from-theme/10 to-transparent pointer-events-none"></div>
                          )}
                          
                          <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isUnlocked ? 'bg-slate-900 border border-theme/30 text-theme shadow-[0_0_30px_var(--primary-glow)]' : 'bg-slate-800 text-slate-600'}`}>
                            <badge.icon size={40} className={badge.rarity === 'Mythic' ? 'animate-pulse' : ''} />
                            {isUnlocked && (
                              <div className="absolute inset-0 bg-theme/5 animate-pulse rounded-[2rem]"></div>
                            )}
                          </div>
                          
                          <div className="relative z-10 space-y-2">
                            <div className="text-sm font-orbitron font-black text-white uppercase tracking-tight">{badge.name}</div>
                            <div className={`text-[10px] font-black uppercase tracking-[0.3em] py-1 px-3 rounded-full bg-black/40 border border-white/5 w-fit mx-auto ${rarityColor}`}>{badge.rarity}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight opacity-80 max-w-[120px]">{badge.requirement}</div>
                          </div>

                          {isFeatured && (
                            <div className="absolute top-4 right-4 bg-theme text-slate-950 p-1.5 rounded-xl shadow-theme">
                              <Check size={12} strokeWidth={4} />
                            </div>
                          )}
                          
                          {isUnlocked && (
                            <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12">
                              <badge.icon size={100} />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
