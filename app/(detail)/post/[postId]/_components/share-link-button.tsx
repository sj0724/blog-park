'use client';

import { Post } from '@/type';
import { MessageCircle, Paperclip, Share } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export default function ShareLinkButton({ post }: { post: Post }) {
  const [isHover, setIsHover] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const route = usePathname();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${route}`;
  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.message('링크를 클립보드에 복사했습니다.');
  };

  const shareKakao = () => {
    const { Kakao } = window;
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: post.title,
        description: post.summation,
        imageUrl:
          'https://wjkhdzifyzfcuirssrog.supabase.co/storage/v1/object/public/Blog-Park/images/Group%202%20(1).png',
        link: {
          mobileWebUrl: url,
        },
      },
      buttons: [
        {
          title: '포스트 구경하기',
          link: {
            mobileWebUrl: url,
          },
        },
      ],
    });
  };

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsHover(!isHover);
      }
    };

    if (isHover) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isHover]);

  return (
    <div
      ref={containerRef}
      onClick={() => setIsHover(!isHover)}
      className='relative shadow-md border rounded-full p-2 cursor-pointer'
    >
      <Share size={30} />
      {isHover && (
        <div className='absolute flex gap-2 transform -translate-x-1/2 left-1/2 -bottom-14'>
          <div
            className='shadow-md border rounded-full p-2 cursor-pointer'
            onClick={copyLink}
          >
            <Paperclip size={30} />
          </div>
          <div
            className='shadow-md border rounded-full p-2 cursor-pointer'
            onClick={shareKakao}
          >
            <MessageCircle size={30} />
          </div>
        </div>
      )}
    </div>
  );
}
