import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Shield, Bell, Activity, Layers, Bot, Ghost, BrainCircuit, Rocket, Plus, Award, Flame, User, X, ChevronRight, Zap, Star, Crown, Palette, TrendingUp, Medal, Target } from 'lucide-react';
import { User as UserType } from '../types';

interface LeaderboardProps {
  user: UserType;
  leaderboardData: any[];
  onPlayerClick: (player: any) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ user, leaderboardData, onPlayerClick }) => {
  // Ensure we have at least some data to show
  const displayData = (leaderboardData && leaderboardData.length > 0) ? leaderboardData : [
    { username: 'VoidWalker', score: 125430, level: 99, currentCharacter: 'ghost', title: 'VOID_LORD' },
    { username: 'NeonSpecter', score: 98420, level: 85, currentCharacter: 'viper', title: 'CYBER_GHOST' },
    { username: 'CyberRonin', score: 87650, level: 72, currentCharacter: 'cyber-samurai', title: 'ELITE_BLADE' },
    { username: 'NullPointer', score: 76540, level: 64, currentCharacter: 'glitch', title: 'SYSTEM_ERROR' },
    { username: 'DataPhantom', score: 65430, level: 58, currentCharacter: 'phantom', title: 'GHOST_PROTOCOL' },
    { username: 'ZeroDay', score: 54320, level: 45, currentCharacter: 'agent-x', title: 'INFILTRATOR' },
    { username: 'BitCrusher', score: 43210, level: 32, currentCharacter: 'titan', title: 'HEAVY_METAL' },
    { username: 'LogicBomb', score: 32100, level: 28, currentCharacter: 'nova', title: 'SUPERNOVA' },
  ];

  const topPlayers = displayData.slice(0, 3);
  const otherPlayers = displayData.slice(3);

  const podiumOrder = [1, 0, 2]; // Silver, Gold, Bronze

  return (
    <div className="min-h-screen pb-40 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <section className="pt-32 pb-12 relative z-10">
        <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
              >
                <Trophy size={16} className="text-white animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50">GLOBAL RANKINGS // SEASON 04</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-8xl sm:text-9xl font-black text-white uppercase tracking-tighter italic leading-[0.8] mb-10"
              >
                ELITE <br />
                <span className="text-white/20 drop-shadow-[0_0_60px_rgba(255,255,255,0.1)]">CHAMPIONS</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/30 text-xl font-medium max-w-xl leading-relaxed uppercase tracking-[0.25em] italic"
              >
                The most skilled entities in the void. Compete for dominance and secure your legacy in the rankings.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-6 p-8 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10"
            >
              <div className="text-right pr-8 border-r border-white/10">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">YOUR RANK</p>
                <p className="text-5xl font-black text-white italic tracking-tighter">#1,242</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">PERCENTILE</p>
                <p className="text-5xl font-black text-white italic tracking-tighter">TOP 5%</p>
              </div>
            </motion.div>
          </div>

          {/* Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 items-end">
            {podiumOrder.map((index) => {
              const player = topPlayers[index];
              if (!player) return null;
              
              const isGold = index === 0;
              const isSilver = index === 1;
              const isBronze = index === 2;

              return (
                <motion.div
                  key={player.username}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onClick={() => onPlayerClick(player)}
                  className={`relative group cursor-pointer ${isGold ? 'md:scale-110 z-20' : 'z-10'}`}
                >
                  <div className={`p-12 rounded-[4rem] bg-black/40 border-2 backdrop-blur-3xl shadow-2xl transition-all duration-700 group-hover:-translate-y-6 ${
                    isGold ? 'border-white/40 shadow-[0_0_80px_rgba(255,255,255,0.2)]' : 
                    isSilver ? 'border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]' : 
                    'border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]'
                  }`}>
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-10">
                        <div className={`w-40 h-40 rounded-[3rem] bg-black border-4 overflow-hidden flex items-center justify-center text-white relative z-10 transition-all duration-700 group-hover:scale-110 ${
                          isGold ? 'border-white shadow-[0_0_40px_rgba(255,255,255,0.5)]' : 
                          isSilver ? 'border-white/60' : 
                          'border-white/30'
                        }`}>
                          <User size={80} />
                        </div>
                        <div className={`absolute -top-10 left-1/2 -translate-x-1/2 z-20 drop-shadow-[0_0_20px_currentColor] transition-transform duration-700 group-hover:-translate-y-2 ${
                          isGold ? 'text-white' : 
                          isSilver ? 'text-white/60' : 
                          'text-white/30'
                        }`}>
                          <Crown size={52} fill="currentColor" />
                        </div>
                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-white text-black rounded-full z-30 shadow-2xl border-4 border-black">
                          <span className="text-xs font-black uppercase tracking-widest">#{index + 1}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-3 group-hover:text-white transition-colors">{player.username}</h3>
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-10 italic">{player.title}</p>
                      
                      <div className="flex items-center gap-4 mb-10">
                        <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                          <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">LVL {player.level}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <Zap size={16} fill="currentColor" className="text-white animate-pulse" />
                          <span className="text-xl font-black italic tracking-tight">{player.score.toLocaleString()}</span>
                        </div>
                      </div>

                      <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/5 text-[11px] font-black text-white uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 italic">
                        VIEW PROFILE
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Table */}
          <div className="relative group/table">
            <div className="absolute -inset-8 bg-white/[0.02] blur-[100px] rounded-[6rem] pointer-events-none group-hover/table:bg-white/[0.05] transition-colors duration-1000"></div>
            <div className="relative p-12 sm:p-16 rounded-[5rem] bg-black/40 border border-white/5 backdrop-blur-3xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-[100px_1fr_140px_200px] gap-12 px-12 mb-12 text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">
                <span>Rank</span>
                <span>Entity</span>
                <span className="text-center">Level</span>
                <span className="text-right">Experience</span>
              </div>

              <div className="space-y-6">
                {otherPlayers.map((player, i) => (
                  <motion.div
                    key={player.username}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => onPlayerClick(player)}
                    className="grid grid-cols-[100px_1fr_140px_200px] gap-12 items-center p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 group cursor-pointer"
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-3xl font-black text-white/10 group-hover:text-white transition-colors italic tracking-tighter">#{i + 4}</span>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 rounded-2xl bg-black border border-white/5 flex items-center justify-center text-white group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500">
                        <User size={32} />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-white uppercase tracking-tight italic group-hover:text-white transition-colors">{player.username}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] italic">{player.title}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors">
                        <span className="text-lg font-black text-white italic">{player.level}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-3 text-white mb-1.5">
                        <Zap size={18} fill="currentColor" className="text-white/40 group-hover:text-white transition-colors" />
                        <span className="text-3xl font-black italic tracking-tighter tabular-nums">{player.score.toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">TOTAL POINTS</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16 flex justify-center">
                <button className="px-16 py-6 rounded-[2rem] bg-white/5 border border-white/5 text-[12px] font-black text-white uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 flex items-center gap-4 group italic">
                  LOAD MORE ENTITIES
                  <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
