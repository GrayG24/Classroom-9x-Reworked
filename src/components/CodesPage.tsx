import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Key, Zap, Shield, Star, Cpu, Activity, Lock } from 'lucide-react';

interface CodesPageProps {
  user: any;
  onRedeemCode: (code: string) => { success: boolean, message: string };
}

export const CodesPage: React.FC<CodesPageProps> = ({ user, onRedeemCode }) => {
  const [redeemInput, setRedeemInput] = useState('');
  const [status, setStatus] = useState<{ success: boolean, message: string } | null>(null);

  const handleRedeem = () => {
    if (!redeemInput.trim()) return;
    const result = onRedeemCode(redeemInput);
    setStatus(result);
    if (result.success) {
      setRedeemInput('');
    }
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <div className="min-h-screen pt-40 pb-40 relative overflow-hidden">
      {/* Technical Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white mx-auto shadow-2xl"
          >
            <Key size={32} />
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-6xl font-black text-white uppercase tracking-tighter italic">ACCESS <span className="text-primary">KEYS</span></h1>
            <p className="text-white/30 font-mono text-[10px] uppercase tracking-[0.4em]">DECRYPT PROTOCOLS // AUTH REQUIRED</p>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
          
          <div className="space-y-8">
            <div className="relative">
              <input
                type="text"
                value={redeemInput}
                onChange={(e) => setRedeemInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRedeem()}
                placeholder="ENTER DECRYPTION KEY..."
                className="w-full bg-black/60 border-2 border-white/10 rounded-2xl px-8 py-6 text-xl font-black text-white uppercase tracking-widest focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/5"
              />
              <div className="absolute top-1/2 right-6 -translate-y-1/2 flex items-center gap-2 text-white/20">
                <Lock size={16} />
              </div>
            </div>

            <button
              onClick={handleRedeem}
              className="w-full py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.5em] italic hover:bg-primary transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] active:scale-[0.98]"
            >
              INITIALIZE DECRYPTION
            </button>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border ${status.success ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'} text-center`}
              >
                <p className="text-[10px] font-black uppercase tracking-widest italic">{status.message}</p>
              </motion.div>
            )}
          </div>

          <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Keys Used</p>
              <p className="text-2xl font-black text-white italic">{user.redeemedCodes?.length || 0}</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Security</p>
              <p className="text-2xl font-black text-emerald-500 italic">MAX</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Status</p>
              <p className="text-2xl font-black text-primary italic">READY</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 opacity-20">
          <div className="flex items-center gap-2">
            <Cpu size={14} />
            <span className="text-[8px] font-black uppercase tracking-widest italic">Kernel v4</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity size={14} />
            <span className="text-[8px] font-black uppercase tracking-widest italic">Auth Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={14} />
            <span className="text-[8px] font-black uppercase tracking-widest italic">Secure Link</span>
          </div>
        </div>
      </div>
    </div>
  );
};
