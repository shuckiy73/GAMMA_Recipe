const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Сохраняет access и refresh токены
export const saveTokens = (access, refresh) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
};

// Получает access token
export const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

// Получает refresh token
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

// Удаляет токены
export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Проверяет, авторизован ли пользователь
export const isAuthenticated = () => Boolean(getToken());
