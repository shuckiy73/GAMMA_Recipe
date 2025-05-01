import { useState } from 'react';
import api from '../api/api';
import RecipeCard from '../components/RecipeCard';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    api.get(`recipes/?search=${query}`)
      .then(response => {
        setResults(response.data);
        setSearched(true);
      })
      .catch(error => console.error(error));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
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
          onChange={(e) => {
            setQuery(e.target.value);
            if (!e.target.value.trim()) {
              setResults([]);
              setSearched(false);
            }
          }}
          onKeyDown={handleKeyPress}
        />
        <button className="btn btn-success" onClick={handleSearch}>
          Искать
        </button>
      </div>

      <div className="row g-4">
        {results.length > 0 ? (
          results.map(recipe => (
            <div className="col-md-4" key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </div>
          ))
        ) : (
          searched && (
            <p className="text-center text-muted">Ничего не найдено по запросу «{query}».</p>
          )
        )}
      </div>
    </div>
  );
}
