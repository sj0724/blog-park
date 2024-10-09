import PostCard from './post-card';
import { Post } from '@/type';

interface Props {
  list: Post[];
  title: string;
}

export default async function PostContainer({ list, title }: Props) {
  return (
    <div className='flex flex-col gap-10'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 items-center justify-center'>
        {list.map((post) => (
          <li key={post.id} className='flex justify-center'>
            <PostCard
              id={post.id}
              title={post.title}
              summation={post.summation}
              createdAt={post.createdAt}
              owner={post.posts_user_id_fkey}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
