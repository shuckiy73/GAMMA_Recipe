const TOKEN_KEY = 'access_token';

// Сохраняет токен в localStorage
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Получает токен из localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Удаляет токен из localStorage (при выходе из системы)
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Проверяет, авторизован ли пользователь
export const isAuthenticated = () => {
  return Boolean(getToken());
};
