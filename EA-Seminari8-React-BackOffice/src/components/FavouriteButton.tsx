import { useStore } from '@nanostores/react';
import type { Book } from '../models';
import { favoritesStore, toggleFavorite } from '../stores/favorites';

interface FavouriteButtonProps {
  book: Book;
}

export function FavouriteButton({ book }: FavouriteButtonProps) {
  const favorites = useStore(favoritesStore);
  const isFavorite = favorites.some((b) => b._id === book._id);

  return (
    <button
      type="button"
      className={isFavorite ? 'button warning' : 'button secondary'}
      onClick={() => toggleFavorite(book)}
    >
      {isFavorite ? '★ Quitar favorito' : '☆ Añadir favorito'}
    </button>
  );
}