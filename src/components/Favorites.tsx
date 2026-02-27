import React, { useMemo } from 'react';
import { GameCard } from './GameCard';
import { Heart } from 'lucide-react';

interface FavoritesProps {
  games: any[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onPlayGame: (game: any) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ 
  games, 
  favorites, 
  onToggleFavorite, 
  onPlayGame 
}) => {
  const favoriteGames = useMemo(() => games.filter(g => favorites.includes(g.id)), [games, favorites]);

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-theme/20 rounded-2xl flex items-center justify-center text-theme border border-theme/20 shadow-[0_0_15px_var(--primary-glow)]">
          <Heart size={24} className="fill-current" />
        </div>
        <div>
          <h2 className="font-orbitron font-bold text-3xl uppercase tracking-tight">Your <span className="text-theme">Favorites</span></h2>
          <div className="h-1 w-20 bg-theme mt-1 rounded-full"></div>
        </div>
      </div>

      {favoriteGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteGames.map(game => (
            <GameCard 
              key={game.id}
              game={game}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onPlay={onPlayGame}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-40 bg-slate-900/40 rounded-[3rem] border border-slate-800 border-dashed">
          <Heart size={48} className="mx-auto text-slate-700 mb-4" />
          <p className="text-slate-500 font-orbitron uppercase tracking-widest text-sm">No favorites found in your database</p>
        </div>
      )}
    </div>
  );
};
