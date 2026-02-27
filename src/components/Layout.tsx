import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  onSearch: (query: string) => void;
  onSetTheme: (theme: string) => void;
  currentView: AppRoute;
  selectedCategoryId: string | null;
  onViewChange: (view: AppRoute, param?: string) => void;
  onProfileClick: () => void;
  user: any;
}

export const Layout: React.FC<LayoutProps> = ({ 
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
        
        <main className="flex-1 lg:ml-72 p-4 md:p-8 bg-slate-950 min-h-full">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <div className="lg:hidden h-20"></div>
    </div>
  );
};
