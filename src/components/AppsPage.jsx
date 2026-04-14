import React from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, MessageSquare, Music, Globe, Terminal, Shield, Zap, Cpu, Activity, Plus, Lock } from 'lucide-react';

export const AppsPage = ({ onToggleChat }) => {
  const apps = [
    {
      id: 'chat',
      name: 'Global Chat',
      icon: MessageSquare,
      description: 'Connect with other system nodes in real-time.',
      category: 'COMMS LINK',
      status: 'ACTIVE',
      version: '2.0.1',
      action: onToggleChat
    },
    {
      id: 'music',
      name: 'Vapor Music',
      icon: Music,
      description: 'Educational music streaming protocol.',
      category: 'MEDIA STREAM',
      status: 'STABLE',
      version: '1.2.4',
      action: () => window.dispatchEvent(new CustomEvent('toggle-vapor-music', { detail: { fullScreen: true } }))
    },
    {
      id: 'browser',
      name: 'Proxy Node',
      icon: Globe,
      description: 'Encrypted gateway to the external web.',
      category: 'NETWORK IO',
      status: 'COMING SOON',
      version: '2.1.0',
      disabled: true,
      action: () => {}
    }
  ];

  return (
    <div className="min-h-screen pt-40 pb-40 relative overflow-hidden">
      {/* Technical Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
      </div>

      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-3 h-3 bg-primary animate-pulse"></div>
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-primary">MODULE LOADER // v4.5.0</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-8xl font-black text-white uppercase tracking-tighter italic leading-none"
          >
            SYSTEM <br />
            <span className="text-primary">APPLICATIONS</span>
          </motion.h1>
          <p className="text-white/30 font-mono text-xs uppercase tracking-[0.2em] max-w-xl">
            Authorized modules for system expansion. All protocols are verified and encrypted via the Void Network kernel.
          </p>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => !app.disabled && app.action && app.action()}
              className={`group relative bg-white/[0.02] border border-white/10 rounded-3xl p-10 overflow-hidden transition-all duration-500 ${app.disabled ? 'cursor-not-allowed opacity-50 grayscale' : 'cursor-pointer hover:bg-white/[0.04] hover:border-primary/40'}`}
            >
              {/* Technical Accents */}
              <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-2">
                <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">{app.category}</div>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${app.disabled ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`}></div>
                  <div className={`text-[8px] font-mono uppercase tracking-widest ${app.disabled ? 'text-rose-500' : 'text-emerald-500'}`}>{app.status}</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-8">
                <div className="relative">
                  <div className={`w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-500 shadow-2xl ${!app.disabled && 'group-hover:scale-110 group-hover:text-primary'}`}>
                    <app.icon size={32} />
                  </div>
                  {!app.disabled && <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">{app.name}</h3>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[7px] font-mono text-white/40">v{app.version}</span>
                  </div>
                  <p className="text-xs text-white/40 font-medium leading-relaxed mb-8">
                    {app.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      disabled={app.disabled}
                      className={`flex-1 py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.3em] italic transition-all shadow-xl ${app.disabled ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-white text-black hover:bg-primary'}`}
                    >
                      {app.disabled ? 'LOCKED' : 'INITIALIZE'}
                    </button>
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/20">
                      {app.disabled ? <Lock size={16} /> : <Zap size={16} />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Glow */}
              {!app.disabled && <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors"></div>}
            </motion.div>
          ))}

          {/* Empty Slots */}
          {[...Array(3)].map((_, i) => (
            <div key={`empty-${i}`} className="border border-dashed border-white/5 rounded-3xl p-10 flex flex-col items-center justify-center gap-6 opacity-20 grayscale">
              <div className="w-16 h-16 rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-white/10">
                <Plus size={32} />
              </div>
              <div className="text-[10px] font-mono text-white/10 uppercase tracking-[0.5em]">PENDING MODULE</div>
            </div>
          ))}
        </div>

        {/* System Status Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-32 p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex flex-wrap items-center justify-between gap-8 backdrop-blur-3xl"
        >
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">CPU LOAD</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ['20%', '45%', '30%'] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="h-full bg-primary"
                  ></motion.div>
                </div>
                <span className="text-[10px] font-mono text-primary">32%</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">MEM USAGE</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ['60%', '55%', '65%'] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="h-full bg-accent"
                  ></motion.div>
                </div>
                <span className="text-[10px] font-mono text-accent">64%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <Shield size={14} className="text-emerald-500" />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">KERNEL SECURE</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap size={14} className="text-amber-500" />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">POWER OPTIMIZED</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
