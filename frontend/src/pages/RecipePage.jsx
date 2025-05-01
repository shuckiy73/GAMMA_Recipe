import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getFavorites, addFavorite, removeFavorite } from '../api/api';
import { getToken } from '../utils/auth';
import { toast } from 'react-toastify';

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [favoriteId, setFavoriteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/api/recipes/${id}/`);
        setRecipe(res.data);
      } catch (err) {
        setError('Ошибка загрузки рецепта');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();

    const token = getToken();
    if (token) {
      getFavorites(token).then(res => {
        const match = res.data.find(fav => fav.recipe === parseInt(id));
        if (match) setFavoriteId(match.id);
      }).catch(err => console.error('Ошибка при получении избранных рецептов:', err));
    }
  }, [id]);

  const handleFavoriteToggle = async () => {
    const token = getToken();
    if (!token) {
      toast.warn("Войдите, чтобы добавить в избранное");
      return;
    }

    try {
      if (favoriteId) {
        await removeFavorite(favoriteId, token);
        setFavoriteId(null);
        toast.info("Удалено из избранного");
      } else {
        const res = await addFavorite(id, token);
        setFavoriteId(res.data.id);
        toast.success("Добавлено в избранное");
      }
    } catch (error) {
      toast.error("Ошибка при обновлении избранного");
    }
  };

  if (loading) return <div className="container py-4"><p>Загрузка...</p></div>;
  if (error) return <div className="container py-4"><p className="text-danger">{error}</p></div>;
  if (!recipe) return null;

  return (
    <div className="container py-4">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3">
        ← Назад
      </button>

      <h2 className="mb-3">{recipe.title}</h2>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="img-fluid mb-4 rounded shadow-sm"
        />
      )}

      <div className="mb-3">
        <strong>Описание:</strong>
        <p>{recipe.description || 'Описание отсутствует'}</p>
      </div>

      <div className="mb-3">
        <strong>Ингредиенты:</strong>
        {recipe.ingredients ? (
          <ul>
            {recipe.ingredients.split('\n').map((item, index) => (
              <li key={index}>{item.trim()}</li>
            ))}
          </ul>
        ) : (
          <p>Ингредиенты не указаны</p>
        )}
      </div>

      <div className="mb-3">
        <strong>Инструкция:</strong>
        {recipe.instructions ? (
          recipe.instructions.split('\n').map((step, index) => (
            <p key={index}>{step.trim()}</p>
          ))
        ) : (
          <p>Инструкция не указана</p>
        )}
      </div>

      <button
        className={`btn ${favoriteId ? 'btn-danger' : 'btn-outline-danger'} mt-3`}
        onClick={handleFavoriteToggle}
      >
        {favoriteId ? 'Удалить из избранного' : '❤️ В избранное'}
      </button>
    </div>
  );
}
