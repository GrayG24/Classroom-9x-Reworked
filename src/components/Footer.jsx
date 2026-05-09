import React from 'react';
import { Shield, Zap, Star, Flame, Trophy, Crown, MessageSquare, Users, Globe, Lock, Heart, Github, Twitter, Youtube, Instagram, ExternalLink, ArrowUpRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <img 
                src="https://1key.lol/images/ui/key-turning.gif" 
                alt="Logo" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left">
              <span className="text-sm font-black text-white uppercase tracking-tighter italic block">CLASSROOM 9X</span>
              <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em] italic mt-1">EST. 2026</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.6em] italic mb-2">
              © {currentYear} // CLASSROOM 9X // ALL_RIGHTS_RESERVED
            </p>
            <div className="h-px w-20 bg-white/5 mx-auto"></div>
          </div>

          <div className="flex items-center gap-6 opacity-0 pointer-events-none invisible">
             {/* Removed as requested */}
          </div>
        </div>
      </div>
    </footer>
  );
};
