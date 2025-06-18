import { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../api/api';
import { getToken } from '../utils/auth';
import { toast } from 'react-toastify';

const API_BASE = 'http://localhost:8000'; // Замени, если у тебя другой backend url

export default function Profile() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      getFavorites(token)
        .then((res) => setFavorites(res.data))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleRemove = (id) => {
    const token = getToken();
    removeFavorite(id, token).then(() => {
      setFavorites(favorites.filter((fav) => fav.id !== id));
      toast.info('Рецепт удалён из избранного');
    });
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Избранные рецепты</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : favorites.length === 0 ? (
        <p className="text-muted">У вас пока нет избранных рецептов.</p>
      ) : (
        <div className="row">
          {favorites.map((fav) => (
            <div key={fav.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                {fav.recipe.image && (
                  <img
                    src={
                      fav.recipe.image.startsWith('http')
                        ? fav.recipe.image
                        : `${API_BASE}${fav.recipe.image}`
                    }
                    className="card-img-top"
                    alt={fav.recipe.title}
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{fav.recipe.title}</h5>
                  {fav.recipe.description && (
                    <p className="card-text text-muted">
                      {fav.recipe.description.length > 100
                        ? fav.recipe.description.slice(0, 100) + '...'
                        : fav.recipe.description}
                    </p>
                  )}
                  <button
                    className="btn btn-danger btn-sm mt-auto"
                    onClick={() => handleRemove(fav.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
