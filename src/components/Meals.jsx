import useHttp from '../hooks/useHttp';
import Error from './Error';
import { MealItem } from './MealItem';


const reqConfig = { 
  url: 'http://localhost:3000/meals', 
  method: 'GET' 
}

export default function Meals() {
  const { 
    data: meals, 
    isLoading, 
    error 
  } = useHttp(reqConfig, []);

  if (isLoading) {
    return <p className='center'>Fetching Meals...</p>
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />
  }
  
  return (
    <ul id="meals">
      {meals.map(meal => <MealItem key={meal.id} meal={meal} />)}
    </ul>
  )
}