import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Play, Star, LayoutGrid, Filter, Activity, Bot, Zap } from 'lucide-react';

export const Library = ({ 
  games, 
  favorites, 
  pinnedGames = [], 
  onToggleFavorite, 
  onTogglePin, 
  onPlayGame 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = Array.from(new Set(games.map(g => g.category)));

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-32 pb-40 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic mb-2">GAME LIBRARY</h1>
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] italic">{games.length} TOTAL GAMES</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input
              type="text"
              placeholder="SEARCH GAMES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white font-black text-xs uppercase tracking-widest focus:outline-none focus:border-white/30 transition-all italic"
            />
          </div>
        </div>
      </div>

      {/* Category Selection UI Rework */}
      <div className="flex items-center gap-4 mb-16 overflow-x-auto pb-6 no-scrollbar">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all italic whitespace-nowrap border-2 ${
            !selectedCategory 
              ? 'bg-white text-black border-white shadow-[0_0_40px_rgba(255,255,255,0.2)]' 
              : 'bg-white/[0.02] text-white/30 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          ALL GAMES
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all italic whitespace-nowrap border-2 ${
              selectedCategory === cat
                ? 'bg-white text-black border-white shadow-[0_0_40px_rgba(255,255,255,0.2)]' 
                : 'bg-white/[0.02] text-white/30 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredGames.map((game) => (
          <SimpleGameCard
            key={game.id}
            game={game}
            isFavorite={(favorites || []).includes(game.id)}
            isPinned={(pinnedGames || []).includes(game.id)}
            onToggleFavorite={onToggleFavorite}
            onTogglePin={onTogglePin}
            onPlay={() => onPlayGame(game)}
          />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-white/20 font-black uppercase tracking-[0.5em] italic">NO GAMES FOUND</p>
        </div>
      )}
    </div>
  );
};

const SimpleGameCard = ({ game, isFavorite, isPinned, onToggleFavorite, onTogglePin, onPlay }) => {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all cursor-pointer shadow-2xl will-change-transform"
      onClick={onPlay}
    >
      <img
        src={game.thumbnail || game.image}
        alt={game.title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
        referrerPolicy="no-referrer"
      />
      
      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-3 italic">
            {game.category.replace('_', ' ')}
          </p>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none truncate">
            {game.title}
          </h3>
          
          <div className="flex items-center gap-4 mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
            <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
              <Zap size={10} className="text-white/40" />
              <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">START GAME</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(game.id);
          }}
          className={`w-12 h-12 rounded-2xl backdrop-blur-xl border flex items-center justify-center transition-all ${
            isFavorite 
              ? 'bg-rose-500 border-rose-500 text-white shadow-[0_0_30px_rgba(244,63,94,0.4)]' 
              : 'bg-black/40 border-white/10 text-white/40 hover:text-white hover:border-white/30'
          }`}
        >
          <Star size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      
      {/* Status Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
    </motion.div>
  );
};
