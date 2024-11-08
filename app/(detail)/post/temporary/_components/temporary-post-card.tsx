'use client';

import { deleteTemporaryPost } from '@/app/action/teporary-post';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TemporaryPost } from '@/type';
import { formatDateRange } from '@/utils/formatData';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { toast } from 'sonner';

interface Props {
  post: TemporaryPost;
}

export default function TemporaryPostCard({ post }: Props) {
  const router = useRouter();

  if (!post) return <div>잘못된 포스트 정보입니다.</div>;

  const isDelete = async (e: MouseEvent) => {
    e.preventDefault();
    const result = await deleteTemporaryPost(post.id);
    if (result.success) {
      toast.message(result.message);
      router.refresh();
    }
  };

  const formatDate = formatDateRange({ dateString: post.createdAt });

  return (
    <Link href={`/editor/create?id=${post.id}`}>
      <Card className='w-full relative hover:shadow-lg hover:-translate-y-1 transition-transform flex flex-col border-none hover:text-blue-500'>
        <CardHeader className='h-[80px]'>
          <CardTitle className='flex text-xl font-extrabold gap-2'>
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col h-20'>
          <div className='flex flex-col justify-center h-full'>
            <div className='h-5 text-base text-gray-600 truncate'>
              {post.content}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center h-5 gap-1'>
              <p className='text-sm text-gray-600'>{formatDate}</p>
            </div>
          </div>
        </CardContent>
        <div className='absolute right-0 top-0 p-2' onClick={isDelete}>
          <X size={20} color='black' />
        </div>
      </Card>
    </Link>
  );
}
