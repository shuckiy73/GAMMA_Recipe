import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return (
    <div className="card h-100 shadow-sm">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text text-truncate">{recipe.description}</p>
        <Link to={`/recipes/${recipe.id}`} className="mt-auto btn btn-outline-success">
          Подробнее
        </Link>
      </div>
    </div>
  );
}
