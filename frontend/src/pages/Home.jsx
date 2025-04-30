import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* 🖼 Баннер */}
      <div
        className="bg-dark text-white text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          height: '60vh',
          backgroundImage: 'url("https://www.bing.com/images/search?view=detailV2&ccid=HT3aezLN&id=094BC8493AA18992F11FAEA05548D60F8860DF40&thid=OIP.HT3aezLNp48d8FfyJMISMAHaE7&mediaurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fingredients-cooking-food-background-with-herbs-vegetables-top-view-white-background_1040174-1572.jpg&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.1d3dda7b32cda78f1df057f224c21230%3Frik%3DQN9giA%252fWSFWgrg%26pid%3DImgRaw%26r%3D0&exph=417&expw=626&q=background-image+cooking+free&simid=607999557238202191&ck=0FC658FF5CD14A4360CD4E63EE8C3EDF&selectedindex=4&itb=0&cw=1222&ch=585&ajaxhist=0&ajaxserp=0&shtc=0&shth=OIP.9igDhCXY7cXjtE1ldn6m6gHaE8&shsc=idp&form=EX0050&shid=f6be8a62-7a49-40f9-893b-3b1510ee4904&shtp=GetUrl&shtk=Q29va2luZyBCYWNrZ3JvdW5kcyBJbWFnZXMgLSBGcmVlIERvd25sb2FkIG9uIEZyZWVwaWs%3D&shdk=0J3QsNC50LTQtdC90L4g0LIgQmluZyAod3d3LmZyZWVwaWsuY29tKQ%3D%3D&shhk=bH39TuOGhnK0NNU%2FnUNjCo9%2BnLCQAPPzb9%2BQdMPtQNc%3D&cit=ccid_9igDhCXY*cp_6899167CAFE0B35CC82C6951C5D56F15*mid_FD403AB91350B6FAEDDFBDADD1EEC0FE084C710B*simid_608031675003503117*thid_OIP.9igDhCXY7cXjtE1ldn6m6gHaE8&vt=2)',
          backgroundColor: 'burlywood',
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
