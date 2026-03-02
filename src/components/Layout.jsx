import React from 'react';
import { House, Library as LibraryIcon, Heart, Sparkles, User } from 'lucide-react';
import { Navbar } from './Navbar.jsx';
import { Sidebar } from './Sidebar.jsx';
import { AppRoute } from '../types.js';
import { FPSCounter } from './FPSCounter.jsx';

export const Layout = ({ 
  children, 
  onSearch, 
  onSetTheme, 
  currentView, 
  selectedCategoryId,
  onViewChange, 
  onProfileClick,
  user 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onSearch={onSearch} onLogoClick={() => onViewChange(AppRoute.HOME)} onProfileClick={onProfileClick} />
      
      <div className="flex flex-1 pt-16">
        <div className="hidden lg:block w-72 fixed h-[calc(100vh-64px)] overflow-y-auto border-r border-slate-900 bg-slate-950/20 backdrop-blur-sm z-10">
          <Sidebar 
            user={user} 
            currentView={currentView} 
            selectedCategoryId={selectedCategoryId}
            onSetTheme={onSetTheme} 
            onViewChange={onViewChange}
            onProfileClick={onProfileClick}
          />
        </div>
        
        <main className="flex-1 lg:ml-72 p-4 md:p-8 bg-slate-950 min-h-full relative">
          <div className="fixed bottom-6 right-6 z-[100] hidden md:block">
            <FPSCounter />
          </div>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-slate-950/90 backdrop-blur-2xl border-t border-white/5 z-[100] flex items-center justify-around px-4">
        <button 
          onClick={() => onViewChange(AppRoute.HOME)}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === AppRoute.HOME ? 'text-theme' : 'text-slate-500'}`}
        >
          <div className={`p-2 rounded-xl ${currentView === AppRoute.HOME ? 'bg-theme/10' : ''}`}>
            <House size={20} />
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest">Home</span>
        </button>
        <button 
          onClick={() => onViewChange(AppRoute.LIBRARY)}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === AppRoute.LIBRARY ? 'text-theme' : 'text-slate-500'}`}
        >
          <div className={`p-2 rounded-xl ${currentView === AppRoute.LIBRARY ? 'bg-theme/10' : ''}`}>
            <LibraryIcon size={20} />
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest">Library</span>
        </button>
        <button 
          onClick={() => onViewChange(AppRoute.FAVORITES)}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === AppRoute.FAVORITES ? 'text-theme' : 'text-slate-500'}`}
        >
          <div className={`p-2 rounded-xl ${currentView === AppRoute.FAVORITES ? 'bg-theme/10' : ''}`}>
            <Heart size={20} />
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest">Favs</span>
        </button>
        <button 
          onClick={() => onViewChange(AppRoute.CUSTOMIZATION)}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === AppRoute.CUSTOMIZATION ? 'text-theme' : 'text-slate-500'}`}
        >
          <div className={`p-2 rounded-xl ${currentView === AppRoute.CUSTOMIZATION ? 'bg-theme/10' : ''}`}>
            <Sparkles size={20} />
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest">Style</span>
        </button>
        <button 
          onClick={onProfileClick}
          className="flex flex-col items-center gap-1 text-slate-500"
        >
          <div className="p-2 rounded-xl">
            <User size={20} />
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest">Profile</span>
        </button>
      </div>

      <div className="lg:hidden h-20"></div>
    </div>
  );
};
