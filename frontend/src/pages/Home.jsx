import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 fw-bold mb-4">Добро пожаловать на <span className="text-success">RussianFood.com</span>!</h1>
      <p className="lead mb-5">Исследуйте лучшие рецепты русской кухни!</p>
      <Link to="/recipes" className="btn btn-success btn-lg">
        Перейти к рецептам
      </Link>
    </div>
  );
}
