import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Play, Info, ChevronRight, LayoutGrid, LayoutList, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GameCard } from './GameCard';
import { CATEGORIES } from '../constants';

export const CategoryPage = ({ categoryId, games, favorites, onToggleFavorite, onPlayGame }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  
  const category = CATEGORIES.find(c => c.id === categoryId) || { name: 'Unknown', icon: '❓', color: 'text-white' };
  
  const filteredGames = useMemo(() => {
    return games.filter(g => 
      g.category.toLowerCase() === categoryId.toLowerCase() &&
      (g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       g.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [games, categoryId, searchQuery]);

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl mb-8"
            >
              <span className="text-xl drop-shadow-[0_0_10px_white]">{category.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 italic">ARCHIVE SECTOR // {categoryId.toUpperCase()}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 20 }}
              className="text-7xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-[0.85]"
            >
              {category.name} <br />
              <span className="text-white/20 drop-shadow-[0_0_80px_rgba(255,255,255,0.1)]">PROTOCOL</span>
            </motion.h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-full sm:w-96 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="SEARCH SECTOR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-16 pr-8 rounded-[2rem] bg-black/40 backdrop-blur-3xl border border-white/10 text-white font-black text-xs uppercase tracking-widest focus:outline-none focus:border-white/30 transition-all italic"
              />
            </div>
            
            <div className="flex gap-3 p-2 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem]">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-3.5 rounded-2xl transition-all ${viewMode === 'grid' ? 'bg-white text-black shadow-[0_0_30px_white]' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
              >
                <LayoutGrid size={22} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-3.5 rounded-2xl transition-all ${viewMode === 'list' ? 'bg-white text-black shadow-[0_0_30px_white]' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
              >
                <LayoutList size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className={`grid gap-10 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1'}`}>
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game, i) => (
                <GameCard 
                  key={game.id}
                  game={game}
                  isFavorite={favorites.includes(game.id)}
                  onToggleFavorite={onToggleFavorite}
                  onPlay={onPlayGame}
                  onInfo={() => {}}
                  delay={i * 0.03}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-32 flex flex-col items-center justify-center text-center space-y-8"
          >
            <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
              <Search size={48} />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">No Signals Detected</h2>
              <p className="text-white/40 text-lg font-medium max-w-md mx-auto leading-relaxed">
                We couldn't find any games matching your search criteria in the {category.name} sector.
              </p>
            </div>
            <button 
              onClick={() => setSearchQuery('')}
              className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
