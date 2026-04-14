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
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] italic">ACCESSING ALL NODES</p>
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
          ALL NODES
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
      whileHover={{ y: -8 }}
      className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all cursor-pointer"
      onClick={onPlay}
    >
      <img
        src={game.thumbnail || game.image}
        alt={game.title}
        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      
      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(game.id);
          }}
          className={`p-2 rounded-xl backdrop-blur-md border border-white/10 ${isFavorite ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-black/40 text-white/40 hover:text-white'}`}
        >
          <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1 italic">{game.category.replace('_', ' ')}</p>
        <h3 className="text-sm font-black text-white uppercase tracking-tight truncate italic">{game.title}</h3>
      </div>
    </motion.div>
  );
};
