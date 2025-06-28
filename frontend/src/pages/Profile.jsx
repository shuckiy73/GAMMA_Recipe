import { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from '../api/api';
import { getToken } from '../utils/auth';
import { toast } from 'react-toastify';

export default function Profile() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadFavorites = (pageNumber) => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getFavorites(token, pageNumber)
      .then(res => {
        setFavorites(res.data.results);
        setTotalPages(Math.ceil(res.data.count / 6)); // 6 — размер страницы на сервере
      })
      .catch(() => toast.error('Ошибка загрузки избранных'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFavorites(page);
  }, [page]);

  const handleRemove = (id) => {
    const token = getToken();
    removeFavorite(id, token)
      .then(() => {
        toast.info('Рецепт удалён из избранного');
        loadFavorites(page);
      })
      .catch(() => toast.error('Не удалось удалить рецепт'));
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Избранные рецепты</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : favorites.length === 0 ? (
        <p className="text-muted">У вас пока нет избранных рецептов.</p>
      ) : (
        <>
          <div className="row">
            {favorites.map(fav => (
              <div key={fav.id} className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{fav.recipe.title}</h5>
                    <button
                      className="btn btn-danger btn-sm mt-3"
                      onClick={() => handleRemove(fav.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Назад
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${page === i + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Вперед
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
