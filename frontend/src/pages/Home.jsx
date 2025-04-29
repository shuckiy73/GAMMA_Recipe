import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* 🖼 Баннер */}
      <div
        className="bg-dark text-white text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          height: '60vh',
          backgroundImage: 'url("https://sl.bing.net/ePq9IUjrTC8")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="display-3 fw-bold">RussianFood.com</h1>
        <p className="lead">Традиционные русские рецепты — просто, вкусно и по-домашнему</p>
        <Link to="/recipes" className="btn btn-success btn-lg mt-3">
          Перейти к рецептам
        </Link>
      </div>

      {/* 🔽 Секции под баннером */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-5">Что вы найдёте у нас</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 text-center">
              <div className="card-body">
                <h5 className="card-title fw-bold">Категории блюд</h5>
                <p className="card-text text-muted">Супы, закуски, салаты, выпечка и десерты — всё в одном месте.</p>
                <Link to="/recipes" className="btn btn-outline-success">Открыть</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 text-center">
              <div className="card-body">
                <h5 className="card-title fw-bold">Поиск рецептов</h5>
                <p className="card-text text-muted">Ищите по названию или ингредиентам — быстро и удобно.</p>
                <Link to="/search" className="btn btn-outline-success">Искать</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 text-center">
              <div className="card-body">
                <h5 className="card-title fw-bold">Регистрация</h5>
                <p className="card-text text-muted">Сохраняйте рецепты, делитесь с друзьями, комментируйте.</p>
                <Link to="/register" className="btn btn-outline-success">Зарегистрироваться</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
