import React, { useEffect, useState } from 'react';
import api, { updateRecipe } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditRecipe = () => {
  const { id } = useParams(); // ID рецепта из URL
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    category: '',
    image: null,
  });

  // Загрузка текущих данных рецепта
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`recipes/${id}/`);
        const data = res.data;
        setForm({
          title: data.title,
          description: data.description,
          ingredients: data.ingredients,
          instructions: data.instructions,
          category: data.category, // предполагается, что это ID
          image: null, // нельзя отобразить file в input, оставляем пусто
        });
      } catch (err) {
        console.error('Ошибка загрузки рецепта:', err);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    const formData = new FormData();
    for (let key in form) {
      if (form[key] !== null && form[key] !== '') {
        formData.append(key, form[key]);
      }
    }

    try {
      await updateRecipe(id, formData, token);
      alert('Рецепт обновлён!');
      navigate(`/recipes/${id}`);
    } catch (err) {
      console.error('Ошибка при обновлении:', err.response?.data || err.message);
      alert('Ошибка при обновлении рецепта.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Название" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Описание" required />
      <textarea name="ingredients" value={form.ingredients} onChange={handleChange} placeholder="Ингредиенты" required />
      <textarea name="instructions" value={form.instructions} onChange={handleChange} placeholder="Инструкция" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="ID категории" required />
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Обновить рецепт</button>
    </form>
  );
};

export default EditRecipe;
