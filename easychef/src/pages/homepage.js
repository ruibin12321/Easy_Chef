import Slider from '../components/homepage/slider';
import Categories from '../components/homepage/categories';
import Popular_recipes from '../components/homepage/popular_recipes';

function Homepage() {
  return ( 
      <main>
      <Slider />
      <Categories />
      <Popular_recipes />
      </main>
  );
}

export default Homepage;
