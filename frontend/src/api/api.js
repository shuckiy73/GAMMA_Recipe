import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export default api;

// Используем общий экземпляр `api`
export const getFavorites = async (token) =>
  api.get('favorites/', { headers: { Authorization: `Bearer ${token}` } });

export const addFavorite = (recipeId, token) =>
  api.post('favorites/', { recipe: recipeId }, { headers: { Authorization: `Bearer ${token}` } });

export const removeFavorite = (favoriteId, token) =>
  api.delete(`favorites/${favoriteId}/`, { headers: { Authorization: `Bearer ${token}` } });
