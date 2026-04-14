import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MessageSquare, Shield, Zap, Globe } from 'lucide-react';

export const GlobalChat = ({ messages, onSendMessage, user, onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
      className="fixed bottom-12 right-12 w-[400px] h-[600px] bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] flex flex-col shadow-[0_50px_100px_rgba(0,0,0,0.8)] z-[100] overflow-hidden"
    >
      {/* Header */}
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.6)]"></div>
            <div className="absolute -inset-2 bg-emerald-500/20 blur-md rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-black text-white uppercase tracking-[0.2em] text-xs italic leading-none">GLOBAL VOID CHAT</h3>
            <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mt-1.5 italic">SYSTEM NODE ACTIVE</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all group"
        >
          <X size={18} className="group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20">
            <MessageSquare size={48} strokeWidth={1} />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] italic">Waiting for transmission...</p>
          </div>
        )}
        {messages.map((msg, i) => {
          const isMe = msg.username === user.username;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: isMe ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-2 group`}
            >
              <div className="flex items-center gap-2 px-2">
                <span className={`text-[9px] font-black uppercase tracking-widest italic ${isMe ? 'text-white/60' : 'text-white/40'}`}>
                  {msg.username}
                </span>
                <span className="text-[7px] font-black text-white/10 tabular-nums">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </span>
              </div>
              <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] font-medium leading-relaxed transition-all ${
                isMe 
                  ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)] rounded-tr-none' 
                  : 'bg-white/5 text-white border border-white/5 rounded-tl-none group-hover:border-white/20'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-8 border-t border-white/5 bg-white/[0.02]">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="TRANSMIT DATA PACKET..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-6 pr-16 py-5 text-[11px] font-black text-white outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/10 uppercase tracking-widest italic"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                onSendMessage(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <div className="w-px h-6 bg-white/10 mr-2"></div>
            <Send size={16} className="text-white/20 group-focus-within:text-white transition-colors" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-6 px-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield size={10} className="text-emerald-500" />
              <span className="text-[8px] font-black text-white/20 uppercase tracking-widest italic">SECURE</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={10} className="text-cyan-400" />
              <span className="text-[8px] font-black text-white/20 uppercase tracking-widest italic">ENCRYPTED</span>
            </div>
          </div>
          <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.4em] italic">PROTOCOL v3</span>
        </div>
      </div>
    </motion.div>
  );
};
