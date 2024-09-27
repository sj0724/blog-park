import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
      <Card className='w-[400px] h-[200px] hover:shadow-lg hover:-translate-y-1 transition-transform'>
        <CardHeader className='gap-2'>
          <CardTitle className='text-3xl font-extrabold'>{title}</CardTitle>
          <CardDescription className='h-[70px]'>{summation}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-between items-center h-5'>
            <p className='text-xs'>{formatDate}</p>
            <p className='text-sm'>{owner.name}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
