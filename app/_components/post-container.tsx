import PostCard from './post-card';
import { Post } from '@/type';

interface Props {
  list: Post[];
  title: string;
}

export default async function PostContainer({ list, title }: Props) {
  return (
    <div className='flex flex-col gap-8 max-w-[700px] w-full'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      {!list || list.length === 0 ? (
        <ul className='flex flex-col items-center'>
          <div className='bg-white flex items-center justify-center gap-5 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/2 h-52 px-8 py-4 hover:-translate-y-1 transition-transform text-2xl font-semibold'>
            작성한 포스트가 없습니다!
          </div>
        </ul>
      ) : (
        <ul className='flex flex-col items-center justify-center gap-4'>
          {list.map((post) => (
            <li key={post.id} className='flex flex-col w-full'>
              <PostCard
                id={post.id}
                title={post.title}
                summation={post.summation}
                createdAt={post.createdAt}
                owner={post.posts_user_id_fkey}
                tags={post.tag}
                isPublished={post.isPublished}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
