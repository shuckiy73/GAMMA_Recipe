import { useEffect, useState } from 'react';
import api from '../api/api';
import RecipeCard from '../components/RecipeCard';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get('recipes/')
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-center">Каталог рецептов</h2>
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
