import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Shield, Bell, Activity, Layers, Bot, Ghost, BrainCircuit, Rocket, Plus, Award, Flame, User, X, ChevronRight, Zap, Star, Crown, Palette } from 'lucide-react';
import { CHARACTERS } from '../constants';

export const LeaderboardWidget = ({ leaderboardData, onPlayerClick }) => {
  const topPlayers = leaderboardData || [];

  return (
    <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl relative group">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-20 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Trophy size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">TOP <span className="text-white/40">PLAYERS</span></h3>
            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mt-1">Global Rankings</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all cursor-pointer">
          <ChevronRight size={20} />
        </div>
      </div>

      <div className="space-y-4">
        {topPlayers.map((player, i) => {
          const themeClass = `theme-${player.currentTheme || 'default'}`;
          const character = CHARACTERS.find(c => c.id === player.currentCharacter) || CHARACTERS[0];
          const AvatarIcon = character.icon || User;

          return (
            <motion.div
              key={player.uid || `${player.username}-${i}`}
              whileHover={{ x: 5 }}
              onClick={() => onPlayerClick(player)}
              className={`flex items-center justify-between p-4 rounded-2xl bg-black/40 hover:bg-black/60 transition-all group cursor-pointer ${themeClass}`}
              style={{
                border: '1px solid var(--primary, rgba(255,255,255,0.05))',
                boxShadow: '0 0 10px var(--primary-glow, transparent)'
              }}
            >
              <div className="flex items-center gap-4">
                <span className={`text-sm font-black w-6 ${
                  i === 0 ? 'text-white' : 
                  i === 1 ? 'text-white/60' : 
                  i === 2 ? 'text-white/40' : 
                  'text-white/20'
                }`}>#{i + 1}</span>
                <div className="relative w-10 h-10 shrink-0 z-10">
                  <div className="w-full h-full rounded-full bg-black border border-white/5 flex items-center justify-center text-white overflow-hidden transition-transform group-hover:scale-110">
                    {character.img ? (
                      <img src={character.img} alt={player.username} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                    ) : player.img ? (
                      <img src={player.img} alt={player.username} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                    ) : (
                      <AvatarIcon size={20} />
                    )}
                  </div>
                  <div className={`absolute -inset-0.5 frame-${player.currentFrame || 'obsidian'} pointer-events-none z-20`} style={{ borderRadius: '50%' }} />
                </div>
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-tight italic transition-colors" style={{ color: 'var(--primary, #ffffff)' }}>{player.username}</p>
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">LVL {player.level}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-black text-white italic transition-colors" style={{ color: 'var(--primary, #ffffff)' }}>{player.score.toLocaleString()}</p>
                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">PTS</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">RANKINGS UPDATE REGULARLY</p>
      </div>
    </div>
  );
};
