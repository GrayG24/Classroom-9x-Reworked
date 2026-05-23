import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, X, Users, MessageSquare, Activity, Settings, Trash2, Send, Megaphone, Zap, Star, Trophy, Crown, Bot, Ghost, BrainCircuit, Rocket, Plus, Award, Flame, User, ShieldAlert, AlertTriangle, RefreshCw, Power, Terminal, Clock, Palette, Sparkles, Filter, Search, ChevronRight, Binary, Fingerprint, Database, Cpu, Globe } from 'lucide-react';

import { db, auth } from '../lib/firebase';
import { collection, doc, updateDoc, deleteDoc, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp, getDocs, setDoc } from 'firebase/firestore';

const ConfirmModal = ({ title, message, onConfirm, onCancel, isLoading }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[6000] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
  >
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-md w-full bg-black border border-white/10 rounded-[2.5rem] p-10 text-center shadow-2xl"
    >
      <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center text-rose-500 mx-auto mb-8 border border-rose-500/20">
        <AlertTriangle size={40} />
      </div>
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4">{title}</h3>
      <p className="text-white/60 text-sm font-medium uppercase tracking-widest leading-relaxed mb-10">{message}</p>
      <div className="flex gap-4">
        <button 
          onClick={onCancel}
          className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.3em] italic transition-all"
        >
          CANCEL
        </button>
        <button 
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 py-4 bg-rose-500 hover:bg-rose-600 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.3em] italic transition-all shadow-[0_0_30px_rgba(244,63,94,0.3)]"
        >
          {isLoading ? <RefreshCw className="animate-spin mx-auto" size={16} /> : 'CONFIRM'}
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export const AdminPanel = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState(user.role === 'OWNER' ? 'summary' : 'events');
  const [announcement, setAnnouncement] = useState('');
  const [announcementType, setAnnouncementType] = useState('system');
  const [systemStats, setSystemStats] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statsLoading, setStatsLoading] = useState(true);

  // Confirmation state
  const [confirmConfig, setConfirmConfig] = useState(null);

  useEffect(() => {
    // Players listener
    const q = query(collection(db, 'users'), orderBy('username'));
    const unsub = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(d => ({ ...d.data(), uid: d.id }));
      setPlayers(users);
      
      // Calculate real-time stats
      const fiveMinsAgo = Date.now() - 5 * 60 * 1000;
      const activeCount = users.filter(u => {
        const lastSeen = u.lastSeen?.toMillis ? u.lastSeen.toMillis() : 0;
        return lastSeen > fiveMinsAgo;
      }).length;

      setSystemStats(prev => ({
        ...prev,
        activeUsers: activeCount,
        totalPlayers: users.length,
        uptime: Math.floor((Date.now() - (window.performance?.timing?.navigationStart || Date.now())) / 1000)
      }));
      
      setIsLoading(false);
    }, (error) => {
      console.warn('Admin: Players Snapshot Error:', error);
      setIsLoading(false);
    });

    // Global settings listener (for Maintenance toggle state)
    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setIsMaintenance(data.isMaintenanceMode || false);
        setSystemStats(prev => ({
          ...prev,
          maintenance: data.isMaintenanceMode,
        }));
      }
      setStatsLoading(false);
    }, (error) => {
      console.warn('Admin: Settings Snapshot Error:', error);
      setStatsLoading(false);
    });

    return () => {
      unsub();
      unsubSettings();
    };
  }, []);

  const handleSendAnnouncement = async () => {
    if (!announcement.trim()) return;
    
    setConfirmConfig({
      title: "SEND ANNOUNCEMENT",
      message: "Send this global announcement to all active users?",
      action: async () => {
        if (window.isFirestoreQuotaExceeded) {
          setConfirmConfig(null);
          return;
        }
        setIsLoading(true);
        const timeout = setTimeout(() => {
          setIsLoading(false);
          setConfirmConfig(null);
          alert("Action timed out. The server may be under heavy load or quota limit reached.");
        }, 10000);

        try {
          const msgData = {
            text: announcement,
            senderUid: user.uid,
            senderName: user.username,
            timestamp: serverTimestamp(),
            type: announcementType,
            character: user.currentCharacter,
            frame: user.currentFrame,
            isAdmin: true
          };
          
          await addDoc(collection(db, 'announcements'), msgData);
          await addDoc(collection(db, 'chat'), msgData);
          setAnnouncement('');
        } catch (err) {
          console.error('Admin: Broadcast failed:', err);
        } finally {
          clearTimeout(timeout);
          setIsLoading(false);
          setConfirmConfig(null);
        }
      }
    });
  };

  const handleGlobalEvent = async (eventId) => {
    setConfirmConfig({
      title: "TRIGGER EVENT",
      message: `Trigger ${eventId.replace(/_/g, ' ')} for EVERY active player? This will cause major visual effects.`,
      action: async () => {
        if (window.isFirestoreQuotaExceeded) {
          setConfirmConfig(null);
          return;
        }
        setIsLoading(true);
        const timeout = setTimeout(() => {
          setIsLoading(false);
          setConfirmConfig(null);
          alert("Action timed out. The server may be under heavy load or quota limit reached.");
        }, 10000);

        try {
          await addDoc(collection(db, 'events'), {
            type: eventId,
            senderUid: user.uid,
            senderName: user.username,
            character: user.currentCharacter,
            frame: user.currentFrame,
            timestamp: serverTimestamp(),
            target: 'GLOBAL'
          });
        } catch (err) {
          console.error('Admin: Event execution failed:', err);
        } finally {
          clearTimeout(timeout);
          setIsLoading(false);
          setConfirmConfig(null);
        }
      }
    });
  };

  const handleToggleMaintenance = async () => {
    const newState = !isMaintenance;
    setConfirmConfig({
      title: "MTN MODE",
      message: `${newState ? 'Enable' : 'Disable'} access restrictions for all players?`,
      action: async () => {
        setIsLoading(true);
        const timeout = setTimeout(() => {
          setIsLoading(false);
          setConfirmConfig(null);
          alert("Action timed out. The server may be under heavy load or quota limit reached.");
        }, 10000);

        try {
          const globalRef = doc(db, 'settings', 'global');
          await setDoc(globalRef, {
            isMaintenanceMode: newState
          }, { merge: true });
        } catch (err) {
          console.error('Admin: Maintenance toggle failed:', err);
          // Standardized error context for system diagnostics
          const errInfo = {
            error: err.message,
            code: err.code,
            path: 'settings/global',
            operation: 'setDoc',
            uid: auth.currentUser ? auth.currentUser.uid : 'NO_UID',
            email: auth.currentUser ? auth.currentUser.email : 'NO_EMAIL',
            emailVerified: auth.currentUser ? auth.currentUser.emailVerified : 'NO_VERIFIED',
            tokenEmail: auth.currentUser?.reloadUserInfo?.email || 'N/A'
          };
          console.error('Admin: Detailed Error Info:', JSON.stringify(errInfo));
        } finally {
          clearTimeout(timeout);
          setIsLoading(false);
          setConfirmConfig(null);
        }
      }
    });
  };

  const handlePlayerAction = async (action, player) => {
    const playerRef = doc(db, 'users', player.uid);
    
    setConfirmConfig({
      title: "CONFIRM ACTION",
      message: `${action.toUpperCase()} ${player.username.toUpperCase()}?`,
      action: async () => {
        setIsLoading(true);
        try {
          if (action === 'ban') {
            await updateDoc(playerRef, { isBanned: true });
          } else if (action === 'reset') {
            await updateDoc(playerRef, { score: 0, level: 1, exp: 0, gamesPlayed: 0 });
          } else if (action === 'remove') {
            await deleteDoc(playerRef);
          }
        } catch (err) {
          console.error(`Admin: Player action ${action} failed:`, err);
        } finally {
          setIsLoading(false);
          setConfirmConfig(null);
        }
      }
    });
  };

  const filteredPlayers = (Array.isArray(players) ? players : []).filter(p => 
    (p?.username || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p?.uid || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[5000] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-0 lg:p-8"
    >
      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-[1400px] h-full lg:h-[90vh] bg-black border border-white/10 overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)] rounded-none lg:rounded-[3.5rem] relative"
      >
        <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
              <Shield size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none mb-1">ADMIN <span className="text-rose-500">PANEL</span></h2>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isMaintenance ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'}`}></div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic">
                  {isMaintenance ? 'MAINTENANCE ON' : 'SERVER ONLINE'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
              onClick={onClose} 
              className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-white/10 group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-80 border-r border-white/5 p-8 space-y-3 bg-white/[0.01]">
            {[
              { id: 'summary', icon: Activity, label: 'Overview', roles: ['OWNER'] },
              { id: 'players', icon: Database, label: 'Players', roles: ['OWNER'] },
              { id: 'events', icon: Sparkles, label: 'Events', roles: ['OWNER', 'MODERATOR'] },
              { id: 'terminal', icon: Megaphone, label: 'Announcement', roles: ['OWNER', 'MODERATOR'] },
            ].filter(tab => !tab.roles || tab.roles.includes(user.role)).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full p-5 rounded-2xl flex items-center gap-5 transition-all group relative overflow-hidden ${
                  activeTab === tab.id 
                    ? 'bg-rose-500 text-white shadow-[0_0_40px_rgba(244,63,94,0.4)] translate-x-2' 
                    : 'text-white/30 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={20} className={activeTab === tab.id ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
                <span className="text-xs font-black uppercase tracking-widest italic">{tab.label}</span>
              </button>
            ))}
            
            {user.isAdmin && (
              <div className="pt-10 mt-10 border-t border-white/5">
                 <h4 className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-6 italic px-2">QUICK ACTIONS</h4>
                 <button 
                  onClick={handleToggleMaintenance}
                  className={`w-full p-5 rounded-2xl flex items-center justify-between transition-all border ${
                    isMaintenance 
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' 
                      : 'bg-white/5 border-white/10 text-white/40 hover:text-rose-500 hover:border-rose-500/20 hover:bg-rose-500/5'
                  }`}
                 >
                   <div className="flex items-center gap-4">
                      <Power size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest italic">MTN MODE</span>
                   </div>
                   <div className={`w-8 h-4 rounded-full relative transition-colors ${isMaintenance ? 'bg-amber-500' : 'bg-white/10'}`}>
                      <motion.div 
                        animate={{ x: isMaintenance ? 18 : 2 }}
                        className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white"
                      />
                   </div>
                 </button>
              </div>
            )}
          </div>

          <div className="flex-1 p-12 overflow-auto scrollbar-hide">
            <AnimatePresence mode="wait">
              {activeTab === 'summary' && (
                <motion.div 
                  key="summary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { label: 'Active Players', value: systemStats?.activeUsers || '0', icon: Globe, color: 'text-rose-500' },
                      { label: 'Total Players', value: systemStats?.totalPlayers?.toLocaleString() || '0', icon: Users, color: 'text-emerald-400' },
                      { label: 'Server Uptime', value: `${Math.floor((systemStats?.uptime || 0) / 3600)}h ${Math.floor(((systemStats?.uptime || 0) % 3600) / 60)}m`, icon: Clock, color: 'text-amber-400' },
                    ].map((stat, i) => (
                      <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-white/20 transition-colors group text-center">
                        <div className="flex items-center justify-center gap-3 mb-6 opacity-30 group-hover:opacity-100 transition-opacity">
                          <stat.icon size={16} className={stat.color} />
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] italic">{stat.label}</span>
                        </div>
                        <p className="text-4xl font-black text-white italic tracking-tighter leading-none">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

              )}

              {activeTab === 'players' && (
                <motion.div 
                  key="players"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.02] border border-white/5 p-8 rounded-[3rem]">
                    <div className="flex items-center gap-6">
                       <Users size={32} className="text-rose-500/60" />
                       <div>
                         <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">PLAYER <span className="text-white/20">CONTROLS</span></h3>
                         <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic mt-1">Manage {players.length} players online</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                       <div className="relative w-full md:w-80">
                         <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                         <input 
                           type="text" 
                           placeholder="FIND A PLAYER..."
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="w-full h-14 pl-14 pr-6 rounded-2xl bg-black border border-white/10 text-white font-bold text-xs focus:outline-none focus:border-rose-500/50 transition-all placeholder:text-white/10 italic"
                         />
                       </div>
                       <button className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:text-rose-500 transition-all border border-white/10">
                         <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                       </button>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.03]">
                          <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest italic">PLAYER</th>
                          <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest italic">LEVEL</th>
                          <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest italic">SCORE</th>
                          <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest italic text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.02]">
                        {filteredPlayers.map((player) => (
                          <tr key={player.uid} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-[10px] font-black text-rose-500 shadow-lg italic overflow-hidden">
                                   {player.img ? (
                                     <img src={player.img} alt={player.username} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                                   ) : (
                                     (player?.username?.[0] || '?').toUpperCase()
                                   )}
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-xs font-black text-white uppercase italic">{player?.username || 'Unknown'}</span>
                                   <span className="text-[7px] font-black text-white/10 uppercase tracking-widest mt-0.5">{player?.uid || 'no-id'}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <span className="text-xs font-black text-rose-500 italic">LVL {player.level}</span>
                            </td>
                            <td className="px-8 py-6">
                              <span className="text-xs font-black text-white italic">{player.score?.toLocaleString() || 0} <span className="text-[8px] opacity-20 ml-1">POINTS</span></span>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handlePlayerAction('reset', player)} title="Reset Status" className="p-3 rounded-xl bg-white/5 text-white hover:text-amber-500 hover:bg-amber-500/10 transition-all border border-white/5"><RefreshCw size={14} /></button>
                                <button onClick={() => handlePlayerAction('ban', player)} title="Ban Player" className="p-3 rounded-xl bg-white/5 text-white hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-white/5"><ShieldAlert size={14} /></button>
                                <button onClick={() => handlePlayerAction('remove', player)} title="Delete Profile" className="p-3 rounded-xl bg-white/5 text-white hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-white/5"><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'events' && (
                <motion.div 
                  key="events"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-6 bg-white/[0.02] border border-white/5 p-8 rounded-[3rem]">
                     <Sparkles size={32} className="text-indigo-400" />
                     <div>
                       <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">SERVER <span className="text-white/20">EVENTS</span></h3>
                       <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic mt-1">Start special events for all players</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { id: 'RAINBOW_CHAOS', label: 'Rainbow Mode', icon: Palette, color: 'text-indigo-400', bg: 'bg-indigo-400/5' },
                      { id: 'FIRE_STORM', label: 'Fire Storm', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/5' },
                      { id: 'MATRIX_RAIN', label: 'Matrix Mode', icon: BrainCircuit, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
                      { id: 'VOID_STORM', label: 'Void Storm', icon: Ghost, color: 'text-purple-500', bg: 'bg-purple-500/5' },
                      { id: 'SYSTEM_OVERLOAD', label: 'Energy Surge', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/5' },
                      { id: 'GOLDEN_HOUR', label: 'Golden Hour', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/5' },
                      { id: 'BOSS_SPAWN', label: 'Spawn Boss', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-500/5' },
                      { id: 'EXP_EXPLOSION', label: 'Exp Rain', icon: Sparkles, color: 'text-cyan-400', bg: 'bg-cyan-400/5' },
                    ].map((event) => (
                      <button
                        key={event.id}
                        onClick={() => handleGlobalEvent(event.id)}
                        disabled={isLoading}
                        className={`p-10 rounded-[3rem] ${event.bg} border border-white/5 flex flex-col items-center justify-center gap-6 hover:border-white/20 transition-all group group-hover:scale-105 active:scale-95 text-center`}
                      >
                        <div className="p-6 bg-black rounded-[2rem] border border-white/5 group-hover:scale-110 transition-transform">
                           <event.icon size={32} className={event.color} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] italic text-white group-hover:text-theme">{event.label}</span>
                        <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                           <span className="text-[7px] font-black text-emerald-500 uppercase tracking-widest italic">READY TO DEPLOY</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'terminal' && (
                <motion.div 
                  key="terminal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto space-y-10"
                >
                  <div className="p-12 rounded-[4rem] bg-white/[0.02] border border-white/5 space-y-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                       <Megaphone size={120} />
                    </div>
                    
                    <div className="relative">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-3">GLOBAL <span className="text-rose-500">ANNOUNCEMENT</span></h3>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] italic">Send a message to everyone online.</p>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>
                      <textarea
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                        placeholder="Write your message here..."
                        className="w-full h-56 p-10 bg-black border border-white/10 rounded-[2.5rem] text-white placeholder:text-white/5 transition-all resize-none font-black text-lg focus:outline-none focus:border-rose-500/50 italic focus:ring-4 focus:ring-rose-500/5"
                      />
                    </div>

                    <button 
                      onClick={handleSendAnnouncement}
                      disabled={!announcement.trim() || isLoading}
                      className="w-full h-24 rounded-[2rem] bg-rose-500 text-white font-black text-base uppercase tracking-[0.4em] flex items-center justify-center gap-6 hover:bg-rose-600 transition-all disabled:opacity-50 italic shadow-[0_20px_60px_rgba(244,63,94,0.3)] group"
                    >
                      {isLoading ? <RefreshCw className="animate-spin" size={24} /> : (
                        <>
                          SEND ANNOUNCEMENT
                          <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {confirmConfig && (
          <ConfirmModal 
            title={confirmConfig.title}
            message={confirmConfig.message}
            onConfirm={confirmConfig.action}
            onCancel={() => setConfirmConfig(null)}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
