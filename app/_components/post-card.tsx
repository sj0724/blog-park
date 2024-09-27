import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import formatDateRange from '@/utils/formatData';
import Link from 'next/link';

interface Props {
  id: string;
  title: string;
  summation: string;
  createdAt: string;
}

export default function PostCard({ id, title, summation, createdAt }: Props) {
  const formatDate = formatDateRange({ dateString: createdAt });

  return (
    <Link href={`/post/${id}`}>
      <Card className='w-[400px] h-[200px]'>
        <CardHeader className='gap-2'>
          <CardTitle className='text-3xl font-extrabold'>{title}</CardTitle>
          <CardDescription className='h-[70px]'>{summation}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-xs'>{formatDate}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
