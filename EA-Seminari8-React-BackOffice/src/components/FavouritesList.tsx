import { useStore } from '@nanostores/react';
import { Link } from 'react-router-dom';
import { favoritesStore } from '../stores/favorites';
import { formatPrice, languageName, truncate } from '../utils/format';
import { FavouriteButton } from './FavouriteButton';

function authorNames(authors?: { name: string }[]) {
  if (!authors || authors.length === 0) return 'Sin autores';
  return authors.map((author) => author.name).join(', ');
}

export function FavouritesList() {
  const favorites = useStore(favoritesStore);

  return (
    <>
      <div className="page-header">
        <h1>Mis Libros Favoritos</h1>
      </div>

      {favorites.length === 0 ? (
        <p className="muted">No tienes ningún libro guardado en favoritos.</p>
      ) : (
        <div className="cards">
          {favorites.map((book) => (
            <article key={book._id} className="card">
              <img
                className="card-cover"
                src={`https://picsum.photos/seed/${book._id}/400/240`}
                alt={`Portada de ${book.title}`}
              />
              <div className="card-body">
                <h3>{book.title}</h3>
                <span className="muted">{authorNames(book.authors)}</span>
                {book.description && (
                  <p className="card-text" title={book.description}>
                    {truncate(book.description, 90)}
                  </p>
                )}
                <span>
                  {languageName(book.language)}
                  {book.publishedYear && ` · ${book.publishedYear}`}
                </span>
                <strong>{formatPrice(book.price)}</strong>
                <div>
                  {book.tags?.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-actions">
                <FavouriteButton book={book} />
                <Link className="button secondary" to={`/books/${book._id}/edit`}>
                  Editar
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}