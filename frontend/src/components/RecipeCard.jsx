import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, addFavorite, removeFavorite } from '../api/api';
import { getToken } from '../utils/auth';
import { toast } from 'react-toastify';

export default function RecipeCard({ recipe }) {
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      getFavorites(token).then(res => {
        const match = res.data.find(fav => fav.recipe === recipe.id);
        if (match) setFavoriteId(match.id);
      });
    }
  }, [recipe.id]);

  const handleFavoriteToggle = async () => {
    const token = getToken();
    if (!token) return alert("Войдите в аккаунт");

    if (favoriteId) {
      await removeFavorite(favoriteId, token);
      setFavoriteId(null);
    } else {
      const res = await addFavorite(recipe.id, token);
      setFavoriteId(res.data.id);
    }
    if (favoriteId) {
      await removeFavorite(favoriteId, token);
      setFavoriteId(null);
      toast.info("Удалено из избранного");
    } else {
      const res = await addFavorite(recipe.id, token);
      setFavoriteId(res.data.id);
      toast.success("Добавлено в избранное");
    }
    
  };

  return (
    <div className="card h-100 shadow-sm">
      {recipe.image && <img src={recipe.image} className="card-img-top" alt={recipe.title} />}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text">{recipe.description.slice(0, 60)}...</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Link to={`/recipes/${recipe.id}`} className="btn btn-sm btn-outline-success">
            Подробнее
          </Link>
          <button onClick={handleFavoriteToggle} className="btn btn-sm btn-outline-danger">
            {favoriteId ? '❤️ Удалить' : '🤍 В избранное'}
          </button>
        </div>
      </div>
    </div>
  );
}
