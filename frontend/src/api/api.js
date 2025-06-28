import axios from 'axios';
import { refreshToken } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// ✅ Интерцептор: если получаем 401 — пробуем обновить токен
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccess = await refreshToken();
      if (newAccess) {
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccess;
        return api(originalRequest); // повтор запроса
      }
    }

    return Promise.reject(error);
  }
);

// // 🔧 Экспорт API-функций
// export const getFavorites = async (token) =>
//   api.get('favorites/', { headers: { Authorization: `Bearer ${token}` } });

export const addFavorite = (recipeId, token) =>
  api.post('favorites/', { recipe: recipeId }, { headers: { Authorization: `Bearer ${token}` } });

export const removeFavorite = (favoriteId, token) =>
  api.delete(`favorites/${favoriteId}/`, { headers: { Authorization: `Bearer ${token}` } });

export const getFavorites = async (token, page=1) =>
  api.get(`favorites/?page=${page}`, { headers: { Authorization: `Bearer ${token}` } });

export const updateRecipe = (recipeId, data, token) =>
  api.patch(`recipes/${recipeId}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

// 👉 экспорт по умолчанию
export default api;
