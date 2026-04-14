import React from 'react';
import { Shield, Zap, Star, Flame, Trophy, Crown, MessageSquare, Users, Globe, Lock, Heart, Github, Twitter, Youtube, Instagram, ExternalLink, ArrowUpRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-12 border-t border-white/5">
      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-sm font-black text-white uppercase tracking-tighter italic">CLASSROOM 9X</span>
          </div>
          
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
            © {currentYear} VOID_NETWORK // ALL_RIGHTS_RESERVED
          </p>

          <div className="flex items-center gap-6">
            <button className="text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors">PRIVACY</button>
            <button className="text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors">TERMS</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
