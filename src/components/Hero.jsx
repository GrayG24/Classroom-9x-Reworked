import React from 'react';
import { Crown, ShieldAlert, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { CHARACTERS, BADGES } from '../constants.js';

export const Hero = ({ user, onBrowseLibrary }) => {
  const currentAvatar = CHARACTERS.find(c => c.id === user.currentCharacter) || CHARACTERS[0];
  const featuredBadge = BADGES.find(b => b.id === user.featuredBadgeId);

  const heroImage = (() => {
    switch (user.currentTheme) {
      case 'spongebob': return 'https://cdni.fancaps.net/file/fancaps-tvimages/2891461.jpg';
      case 'synthwave': return 'https://wallpapercave.com/wp/wp2324425.png';
      case 'usa': return 'https://media1.tenor.com/m/f0_gejcWnfAAAAAd/freedom-america.gif';
      case 'kanye': return 'https://images.genius.com/cd83ad3baf919c5d988894bec3d6ea74.1000x1000x1.jpg';
      case 'retrofuture': return 'https://i.pinimg.com/originals/31/bf/7a/31bf7a5cf849cacc18b507e768060416.jpg';
      case 'ironman': return 'https://i.imgflip.com/alf0tu.jpg';
      case 'hologram': return 'https://media.istockphoto.com/id/499729334/photo/abstract-blue-digitally-generated-technology-style-background.jpg?s=170667a&w=0&k=20&c=XIwcI8IPgO2DvP2C9uu4WwCoa4P1Ig1uz18VVCHSjPA=';
      case 'galaxy': return 'https://tse2.mm.bing.net/th/id/OIP.XhwEntG7wYwGMXpfy7qHXgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3';
      case 'gold': return 'https://imagedelivery.net/9sCnq8t6WEGNay0RAQNdvQ/clajv3uzq004bmr08oooao8lt_4/public';
      default: return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop';
    }
  })();

  const expProgress = (user.exp / (user.level * 200)) * 100;

  const getRarityColor = (badge) => {
    if (badge.color === 'rainbow') return 'text-white border-white/20 bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.2)]';
    
    switch (badge.rarity) {
      case 'Mythic': return 'text-rose-500 border-rose-500/30 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.3)]';
      case 'Legendary': return 'text-amber-500 border-amber-500/30 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.3)]';
      case 'Epic': return 'text-purple-500 border-purple-500/30 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.3)]';
      case 'Rare': return 'text-blue-500 border-blue-500/30 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]';
      case 'Uncommon': return 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]';
      case 'Common': return 'text-slate-400 border-slate-400/30 bg-slate-400/10';
      default: return 'text-slate-400 border-slate-400/30 bg-slate-400/10';
    }
  };

  const getRarityIconColor = (badge) => {
    if (badge.color === 'rainbow') return '';
    switch (badge.rarity) {
      case 'Mythic': return '#f43f5e';
      case 'Legendary': return '#f59e0b';
      case 'Epic': return '#a855f7';
      case 'Rare': return '#3b82f6';
      case 'Uncommon': return '#10b981';
      default: return '#94a3b8';
    }
  };

  const rarityStyles = featuredBadge ? getRarityColor(featuredBadge) : 'text-theme bg-theme/10 border-theme/30 shadow-[0_0_20px_var(--primary-glow)]';

  return (
    <section className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group bg-slate-950 transition-all duration-700 ease-out hover:shadow-theme/20 hover:border-theme/20">
      {user.settings.homeBanner && (
        <div className="absolute inset-0 bg-slate-950">
          <img className="w-full h-full object-contain opacity-100 group-hover:scale-105 transition-transform duration-[2000ms] ease-out" alt="Home Banner" src={heroImage} />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/20 to-transparent"></div>
          {/* Scanline Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20"></div>
        </div>
      )}
      <div className={`absolute inset-y-0 left-0 flex flex-col justify-center px-10 md:px-20 w-full md:w-3/5 lg:w-1/2 space-y-8 z-10 bg-slate-950 transition-all duration-700 ease-out ${user.settings.homeBanner ? 'shadow-[60px_0_100px_rgba(2,6,23,1)]' : ''} group-hover:bg-slate-900/40`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative shrink-0"
          >
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-theme relative z-10 transition-transform duration-500 group-hover:scale-105 overflow-hidden ${user.currentTheme !== 'spongebob' && user.currentTheme !== 'kanye' ? 'bg-slate-950 border border-theme/20 shadow-[inset_0_0_40px_var(--primary-glow)]' : ''}`}>
              {currentAvatar.img ? (
                <img src={currentAvatar.img} alt={currentAvatar.name} className={`w-full h-full object-cover ${user.currentTheme === 'spongebob' ? 'animate-float' : ''}`} referrerPolicy="no-referrer" />
              ) : (
                React.createElement(currentAvatar.icon, { size: 64 })
              )}
            </div>
            <div className={`absolute inset-0 frame-${user.currentFrame || 'solar'} pointer-events-none z-20`}></div>
            <div className="absolute -bottom-1 -right-1 bg-theme text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-xl border-4 border-slate-950 shadow-theme z-30">{user.level >= 999 ? 'MAX' : `LVL ${user.level}`}</div>
          </motion.div>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className={`flex items-center justify-center md:justify-start gap-3 font-black uppercase tracking-[0.4em] text-[10px] border px-6 py-3 rounded-2xl w-fit mx-auto md:mx-0 group/badge cursor-default ${rarityStyles}`}>
              {featuredBadge ? (
                <>
                  <div className="relative">
                    <featuredBadge.icon size={16} className={featuredBadge.color === 'rainbow' ? 'mythic-rainbow-text' : ''} style={{ color: featuredBadge.color !== 'rainbow' ? getRarityIconColor(featuredBadge) : undefined }} />
                    <div className="absolute inset-0 blur-sm opacity-50 animate-pulse">
                      <featuredBadge.icon size={16} className={featuredBadge.color === 'rainbow' ? 'mythic-rainbow-text' : ''} style={{ color: featuredBadge.color !== 'rainbow' ? getRarityIconColor(featuredBadge) : undefined }} />
                    </div>
                  </div>
                  <span className={featuredBadge.color === 'rainbow' ? 'mythic-rainbow-text' : ''}>TITLE: {featuredBadge.name}</span>
                </>
              ) : (
                <>
                  <ShieldAlert size={16} className="text-slate-600" />
                  <span>NO TITLE EQUIPPED</span>
                </>
              )}
            </div>
            <h1 className="font-orbitron font-black text-4xl md:text-6xl italic leading-none text-white tracking-tighter uppercase">WELCOME <br/><span className="text-theme drop-shadow-theme">{user.username}</span></h1>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <Activity size={14} className="text-emerald-500 animate-pulse" />
                Profile Verified
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 max-w-md mx-auto md:mx-0 w-full">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">
            <span>EXP PROGRESS</span>
            <div className="flex items-center gap-3">
              <span className="text-white text-xs font-orbitron">{user.level}</span>
              <span className="text-theme opacity-60">→</span>
              <span className="text-slate-400 text-xs font-orbitron">{user.level + 1}</span>
            </div>
          </div>
          <div className="exp-bar-container">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${expProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="exp-bar-fill"
            />
            <div className="absolute inset-0 flex justify-around pointer-events-none">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="w-px h-full bg-white/5"></div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em]">{user.level >= 999 ? 'MAX LEVEL REACHED' : `${Math.round(expProgress)}% COMPLETED`}</span>
            </div>
          </div>
          <div className="flex justify-between text-[8px] font-black text-slate-600 uppercase tracking-widest">
            <span>{user.exp} EXP</span>
            <span>{user.level * 200} EXP</span>
          </div>
        </div>
        <p className="text-slate-300 text-base md:text-lg max-w-md font-medium text-center md:text-left">The elite unblocked library for high-performance browser gaming. Zero lag, zero blocks, pure gaming.</p>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button onClick={onBrowseLibrary} className="bg-theme text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:scale-105 hover:brightness-110 shadow-theme">Browse Library</button>
        </div>
      </div>
      <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-end opacity-100 z-0">
        <span className="font-orbitron font-black text-8xl leading-none text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">9X</span>
        <span className="font-bold tracking-[0.5em] text-sm uppercase text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">Reworked</span>
      </div>
    </section>
  );
};
