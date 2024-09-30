import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import formatDateRange from '@/utils/formatData';
import { User } from '@prisma/client';
import Link from 'next/link';

interface Props {
  id: string;
  title: string;
  summation: string;
  createdAt: string;
  owner: User;
}

export default function PostCard({
  id,
  title,
  summation,
  createdAt,
  owner,
}: Props) {
  const formatDate = formatDateRange({ dateString: createdAt });

  return (
    <Link href={`/post/${id}`}>
      <Card className='w-[350px] h-[350px] hover:shadow-lg hover:-translate-y-1 transition-transform flex flex-col'>
        <CardHeader className='pb-0 h-[120px]'>
          <CardTitle className='text-4xl font-extrabold break-words'>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col h-full'>
          <div className='flex flex-col justify-center h-full'>
            <div
              dangerouslySetInnerHTML={{ __html: summation }}
              className='text-sm text-gray-600'
            ></div>
          </div>
          <div className='flex justify-between items-center h-5'>
            <p className='text-sm font-semibold'>{formatDate}</p>
            <p className='text-sm'>{owner.name}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
