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

  if (!recipe) return <div className="container p-5">Загрузка...</div>;

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-3">{recipe.title}</h2>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
      )}
      <h4 className="fw-semibold">Ингредиенты</h4>
      <p>{recipe.ingredients}</p>
      <h4 className="fw-semibold">Инструкция</h4>
      <p>{recipe.instructions}</p>
    </div>
  );
}
