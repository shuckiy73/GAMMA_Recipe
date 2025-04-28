import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="p-4 bg-green-700 text-white flex justify-between">
      <h1 className="text-xl font-bold">RussianFood.com</h1>
      <nav className="flex gap-4">
        <Link to="/">Главная</Link>
        <Link to="/recipes">Рецепты</Link>
        <Link to="/search">Поиск</Link>
        <Link to="/login">Войти</Link>
        <Link to="/register">Регистрация</Link>
      </nav>
    </header>
  );
}