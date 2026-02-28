import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, Terminal, Monitor, MousePointer2, 
  Sparkles, Check, AlertCircle, Volume2, Bell, Shield, 
  RotateCcw, Cpu, Zap, Database
} from 'lucide-react';

export const Settings = ({ 
  user, 
  onUpdateSettings, 
  onRedeemCode 
}) => {
  const [code, setCode] = useState('');
  const [redeemResult, setRedeemResult] = useState(null);
  const [volume, setVolume] = useState(80);

  const handleRedeem = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    const result = onRedeemCode(code);
    setRedeemResult(result);
    if (result.success) setCode('');
  };

  const [showWipeConfirm, setShowWipeConfirm] = useState(false);

  const handleReset = () => {
    if (showWipeConfirm) {
      localStorage.removeItem('classroom9x_local_profile_v4');
      window.location.reload();
    } else {
      setShowWipeConfirm(true);
      setTimeout(() => setShowWipeConfirm(false), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-theme border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-theme/5 group-hover:bg-theme/10 transition-colors"></div>
            <SettingsIcon size={32} className="relative z-10" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-theme animate-pulse"></div>
              <span className="text-[10px] font-black text-theme uppercase tracking-[0.3em]">System Configuration</span>
            </div>
            <h2 className="font-orbitron font-black text-4xl uppercase tracking-tighter text-white italic">Settings</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-slate-900/50 border border-white/5 rounded-xl flex items-center gap-3">
            <Cpu size={14} className="text-slate-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core: v4.2.0-Stable</span>
          </div>
          <div className="px-4 py-2 bg-slate-900/50 border border-white/5 rounded-xl flex items-center gap-3">
            <Zap size={14} className="text-slate-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status: Optimal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-8">
          <div className="p-8 bg-slate-900/40 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Monitor size={120} />
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-theme/10 rounded-xl text-theme">
                <Monitor size={20} />
              </div>
              <h3 className="font-orbitron font-black text-lg text-white uppercase tracking-tight italic">Visual Interface</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => onUpdateSettings({ customCursor: !user.settings.customCursor })}
                className={`flex flex-col gap-4 p-6 rounded-3xl border transition-all text-left ${user.settings.customCursor ? 'bg-slate-950 border-theme/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]' : 'bg-slate-900/60 border-white/5 hover:border-white/10'}`}
              >
                <div className="flex items-center justify-between w-full">
                  <MousePointer2 size={20} className={user.settings.customCursor ? 'text-theme' : 'text-slate-500'} />
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${user.settings.customCursor ? 'bg-theme' : 'bg-slate-800'}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${user.settings.customCursor ? 'left-6' : 'left-1'}`}></div>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-black text-white uppercase tracking-widest block">Custom Cursor</span>
                  <span className="text-[10px] text-slate-500 uppercase mt-1 block">Enable high-precision neural pointer</span>
                </div>
              </button>

              <button 
                onClick={() => onUpdateSettings({ animatedBg: !user.settings.animatedBg })}
                className={`flex flex-col gap-4 p-6 rounded-3xl border transition-all text-left ${user.settings.animatedBg ? 'bg-slate-950 border-theme/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]' : 'bg-slate-900/60 border-white/5 hover:border-white/10'}`}
              >
                <div className="flex items-center justify-between w-full">
                  <Sparkles size={20} className={user.settings.animatedBg ? 'text-theme' : 'text-slate-500'} />
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${user.settings.animatedBg ? 'bg-theme' : 'bg-slate-800'}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${user.settings.animatedBg ? 'left-6' : 'left-1'}`}></div>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-black text-white uppercase tracking-widest block">Animated Grid</span>
                  <span className="text-[10px] text-slate-500 uppercase mt-1 block">Render dynamic background geometry</span>
                </div>
              </button>

              <button 
                onClick={() => onUpdateSettings({ notifications: !user.settings.notifications })}
                className={`flex flex-col gap-4 p-6 rounded-3xl border transition-all text-left ${user.settings.notifications ? 'bg-slate-950 border-theme/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]' : 'bg-slate-900/60 border-white/5 hover:border-white/10'}`}
              >
                <div className="flex items-center justify-between w-full">
                  <Bell size={20} className={user.settings.notifications ? 'text-theme' : 'text-slate-500'} />
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${user.settings.notifications ? 'bg-theme' : 'bg-slate-800'}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${user.settings.notifications ? 'left-6' : 'left-1'}`}></div>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-black text-white uppercase tracking-widest block">System Notifications</span>
                  <span className="text-[10px] text-slate-500 uppercase mt-1 block">Alerts for unlocks and level ups</span>
                </div>
              </button>

              <button 
                onClick={() => onUpdateSettings({ homeBanner: !user.settings.homeBanner })}
                className={`flex flex-col gap-4 p-6 rounded-3xl border transition-all text-left ${user.settings.homeBanner ? 'bg-slate-950 border-theme/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]' : 'bg-slate-900/60 border-white/5 hover:border-white/10'}`}
              >
                <div className="flex items-center justify-between w-full">
                   <Monitor size={20} className={user.settings.homeBanner ? 'text-theme' : 'text-slate-500'} />
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${user.settings.homeBanner ? 'bg-theme' : 'bg-slate-800'}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${user.settings.homeBanner ? 'left-6' : 'left-1'}`}></div>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-black text-white uppercase tracking-widest block">Home Banner</span>
                  <span className="text-[10px] text-slate-500 uppercase mt-1 block">Toggle the featured image on the home page</span>
                </div>
              </button>
            </div>
          </div>

          <div className="p-8 bg-slate-900/40 rounded-[2.5rem] border border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-theme/10 rounded-xl text-theme">
                <Shield size={20} />
              </div>
              <h3 className="font-orbitron font-black text-lg text-white uppercase tracking-tight italic">Security & Data</h3>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => onUpdateSettings({ lagNotifications: !user.settings.lagNotifications })}
                className={`w-full flex items-center justify-between p-6 border rounded-2xl transition-all group ${user.settings.lagNotifications ? 'bg-theme/5 border-theme/20' : 'bg-slate-900/60 border-white/5 hover:border-white/10'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg transition-transform duration-500 ${user.settings.lagNotifications ? 'bg-theme/10 text-theme' : 'bg-slate-800 text-slate-500'}`}>
                    <Zap size={20} />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-black text-white uppercase tracking-widest block">Lag Notifications</span>
                    <span className="text-[10px] text-slate-500 uppercase mt-1 block">Notify when performance drops below threshold</span>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${user.settings.lagNotifications ? 'bg-theme shadow-[0_0_10px_rgba(var(--theme-rgb),0.5)]' : 'bg-slate-800'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${user.settings.lagNotifications ? 'left-7' : 'left-1'}`}></div>
                </div>
              </button>

              <button 
                onClick={handleReset}
                className={`w-full flex items-center gap-4 p-6 border rounded-2xl transition-all group ${showWipeConfirm ? 'bg-rose-600 border-rose-400 animate-pulse' : 'bg-rose-500/5 hover:bg-rose-500/10 border-rose-500/20'}`}
              >
                <div className={`p-2 rounded-lg transition-transform duration-500 ${showWipeConfirm ? 'bg-white/20 text-white' : 'bg-rose-500/10 text-rose-500 group-hover:rotate-180'}`}>
                  <RotateCcw size={20} />
                </div>
                <div className="text-left">
                  <span className={`text-xs font-black uppercase tracking-widest block ${showWipeConfirm ? 'text-white' : 'text-rose-500'}`}>
                    {showWipeConfirm ? 'ARE YOU SURE? CLICK AGAIN TO CONFIRM' : 'Wipe Local Profile'}
                  </span>
                  <span className={`text-[10px] uppercase mt-1 block ${showWipeConfirm ? 'text-white/80' : 'text-rose-500/60'}`}>
                    {showWipeConfirm ? 'This action is irreversible.' : 'Reset all progress, favorites, and unlocks'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="p-8 bg-slate-900/40 rounded-[2.5rem] border border-white/5 h-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-theme/10 rounded-xl text-theme">
                <Terminal size={20} />
              </div>
              <h3 className="font-orbitron font-black text-lg text-white uppercase tracking-tight italic">Codes</h3>
            </div>

            <form onSubmit={handleRedeem} className="space-y-6">
              <div className="p-6 bg-slate-950 rounded-2xl border border-white/5 space-y-4">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed font-bold">Enter codes here to unlock cool items!</p>
                <div className="relative">
                  <input 
                    type="text" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="ENTER CODE..." 
                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 px-5 text-sm font-mono tracking-[0.2em] text-theme focus:outline-none focus:border-theme transition-all uppercase"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-theme text-slate-950 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-theme/20"
                >
                  Enter
                </button>
              </div>

              {redeemResult && (
                <div className={`flex items-start gap-4 p-5 rounded-2xl border animate-in slide-in-from-top-2 duration-300 ${redeemResult.success ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/5 border-rose-500/20 text-rose-500'}`}>
                  <div className="mt-0.5">
                    {redeemResult.success ? <Check size={18} /> : <AlertCircle size={18} />}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest block">{redeemResult.success ? 'Success' : 'Error'}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tight opacity-80 leading-relaxed block">{redeemResult.message}</span>
                  </div>
                </div>
              )}

              {user.redeemedCodes && user.redeemedCodes.length > 0 && (
                <div className="p-6 bg-slate-950/30 rounded-2xl border border-dashed border-white/10">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Redeemed Codes</h4>
                  <ul className="space-y-3">
                    {user.redeemedCodes.map((c) => (
                      <li key={c} className="flex items-center justify-between text-[9px] font-bold uppercase tracking-tighter">
                        <span className="text-theme">{c}</span>
                        <span className="text-slate-400">UNLOCKED</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
