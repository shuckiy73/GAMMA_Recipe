import { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../api/api';
import { getToken } from '../utils/auth';
import { toast } from 'react-toastify';

export default function Profile() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError('Требуется авторизация');
          return;
        }
        
        const data = await getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error('Ошибка загрузки избранного:', error);
        setError('Не удалось загрузить избранные рецепты');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (favoriteId, recipeId) => {
    try {
      await removeFavorite(favoriteId);
      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
      toast.success('Рецепт удалён из избранного');
    } catch (error) {
      console.error('Ошибка удаления из избранного:', error);
      toast.error('Не удалось удалить рецепт из избранного');
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <p>Загрузка избранных рецептов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Мои избранные рецепты</h2>
      
      {favorites.length === 0 ? (
        <p className="text-muted">У вас пока нет избранных рецептов.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {favorites.map(fav => (
            <div key={fav.id} className="col">
              <div className="card h-100 shadow-sm">
                {fav.recipe.image && (
                  <img
                    src={fav.recipe.image.startsWith('http') 
                      ? fav.recipe.image 
                      : `${process.env.REACT_APP_API_BASE}${fav.recipe.image}`}
                    className="card-img-top"
                    alt={fav.recipe.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{fav.recipe.title}</h5>
                  {fav.recipe.description && (
                    <p className="card-text text-muted">
                      {fav.recipe.description.length > 100
                        ? `${fav.recipe.description.substring(0, 100)}...`
                        : fav.recipe.description}
                    </p>
                  )}
                  <div className="mt-auto">
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => handleRemoveFavorite(fav.id, fav.recipe.id)}
                    >
                      Удалить из избранного
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}