import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, removeTokens } from '../utils/auth';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeTokens();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3">
      <Link className="navbar-brand" to="/">RussianFood.com</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Главная</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/recipes">Рецепты</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/search">Поиск</Link></li>

          {!isAuthenticated() ? (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Войти</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Регистрация</Link></li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/profile">Профиль</Link></li>
              <li className="nav-item">
                <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                  Выйти
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
