import { getMostLikePost } from '../data/post';
import FavoritePostCard from './favorite-post-card';

export default async function MostFavoriteContainer() {
  const postList = await getMostLikePost();
  return (
    <div className='flex flex-col h-fit sticky top-24 bg-white p-5 rounded-lg shadow-md'>
      <p className='text-sm text-gray-600'>인기있는 글</p>
      <ul>
        {postList.map((item) => (
          <li key={item.id}>
            <FavoritePostCard
              title={item.title}
              userId={item.user_id}
              id={item.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
