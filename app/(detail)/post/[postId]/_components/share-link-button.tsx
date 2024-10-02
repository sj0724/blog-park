'use client';

import { Paperclip } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

export default function ShareLinkButton() {
  const route = usePathname();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${route}`;
  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.message('링크를 클립보드에 복사했습니다.');
  };

  return (
    <div
      className='shadow-md border rounded-full p-2 cursor-pointer'
      onClick={copyLink}
    >
      <Paperclip size={30} />
    </div>
  );
}
