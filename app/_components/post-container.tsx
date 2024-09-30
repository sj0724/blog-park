import Pagination from '@/components/pagination';
import PostCard from './post-card';
import { Post } from '@/type';

interface Props {
  count: number;
  list: Post[];
  page: number;
  title: string;
}

export default async function PostContainer({
  count,
  list,
  page,
  title,
}: Props) {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <ul className='grid grid-cols-3 w-full gap-4'>
        {list.map((post) => (
          <li key={post.id}>
            <PostCard
              id={post.id}
              title={post.title}
              summation={post.summation}
              createdAt={post.createdAt}
              owner={post.fk_user}
            />
          </li>
        ))}
      </ul>
      <div className='py-4 flex justify-center'>
        <Pagination total={count!} currentPage={page} route='/' limit={6} />
      </div>
    </div>
  );
}
