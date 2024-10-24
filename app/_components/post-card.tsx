import TagBadge from '@/components/tag-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SupabaseUser } from '@/type';
import { formatDateRange } from '@/utils/formatData';
import { Dot, Lock } from 'lucide-react';
import Link from 'next/link';

interface Props {
  id?: string;
  title?: string;
  summation?: string;
  createdAt?: string;
  owner?: SupabaseUser;
  tags?: string[] | null;
  isPublished?: boolean;
}

export default function PostCard({
  id,
  title,
  summation,
  createdAt,
  owner,
  tags,
  isPublished,
}: Props) {
  if (!title || !summation || !createdAt || !id)
    return <div>잘못된 포스트 정보입니다.</div>;

  const formatDate = formatDateRange({ dateString: createdAt });

  return (
    <Link href={`/post/${id}`}>
      <Card className='w-full hover:shadow-lg hover:-translate-y-1 transition-transform flex flex-col border-none hover:text-blue-500'>
        <CardHeader className='h-[80px]'>
          <CardTitle className='flex text-xl font-extrabold gap-2'>
            {title}
            <div className='h-fit pt-0.5'>
              {!isPublished && <Lock size={25} />}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col h-[170px]'>
          <div className='flex flex-col justify-center h-full'>
            <div className='text-base text-gray-600'>{summation}</div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              {tags && tags.map((item) => <TagBadge key={item} tag={item} />)}
            </div>
            <div className='flex items-center h-5 gap-1'>
              <p className='text-sm text-gray-600'>{formatDate}</p>
              <Dot size={10} />
              <p className='text-sm text-gray-600'>{owner?.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
