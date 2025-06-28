import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveTokens } from '../utils/auth';
import { toast } from 'react-toastify';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login/', {
        username,
        password,
      });
      saveTokens(res.data.access, res.data.refresh);
      toast.success("Добро пожаловать!", {
        className: "toastify-bootstrap toastify-bootstrap-success"
      });
      navigate('/');
    } catch (err) {
      setError('Неверное имя пользователя или пароль');
      toast.error("Ошибка входа", {
        className: "toastify-bootstrap toastify-bootstrap-error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center fw-bold">Войти</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Имя пользователя</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
              setError('');
            }}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Пароль</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setError('');
            }}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
          {isLoading ? 'Входим...' : 'Войти'}
        </button>
      </form>
      <div className="text-center mt-3">
        <p>Нет аккаунта? <a href="/register">Зарегистрируйтесь</a></p>
      </div>
    </div>
  );
}
