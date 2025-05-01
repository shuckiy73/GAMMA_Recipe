import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Импорт функции для проверки авторизации

const PrivateRoute = ({ children }) => {
  const isUserAuthenticated = isAuthenticated();

  if (!isUserAuthenticated) {
    // Если пользователь не авторизован, перенаправляем на страницу логина
    return <Navigate to="/login" />;
  }

  // Если пользователь авторизован, рендерим дочерние компоненты
  return children;
};

export default PrivateRoute;
