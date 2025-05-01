import { useEffect, useState } from 'react';
import api from '../api/api';
import RecipeCard from '../components/RecipeCard';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('recipes/')
      .then(response => setRecipes(response.data))
      .catch(err => setError('Ошибка загрузки рецептов'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-center">Каталог рецептов</h2>

      {loading && <p className="text-center">Загрузка рецептов...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && recipes.length === 0 && (
        <p className="text-center text-muted">Рецепты не найдены.</p>
      )}

      <div className="row g-4">
        {recipes.map(recipe => (
          <div className="col-md-4" key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}
