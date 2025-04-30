import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:8000/api/', });
export default api;

export const getFavorites = async (token) =>
    axios.get("/api/favorites/", { headers: { Authorization: `Bearer ${token}` } });

export const addFavorite = (recipeId, token) =>
    axios.post("/api/favorites/", { recipe: recipeId }, { headers: { Authorization: `Bearer ${token}` } });

export const removeFavorite = (favoriteId, token) =>
    axios.delete(`/api/favorites/${favoriteId}/`, { headers: { Authorization: `Bearer ${token}` } });
