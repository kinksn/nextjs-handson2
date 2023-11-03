import { Search } from '@/lib/component/Search';
import { getRandomPhotos } from '@/lib/utils';

const Home = async() => {
  const randomPhotos = await getRandomPhotos();
  return (
    <div>
      <Search randomPhotos={randomPhotos} />
    </div>
  )
}

export default Home;
