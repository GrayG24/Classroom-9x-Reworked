import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, X, Users, MessageSquare, Activity, Settings, Trash2, Send, Megaphone, Zap, Star, Trophy, Crown, Bot, Ghost, BrainCircuit, Rocket, Plus, Award, Flame, User, ShieldAlert, AlertTriangle, RefreshCw, Power, Terminal, Clock, Palette, Sparkles } from 'lucide-react';

export const AdminPanel = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('system');
  const [announcement, setAnnouncement] = useState('');
  const [announcementType, setAnnouncementType] = useState('system');
  const [systemStats, setSystemStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMaintenance, setIsMaintenance] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/system/status');
      const data = await res.json();
      setSystemStats(data);
      setIsMaintenance(data.maintenance);
    } catch (err) {
      console.error('Failed to fetch system stats:', err);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      setLeaderboard(data);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchLeaderboard();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSendAnnouncement = async () => {
    if (!announcement.trim()) return;
    setIsLoading(true);
    try {
      await fetch('/api/admin/announce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: announcement, 
          sender: { 
            username: user.username,
            characterId: user.currentCharacter,
            frameId: user.currentFrame
          } 
        })
      });
      setAnnouncement('');
    } catch (err) {
      console.error('Failed to send announcement:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminAction = async (type, target = 'GLOBAL', extra = {}) => {
    setIsLoading(true);
    try {
      await fetch('/api/admin/abuse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type, 
          target, 
          ...extra,
          sender: { 
            username: user.username,
            characterId: user.currentCharacter,
            frameId: user.currentFrame
          }
        })
      });
    } catch (err) {
      console.error('Admin action failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMaintenance = async () => {
    try {
      const res = await fetch('/api/admin/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !isMaintenance })
      });
      const data = await res.json();
      setIsMaintenance(data.enabled);
    } catch (err) {
      console.error('Failed to toggle maintenance:', err);
    }
  };

  const handleUserAction = async (action, username) => {
    const endpoint = action === 'ban' ? '/api/admin/ban-player' : 
                     action === 'reset' ? '/api/admin/reset-stats' : 
                     '/api/admin/remove-player';
    
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      fetchLeaderboard();
    } catch (err) {
      console.error(`User action ${action} failed:`, err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-8"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-6xl h-full max-h-[800px] bg-black border border-white/10 overflow-hidden flex flex-col shadow-[0_0_150px_rgba(0,0,0,1)] rounded-[2.5rem] relative"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 border border-rose-500/20">
              <Shield size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">ADMIN <span className="text-rose-500">CONSOLE</span></h2>
              <div className="flex items-center gap-2 mt-0.5">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isMaintenance ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">
                  {isMaintenance ? 'MAINTENANCE ACTIVE' : 'SYSTEM OPERATIONAL'}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 border-r border-white/5 p-6 space-y-2 bg-white/[0.01]">
            {[
              { id: 'system', icon: Activity, label: 'System Control' },
              { id: 'users', icon: Users, label: 'User Management' },
              { id: 'broadcast', icon: Megaphone, label: 'Broadcast & Events' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all group relative overflow-hidden ${
                  activeTab === tab.id 
                    ? 'bg-rose-500 text-white shadow-[0_0_30px_rgba(244,63,94,0.3)]' 
                    : 'text-white/30 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
                <span className="text-[10px] font-black uppercase tracking-widest italic">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-10 overflow-auto">
            {activeTab === 'system' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Active Nodes', value: systemStats?.activeUsers || '0', icon: Activity, color: 'text-rose-500' },
                    { label: 'Total Players', value: systemStats?.totalPlayers?.toLocaleString() || '0', icon: Users, color: 'text-emerald-500' },
                    { label: 'Kernel Uptime', value: `${Math.floor((systemStats?.uptime || 0) / 3600)}h ${Math.floor(((systemStats?.uptime || 0) % 3600) / 60)}m`, icon: Clock, color: 'text-amber-500' }
                  ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3 mb-4 opacity-40">
                        <stat.icon size={14} className={stat.color} />
                        <span className="text-[8px] font-black uppercase tracking-widest">{stat.label}</span>
                      </div>
                      <p className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest italic mb-2">System Commands</h3>
                    
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                      <div>
                        <p className="text-[10px] font-black text-white uppercase italic">Maintenance Mode</p>
                        <p className="text-[8px] text-white/20 font-black uppercase tracking-widest mt-0.5">Restrict access to admins</p>
                      </div>
                      <button 
                        onClick={handleToggleMaintenance}
                        className={`w-12 h-6 rounded-full relative transition-all ${isMaintenance ? 'bg-amber-500' : 'bg-white/10'}`}
                      >
                        <motion.div 
                          animate={{ x: isMaintenance ? 26 : 2 }}
                          className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-lg"
                        />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => fetch('/api/admin/clear-chat', { method: 'POST' })}
                        className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all group text-left"
                      >
                        <MessageSquare size={16} className="text-white/20 group-hover:text-rose-500 mb-3" />
                        <p className="text-[9px] font-black text-white uppercase italic">Clear Chat</p>
                      </button>
                      <button 
                        onClick={async () => {
                          if (confirm('ARE YOU SURE? THIS WILL WIPE ALL PLAYER DATA PERMANENTLY.')) {
                            await fetch('/api/admin/clear-leaderboard', { method: 'POST' });
                            fetchLeaderboard();
                            fetchStats();
                          }
                        }}
                        className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all group text-left"
                      >
                        <Trophy size={16} className="text-white/20 group-hover:text-rose-500 mb-3" />
                        <p className="text-[9px] font-black text-white uppercase italic">Wipe Data</p>
                      </button>
                    </div>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest italic mb-6">System Metrics</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Total Messages', value: systemStats?.totalMessages?.toLocaleString() || '0' },
                        { label: 'Total Simulations', value: systemStats?.totalGames?.toLocaleString() || '0' },
                        { label: 'Cumulative Score', value: systemStats?.totalScore?.toLocaleString() || '0' }
                      ].map((m, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                          <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{m.label}</span>
                          <span className="text-xs font-black text-white italic">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Node Management</h3>
                  <button onClick={fetchLeaderboard} className="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:underline flex items-center gap-2">
                    <RefreshCw size={12} /> REFRESH
                  </button>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02]">
                        <th className="p-6 text-[9px] font-black text-white/20 uppercase tracking-widest">Node ID</th>
                        <th className="p-6 text-[9px] font-black text-white/20 uppercase tracking-widest">Level</th>
                        <th className="p-6 text-[9px] font-black text-white/20 uppercase tracking-widest">Score</th>
                        <th className="p-6 text-[9px] font-black text-white/20 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leaderboard.map((node) => (
                        <tr key={node.username} className="group hover:bg-white/[0.01] transition-all">
                          <td className="p-6">
                            <span className="text-xs font-black text-white uppercase italic">{node.username}</span>
                          </td>
                          <td className="p-6">
                            <span className="text-xs font-black text-rose-500 italic">LVL {node.level}</span>
                          </td>
                          <td className="p-6">
                            <span className="text-xs font-black text-white/60">{node.score.toLocaleString()}</span>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleUserAction('reset', node.username)} className="p-2 rounded-lg bg-white/5 text-white/20 hover:text-amber-500 hover:bg-amber-500/10 transition-all"><RefreshCw size={14} /></button>
                              <button onClick={() => handleUserAction('ban', node.username)} className="p-2 rounded-lg bg-white/5 text-white/20 hover:text-rose-500 hover:bg-rose-500/10 transition-all"><ShieldAlert size={14} /></button>
                              <button onClick={() => handleUserAction('remove', node.username)} className="p-2 rounded-lg bg-white/5 text-white/20 hover:text-rose-500 hover:bg-rose-500/10 transition-all"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'broadcast' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Global Broadcast</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {['system', 'alert', 'event'].map(type => (
                        <button
                          key={type}
                          onClick={() => setAnnouncementType(type)}
                          className={`p-3 rounded-xl border font-black text-[8px] uppercase tracking-widest transition-all ${
                            announcementType === type 
                              ? 'bg-rose-500 border-rose-500 text-white' 
                              : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <textarea
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                        placeholder="ENTER TRANSMISSION DATA..."
                        className="w-full h-40 p-6 bg-black border border-white/10 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-rose-500/50 transition-all resize-none font-bold text-sm"
                      />
                    </div>
                    <button 
                      onClick={handleSendAnnouncement}
                      disabled={!announcement.trim() || isLoading}
                      className="w-full h-14 rounded-xl bg-rose-500 text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-rose-600 transition-all disabled:opacity-50 italic"
                    >
                      {isLoading ? <RefreshCw className="animate-spin" size={18} /> : <Send size={18} />}
                      INITIALIZE BROADCAST
                    </button>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Global Events</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'RAINBOW_CHAOS', label: 'Rainbow', icon: Palette, color: 'text-indigo-400' },
                        { id: 'FIRE_STORM', label: 'Fire Storm', icon: Flame, color: 'text-orange-500' },
                        { id: 'MATRIX_RAIN', label: 'Matrix', icon: BrainCircuit, color: 'text-emerald-500' },
                        { id: 'VOID_STORM', label: 'Void Storm', icon: Ghost, color: 'text-purple-500' },
                        { id: 'SYSTEM_OVERLOAD', label: 'Overload', icon: Zap, color: 'text-amber-500' },
                        { id: 'GOLDEN_HOUR', label: 'Golden Hour', icon: Star, color: 'text-yellow-400' },
                        { id: 'BOSS_SPAWN', label: 'Spawn Boss', icon: ShieldAlert, color: 'text-rose-500' },
                        { id: 'EXP_EXPLOSION', label: 'EXP Rain', icon: Sparkles, color: 'text-cyan-400' },
                      ].map((event) => (
                        <button
                          key={event.id}
                          onClick={() => handleAdminAction(event.id)}
                          disabled={isLoading}
                          className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4 hover:bg-white/5 hover:border-white/20 transition-all group"
                        >
                          <event.icon size={16} className={event.color} />
                          <span className="text-[9px] font-black uppercase tracking-widest italic">{event.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
