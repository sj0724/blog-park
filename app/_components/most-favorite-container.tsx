import { Suspense } from 'react';
import { getMostLikePost } from '../data/post';
import FavoritePostCard from './favorite-post-card';
import FavoriteListSkeleton from './favorite-list-skeleton';

export default async function MostFavoriteContainer() {
  const postList = await getMostLikePost();
  return (
    <div className='flex flex-col h-fit bg-white p-5 rounded-lg shadow-md'>
      <p className='text-sm text-gray-600'>인기있는 글</p>
      <Suspense fallback={<FavoriteListSkeleton />}>
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
      </Suspense>
    </div>
  );
}
