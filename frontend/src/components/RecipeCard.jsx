import { Link } from 'react-router-dom';
 export default function RecipeCard({ recipe }) { 
    return ( <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
         <img src={recipe.image} alt={recipe.title} className="h-48 w-full object-cover rounded-md" /> 
         <h2 className="text-lg font-bold mt-2">{recipe.title}</h2>
          <p className="text-sm text-gray-600">{recipe.description.substring(0, 100)}...</p>
           <Link to={`/recipes/${recipe.id}`} className="text-green-600 font-semibold mt-2 block">Подробнее</Link> 
           </div> ); }