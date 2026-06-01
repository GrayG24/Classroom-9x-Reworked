import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Shield, 
  Layers, 
  Bot, 
  User, 
  ChevronRight, 
  Check, 
  Crown, 
  Sparkles, 
  Activity, 
  Zap, 
  Lock, 
  Award, 
  Eye, 
  Trophy, 
  Compass, 
  Flame 
} from 'lucide-react';
import { CHARACTERS } from '../constants';

export const Customization = ({ user, onUpdateUser, onUpdateUsername }) => {
  const [activeTab, setActiveTab] = useState('identity');
  const [tempUsername, setTempUsername] = useState(user.username);
  const [usernameStatus, setUsernameStatus] = useState(null);

  // Define All 19 System Themes with distinct colors to match index.css Variables
  const themes = [
    { id: 'void', name: 'PURE VOID', primary: '#f4f4f5', bg: '#020202', desc: 'A clean, pitch-black dark theme.', level: 1, type: 'basic' },
    { id: 'black-white', name: 'MONOCHROME', primary: '#ffffff', bg: '#18181b', desc: 'Classic crisp black and white.', level: 1, type: 'basic' },
    { id: 'cyan', name: 'CYBER CYAN', primary: '#00f2ff', bg: '#083344', desc: 'Bright glowing electric cyan.', level: 1, type: 'basic' },
    
    { id: 'violet', name: 'AMETHYST GLOW', primary: '#a78bfa', bg: '#1e1b4b', desc: 'Mystical and smooth deep purple.', level: 5, type: 'advanced' },
    { id: 'cobalt', name: 'COBALT BLUE', primary: '#3b82f6', bg: '#0f172a', desc: 'A solid, deep space blue theme.', level: 5, type: 'advanced' },
    
    { id: 'emerald', name: 'MATRIX GREEN', primary: '#059669', bg: '#022c22', desc: 'A glowing matrix green look.', level: 10, type: 'advanced' },
    { id: 'retrofuture', name: 'RETRO LIME', primary: '#84cc16', bg: '#0d0e12', desc: 'A futuristic vibrant lime green.', level: 10, type: 'advanced' },
    
    { id: 'galaxy', name: 'COSMIC NEBULA', primary: '#d946ef', bg: '#17031e', desc: 'Glowing magenta and deep galaxy purple.', level: 15, type: 'rare' },
    { id: 'synthwave', name: 'SYNTHWAVE NEON', primary: '#ec4899', bg: '#2e0817', desc: 'Retro sunset hot pink.', level: 20, type: 'rare' },
    
    { id: 'gold', name: 'SHINY GOLD', primary: '#d97706', bg: '#451a03', desc: 'Shiny golden champion theme.', level: 25, type: 'epic' },
    { id: 'fire', name: 'VOLCANIC FLAME', primary: '#ea580c', bg: '#1a0400', desc: 'Molten volcanic red and hot orange.', level: 25, type: 'epic' },
    { id: 'interstellar', name: 'DEEP SPACE', primary: '#0284c7', bg: '#030712', desc: 'Glow of a deep space blue nebula.', level: 50, type: 'legendary' },
    
    // Code/Special Themes Custom Config
    { id: 'rainbow', name: 'RAINBOW CODES', primary: '#f43f5e', bg: '#12011b', desc: 'A smooth shifting rainbow spectrum.', isCode: true, type: 'mythic' },
    { id: 'spongebob', name: 'BEACH BUBBLES', primary: '#fde047', bg: '#0f0b3c', desc: 'Cheerful beach yellow.', isCode: true, type: 'rare' },
    { id: 'kanye', name: 'GRADUATION BEATS', primary: '#818cf8', bg: '#10021c', desc: 'Smooth lavender music vibes.', isCode: true, type: 'epic' },
    { id: 'hologram', name: 'HOLOGRAM BLUE', primary: '#a5f3fc', bg: '#030712', desc: 'Flickering holographic sky blue.', isCode: true, type: 'legendary' },
    { id: 'ironman', name: 'ARC TECHNOLOGY', primary: '#dc2626', bg: '#250202', desc: 'A hot red arc reactor theme.', isCode: true, type: 'epic' },
    { id: 'usa', name: 'PATRIOT PRIDE', primary: '#3b82f6', bg: '#0f0505', desc: 'Show your pride with red, white, and blue.', isCode: true, type: 'rare' },
    { id: 'tester', name: 'BETA TESTING', primary: '#fda4af', bg: '#090d16', desc: 'System diagnostic early testing theme.', isCode: true, type: 'mythic' },
    { id: 'glitch', name: 'SYSTEM GLITCH', primary: '#ff00ff', bg: '#05020a', desc: 'A chaotic, glitched cyberpunk theme.', isCode: true, type: 'mythic' },
    { id: 'doge', name: 'SO MUCH DOGE', primary: '#f59e0b', bg: '#292014', desc: 'Much yellow, very doge, so wow theme.', isCode: true, type: 'mythic' },
    { id: 'owner', name: 'OWNER EXCLUSIVE', primary: '#fbbf24', bg: '#1a0307', desc: 'The elite creator gold theme.', isCode: true, type: 'transcendent' },
  ];

  // Define All 15 Custom Styled Profile Frames matching index.css Classes
  const frames = [
    { id: 'default', name: 'DEFAULT BORDER', rarity: 'Common', level: 1, desc: 'Simple thin profile border.' },
    { id: 'obsidian', name: 'OBSIDIAN BORDER', rarity: 'Common', level: 1, desc: 'Sleek and tough dark border.' },
    { id: 'neon', name: 'NEON GLOW BORDER', rarity: 'Uncommon', level: 5, desc: 'Glowing bright outline border.' },
    { id: 'solar', name: 'SOLAR ECLIPSE BORDER', rarity: 'Rare', level: 15, desc: 'Fierce orange burning sun border.' },
    { id: 'interstellar', name: 'SPACE RING BORDER', rarity: 'Epic', level: 30, desc: 'Shining orbit space stardust border.' },
    { id: 'deep-sea', name: 'DEEP SEA BORDER', rarity: 'Epic', level: 45, desc: 'Watery deep blue custom border.' },
    
    // Code/Special Frames
    { id: 'hologram', name: 'HOLOGRAM BORDER', rarity: 'Legendary', isCode: true, desc: 'Light blue digital projection border.' },
    { id: 'glitch', name: 'GLITCHY BORDER', rarity: 'Legendary', isCode: true, desc: 'Rapidly blinking tech error border.' },
    { id: 'usa', name: 'PATRIOTIC BORDER', rarity: 'Rare', isCode: true, desc: 'Red, white, and blue border.' },
    { id: 'tester', name: 'BETA TESTER BORDER', rarity: 'Mythic', isCode: true, desc: 'Special early tester gold border.' },
    { id: 'moderator', name: 'MODERATOR BORDER', rarity: 'Legendary', isCode: true, desc: 'Official manager secure border.' },
    { id: 'owner', name: 'OWNER GOLDEN CROWN', rarity: 'Transcendent', isCode: true, desc: 'Special crown for the owner of the site.' },
    
    // Quest/Award Frames
    { id: 'cyberpunk', name: 'NEON RUNNER BORDER', rarity: 'Mythic', isQuest: true, desc: 'Play 300 games to unlock.' },
    { id: 'matrix', name: 'GREEN MATRIX BORDER', rarity: 'Mythic', isQuest: true, desc: 'Complete special challenge to unlock.' },
    { id: 'diamond', name: 'DIAMOND HANDS BORDER', rarity: 'Transcendent', isQuest: true, desc: 'Play 500 games to unlock.' },
  ];

  const handleUsernameChange = (e) => {
    setTempUsername(e.target.value);
    setUsernameStatus(null);
  };

  const submitUsername = () => {
    const trimmed = tempUsername.trim();
    if (!trimmed || trimmed === user.username) return;
    try {
      onUpdateUsername(trimmed);
      setUsernameStatus({ type: 'success', text: 'USERNAME UPDATED IMMEDIATELY!' });
    } catch (e) {
      setUsernameStatus({ type: 'error', text: 'FAILED TO UPDATE USERNAME.' });
    }
  };

  // Safe checks for unlocks
  const isCharUnlocked = (char) => {
    if (char.id === 'agent-x') return true;
    const unlockedList = user.unlockedCharacters || [];
    if (char.isCode) {
      return unlockedList.includes(char.id);
    }
    return user.level >= (char.level || 1) || unlockedList.includes(char.id);
  };

  const isThemeUnlocked = (theme) => {
    if (theme.id === 'void' || theme.id === 'black-white' || theme.id === 'cyan') return true;
    const unlockedList = user.unlockedThemes || [];
    if (theme.isCode) {
      return unlockedList.includes(theme.id);
    }
    return user.level >= (theme.level || 1) || unlockedList.includes(theme.id);
  };

  const isFrameUnlocked = (frame) => {
    if (frame.id === 'default' || frame.id === 'obsidian') return true;
    const unlockedList = user.unlockedFrames || [];
    if (frame.isCode || frame.isQuest) {
      return unlockedList.includes(frame.id);
    }
    return user.level >= (frame.level || 1) || unlockedList.includes(frame.id);
  };

  const activeCharacter = CHARACTERS.find(c => c.id === user.currentCharacter) || CHARACTERS[0];

  const getRarityColor = (typeOrRarity) => {
    const raw = typeOrRarity?.toLowerCase();
    switch (raw) {
      case 'common': return 'from-slate-400 to-zinc-500 text-slate-200';
      case 'uncommon': return 'from-emerald-400 to-green-600 text-emerald-200';
      case 'rare': return 'from-blue-400 to-indigo-600 text-blue-200';
      case 'advanced': return 'from-purple-400 to-indigo-600 text-purple-200';
      case 'epic': return 'from-amber-400 to-yellow-600 text-amber-200';
      case 'legendary': return 'from-rose-400 to-pink-600 text-rose-200';
      case 'mythic': return 'from-purple-500 to-pink-600 text-purple-200';
      case 'transcendent': return 'from-cyan-400 via-pink-400 to-yellow-400 text-cyan-200';
      default: return 'from-zinc-500 to-zinc-700 text-zinc-200';
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-40 relative overflow-hidden transition-all duration-500 bg-background text-foreground animate-fade-in">
      {/* Background Ambience Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      
      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Navigation Sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="flex flex-col gap-10">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--primary)]"></div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-primary">PROFILE STYLES</span>
                </motion.div>
                <h1 className="text-7xl font-extrabold text-white uppercase tracking-tighter italic leading-none">
                  MY LOOKS
                </h1>
                <p className="text-white/30 text-xs font-mono tracking-widest uppercase mt-4 italic">Change your picture, profile borders, and system themes.</p>
              </div>

              {/* Subnavigation Hub */}
              <div className="flex flex-col gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-[2.5rem]">
                {[
                  { id: 'identity', label: 'AVATARS', icon: User, desc: 'YOUR PIC', count: CHARACTERS.length },
                  { id: 'visuals', label: 'THEMES', icon: Palette, desc: 'YOUR COLOR', count: themes.length },
                  { id: 'frames', label: 'BORDERS', icon: Layers, desc: 'YOUR BORDER', count: frames.length }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-between px-6 py-5 rounded-2xl transition-all relative overflow-hidden group ${
                      activeTab === tab.id 
                        ? 'bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.15)]' 
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-5 relative z-10">
                      <tab.icon size={20} className="relative z-10 shrink-0" />
                      <div className="text-left relative z-10">
                        <p className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">{tab.label}</p>
                        <p className={`text-[8px] font-bold uppercase tracking-wider ${activeTab === tab.id ? 'text-black/50' : 'text-white/20'}`}>{tab.desc}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] font-mono font-black border px-2 py-0.5 rounded-md ${activeTab === tab.id ? 'border-black/10 bg-black/5 text-black' : 'border-white/5 bg-white/[0.02] text-white/40'}`}>
                      {tab.count}
                    </span>
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="active-nav-pill"
                        className="absolute inset-0 bg-white"
                        style={{ zIndex: 0 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Content Center */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: CARD IDENTITY (CHARACTERS) */}
              {activeTab === 'identity' && (
                <motion.div
                  key="identity"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-1 xl:grid-cols-12 gap-12"
                >
                  <div className="xl:col-span-7 space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">CHOOSE YOUR PICTURE</h3>
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                        {CHARACTERS.filter(isCharUnlocked).length} / {CHARACTERS.filter(char => !char.isCode || isCharUnlocked(char)).length} UNLOCKED
                      </span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                      {CHARACTERS.filter(char => !char.isCode || isCharUnlocked(char)).map((char) => {
                        const isUnlocked = isCharUnlocked(char);
                        const isSelected = user.currentCharacter === char.id;
                        return (
                          <button
                            key={char.id}
                            onClick={() => {
                              if (isUnlocked) {
                                onUpdateUser({ ...user, currentCharacter: char.id });
                              }
                            }}
                            className={`aspect-square rounded-[2rem] p-1.5 transition-all relative group overflow-hidden ${
                              isSelected 
                                ? 'bg-white ring-4 ring-white/20 shadow-[0_0_30px_rgba(255,255,255,0.25)] scale-[1.03]' 
                                : isUnlocked 
                                  ? 'bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.04]' 
                                  : 'bg-black/50 border border-white/5 opacity-30 cursor-not-allowed'
                            }`}
                          >
                            <div className="w-full h-full rounded-[1.7rem] overflow-hidden bg-black flex items-center justify-center relative">
                              {char.img ? (
                                <img 
                                  src={char.img} 
                                  alt={char.name} 
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="text-white/20">
                                  <char.icon size={26} />
                                </div>
                              )}

                              {/* Lock indicator */}
                              {!isUnlocked && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-1.5">
                                  <Lock size={12} className="text-white/40" />
                                  <span className="text-[7px] font-mono font-black text-rose-500 uppercase tracking-wider">LVL {char.level || 'CODE'}</span>
                                </div>
                              )}

                              {/* Selected pill */}
                              {isSelected && (
                                <div className="absolute top-2 right-2 w-6 h-6 bg-black rounded-lg flex items-center justify-center border border-white/10 shadow-2xl">
                                  <Check size={12} className="text-white" />
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preview Sidebar Panel */}
                  <div className="xl:col-span-5">
                    <div className="bg-white/[0.02] border border-white/10 rounded-[3.5rem] p-10 flex flex-col items-center justify-center text-center space-y-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      
                      {/* Avatar Render Circle */}
                      <div className="relative">
                        <div className="w-48 h-48 rounded-full bg-black border-2 border-white/10 p-3 relative z-10 overflow-hidden shadow-2xl">
                          {activeCharacter.img ? (
                            <img 
                              src={activeCharacter.img} 
                              alt="Active Avatar" 
                              className="w-full h-full object-cover rounded-full" 
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20">
                              <activeCharacter.icon size={56} />
                            </div>
                          )}
                        </div>
                        {/* Dynamic absolute Frame */}
                        <div className={`absolute -inset-1.5 frame-${user.currentFrame || 'obsidian'} pointer-events-none z-20`} />
                        
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black shadow-2xl z-30 border-4 border-black">
                          <Crown size={18} />
                        </div>
                      </div>

                      {/* Character description */}
                      <div className="space-y-2">
                        <p className="text-[10px] font-mono text-primary uppercase font-bold tracking-widest">{activeCharacter.isCode ? 'SECRET PICTURE UNLOCKED' : `LEVEL ${activeCharacter.level || 1} USER`}</p>
                        <h4 className="text-2xl font-black text-white tracking-tight uppercase italic">{activeCharacter.name}</h4>
                        <p className="text-[10px] text-white/40 max-w-sm font-medium leading-relaxed uppercase">{activeCharacter.desc}</p>
                      </div>

                      {/* Username Update Interface */}
                      <div className="w-full space-y-6 pt-4 border-t border-white/5">
                        <div className="relative">
                          <input 
                            type="text"
                            value={tempUsername}
                            onChange={handleUsernameChange}
                            maxLength={15}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center text-xl font-black text-white uppercase tracking-wider italic focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all shadow-inner"
                            placeholder="ENTER NEW NAME..."
                          />
                          <p className="text-[8px] font-semibold text-white/20 uppercase tracking-[0.3em] font-mono mt-3 italic">TYPE NEW NAME</p>
                        </div>
                        
                        <button 
                          onClick={submitUsername}
                          disabled={tempUsername.trim() === user.username || !tempUsername.trim()}
                          className="w-full py-4 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-10 disabled:scale-100 disabled:pointer-events-none italic shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                        >
                          SAVE NEW NAME
                        </button>

                        {usernameStatus && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-3 rounded-xl border text-center text-[10px] font-bold ${
                              usernameStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}
                          >
                            {usernameStatus.text}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: SYSTEM THEME SELECTION (THEMES) */}
              {activeTab === 'visuals' && (
                <motion.div
                  key="visuals"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">CHOOSE SITE THEME</h3>
                      <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mt-1">Pick any look you unlocked</p>
                    </div>
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      {themes.filter(isThemeUnlocked).length} / {themes.filter(theme => !theme.isCode || isThemeUnlocked(theme)).length} UNLOCKED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {themes.filter(theme => !theme.isCode || isThemeUnlocked(theme)).map((theme) => {
                      const isUnlocked = isThemeUnlocked(theme);
                      const isSelected = user.currentTheme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => {
                            if (isUnlocked) {
                              onUpdateUser({ ...user, currentTheme: theme.id });
                            }
                          }}
                          className={`group text-left p-6 rounded-[2.5rem] transition-all relative overflow-hidden flex flex-col justify-between h-56 ${
                            isSelected 
                              ? 'bg-white text-black shadow-[0_25px_50px_rgba(255,255,255,0.15)] scale-[1.02]' 
                              : isUnlocked
                                ? 'bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                                : 'bg-black/50 border border-white/5 opacity-30 cursor-not-allowed'
                          }`}
                        >
                          {/* Inner Background Glow representation */}
                          {isSelected && (
                            <div className="absolute inset-0 bg-gradient-to-br from-white via-zinc-100 to-zinc-200 -z-10" />
                          )}

                          <div className="flex items-start justify-between w-full">
                            {/* Color Accents dots representation */}
                            <div className="flex gap-2 p-1 bg-black/20 rounded-full border border-white/5">
                              <span 
                                className="w-5 h-5 rounded-full border-2 border-black/10 block shadow-inner" 
                                style={{ background: theme.primary }}
                              />
                              <span 
                                className="w-5 h-5 rounded-full border-2 border-black/10 block" 
                                style={{ background: theme.bg }}
                              />
                            </div>

                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
                              isSelected 
                                ? 'bg-black/5 border-black/10 text-black/60' 
                                : 'bg-white/5 border-white/10 text-white/40'
                            }`}>
                              {theme.type.toUpperCase()}
                            </span>
                          </div>

                          <div className="space-y-2 mt-4 relative z-10">
                            <h4 className="text-xl font-extrabold uppercase tracking-tight italic">{theme.name}</h4>
                            <p className={`text-[9px] font-medium leading-relaxed uppercase ${isSelected ? 'text-black/50' : 'text-white/40'}`}>
                              {theme.desc}
                            </p>
                          </div>

                          <div className="mt-4 pt-4 border-t border-black/5 w-full flex items-center justify-between relative z-10">
                            {isSelected ? (
                              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-black">
                                <Sparkles size={11} className="animate-spin" />
                                <span>ACTIVE</span>
                              </div>
                            ) : isUnlocked ? (
                              <div className="flex items-center justify-between w-full">
                                <span className="text-[8px] font-black uppercase tracking-widest text-white/20">READY TO USE</span>
                                <ChevronRight size={12} className="text-white/30 group-hover:translate-x-1 transition-transform" />
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-rose-500">
                                <Lock size={10} />
                                <span>LOCKED (LEVEL {theme.level || 'CODE'})</span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: PROFILE BORDERS (FRAMES) */}
              {activeTab === 'frames' && (
                <motion.div
                  key="frames"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">CHOOSE YOUR BORDER</h3>
                      <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mt-1">These borders wrap around your picture</p>
                    </div>
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      {frames.filter(isFrameUnlocked).length} / {frames.filter(frame => !frame.isCode || isFrameUnlocked(frame)).length} UNLOCKED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {frames.filter(frame => !frame.isCode || isFrameUnlocked(frame)).map((frame) => {
                      const isUnlocked = isFrameUnlocked(frame);
                      const isSelected = user.currentFrame === frame.id;
                      return (
                        <button
                          key={frame.id}
                          onClick={() => {
                            if (isUnlocked) {
                              onUpdateUser({ ...user, currentFrame: frame.id });
                            }
                          }}
                          className={`group text-left p-6 rounded-[2.5rem] transition-all relative overflow-hidden flex flex-col justify-between h-56 ${
                            isSelected 
                              ? 'bg-white text-black shadow-[0_25px_50px_rgba(255,255,255,0.15)] scale-[1.02]' 
                              : isUnlocked
                                ? 'bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                                : 'bg-black/50 border border-white/5 opacity-30 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-start justify-between w-full">
                            {/* Frame overlay represent model */}
                            <div className="relative w-14 h-14 bg-black rounded-full p-1.5 flex items-center justify-center border border-white/5 mt-1">
                              <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center">
                                <User size={16} className={isSelected ? 'text-black/20' : 'text-white/20'} />
                              </div>
                              <div className={`absolute -inset-1 frame-${frame.id} pointer-events-none z-20`} />
                            </div>

                            <div className="flex flex-col items-end gap-1.5">
                              <span className={`px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest bg-gradient-to-r ${getRarityColor(frame.rarity)}`}>
                                {frame.rarity.toUpperCase()}
                              </span>
                              {!frame.isCode && !frame.isQuest && (
                                <span className={`text-[8px] font-mono font-bold uppercase tracking-widest ${isSelected ? 'text-black/50' : 'text-white/30'}`}>
                                  LEVEL {frame.level}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="space-y-1.5 mt-4">
                            <h4 className="text-lg font-extrabold uppercase tracking-tight italic">{frame.name}</h4>
                            <p className={`text-[9px] font-medium leading-relaxed uppercase ${isSelected ? 'text-black/50' : 'text-white/40'}`}>
                              {frame.desc}
                            </p>
                          </div>

                          <div className="mt-4 pt-4 border-t border-black/5 w-full flex items-center justify-between">
                            {isSelected ? (
                              <span className="text-[8px] font-mono font-black uppercase tracking-wider text-black">ACTIVE</span>
                            ) : isUnlocked ? (
                              <div className="flex items-center justify-between w-full">
                                <span className="text-[8px] font-black uppercase tracking-widest text-white/20">USE IT</span>
                                <ChevronRight size={12} className="text-white/30 group-hover:translate-x-1 transition-transform" />
                              </div>
                            ) : (
                              <span className="text-[8px] font-black uppercase tracking-widest text-rose-500 flex items-center gap-1">
                                <Lock size={10} />
                                <span>LOCKED ({frame.isQuest ? 'QUEST' : frame.isCode ? 'CODE' : `LEVEL ${frame.level}`})</span>
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
