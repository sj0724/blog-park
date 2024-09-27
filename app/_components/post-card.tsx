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
  content: string;
}

export default function PostCard({
  id,
  title,
  summation,
  createdAt,
  content,
}: Props) {
  const formatDate = formatDateRange({ dateString: createdAt });

  return (
    <Link href={`/post/${id}`}>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{summation}</CardDescription>
        </CardHeader>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
          <p>{formatDate}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
