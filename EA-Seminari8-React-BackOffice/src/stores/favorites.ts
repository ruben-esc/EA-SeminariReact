// src/stores/favorites.ts
import { atom } from 'nanostores';
import type { Book } from '../models';

function getInitialFavorites(): Book[] {
  try {
    const saved = localStorage.getItem('favorites-books');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export const favoritesStore = atom<Book[]>(getInitialFavorites());

favoritesStore.listen((books) => {
  try {
    localStorage.setItem('favorites-books', JSON.stringify(books));
  } catch {
    // Si falla el almacenamiento local se ignora
  }
});

export function toggleFavorite(book: Book) {
  const current = favoritesStore.get();
  const exists = current.some((b) => b._id === book._id);

  if (exists) {
    favoritesStore.set(current.filter((b) => b._id !== book._id));
  } else {
    favoritesStore.set([...current, book]);
  }
}