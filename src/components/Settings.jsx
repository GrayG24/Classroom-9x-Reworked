import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings as SettingsIcon, Shield, Bell, Activity, Layers, Bot, Ghost, BrainCircuit, Rocket, Plus, Award, Flame, User, X, ChevronRight, Zap, Star, Trophy, Monitor, Smartphone, Volume2, Eye, EyeOff, Key, LogOut, RefreshCw, Palette, Cpu, AlertTriangle, ChevronDown } from 'lucide-react';

export const Settings = ({ user, onUpdateSettings, onSetTheme, onRedeemCode, onResetProgress, onUpdateUsername }) => {
  const [redeemInput, setRedeemInput] = useState('');
  const [activeTab, setActiveTab] = useState('interface');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [usernameInput, setUsernameInput] = useState(user.username);

  const sections = [
    {
      id: 'interface',
      title: 'APP SETTINGS',
      icon: Monitor,
      settings: [
        { id: 'showFPS', label: 'PERFORMANCE COUNTER', description: 'Show FPS in the corner of your screen.', type: 'toggle' },
        { id: 'sidebarAutoHide', label: 'COLLAPSIBLE MENU', description: 'Hide the side menu when not in use.', type: 'toggle' },
        { id: 'animatedBg', label: 'MOVING BACKGROUND', description: 'Animated effects on the home screen.', type: 'toggle' },
        { id: 'disableGlow', label: 'FLAT UI', description: 'Remove glowing effects from icons and text.', type: 'toggle' }
      ]
    },
    {
      id: 'privacy',
      title: 'NOTIFICATIONS',
      icon: Bell,
      settings: [
        { id: 'notifications', label: 'POPUP ALERTS', description: 'Show alerts for achievements and updates.', type: 'toggle' }
      ]
    },
    {
      id: 'codes',
      title: 'PROMO CODES',
      icon: Key,
      settings: []
    }
  ];

  return (
    <div className="pb-40 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirm(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-slate-950 border border-red-500/20 rounded-[2.5rem] p-10 shadow-[0_0_100px_rgba(239,68,68,0.1)]"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-8">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-6">RESET PROGRESS?</h3>
              <div className="space-y-4 text-slate-400 text-sm leading-relaxed mb-10 font-medium">
                <p className="text-red-500 font-black uppercase tracking-widest text-[10px]">Warning: Critical Action</p>
                <p>Are you absolutely sure you want to reset your progress?</p>
                <p>This action will permanently erase ALL of your data, including:</p>
                <ul className="list-disc list-inside space-y-1 text-white/60">
                  <li>Levels</li>
                  <li>Experience (XP)</li>
                  <li>Unlocked items</li>
                  <li>Game progress</li>
                </ul>
                <p className="text-red-500/60 italic">This cannot be undone.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all italic"
                >
                  CANCEL
                </button>
                <button 
                  onClick={() => {
                    onResetProgress();
                    setShowResetConfirm(false);
                  }}
                  className="flex-1 py-4 bg-red-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all italic shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                >
                  RESET DATA
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="pt-32 pb-12 relative z-10">
        <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <Cpu size={16} className="text-white animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 italic">CORE SYSTEM v3.0.0 // REWORKED</span>
              </div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter italic leading-none whitespace-nowrap">
                SYSTEM <span className="text-white/20 drop-shadow-[0_0_60px_rgba(255,255,255,0.1)]">SETTINGS</span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-3">
              <div className="p-4 bg-white/[0.03] rounded-[2.5rem] border border-white/10 backdrop-blur-3xl shadow-2xl space-y-2">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all relative overflow-hidden group ${
                      activeTab === section.id 
                        ? 'text-black font-black' 
                        : 'text-white/30 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {activeTab === section.id && (
                      <motion.div 
                        layoutId="active-settings-tab"
                        className="absolute inset-0 bg-white shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                      />
                    )}
                    <section.icon size={20} className="relative z-10" />
                    <span className="text-[11px] uppercase tracking-[0.2em] relative z-10 italic font-black">{section.id}</span>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setShowResetConfirm(true)}
                className="w-full mt-8 py-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-black text-[9px] uppercase tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3 italic"
              >
                <RefreshCw size={14} />
                RESET PROGRESS
              </button>
            </div>

            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {activeTab === 'codes' ? (
                    <div className="relative group">
                      <div className="relative p-10 rounded-[3.5rem] bg-black/40 border border-white/10 backdrop-blur-3xl shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent"></div>
                        
                        <div className="flex items-center gap-6 mb-10">
                          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                            <Key size={28} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">CODES</h3>
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] mt-2 italic">ACCESS OVERRIDE ACTIVE</p>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-6">
                            <p className="text-sm text-white/40 font-medium leading-relaxed uppercase tracking-widest text-[10px]">Enter a secure code to unlock exclusive system modules, themes, and neural avatars.</p>
                            
                            <div className="relative">
                              <input
                                type="text"
                                value={redeemInput}
                                onChange={(e) => setRedeemInput(e.target.value)}
                                placeholder="ENTER CODE..."
                                className="w-full h-16 px-8 bg-black border border-white/10 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-rose-500/50 transition-all font-black uppercase tracking-widest italic"
                              />
                              <button 
                                onClick={() => {
                                  const result = onRedeemCode(redeemInput);
                                  if (result.success) setRedeemInput('');
                                }}
                                className="absolute right-2 top-2 bottom-2 px-6 bg-rose-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-rose-600 transition-all italic"
                              >
                                VALIDATE
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                              <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-2 italic">Known Codes</p>
                              <p className="text-2xl font-black text-white italic">{(user.redeemedCodes || []).length}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {activeTab === 'interface' && (
                        <div className="relative group overflow-hidden rounded-[3.5rem] bg-black/40 border border-white/10 backdrop-blur-3xl shadow-[0_40px_80px_rgba(0,0,0,0.5)] p-10">
                          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                          
                          <div className="flex items-center gap-8 mb-10">
                            <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                              <User size={32} />
                            </div>
                            <div>
                              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">CHANGE USERNAME</h3>
                              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] mt-3 italic">UPDATE PROFILE</p>
                            </div>
                          </div>

                          <div className="flex flex-col gap-6">
                            <div className="relative">
                              <input 
                                type="text"
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value)}
                                placeholder="ENTER NEW IDENTITY..."
                                className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl px-8 text-white font-black text-lg uppercase tracking-widest focus:border-white/40 focus:bg-white/[0.05] outline-none transition-all italic"
                              />
                            </div>
                            <button 
                              onClick={() => onUpdateUsername(usernameInput)}
                              className="w-full py-6 bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] italic"
                            >
                              ENTER
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {sections.filter(s => s.id === activeTab).map(section => (
                      <div key={section.id} className="relative group">
                        <div className="relative p-10 rounded-[3.5rem] bg-black/40 border border-white/10 backdrop-blur-3xl shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                          
                          <div className="flex items-center gap-8 mb-12">
                            <div className="w-20 h-20 rounded-3xl flex items-center justify-center border-2 bg-white/5 text-white border-white/10">
                              <section.icon size={40} />
                            </div>
                            <div>
                              <h3 className="font-black text-white uppercase tracking-tighter italic leading-none text-2xl">{section.title}</h3>
                              <p className="font-black uppercase tracking-[0.6em] mt-3 italic text-white/20 text-[9px]">MODULE ACTIVE</p>
                            </div>
                          </div>

                          <div className="space-y-6">
                            {section.settings.map(setting => (
                              <div key={setting.id} className="rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between gap-8 group/item p-6">
                                <div className="flex-1">
                                  <p className="font-black text-white uppercase tracking-tight italic mb-2 text-lg">{setting.label}</p>
                                  <p className="text-white/20 font-bold uppercase tracking-widest italic text-[10px]">{setting.description}</p>
                                </div>
                                
                                {setting.type === 'toggle' ? (
                                  <button
                                    onClick={() => onUpdateSettings({ ...user.settings, [setting.id]: !user.settings[setting.id] })}
                                    className={`rounded-full p-1 transition-all relative shrink-0 w-14 h-8 ${
                                      user.settings[setting.id] 
                                        ? 'bg-white shadow-[0_0_20px_white]' 
                                        : 'bg-white/10'
                                    }`}
                                  >
                                    <motion.div
                                      animate={{ x: user.settings[setting.id] ? 24 : 0 }}
                                      className={`rounded-full shadow-2xl w-6 h-6 ${
                                        user.settings[setting.id] 
                                          ? 'bg-black' 
                                          : 'bg-white/20'
                                      }`}
                                    />
                                  </button>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
