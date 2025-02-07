'use client';

import TagBadge from '@/components/tag-badge';
import { Separator } from '@/components/ui/separator';
import { Post, SupabaseUser } from '@/type';
import { formatDateRange } from '@/utils/formatData';
import { Dot, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  post: Post;
  owner?: SupabaseUser;
}

export default function PostCard({ post, owner }: Props) {
  const [isHover, setIsHover] = useState(false);
  if (!post) return <div>잘못된 포스트 정보입니다.</div>;

  const formatDate = formatDateRange({ dateString: post.createdAt });

  return (
    <Link href={`/post/${post.id}`}>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className='w-full flex justify-between hover:text-blue-500 px-6 py-8 rounded-xl gap-5'
      >
        <div className='w-4/5 min-w-52 flex flex-col'>
          <div className='flex text-base md:text-xl font-extrabold gap-2'>
            {post.title}
            <div className='h-fit pt-0.5'>
              {!post.isPublished && <Lock size={25} />}
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center justify-between min-h-20 w-full'>
              <p className='text-sm md:text-base text-gray-600 max-w-[390px]'>
                {post.summation}
              </p>
            </div>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-2'>
                {post.tag &&
                  post.tag.map((item) => (
                    <TagBadge key={item} tag={item} type='badge' />
                  ))}
              </div>
              <div className='flex items-center h-5 gap-1'>
                <p className='text-sm text-gray-600'>{formatDate}</p>
                {owner && (
                  <>
                    <Dot size={10} />
                    <p className='text-sm text-gray-600'>{owner.name}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`relative max-w-[130px] w-full aspect-square h-fit ${
            isHover && '-translate-y-2 transition-transform ease-linear'
          }`}
        >
          {post.thumbnail && (
            <Image
              src={post.thumbnail}
              fill
              style={{ objectFit: 'cover', borderRadius: '16px' }}
              alt='이미지'
            />
          )}
        </div>
      </div>
      <Separator />
    </Link>
  );
}
