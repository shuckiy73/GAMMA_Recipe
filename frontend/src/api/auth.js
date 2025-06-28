import api from './api';
import { getRefreshToken, saveTokens, removeTokens } from '../utils/auth';

export const refreshToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const response = await api.post('token/refresh/', { refresh });
    const newAccess = response.data.access;
    saveTokens(newAccess, refresh); // сохраняем новый access
    return newAccess;
  } catch (err) {
    console.error('Ошибка обновления токена:', err);
    removeTokens(); // сброс при ошибке
    return null;
  }
};
