import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, X, Users, MessageSquare, Activity, Settings, Trash2, Send, Megaphone, Zap, Star, Trophy, Crown, Bot, Ghost, BrainCircuit, Rocket, Plus, Award, Flame, User, ShieldAlert, AlertTriangle, RefreshCw, Power, Terminal, Clock, Palette, Sparkles, Filter, Search, ChevronRight, Binary, Fingerprint, Database, Cpu, Globe } from 'lucide-react';

export const AdminPanel = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [announcement, setAnnouncement] = useState('');
  const [announcementType, setAnnouncementType] = useState('system');
  const [systemStats, setSystemStats] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/system/status');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSystemStats(data);
      setIsMaintenance(data.maintenance);
      setStatsLoading(false);
    } catch (err) {
      console.error('Admin: Failed to fetch system stats:', err);
      setStatsLoading(false);
    }
  }, []);

  const fetchNodes = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setNodes(data);
    } catch (err) {
      console.error('Admin: Failed to fetch nodes:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    fetchNodes();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [fetchStats, fetchNodes]);

  const handleSendAnnouncement = async () => {
    if (!announcement.trim()) return;
    if (!confirm(`INITIALIZE BROADCAST: Send this ${announcementType.toUpperCase()} packet to all active nodes?`)) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/announce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: announcement, 
          type: announcementType,
          sender: { 
            username: user.username,
            characterId: user.currentCharacter,
            frameId: user.currentFrame
          } 
        })
      });
      if (res.ok) {
        setAnnouncement('');
      }
    } catch (err) {
      console.error('Admin: Broadcast failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGlobalEvent = async (eventId) => {
    if (!confirm(`EXECUTE GLOBAL EVENT: ${eventId.replace(/_/g, ' ')}? This will override local node states.`)) return;

    setIsLoading(true);
    try {
      await fetch('/api/admin/abuse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: eventId, 
          target: 'GLOBAL', 
          sender: { 
            username: user.username,
            characterId: user.currentCharacter,
            frameId: user.currentFrame
          }
        })
      });
    } catch (err) {
      console.error('Admin: Event execution failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMaintenance = async () => {
    const newState = !isMaintenance;
    if (!confirm(`MAINTENANCE OVERRIDE: ${newState ? 'RESTRICT' : 'RESTORE'} system access for non-admin nodes?`)) return;

    try {
      const res = await fetch('/api/admin/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: newState })
      });
      if (res.ok) {
        const data = await res.json();
        setIsMaintenance(data.enabled);
      }
    } catch (err) {
      console.error('Admin: Maintenance toggle failed:', err);
    }
  };

  const handleNodeAction = async (action, node) => {
    const actions = {
      ban: { label: 'PERMANENTLY DISCONNECT', endpoint: '/api/admin/ban-player', color: 'text-rose-500' },
      reset: { label: 'WIPE CORE DATA FOR', endpoint: '/api/admin/reset-stats', color: 'text-amber-500' },
      remove: { label: 'PURGE FROM DATABASE', endpoint: '/api/admin/remove-player', color: 'text-rose-500' }
    };
    
    const config = actions[action];
    if (!confirm(`CRITICAL INTERVENTION: Are you sure you want to ${config.label} node ${node.username.toUpperCase()}?`)) return;

    setIsLoading(true);
    try {
      const res = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: node.uid })
      });
      if (res.ok) fetchNodes();
    } catch (err) {
      console.error(`Admin: Node action ${action} failed:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNodes = nodes.filter(n => 
    n.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.uid.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-0 lg:p-8"
    >
      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-[1400px] h-full max-h-[900px] bg-black border border-white/10 overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)] rounded-none lg:rounded-[3.5rem] relative"
      >
        <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
              <Shield size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none mb-1">CENTRAL <span className="text-rose-500">INTELLIGENCE</span></h2>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isMaintenance ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'}`}></div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic">
                  {isMaintenance ? 'MAINTENANCE MODE ACTIVE' : 'SYSTEM STATUS: OPERATIONAL'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden xl:flex items-center gap-8 px-8 py-3 bg-white/[0.03] border border-white/5 rounded-2xl">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest italic leading-none mb-1">KERNEL LOAD</span>
                  <span className="text-sm font-black text-white italic tracking-tighter">0.04%</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest italic leading-none mb-1">REGION</span>
                  <span className="text-sm font-black text-rose-500 italic tracking-tighter">US-WEST (PROD)</span>
                </div>
             </div>
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
              { id: 'summary', icon: Activity, label: 'System Overview' },
              { id: 'nodes', icon: Database, label: 'Node Directory' },
              { id: 'events', icon: Sparkles, label: 'Event Engine' },
              { id: 'terminal', icon: Terminal, label: 'Broadcast Terminal' },
            ].map(tab => (
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                      { label: 'Network Nodes', value: systemStats?.activeUsers || '0', icon: Globe, color: 'text-rose-500' },
                      { label: 'Registered Bio', value: systemStats?.totalPlayers?.toLocaleString() || '0', icon: Users, color: 'text-emerald-400' },
                      { label: 'Uptime Vector', value: `${Math.floor((systemStats?.uptime || 0) / 3600)}h ${Math.floor(((systemStats?.uptime || 0) % 3600) / 60)}m`, icon: Clock, color: 'text-amber-400' },
                      { label: 'Cpu Flux', value: '4.2%', icon: Cpu, color: 'text-cyan-400' }
                    ].map((stat, i) => (
                      <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-white/20 transition-colors group">
                        <div className="flex items-center gap-3 mb-6 opacity-30 group-hover:opacity-100 transition-opacity">
                          <stat.icon size={16} className={stat.color} />
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] italic">{stat.label}</span>
                        </div>
                        <p className="text-4xl font-black text-white italic tracking-tighter leading-none">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 space-y-8">
                      <div className="flex items-center justify-between">
                         <h3 className="text-lg font-black text-white uppercase tracking-tighter italic leading-none">SYSTEM <span className="text-white/20">METRICS</span></h3>
                         <Activity size={20} className="text-rose-500/40" />
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          { label: 'Data Transmission', value: systemStats?.totalMessages?.toLocaleString() || '0', unit: 'PACKETS', icon: Binary },
                          { label: 'Combat Simulations', value: systemStats?.totalGames?.toLocaleString() || '0', unit: 'SESSIONS', icon: Rocket },
                          { label: 'Energy Potential', value: (systemStats?.totalScore || 0).toLocaleString(), unit: 'UNITS', icon: Zap }
                        ].map((m, i) => (
                          <div key={i} className="p-6 rounded-3xl bg-black border border-white/5 flex items-center justify-between group hover:bg-white/[0.02] transition-all">
                             <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                                   <m.icon size={20} />
                                </div>
                                <div>
                                   <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic mb-0.5">{m.label}</p>
                                   <p className="text-2xl font-black text-white italic tracking-tighter">{m.value}</p>
                                </div>
                             </div>
                             <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.5em]">{m.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 flex flex-col justify-center gap-8 relative overflow-hidden">
                       <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-rose-500/5 rounded-full blur-[100px]" />
                       <div className="relative">
                         <h3 className="text-lg font-black text-white uppercase tracking-tighter italic leading-none mb-4">SYSTEM <span className="text-white/20">INTEGRITY</span></h3>
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] italic mb-6">Security protocols are active. Critical destructive actions have been decommissioned per administrative order.</p>
                         
                         <div className="flex items-center gap-4 p-6 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
                            <ShieldAlert className="text-rose-500 shrink-0" size={20} />
                            <span className="text-[8px] font-black text-rose-500/60 uppercase tracking-[0.3em] italic">ROOT DESTRUCTIVE COMMANDS ARE CURRENTLY RESTRICTED</span>
                         </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'nodes' && (
                <motion.div 
                  key="nodes"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.02] border border-white/5 p-8 rounded-[3rem]">
                    <div className="flex items-center gap-6">
                       <Fingerprint size={32} className="text-rose-500/60" />
                       <div>
                         <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">NODE <span className="text-white/20">DIRECTORY</span></h3>
                         <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic mt-1">Interacting with {nodes.length} connected entities</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                       <div className="relative w-full md:w-80">
                         <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                         <input 
                           type="text" 
                           placeholder="SEARCH BY UID / USERNAME..."
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="w-full h-14 pl-14 pr-6 rounded-2xl bg-black border border-white/10 text-white font-bold text-xs focus:outline-none focus:border-rose-500/50 transition-all placeholder:text-white/10 italic"
                         />
                       </div>
                       <button onClick={fetchNodes} className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:text-rose-500 transition-all border border-white/10">
                         <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                       </button>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.03]">
                          <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest italic">IDENTIFIER</th>
                          <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest italic">EVOLUTION</th>
                          <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest italic">ENERGY TOTAL</th>
                          <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest italic text-right">PROTOCOLS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.02]">
                        {filteredNodes.map((node) => (
                          <tr key={node.uid} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[10px] font-black text-rose-500 shadow-lg italic">
                                   {node.username[0]?.toUpperCase() || '?'}
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-xs font-black text-white uppercase italic">{node.username}</span>
                                   <span className="text-[7px] font-black text-white/10 uppercase tracking-widest mt-0.5">{node.uid}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <span className="text-xs font-black text-rose-500 italic">LVL {node.level}</span>
                            </td>
                            <td className="px-8 py-6">
                              <span className="text-xs font-black text-white italic">{node.score?.toLocaleString() || 0} <span className="text-[8px] opacity-20 ml-1">UNITS</span></span>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleNodeAction('reset', node)} title="Reset Status" className="p-3 rounded-xl bg-white/5 text-white hover:text-amber-500 hover:bg-amber-500/10 transition-all border border-white/5"><RefreshCw size={14} /></button>
                                <button onClick={() => handleNodeAction('ban', node)} title="Terminal Disconnect" className="p-3 rounded-xl bg-white/5 text-white hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-white/5"><ShieldAlert size={14} /></button>
                                <button onClick={() => handleNodeAction('remove', node)} title="Purge Record" className="p-3 rounded-xl bg-white/5 text-white hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-white/5"><Trash2 size={14} /></button>
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
                       <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">EVENT <span className="text-white/20">ENGINE</span></h3>
                       <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic mt-1">Manual override of global environmental variables</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { id: 'RAINBOW_CHAOS', label: 'Rainbow Override', icon: Palette, color: 'text-indigo-400', bg: 'bg-indigo-400/5' },
                      { id: 'FIRE_STORM', label: 'Firestorm Phase', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/5' },
                      { id: 'MATRIX_RAIN', label: 'Matrix Protocol', icon: BrainCircuit, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
                      { id: 'VOID_STORM', label: 'Void Manifestation', icon: Ghost, color: 'text-purple-500', bg: 'bg-purple-500/5' },
                      { id: 'SYSTEM_OVERLOAD', label: 'Energy Overload', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/5' },
                      { id: 'GOLDEN_HOUR', label: 'The Golden Hour', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/5' },
                      { id: 'BOSS_SPAWN', label: 'Aggressive Entity', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-500/5' },
                      { id: 'EXP_EXPLOSION', label: 'EXP Detonation', icon: Sparkles, color: 'text-cyan-400', bg: 'bg-cyan-400/5' },
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
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-3">GLOBAL <span className="text-rose-500">TRANSMISSION</span></h3>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] italic">Direct broadcast to all connected neural nodes.</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'system', label: 'SYSTEM PACKET', color: 'bg-emerald-500 border-emerald-500' },
                        { id: 'alert', label: 'PRIORITY ALERT', color: 'bg-rose-500 border-rose-500' },
                        { id: 'event', label: 'EVENT DIRECTIVE', color: 'bg-amber-500 border-amber-500' }
                      ].map(type => (
                        <button
                          key={type.id}
                          onClick={() => setAnnouncementType(type.id)}
                          className={`p-6 rounded-[1.5rem] border font-black text-[9px] uppercase tracking-widest transition-all italic ${
                            announcementType === type.id 
                              ? `${type.color} text-white shadow-[0_10px_30px_rgba(255,255,255,0.1)]` 
                              : 'bg-white/5 border-white/10 text-white/30 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>
                      <textarea
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                        placeholder="ENTER TRANSMISSION DATA STRING..."
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
                          INITIALIZE GLOBAL BROADCAST
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
    </motion.div>
  );
};
