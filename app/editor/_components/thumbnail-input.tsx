'use client';

import Image from 'next/image';

type ImageObj = {
  name: string;
  image: string;
};

const exampleImage: ImageObj[] = [
  {
    name: 'js',
    image: '/javascript-image.png',
  },
  {
    name: 'react',
    image: '/React-icon.svg',
  },
  {
    name: 'next',
    image: '/nextjs-image.jpg',
  },
  {
    name: 'blog',
    image: '/blog-square-image.png',
  },
];

export default function ThumbnailInput({
  editThumbnail,
}: {
  editThumbnail: (imaeg: string) => void;
}) {
  return (
    <div className='flex gap-2'>
      {exampleImage.map((item) => (
        <div
          key={item.name}
          onClick={() => editThumbnail(item.image)}
          className='w-[55px] h-[55px] relative cursor-pointer'
        >
          <Image
            src={item.image}
            alt={`${item.name} logo`}
            fill
            className='rounded-lg'
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  );
}
