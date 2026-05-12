import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings as SettingsIcon, Shield, Bell, Activity, Layers, Bot, Ghost, BrainCircuit, Rocket, Plus, Award, Flame, User, X, ChevronRight, Zap, Star, Trophy, Monitor, Smartphone, Volume2, Eye, EyeOff, Key, LogOut, RefreshCw, Palette, Cpu, AlertTriangle, ChevronDown, LayoutGrid, MessageSquare } from 'lucide-react';

export const Settings = ({ user, onUpdateSettings, onSetTheme, onRedeemCode, onResetProgress, onUpdateUsername }) => {
  const [redeemInput, setRedeemInput] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showUsernameConfirm, setShowUsernameConfirm] = useState(false);
  const [usernameInput, setUsernameInput] = useState(user.username);

  const sections = [
    {
      id: 'general',
      title: 'Settings',
      icon: SettingsIcon,
      settings: [
        { id: 'sidebarAutoHide', label: 'Sidebar Auto-Hide', description: 'Collapse the side menu automatically.', type: 'toggle' },
        { id: 'hideUnreleased', label: 'Hide Unreleased', description: 'Hide sidebar tabs that are coming soon.', type: 'toggle' },
        { id: 'notifications', label: 'Show Notifications', description: 'Get alerts for achievements and updates.', type: 'toggle' }
      ]
    },
    {
      id: 'visuals',
      title: 'Visuals',
      icon: Palette,
      settings: [
        { id: 'performanceMode', label: 'Potato Mode', description: 'Disable heavy animations and background effects for low-end devices.', type: 'toggle' },
        { id: 'backgroundEffects', label: 'Ambient Particles', description: 'Subtle floating effects in the background.', type: 'toggle' },
        { id: 'disableGlow', label: 'Reduce Glow', description: 'Decrease intense neon and blooming effects.', type: 'toggle' },
        { id: 'showFPS', label: 'Show FPS Tracker', description: 'Toggle the real-time performance counter.', type: 'toggle' }
      ]
    },
    {
      id: 'account',
      title: 'Change Username',
      icon: User,
      settings: []
    }
  ];

  return (
    <div className="pb-40 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirm(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-black border border-red-500/20 rounded-[2.5rem] p-10 shadow-[0_0_100px_rgba(239,68,68,0.1)]"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-8">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-6">RESET PROGRESS?</h3>
              <div className="space-y-4 text-white/40 text-sm leading-relaxed mb-10 font-medium">
                <p className="text-red-500 font-black uppercase tracking-widest text-[10px]">Warning: Critical Action</p>
                <p>Are you absolutely sure you want to reset your progress?</p>
                <p>This action will permanently erase ALL of your data, including:</p>
                <ul className="list-disc list-inside space-y-1 text-white/60 text-xs italic">
                  <li>Levels & Experience (XP)</li>
                  <li>Unlocked neural avatars</li>
                  <li>Game records & achievements</li>
                  <li>Custom UI configurations</li>
                </ul>
                <p className="text-red-500/60 italic text-[11px]">This action is irreversible and cannot be undone.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all italic rounded-xl"
                >
                  CANCEL
                </button>
                <button 
                  onClick={() => {
                    onResetProgress();
                    setShowResetConfirm(false);
                  }}
                  className="flex-1 py-4 bg-red-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all italic shadow-[0_0_30px_rgba(239,68,68,0.3)] rounded-xl"
                >
                  RESET DATA
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showUsernameConfirm && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUsernameConfirm(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-black border border-white/10 rounded-[3rem] p-12 shadow-2xl"
            >
              <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-4 text-center">Are you sure?</h3>
              <p className="text-white/40 text-[11px] font-medium leading-relaxed uppercase tracking-widest text-center italic mb-10">
                Updating your session identity will change how you appear across the interface and leaderboards.
              </p>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => {
                    onUpdateUsername(usernameInput);
                    setShowUsernameConfirm(false);
                  }}
                  className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl italic"
                >
                  Confirm Change
                </button>
                <button 
                  onClick={() => setShowUsernameConfirm(false)}
                  className="w-full py-5 bg-white/5 text-white/40 font-black text-[10px] uppercase tracking-widest rounded-2xl italic"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="pt-24 pb-12 relative z-10">
        <div className="max-w-[80rem] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-16">
            <h1 className="text-7xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-none mb-4">
              SETTINGS <span className="text-white/20">CONFIG</span>
            </h1>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic">Manage your classroom experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="p-3 bg-white/[0.03] rounded-[2.5rem] border border-white/10 backdrop-blur-3xl">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all relative overflow-hidden group ${
                      activeTab === section.id 
                        ? 'text-black' 
                        : 'text-white/30 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {activeTab === section.id && (
                      <motion.div 
                        layoutId="active-settings-tab"
                        className="absolute inset-0 bg-white"
                      />
                    )}
                    <section.icon size={18} className="relative z-10" />
                    <span className="text-[10px] uppercase tracking-[0.2em] relative z-10 italic font-black">{section.title}</span>
                  </button>
                ))}
              </div>
              
              <div className="p-3 bg-white/[0.03] rounded-[2.5rem] border border-white/10 backdrop-blur-3xl">
                 <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all relative overflow-hidden group ${
                      activeTab === 'upcoming' 
                        ? 'text-black' 
                        : 'text-white/30 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {activeTab === 'upcoming' && (
                      <motion.div 
                        layoutId="active-settings-tab"
                        className="absolute inset-0 bg-white"
                      />
                    )}
                    <Rocket size={18} className="relative z-10" />
                    <span className="text-[10px] uppercase tracking-[0.2em] relative z-10 italic font-black">COMING SOON</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('codes')}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all relative overflow-hidden group ${
                      activeTab === 'codes' 
                        ? 'text-black' 
                        : 'text-white/30 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {activeTab === 'codes' && (
                      <motion.div 
                        layoutId="active-settings-tab"
                        className="absolute inset-0 bg-white"
                      />
                    )}
                    <Key size={18} className="relative z-10" />
                    <span className="text-[10px] uppercase tracking-[0.2em] relative z-10 italic font-black">CODES</span>
                  </button>
              </div>

              <button 
                onClick={() => setShowResetConfirm(true)}
                className="w-full p-6 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-500/40 hover:bg-red-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 italic"
              >
                <RefreshCw size={14} />
                RESET ALL PROGRESS
              </button>
            </div>

            <div className="md:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {activeTab === 'upcoming' ? (
                    <div className="p-12 rounded-[3.5rem] bg-black/40 border border-white/10 shadow-2xl space-y-12 overflow-hidden relative group">
                      <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Rocket size={120} />
                      </div>
                      
                      <div className="relative z-10">
                        <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-4">COMING SOON</h3>
                        <p className="text-[10px] font-black text-white/30 tracking-[0.5em] uppercase italic">Upcoming features</p>
                      </div>

                      <div className="grid grid-cols-1 gap-6 relative z-10">
                        {[
                          { title: 'APPS', icon: LayoutGrid },
                          { title: 'CUSTOMIZATION', icon: Palette },
                          { title: 'GLOBAL CHAT', icon: MessageSquare }
                        ].map((item, i) => (
                          <div key={i} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-center gap-8 group/item hover:bg-white/5 transition-all">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover/item:text-theme transition-colors">
                              <item.icon size={32} />
                            </div>
                            <div>
                               <div className="flex items-center gap-4">
                                 <h4 className="text-xl font-black text-white italic tracking-tighter uppercase">{item.title}</h4>
                                 <span className="px-3 py-1 bg-white/10 rounded-full text-[8px] font-black text-white/40 tracking-widest uppercase">COMING SOON</span>
                               </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-8 rounded-[2rem] bg-theme/5 border border-theme/10 text-center">
                        <p className="text-[10px] font-black text-theme uppercase tracking-[0.3em] italic animate-pulse">WORK IN PROGRESS</p>
                      </div>
                    </div>
                  ) : activeTab === 'codes' ? (
                    <div className="p-10 rounded-[3rem] bg-black/40 border border-white/10 shadow-2xl space-y-8">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">VALIDATE CODES</h3>
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic leading-none">Enter system keys to unlock content</p>
                      </div>
                      
                      <div className="relative group">
                        <input
                          type="text"
                          value={redeemInput}
                          onChange={(e) => setRedeemInput(e.target.value)}
                          placeholder="ENTER CODE..."
                          className="w-full h-16 px-8 bg-white/[0.02] border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest placeholder:text-white/10 focus:border-white/30 outline-none transition-all italic"
                        />
                        <button 
                          onClick={() => {
                            const result = onRedeemCode(redeemInput);
                            if (result.success) setRedeemInput('');
                          }}
                          className="absolute right-2 top-2 bottom-2 px-8 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/90 transition-all italic"
                        >
                          VALIDATE
                        </button>
                      </div>
                      
                      <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
                        <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.3em] italic mb-1">TOTAL REDEEMED</p>
                        <p className="text-3xl font-black text-white italic leading-none">{(user.redeemedCodes || []).length || 0}</p>
                      </div>
                    </div>
                  ) : activeTab === 'account' ? (
                    <div className="p-10 rounded-[3rem] bg-black/40 border border-white/10 shadow-2xl space-y-10">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">CHANGE USERNAME</h3>
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic leading-none">Update your session identity</p>
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <input 
                          type="text"
                          value={usernameInput}
                          onChange={(e) => setUsernameInput(e.target.value)}
                          placeholder="ENTER NEW NAME..."
                          className="w-full h-20 bg-white/[0.02] border border-white/10 rounded-2xl px-10 text-white font-black text-2xl uppercase tracking-tighter outline-none focus:border-white/30 transition-all italic"
                        />
                        <button 
                          onClick={() => setShowUsernameConfirm(true)}
                          disabled={usernameInput.trim().length < 2}
                          className="w-full py-6 bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl hover:scale-[1.01] active:scale-[0.98] transition-all italic shadow-xl disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                          UPDATE USERNAME
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sections.find(s => s.id === activeTab)?.settings.map(setting => (
                        <div key={setting.id} className="p-8 rounded-[2.5rem] bg-black/40 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group">
                          <div>
                            <h4 className="text-xl font-black text-white uppercase italic tracking-tighter mb-1">{setting.label}</h4>
                            <p className="text-[10px] font-black text-white/20 uppercase italic tracking-widest leading-relaxed">{setting.description}</p>
                          </div>
                          
                          <button
                            onClick={() => {
                              const newValue = !user.settings[setting.id];
                              onUpdateSettings({ ...user.settings, [setting.id]: newValue });
                            }}
                            className={`w-14 h-8 rounded-full p-1 transition-all relative ${
                              user.settings[setting.id] ? 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/10'
                            }`}
                          >
                            <motion.div
                              animate={{ x: user.settings[setting.id] ? 24 : 0 }}
                              className={`w-6 h-6 rounded-full ${
                                user.settings[setting.id] ? 'bg-black' : 'bg-white/20'
                              }`}
                            />
                          </button>
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
