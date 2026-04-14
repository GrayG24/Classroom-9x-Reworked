import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, ChevronRight } from 'lucide-react';

interface InitialNameModalProps {
  onSubmit: (name: string) => void;
  error?: string | null;
}

export const InitialNameModal: React.FC<InitialNameModalProps> = ({ onSubmit, error }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName.length >= 3) {
      onSubmit(trimmedName);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-black">
            <User size={32} fill="currentColor" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">CREATE IDENTITY</h2>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Enter your username to begin</p>
          </div>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="USERNAME..."
              className={`w-full px-6 py-4 bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-lg font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-all text-center uppercase`}
              autoFocus
              maxLength={15}
            />
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] text-red-500 font-black uppercase tracking-widest text-center"
              >
                {error}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            disabled={name.trim().length < 3}
            className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            INITIALIZE <ChevronRight size={16} />
          </button>
        </form>

        <p className="text-[8px] text-white/20 text-center font-bold uppercase tracking-widest">
          This can be changed later in settings
        </p>
      </motion.div>
    </div>
  );
};
