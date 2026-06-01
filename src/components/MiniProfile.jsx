import React from 'react';
import { User, Activity, Award, Flame, Zap } from 'lucide-react';
import { CHARACTERS, BADGES } from '../constants';

const LEVEL_UP_BASE = 200;

export const MiniProfile = ({ 
  player, 
  onClose 
}) => {
  // Find character matching player's characterId or currentCharacter
  const charId = player.characterId || player.currentCharacter || 'agent-x';
  const character = CHARACTERS.find(c => c.id === charId) || CHARACTERS[0];
  const AvatarIcon = character.icon || User;

  // Find unlocked badges
  const unlockedBadges = BADGES.filter(b => (player.unlockedBadges || []).includes(b.id));

  const totalExpNeeded = (player.level || 1) * LEVEL_UP_BASE;
  const expProgressPercent = Math.min(100, ((player.exp || 0) / totalExpNeeded) * 100);

  return (
    <div className="fixed inset-0 z-[1100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-zinc-950 border border-white/10 rounded-[2.5rem] p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto no-scrollbar"
        style={{
          boxShadow: '0 0 50px var(--primary-glow, rgba(255,255,255,0.02))',
          border: '1px solid var(--primary, rgba(255,255,255,0.1))'
        }}
      >
        {/* Decorative background glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-white/[0.01] blur-2xl pointer-events-none" />

        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Avatar Area */}
        <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center text-white shrink-0">
          <div 
            className="w-full h-full rounded-full bg-zinc-900 border overflow-hidden flex items-center justify-center relative z-10 shadow-lg"
            style={{ borderColor: 'var(--primary, rgba(255,255,255,0.2))' }}
          >
            {character.img ? (
              <img src={character.img} alt={player.username} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
            ) : player.img ? (
              <img src={player.img} alt={player.username} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
            ) : (
              <AvatarIcon size={36} />
            )}
          </div>
          <div className={`absolute -inset-1.5 frame-${player.frameId || 'default'} pointer-events-none z-20`} style={{ borderRadius: '50%' }} />
        </div>

        {/* Username */}
        <h3 className="text-2xl font-black text-white uppercase tracking-tight italic mb-4">
          {player.username}
        </h3>

        {/* Level and Experience Bar */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 mb-4 text-left">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider mb-2 text-white/50">
            <span>LEVEL {player.level}</span>
            <span>{player.exp || 0} / {totalExpNeeded} XP</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-400 rounded-full" 
              style={{ width: `${expProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Streak and Plays Simple Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-orange-500 mb-1">
              <Flame size={14} className="fill-current" />
              <span className="text-[10px] font-black uppercase tracking-wider text-white/40">Streak</span>
            </div>
            <p className="text-lg font-black text-white italic">{player.streak || 1} Days</p>
          </div>
          
          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-rose-500 mb-1">
              <Activity size={14} />
              <span className="text-[10px] font-black uppercase tracking-wider text-white/40">Plays</span>
            </div>
            <p className="text-lg font-black text-white italic">{player.gamesPlayed || 0}</p>
          </div>
        </div>

        {/* Badges section */}
        <div className="text-left mb-6 flex-1 min-h-[80px]">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">BADGES ({unlockedBadges.length})</p>
          {unlockedBadges.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1 no-scrollbar">
              {unlockedBadges.map((badge) => {
                const BadgeIcon = badge.icon || Award;
                const isFeatured = player.featuredBadgeId === badge.id;
                return (
                  <div 
                    key={badge.id}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[9px] uppercase font-bold tracking-wider transition-all border ${
                      isFeatured 
                        ? 'bg-white text-black border-white shadow-md' 
                        : 'bg-white/5 text-white/80 border-white/10'
                    }`}
                  >
                    <BadgeIcon size={10} style={{ color: (!isFeatured && badge.color !== 'rainbow' && badge.color !== 'galaxy') ? badge.color : undefined }} />
                    <span>{badge.name}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-white/20 italic font-medium">No badges unlocked yet.</p>
          )}
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="w-full py-4 bg-white hover:bg-zinc-200 text-black rounded-2xl font-black uppercase tracking-wider text-xs transition-all italic mt-auto shrink-0"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

