import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:8000/api/auth/register/', {
        username,
        email,
        password,
      });
      toast.success('Регистрация успешна! Теперь вы можете войти.', {
        className: "toastify-bootstrap toastify-bootstrap-success"
      });
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        const errorMessage =
          data.username?.[0] ||
          data.email?.[0] ||
          data.password?.[0] ||
          'Ошибка регистрации';
        setError(errorMessage);
      } else {
        setError('Сервер недоступен');
      }
      toast.error('Ошибка регистрации', {
        className: "toastify-bootstrap toastify-bootstrap-error"
      });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center fw-bold">Регистрация</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Имя пользователя</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Пароль</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
