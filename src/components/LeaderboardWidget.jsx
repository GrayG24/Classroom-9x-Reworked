import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Shield, Bell, Activity, Layers, Bot, Ghost, BrainCircuit, Rocket, Plus, Award, Flame, User, X, ChevronRight, Zap, Star, Crown, Palette } from 'lucide-react';

export const LeaderboardWidget = ({ leaderboardData, onPlayerClick }) => {
  const topPlayers = (leaderboardData || []).slice(0, 5);

  return (
    <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-20 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Trophy size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">TOP <span className="text-white/40">CHAMPIONS</span></h3>
            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mt-1">Global Rankings</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all cursor-pointer">
          <ChevronRight size={20} />
        </div>
      </div>

      <div className="space-y-4">
        {topPlayers.map((player, i) => (
          <motion.div
            key={player.username}
            whileHover={{ x: 5 }}
            onClick={() => onPlayerClick(player)}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className={`text-sm font-black w-6 ${
                i === 0 ? 'text-white' : 
                i === 1 ? 'text-white/60' : 
                i === 2 ? 'text-white/40' : 
                'text-white/20'
              }`}>#{i + 1}</span>
              <div className="w-10 h-10 rounded-xl bg-black border border-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-white uppercase tracking-tight italic group-hover:text-white transition-colors">{player.username}</p>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">LVL {player.level}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-black text-white italic group-hover:text-white transition-colors">{player.score.toLocaleString()}</p>
              <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">PTS</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">Season ends in 4d 12h</p>
      </div>
    </div>
  );
};
