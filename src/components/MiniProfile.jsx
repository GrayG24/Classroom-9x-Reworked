import React from 'react';
import { User } from 'lucide-react';

export const MiniProfile = ({ 
  player, 
  currentUser, 
  isFriend, 
  isSent, 
  onToggleFriend, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 z-[1100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-black border border-white/10 rounded-[2.5rem] p-10 max-w-md w-full text-center shadow-[0_0_100px_rgba(255,255,255,0.05)]">
        <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-white/10 mx-auto mb-8 flex items-center justify-center text-white shadow-[0_0_40px_rgba(255,255,255,0.1)]">
          <User size={48} />
        </div>
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-2">{player.username}</h3>
        <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px] mb-10">LVL {player.level} • {player.score.toLocaleString()} PTS</p>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 bg-white/5 text-white/40 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-white/5 hover:bg-white/10 hover:text-white transition-all italic">CLOSE</button>
          <button onClick={onToggleFriend} className="flex-1 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all italic">
            {isFriend ? 'REMOVE' : isSent ? 'SENT' : 'ADD_FRIEND'}
          </button>
        </div>
      </div>
    </div>
  );
};
