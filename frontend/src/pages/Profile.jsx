import { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../api/api';
import { getToken } from '../utils/auth';
import { toast } from 'react-toastify';

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
            <div key={fav.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{fav.recipe.title}</h5>
                  <button
                    className="btn btn-danger btn-sm mt-3"
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
