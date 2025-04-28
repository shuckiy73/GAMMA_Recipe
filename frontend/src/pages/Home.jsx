import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Добро пожаловать на RussianFood.com!</h1>
      <p className="text-gray-700 mb-8">Исследуйте лучшие рецепты русской кухни!</p>
      <Link to="/recipes" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
        Перейти к рецептам
      </Link>
    </section>
  );
}
