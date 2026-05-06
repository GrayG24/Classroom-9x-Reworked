import React from 'react';
import { Shield, Zap, Star, Flame, Trophy, Crown, MessageSquare, Users, Globe, Lock, Heart, Github, Twitter, Youtube, Instagram, ExternalLink, ArrowUpRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center">
        {/* Floating Tip Requirement */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-16 px-8 py-4 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <p className="text-[11px] font-black text-white uppercase tracking-[0.4em] italic text-center relative z-10">
            A huge catalog of fun games to fulfill your boredom
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Zap size={24} fill="currentColor" />
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

          <div className="flex items-center gap-6">
            <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all">
              <Github size={18} />
            </button>
            <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all">
              <Twitter size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
