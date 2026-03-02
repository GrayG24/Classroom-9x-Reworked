import React, { useState } from 'react';
import { Rocket, ShieldCheck, Terminal, Cpu, Activity, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FORBIDDEN_WORDS = [
  'fuck', 'shit', 'ass', 'bitch', 'cunt', 'dick', 'pussy', 'nigger', 'faggot', 'bastard',
  'slut', 'whore', 'cock', 'cum', 'penis', 'vagina', 'porn', 'sex', 'hitler', 'nazi'
];

export const InitialNameModal = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const validateName = (val) => {
    const cleanVal = val.trim().toLowerCase();
    if (cleanVal.length < 2) return 'Username too short';
    if (FORBIDDEN_WORDS.some(word => cleanVal.includes(word))) return 'Inappropriate username detected';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }
    onSubmit(name.trim());
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl"
      ></motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-xl bg-slate-900/40 border border-white/10 rounded-[4rem] p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden group"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-theme to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-theme to-transparent opacity-50"></div>
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-theme/5 rounded-full blur-[100px]"></div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-theme/5 rounded-full blur-[100px]"></div>

        <div className="flex flex-col items-center text-center space-y-6 md:space-y-10 relative z-10">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-theme/10 rounded-[2.5rem] flex items-center justify-center text-theme border border-theme/20 shadow-[0_0_50px_var(--primary-glow)] relative z-10 overflow-hidden">
              <Cpu size={40} className="animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-theme/20 to-transparent"></div>
            </div>
            <div className="absolute -inset-4 border border-theme/10 rounded-[3rem] animate-[spin_10s_linear_infinite]"></div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 text-theme/60 mb-2">
              <Terminal size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">System Initialization</span>
            </div>
            <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white uppercase tracking-tighter italic leading-none">
              Create a <span className="text-theme">Username</span>
            </h2>
            <p className="text-slate-400 text-xs md:text-sm font-medium max-w-xs mx-auto leading-relaxed">
              Create a username and get to playing on Classroom 9x
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6 md:space-y-8">
            <div className="relative group/input">
              <div className="absolute -inset-1 bg-gradient-to-r from-theme/20 via-theme/40 to-theme/20 rounded-3xl blur opacity-25 group-focus-within/input:opacity-100 transition duration-1000"></div>
              <div className="relative">
                <input 
                  autoFocus
                  type="text" 
                  value={name}
                  onChange={handleInputChange}
                  placeholder="TYPE HERE..." 
                  className={`w-full bg-slate-950/80 border rounded-3xl py-4 md:py-6 px-6 md:px-10 text-center font-orbitron font-black text-xl md:text-2xl text-white tracking-[0.2em] focus:outline-none transition-all uppercase placeholder:text-slate-800 ${error ? 'border-rose-500 text-rose-500' : 'border-white/10 focus:border-theme'}`}
                  maxLength={15}
                />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 hidden md:block">
                  <Activity size={20} />
                </div>
              </div>
              
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-2 text-rose-500 text-[10px] font-black uppercase tracking-widest"
                  >
                    <AlertCircle size={12} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              disabled={name.trim().length < 2}
              className="w-full relative group/btn overflow-hidden rounded-3xl disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <div className="absolute inset-0 bg-theme transition-transform duration-500 group-hover/btn:scale-105"></div>
              <div className="relative py-4 md:py-6 flex items-center justify-center gap-4 text-slate-950 font-black uppercase tracking-[0.3em] text-xs md:text-sm">
                <ShieldCheck size={20} />
                Continue
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>

          <div className="flex items-center gap-4 md:gap-8 pt-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-theme shadow-[0_0_10px_var(--primary-glow)]"></div>
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Neural Link</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-theme shadow-[0_0_10px_var(--primary-glow)]"></div>
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Secure Auth</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-theme shadow-[0_0_10px_var(--primary-glow)]"></div>
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">9X Protocol</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
