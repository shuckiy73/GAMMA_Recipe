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
    <div className="p-8">
      <input
        type="text"
        placeholder="Поиск рецепта..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="border p-2 rounded w-2/3"
      />
      <button
        onClick={handleSearch}
        className="ml-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Искать
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {results.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
