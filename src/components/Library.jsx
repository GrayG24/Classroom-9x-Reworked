import React from 'react';
import { GameCard } from './GameCard.jsx';
import { Library as LibraryIcon } from 'lucide-react';

export const Library = ({ 
  games, 
  favorites, 
  onToggleFavorite, 
  onPlayGame 
}) => {
  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-theme/20 rounded-2xl flex items-center justify-center text-theme border border-theme/20 shadow-[0_0_15px_var(--primary-glow)]">
          <LibraryIcon size={24} />
        </div>
        <div>
          <h2 className="font-orbitron font-bold text-3xl uppercase tracking-tight">Game <span className="text-theme">Library</span></h2>
          <div className="h-1 w-20 bg-theme mt-1 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map(game => (
          <GameCard 
            key={game.id}
            game={game}
            isFavorite={favorites.includes(game.id)}
            onToggleFavorite={onToggleFavorite}
            onPlay={onPlayGame}
          />
        ))}
      </div>
    </div>
  );
};
