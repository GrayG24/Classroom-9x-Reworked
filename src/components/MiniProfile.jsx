import React from 'react';
import { User, Activity, Trophy, Shield, Award } from 'lucide-react';
import { CHARACTERS, BADGES } from '../constants';

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
  const featuredBadge = BADGES.find(b => b.id === player.featuredBadgeId);

  return (
    <div className="fixed inset-0 z-[1100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        className={`bg-neutral-950 border border-white/10 rounded-[3rem] p-10 max-w-lg w-full text-center shadow-[0_0_80px_rgba(255,255,255,0.06)] relative overflow-hidden theme-${player.currentTheme || 'void'}`}
        style={{
          boxShadow: '0 0 60px var(--primary-glow, rgba(255,255,255,0.03))',
          border: '1px solid var(--primary, rgba(255,255,255,0.1))'
        }}
      >
        {/* Aesthetic background glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-white/[0.01] blur-3xl pointer-events-none" />

        {/* Header Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Character Avatar */}
        <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center text-white">
          <div 
            className="w-full h-full rounded-full bg-black border-2 overflow-hidden flex items-center justify-center relative z-10 shadow-2xl"
            style={{ borderColor: 'var(--primary, rgba(255,255,255,0.2))' }}
          >
            {character.img ? (
              <img src={character.img} alt={player.username} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
            ) : player.img ? (
              <img src={player.img} alt={player.username} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
            ) : (
              <AvatarIcon size={56} />
            )}
          </div>
          <div className={`absolute -inset-1.5 frame-${player.frameId || 'default'} pointer-events-none z-20`} style={{ borderRadius: '50%' }} />
        </div>

        {/* Username */}
        <h3 className="text-4xl font-extrabold text-white uppercase tracking-tighter italic mb-1">
          {player.username}
        </h3>
        
        {/* Level Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <Shield size={12} className="text-white opacity-80" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">
            {player.level >= 100 ? 'LEGEND' : player.level >= 75 ? 'ELITE' : player.level >= 50 ? 'PRO' : player.level >= 25 ? 'GOLD' : 'ROOKIE'}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">LEVEL</p>
            <p className="text-2xl font-black text-white italic tracking-tight">{player.level}</p>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">PLAYS</p>
            <p className="text-2xl font-black text-white italic tracking-tight">{player.gamesPlayed || 0}</p>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl col-span-1">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">SCORE</p>
            <p className="text-xl font-black text-white italic tracking-tight">{(player.score || 0).toLocaleString()}</p>
          </div>
        </div>

        {/* Selected Character & Description */}
        <div className="text-left p-6 rounded-2xl bg-white/[0.01] border border-white/5 mb-8">
          <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.25em] mb-3">CURRENT CHARACTER</p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10">
              <AvatarIcon size={20} />
            </div>
            <div>
              <h4 className="text-sm font-black text-white/90 uppercase tracking-wider">{character.name}</h4>
              <p className="text-[11px] text-white/40 italic font-medium leading-relaxed uppercase tracking-wider">{character.desc}</p>
            </div>
          </div>
        </div>

        {/* Featured Badge or Unlocked Badges */}
        {unlockedBadges.length > 0 && (
          <div className="text-left mb-10">
            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.25em] mb-4">BADGES ({unlockedBadges.length})</p>
            <div className="flex flex-wrap gap-2.5 max-h-[100px] overflow-y-auto pr-1">
              {unlockedBadges.map((badge) => {
                const BadgeIcon = badge.icon || Award;
                const isFeatured = player.featuredBadgeId === badge.id;
                return (
                  <div 
                    key={badge.id}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] uppercase font-black tracking-wider transition-all border ${
                      isFeatured 
                        ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]' 
                        : 'bg-white/5 text-white/70 border-white/10'
                    }`}
                  >
                    <BadgeIcon size={12} style={{ color: (!isFeatured && badge.color !== 'rainbow' && badge.color !== 'galaxy') ? badge.color : undefined }} />
                    <span>{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button 
          onClick={onClose} 
          className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-neutral-200 active:scale-[0.98] transition-all italic"
        >
          DISMISS PROFILE
        </button>
      </div>
    </div>
  );
};
