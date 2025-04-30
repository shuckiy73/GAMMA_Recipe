import { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../api/api';
import { getToken } from '../utils/auth';

export default function Profile() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (token) {
      getFavorites(token).then((res) => setFavorites(res.data));
    }
  }, []);

  const handleRemove = (id) => {
    const token = getToken();
    removeFavorite(id, token).then(() =>
      setFavorites(favorites.filter((fav) => fav.id !== id))
    );
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Избранные рецепты</h2>
      <div className="row">
        {favorites.map((fav) => (
          <div key={fav.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5>{fav.recipe.title}</h5>
                <button className="btn btn-danger btn-sm" onClick={() => handleRemove(fav.id)}>
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
