import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getFavorites, addFavorite, removeFavorite } from '../api/api';
import { getToken } from '../utils/auth';
import { toast } from 'react-toastify';


export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    axios.get(`/api/recipes/${id}/`).then(res => setRecipe(res.data));

    const token = getToken();
    if (token) {
      getFavorites(token).then(res => {
        const match = res.data.find(fav => fav.recipe === parseInt(id));
        if (match) setFavoriteId(match.id);
      });
    }
  }, [id]);

  const handleFavoriteToggle = async () => {
    const token = getToken();
    if (!token) return alert("Войдите, чтобы сохранить в избранное.");

    if (favoriteId) {
      await removeFavorite(favoriteId, token);
      setFavoriteId(null);
    } else {
      const res = await addFavorite(id, token);
      setFavoriteId(res.data.id);
    }
    if (favoriteId) {
      await removeFavorite(favoriteId, token);
      setFavoriteId(null);
      toast.info("Удалено из избранного");
    } else {
      const res = await addFavorite(id, token);
      setFavoriteId(res.data.id);
      toast.success("Добавлено в избранное");
    }
    
  };

  if (!recipe) return <p>Загрузка...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">{recipe.title}</h2>
      {recipe.image && <img src={recipe.image} alt={recipe.title} className="img-fluid mb-4 rounded" />}
      <p><strong>Описание:</strong> {recipe.description}</p>
      <p><strong>Ингредиенты:</strong> {recipe.ingredients}</p>
      <p><strong>Инструкция:</strong> {recipe.instructions}</p>

      <button
        className={`btn ${favoriteId ? 'btn-danger' : 'btn-outline-danger'} mt-3`}
        onClick={handleFavoriteToggle}
      >
        {favoriteId ? 'Удалить из избранного' : '❤️ В избранное'}
      </button>
    </div>
  );
}
