import React from 'react';
import { Rocket, Shield, Scale, Code } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="mt-20 border-t border-slate-900 pt-10 pb-20">
    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="flex items-center gap-2">
          <Rocket className="text-theme w-5 h-5" />
          <span className="font-orbitron font-black text-lg tracking-tighter text-white uppercase italic">Classroom<span className="text-theme not-italic">9x</span></span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
          <span>v4.0.2-STABLE</span>
          <span className="w-1 h-1 rounded-full bg-slate-800"></span>
          <span>BUILD: 2024.03.15</span>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8">
        <a href="#" className="flex items-center gap-2 text-slate-500 hover:text-theme transition-colors text-[10px] font-black uppercase tracking-widest">
          <Shield size={14} />
          Infrastructure
        </a>
        <a href="#" className="flex items-center gap-2 text-slate-500 hover:text-theme transition-colors text-[10px] font-black uppercase tracking-widest">
          <Scale size={14} />
          Legal Disclaimers
        </a>
        <a href="#" className="flex items-center gap-2 text-slate-500 hover:text-theme transition-colors text-[10px] font-black uppercase tracking-widest">
          <Code size={14} />
          Dev Portal
        </a>
      </div>
    </div>
    <div className="mt-10 text-center">
      <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em]">Classroom 9x Games © 2024 • All Systems Operational</p>
    </div>
  </footer>
);
