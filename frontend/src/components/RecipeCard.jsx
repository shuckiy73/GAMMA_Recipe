// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getFavorites, addFavorite, removeFavorite } from '../api/api';
// import { getToken } from '../utils/auth';
// import { toast } from 'react-toastify';

// export default function RecipeCard({ recipe }) {
//   const [favoriteId, setFavoriteId] = useState(null);

//   useEffect(() => {
//     const token = getToken();
//     if (token) {
//       // Получаем все избранные рецепты один раз при загрузке
//       getFavorites(token).then(res => {
//         const match = res.data.find(fav => fav.recipe === recipe.id);
//         if (match) setFavoriteId(match.id);
//       }).catch(err => {
//         console.error("Ошибка при получении избранных рецептов", err);
//       });
//     }
//   }, [recipe.id]);

//   const handleFavoriteToggle = async () => {
//     const token = getToken();
//     if (!token) {
//       toast.error("Войдите в аккаунт для добавления в избранное");
//       return;
//     }

//     try {
//       if (favoriteId) {
//         // Удаляем из избранного
//         await removeFavorite(favoriteId, token);
//         setFavoriteId(null);
//         toast.info("Удалено из избранного", {
//           className: "toastify-bootstrap toastify-bootstrap-info"
//         });
//       } else {
//         // Добавляем в избранное
//         const res = await addFavorite(recipe.id, token);
//         setFavoriteId(res.data.id);
//         toast.success("Добавлено в избранное", {
//           className: "toastify-bootstrap toastify-bootstrap-success"
//         });
//       }
//     } catch (err) {
//       toast.error("Ошибка при обновлении избранного", {
//         className: "toastify-bootstrap toastify-bootstrap-error"
//       });
//     }
//   };

//   return (
//     <div className="card h-100 shadow-sm">
//       {recipe.image && <img src={recipe.image} className="card-img-top" alt={recipe.title} />}
//       <div className="card-body d-flex flex-column">
//         <h5 className="card-title">{recipe.title}</h5>
//         <p className="card-text">{recipe.description.slice(0, 60)}...</p>
//         <div className="mt-auto d-flex justify-content-between align-items-center">
//           <Link to={`/recipes/${recipe.id}`} className="btn btn-sm btn-outline-success">
//             Подробнее
//           </Link>
//           <button onClick={handleFavoriteToggle} className="btn btn-sm btn-outline-danger">
//             {favoriteId ? '❤️ Удалить' : '🤍 В избранное'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, addFavorite, removeFavorite } from '../api/api';
import { getToken } from '../utils/auth';
import { toast } from 'react-toastify';

export default function RecipeCard({ recipe }) {
  const [favoriteId, setFavoriteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      getFavorites(token)
        .then(res => {
          const match = res.data.find(fav => fav.recipe === recipe.id);
          if (match) setFavoriteId(match.id);
        })
        .catch(() => {
          toast.error("Ошибка при получении избранных рецептов");
        });
    }
  }, [recipe.id]);

  const handleFavoriteToggle = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Войдите в аккаунт для добавления в избранное");
      return;
    }

    setIsLoading(true);
    try {
      if (favoriteId) {
        await removeFavorite(favoriteId, token);
        setFavoriteId(null);
        toast.info("Удалено из избранного");
      } else {
        const res = await addFavorite(recipe.id, token);
        setFavoriteId(res.data.id);
        toast.success("Добавлено в избранное");
      }
    } catch {
      toast.error("Ошибка при обновлении избранного");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      {recipe.image && <img src={recipe.image} className="card-img-top" alt={recipe.title} />}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text">{recipe.description.slice(0, 60)}...</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Link to={`/recipes/${recipe.id}`} className="btn btn-sm btn-outline-success">
            Подробнее
          </Link>
          <button
            onClick={handleFavoriteToggle}
            className="btn btn-sm btn-outline-danger"
            disabled={isLoading}
          >
            {favoriteId ? '❤️ Удалить' : '🤍 В избранное'}
          </button>
        </div>
      </div>
    </div>
  );
}
