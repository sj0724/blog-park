'use client';

import { Post } from '@/type';
import { Paperclip, Share } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import KakaoIcon from '@/public/kakao-icon-black.svg';
import Image from 'next/image';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

interface Props {
  post: Post;
  type: 'float' | 'title';
}

export default function ShareLinkButton({ post, type }: Props) {
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

  if (type === 'title') {
    return (
      <div className='relative'>
        <div
          ref={containerRef}
          onClick={() => setIsHover(!isHover)}
          className='p-2 cursor-pointer'
        >
          <Share size={20} />
        </div>
        {isHover && (
          <div className='absolute flex transform items-center right-0 -bottom-10 rounded-lg shadow'>
            <div className='p-2 cursor-pointer' onClick={copyLink}>
              <Paperclip size={22} />
            </div>
            <div
              className='p-2 cursor-pointer w-9 h-9 flex justify-center items-center'
              onClick={shareKakao}
            >
              <Image
                src={KakaoIcon}
                alt='카카오 아이콘'
                width={20}
                height={20}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='relative'>
      <div
        ref={containerRef}
        onClick={() => setIsHover(!isHover)}
        className='shadow-md border rounded-full p-2 cursor-pointer hover:-translate-y-1 transition-transform'
      >
        <Share size={30} />
      </div>
      {isHover && (
        <div className='absolute flex gap-2 transform -translate-x-1/2 left-1/2 -bottom-14 animate-fade-in'>
          <div
            className='shadow-md border rounded-full p-2 cursor-pointer'
            onClick={copyLink}
          >
            <Paperclip size={30} />
          </div>
          <div
            className='shadow-md border rounded-full p-2 cursor-pointer w-12 h-12 flex justify-center items-center'
            onClick={shareKakao}
          >
            <Image src={KakaoIcon} alt='카카오 아이콘' width={25} height={25} />
          </div>
        </div>
      )}
    </div>
  );
}
