import React, { useState } from 'react';
import api from '../api/api';

const AddRecipe = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    category: '',
    image: null,
  });

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
    for (let key in form) formData.append(key, form[key]);

    try {
      const response = await api.post('recipes/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Рецепт добавлен!');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Ошибка при добавлении рецепта');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Название" onChange={handleChange} required />
      <textarea name="description" placeholder="Описание" onChange={handleChange} required />
      <textarea name="ingredients" placeholder="Ингредиенты" onChange={handleChange} required />
      <textarea name="instructions" placeholder="Инструкция" onChange={handleChange} required />
      <input name="category" placeholder="ID категории" onChange={handleChange} required />
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Создать рецепт</button>
    </form>
  );
};

export default AddRecipe;
