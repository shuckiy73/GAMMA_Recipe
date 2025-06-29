import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Добавляем токен к запросам
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Функции для работы с избранным
export const getFavorites = async () => {
  const response = await api.get('/favorites/');
  return response.data;
};

export const addFavorite = async (recipeId) => {
  const response = await api.post('/favorites/', { recipe_id: recipeId });
  return response.data;
};

export const removeFavorite = async (recipeId) => {
  const response = await api.delete('/favorites/', { 
    data: { recipe_id: recipeId } 
  });
  return response.data;
};

export const checkIsFavorite = async (recipeId) => {
  const response = await api.get(`/recipes/${recipeId}/is_favorite/`);
  return response.data;
};

export default api;