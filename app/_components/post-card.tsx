import MarkdownComponent from '@/components/Markdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SupabaseUser } from '@/type';
import formatDateRange from '@/utils/formatData';
import Link from 'next/link';

interface Props {
  id?: string;
  title?: string;
  summation?: string;
  createdAt?: string;
  owner?: SupabaseUser;
}

export default function PostCard({
  id,
  title,
  summation,
  createdAt,
  owner,
}: Props) {
  if (!title || !summation || !createdAt || !id)
    return <div>잘못된 포스트 정보입니다.</div>;

  const formatDate = formatDateRange({ dateString: createdAt });

  return (
    <Link href={`/post/${id}`} className='w-fit'>
      <Card className='w-[350px] h-[350px] hover:shadow-lg hover:-translate-y-1 transition-transform flex flex-col'>
        <CardHeader className='pb-0 h-[120px]'>
          <CardTitle className='text-4xl font-extrabold break-words'>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col h-full'>
          <div className='flex flex-col justify-center h-full'>
            <div className='text-sm text-gray-600'>
              <MarkdownComponent markdownText={summation} />
            </div>
          </div>
          <div className='flex justify-between items-center h-5'>
            <p className='text-sm font-semibold'>{formatDate}</p>
            <p className='text-sm'>{owner?.name}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
