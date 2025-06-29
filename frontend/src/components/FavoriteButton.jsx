import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import { useAuth } from '../utils/auth';

const FavoriteButton = ({ recipeId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isFavorite, setIsFavorite] = useState(false);

  // Проверка статуса избранного
  useEffect(() => {
    if (user) {
      api.get(`/recipes/${recipeId}/is_favorite/`)
        .then(res => setIsFavorite(res.data.is_favorite))
        .catch(() => setIsFavorite(false));
    }
  }, [recipeId, user]);

  const toggleFavorite = useMutation({
    mutationFn: () => {
      if (isFavorite) {
        return api.delete('/api/favorites/', { data: { recipe_id: recipeId } });
      } else {
        return api.post('/api/favorites/', { recipe_id: recipeId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites']);
      queryClient.invalidateQueries(['recipe', recipeId]);
      setIsFavorite(!isFavorite);
    }
  });

  const handleClick = () => {
    if (!user) {
      alert('Войдите, чтобы добавлять в избранное');
      return;
    }
    toggleFavorite.mutate();
  };

  return (
    <button 
      onClick={handleClick}
      disabled={toggleFavorite.isLoading}
      className={`favorite-btn ${isFavorite ? 'active' : ''}`}
    >
      {isFavorite ? '★ В избранном' : '☆ В избранное'}
    </button>
  );
};

export default FavoriteButton;