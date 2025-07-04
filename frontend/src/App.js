import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipePage from './pages/RecipePage';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Защищённые маршруты */}
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/add-recipe" element={
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        } />
        <Route path="/recipes/:id/edit" element={
          <PrivateRoute>
            <EditRecipe />
          </PrivateRoute>
        } />
      </Routes>

      <ToastContainer position="bottom-right" autoClose={2500} />
    </Router>
  );
}

export default App;
