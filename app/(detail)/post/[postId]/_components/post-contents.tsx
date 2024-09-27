import formatDateRange from '@/utils/formatData';
import { User } from '@prisma/client';
import { DotFilledIcon } from '@radix-ui/react-icons';

interface Props {
  title: string;
  contents: string;
  user: User;
  createdAt: string;
}

export default function PostContents({
  contents,
  title,
  user,
  createdAt,
}: Props) {
  const formatData = formatDateRange({ dateString: createdAt });
  return (
    <div className='w-[800px] flex flex-col gap-12'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-6xl font-extrabold'>{title}</h1>
        <div className='flex gap-2 items-center text-center h-10'>
          <p className='font-semibold text-lg'>{user.name}</p>
          <DotFilledIcon width={10} height={10} />
          <p className='text-gray-600'>{formatData}</p>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: contents }} className='prose' />
    </div>
  );
}
