import React, { useState } from 'react';
import { Rocket, ShieldCheck } from 'lucide-react';

export const InitialNameModal = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length >= 2) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl"></div>
      <div className="relative w-full max-w-md bg-slate-900 rounded-[3rem] p-10 border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="w-20 h-20 bg-theme/10 rounded-3xl flex items-center justify-center text-theme border border-theme/20 shadow-[0_0_30px_var(--primary-glow)]">
            <Rocket size={40} />
          </div>
          
          <div className="space-y-2">
            <h2 className="font-orbitron font-black text-3xl text-white uppercase tracking-tighter italic">Enter a <span className="text-theme">Username</span></h2>
            <p className="text-slate-500 text-sm font-medium">Welcome to Classroom 9x. Please identify yourself to begin your high-performance gaming session.</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-4">Username</label>
              <input 
                autoFocus
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ENTER NAME..." 
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 px-8 text-center font-orbitron font-bold text-white tracking-widest focus:outline-none focus:border-theme transition-all uppercase"
                maxLength={15}
              />
            </div>

            <button 
              disabled={name.trim().length < 2}
              className="w-full bg-theme text-slate-950 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-theme disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <ShieldCheck size={18} />
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
