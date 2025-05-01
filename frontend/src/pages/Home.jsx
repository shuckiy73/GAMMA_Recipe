import { Link } from 'react-router-dom';
import './Home.css'; // Не забудь создать этот файл для стилей

export default function Home() {
  return (
    <main>
      {/* 🖼 Баннер с overlay и текстом */}
      <section
        className="position-relative"
        style={{
          height: '60vh',
          backgroundImage:
            'url("https://img.freepik.com/premium-photo/ingredients-cooking-food-background-with-herbs-vegetables-top-view-white-background_1040174-1572.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        />
        <div className="position-relative text-white text-center d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="display-4 fw-bold">Добро пожаловать в Cook Book</h1>
          <p className="lead">Готовьте с удовольствием и делитесь любимыми рецептами</p>
        </div>
      </section>

      {/* 🔽 Секции под баннером */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-5">Что вы найдёте у нас</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card feature-card border-0 shadow-sm h-100 text-center">
              <div className="card-body">
                <h5 className="card-title fw-bold">Категории блюд</h5>
                <p className="card-text text-muted">
                  Супы, закуски, салаты, выпечка и десерты — всё в одном месте.
                </p>
                <Link to="/recipes" className="btn btn-outline-success">
                  Открыть
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card border-0 shadow-sm h-100 text-center">
              <div className="card-body">
                <h5 className="card-title fw-bold">Поиск рецептов</h5>
                <p className="card-text text-muted">
                  Ищите по названию или ингредиентам — быстро и удобно.
                </p>
                <Link to="/search" className="btn btn-outline-success">
                  Искать
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card border-0 shadow-sm h-100 text-center">
              <div className="card-body">
                <h5 className="card-title fw-bold">Регистрация</h5>
                <p className="card-text text-muted">
                  Сохраняйте рецепты, делитесь с друзьями, комментируйте.
                </p>
                <Link to="/register" className="btn btn-outline-success">
                  Зарегистрироваться
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
