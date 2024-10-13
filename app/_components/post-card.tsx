import MarkdownEditor from '@/components/markdown-editor';
import TagBadge from '@/components/tag-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SupabaseUser } from '@/type';
import formatDateRange from '@/utils/formatData';
import { Lock } from 'lucide-react';
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
    <Link href={`/post/${id}`} className='w-fit'>
      <Card className='w-[350px] h-[350px] hover:shadow-lg hover:-translate-y-1 transition-transform flex flex-col'>
        <CardHeader className='pb-0 h-[120px]'>
          <CardTitle className='flex text-4xl font-extrabold break-words'>
            {title}
            <div>{!isPublished && <Lock size={25} />}</div>
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col h-full'>
          <div className='flex flex-col justify-center h-full'>
            <div className='text-sm text-gray-600'>
              <MarkdownEditor markdownText={summation} />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              {tags && tags.map((item) => <TagBadge key={item} tag={item} />)}
            </div>
            <div className='flex justify-between items-center h-5'>
              <p className='text-sm font-semibold'>{formatDate}</p>
              <p className='text-sm'>{owner?.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
