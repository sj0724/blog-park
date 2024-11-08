import { getTemporaryList } from '@/app/data/temporary-post';
import { getSessionUserData } from '@/app/data/user';
import TemporaryPostCard from './_components/temporary-post-card';

export default async function temporary() {
  const user = await getSessionUserData();
  const list = await getTemporaryList(user!.id);

  return (
    <div className='flex flex-col min-h-[calc(100vh-80px-112px)] pb-5 px-5 w-full max-w-[600px]'>
      <h1 className='text-xl font-bold py-5'>임시 저장 포스트 목록</h1>
      <ul>
        {list.data!.map((item) => (
          <li key={item.id}>
            <TemporaryPostCard post={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
