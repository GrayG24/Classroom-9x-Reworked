import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Shield, Layers, Bot, User, ChevronRight, Check, Crown, Sparkles, Activity, Zap, Lock } from 'lucide-react';
import { CHARACTERS } from '../constants';

export const Customization = ({ user, onUpdateUser, onUpdateUsername }) => {
  const [activeTab, setActiveTab] = useState('identity');
  const [tempUsername, setTempUsername] = useState(user.username);

  const themes = [
    { id: 'void', name: 'VOID_PROTOCOL', primary: '#ffffff', bg: '#000000', desc: 'The original darkness.', level: 1 },
    { id: 'black-white', name: 'MONOCHROME', primary: '#ffffff', bg: '#000000', desc: 'High contrast binary.', level: 1 },
    { id: 'cyan', name: 'CYBERPUNK', primary: '#06b6d4', bg: '#083344', desc: 'Neon digital landscape.', level: 1 },
    { id: 'emerald', name: 'MATRIX', primary: '#10b981', bg: '#064e3b', desc: 'Follow the white rabbit.', level: 10 },
    { id: 'rose', name: 'VAPORWAVE', primary: '#f43f5e', bg: '#4c0519', desc: 'Aesthetic retro-future.', level: 25 },
    { id: 'gold', name: 'ROYAL_GOLD', primary: '#fbbf24', bg: '#451a03', desc: 'Prestige and power.', isCode: true },
  ];

  const frames = [
    { id: 'obsidian', name: 'OBSIDIAN', rarity: 'Common', level: 1 },
    { id: 'neon', name: 'NEON_PULSE', rarity: 'Rare', level: 5 },
    { id: 'emerald', name: 'EMERALD', rarity: 'Rare', level: 15 },
    { id: 'gold', name: 'ROYAL_GOLD', rarity: 'Epic', level: 30 },
  ];

  const character = CHARACTERS.find(c => c.id === user.currentCharacter) || CHARACTERS[0];

  return (
    <div className="min-h-screen pt-40 pb-40 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse delay-1000"></div>

      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Navigation Sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="flex flex-col gap-12">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <div className="w-3 h-3 bg-primary animate-pulse"></div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-primary">VISUAL_ENGINE // v2.1</span>
                </motion.div>
                <h1 className="text-8xl font-black text-white uppercase tracking-tighter italic leading-none">
                  STYLE <br />
                  <span className="text-white/20">LABS</span>
                </h1>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { id: 'identity', label: 'Neural Identity', icon: User, desc: 'Avatar & Signature' },
                  { id: 'visuals', label: 'Color Protocols', icon: Palette, desc: 'System Themes' },
                  { id: 'frames', label: 'Neural Frames', icon: Layers, desc: 'Profile Borders' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-6 px-8 py-6 rounded-[2rem] transition-all relative overflow-hidden group ${
                      activeTab === tab.id 
                        ? 'bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.15)]' 
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon size={24} className="relative z-10" />
                    <div className="text-left relative z-10">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] italic leading-none mb-1">{tab.label}</p>
                      <p className={`text-[8px] font-bold uppercase tracking-widest ${activeTab === tab.id ? 'text-black/40' : 'text-white/20'}`}>{tab.desc}</p>
                    </div>
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="active-style-pill"
                        className="absolute inset-0 bg-white"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'identity' && (
                <motion.div
                  key="identity"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 xl:grid-cols-12 gap-12"
                >
                  <div className="xl:col-span-7 space-y-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">NEURAL_AVATARS</h3>
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{CHARACTERS.length} MODULES_AVAILABLE</span>
                    </div>
                    
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                      {CHARACTERS.map((char) => {
                        const isUnlocked = user?.unlockedCharacters?.includes(char.id) || false;
                        const isSelected = user.currentCharacter === char.id;
                        return (
                          <button
                            key={char.id}
                            disabled={!isUnlocked}
                            onClick={() => onUpdateUser({ ...user, currentCharacter: char.id })}
                            className={`aspect-square rounded-3xl p-2 transition-all relative group overflow-hidden ${
                              isSelected 
                                ? 'bg-white ring-4 ring-white/20 shadow-[0_0_40px_rgba(255,255,255,0.2)]' 
                                : isUnlocked 
                                  ? 'bg-white/[0.03] border border-white/10 hover:border-white/30' 
                                  : 'bg-black/40 opacity-20 grayscale cursor-not-allowed'
                            }`}
                          >
                            {char.img ? (
                              <img src={char.img} alt={char.name} className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/10">
                                <char.icon size={32} />
                              </div>
                            )}
                            {isSelected && (
                              <div className="absolute top-3 right-3 w-8 h-8 bg-black rounded-xl flex items-center justify-center border border-white/20 shadow-2xl">
                                <Check size={16} className="text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="xl:col-span-5">
                    <div className="bg-white/[0.02] border border-white/10 rounded-[4rem] p-12 flex flex-col items-center justify-center text-center space-y-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      
                      <div className="relative">
                        <div className="w-56 h-56 rounded-[3.5rem] bg-black border-2 border-white/20 p-4 relative z-10 overflow-hidden shadow-2xl">
                          {character.img ? (
                            <img src={character.img} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/10">
                              <character.icon size={64} />
                            </div>
                          )}
                        </div>
                        <div className={`absolute -inset-6 frame-${user.currentFrame || 'obsidian'} pointer-events-none z-20`}></div>
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-black shadow-2xl z-30 border-4 border-black">
                          <Crown size={24} />
                        </div>
                      </div>

                      <div className="w-full space-y-10">
                        <div className="relative group">
                          <input 
                            type="text"
                            value={tempUsername}
                            onChange={(e) => setTempUsername(e.target.value)}
                            className="w-full bg-white/5 border-2 border-white/10 rounded-3xl px-8 py-6 text-center text-4xl font-black text-white uppercase tracking-tighter italic focus:outline-none focus:border-white/40 transition-all shadow-inner"
                            placeholder="ENTER NEW IDENTITY..."
                          />
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic">NEURAL_SIGNATURE_OVERRIDE</p>
                          </div>
                        </div>
                        
                        <div className="pt-4 flex justify-center">
                          <button 
                            onClick={() => onUpdateUsername(tempUsername)}
                            disabled={tempUsername.trim() === user.username || !tempUsername.trim()}
                            className="px-16 py-6 bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl hover:bg-primary hover:scale-105 active:scale-95 transition-all disabled:opacity-10 disabled:scale-100 italic shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                          >
                            UPDATE_IDENTITY
                          </button>
                        </div>

                        <div className="flex items-center justify-center gap-6 pt-4">
                          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5">
                            <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Level</p>
                            <p className="text-sm font-black text-white italic">{user.level}</p>
                          </div>
                          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5">
                            <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Title</p>
                            <p className="text-sm font-black text-white italic">{user.currentTitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'visuals' && (
                <motion.div
                  key="visuals"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  {themes.map((theme) => {
                    const isUnlocked = user?.unlockedThemes?.includes(theme.id) || theme.id === 'void';
                    const isSelected = user.currentTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        disabled={!isUnlocked}
                        onClick={() => onUpdateUser({ ...user, currentTheme: theme.id })}
                        className={`group relative p-10 rounded-[3rem] text-left transition-all overflow-hidden ${
                          isSelected 
                            ? 'bg-white text-black shadow-[0_30px_60px_rgba(255,255,255,0.1)]' 
                            : isUnlocked
                              ? 'bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.04]'
                              : 'bg-black/40 opacity-20 grayscale cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-8">
                          <div className="w-16 h-16 rounded-2xl border-4 border-black/10 shadow-2xl" style={{ backgroundColor: theme.primary }}></div>
                          {isSelected && <Sparkles size={24} className="text-black/20" />}
                          {!isUnlocked && <Lock size={20} className="text-white/20" />}
                        </div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter italic mb-2">{theme.name}</h4>
                        <p className={`text-[10px] font-bold uppercase tracking-widest leading-relaxed ${isSelected ? 'text-black/40' : 'text-white/20'}`}>{theme.desc}</p>
                        
                        {isUnlocked && !isSelected && (
                          <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">PROTOCOL_READY</span>
                            <ChevronRight size={14} className="text-white/20 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {activeTab === 'frames' && (
                <motion.div
                  key="frames"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  {frames.map((frame) => {
                    const isUnlocked = user.unlockedFrames.includes(frame.id);
                    const isSelected = user.currentFrame === frame.id;
                    return (
                      <button
                        key={frame.id}
                        disabled={!isUnlocked}
                        onClick={() => onUpdateUser({ ...user, currentFrame: frame.id })}
                        className={`group relative p-10 rounded-[3rem] text-left transition-all overflow-hidden ${
                          isSelected 
                            ? 'bg-white text-black shadow-[0_30px_60px_rgba(255,255,255,0.1)]' 
                            : isUnlocked
                              ? 'bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.04]'
                              : 'bg-black/40 opacity-20 grayscale cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-8">
                          <div className={`w-16 h-16 rounded-2xl border-4 border-black/10 shadow-2xl frame-${frame.id}`}></div>
                          {!isUnlocked && <Lock size={20} className="text-white/20" />}
                        </div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter italic mb-2">{frame.name}</h4>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${isSelected ? 'bg-black/10 text-black/60' : 'bg-white/5 text-white/40'}`}>{frame.rarity}</span>
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${isSelected ? 'text-black/40' : 'text-white/20'}`}>LVL {frame.level}</span>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
