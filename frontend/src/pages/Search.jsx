import { useState } from 'react';
import api from '../api/api';
import RecipeCard from '../components/RecipeCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    api.get(`recipes/?search=${query}`)
      .then(response => setResults(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-center">Поиск рецептов</h2>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Введите название рецепта"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleSearch}>
          Искать
        </button>
      </div>

      <div className="row g-4">
        {results.map(recipe => (
          <div className="col-md-4" key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}
