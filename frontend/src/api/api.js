import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export default api;

// Получение избранного
export const getFavorites = async (token) =>
  api.get('favorites/', {
    headers: { Authorization: `Bearer ${token}` },
  });

// ✅ Добавление рецепта в избранное
export const addFavorite = (recipeId, token) =>
  api.post('favorites/', { recipe_id: recipeId }, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Удаление избранного по ID
export const removeFavorite = (favoriteId, token) =>
  api.delete(`favorites/${favoriteId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
