import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    api.get(`recipes/${id}/`)
      .then(response => setRecipe(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!recipe) return <div className="p-8">Загрузка...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-semibold mt-6 mb-2">Ингредиенты</h2>
      <p>{recipe.ingredients}</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Инструкция</h2>
      <p>{recipe.instructions}</p>
    </div>
  );
}
