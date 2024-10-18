'use client';

import { useEffect } from 'react';

interface Props {
  content: string;
}

function Heading({ text }: { text: string }) {
  const replaceText = text.replace(/#/g, '    ');
  const headingId = text.replace(/#/g, '').trim();
  const scrollToElementById = () => {
    const element = document.getElementById(headingId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 100;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <div
      className='cursor-pointer text-[15px] hover:text-[16px] text-gray-500 hover:text-blue-500 h-6'
      onClick={scrollToElementById}
    >
      <p className='whitespace-pre-wrap'>{`${replaceText}`}</p>
    </div>
  );
}

export default function PostHeadingList({ content }: Props) {
  const headingList = content.match(/^(#{1,3}\s.*)$/gm) || [];

  return (
    <div className='hidden fixed top-40 left-1/2 translate-x-[420px] h-fit lg:flex'>
      <ul className='flex flex-col gap-0.5'>
        {headingList.map((item, index) => (
          <li key={index}>
            <Heading text={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
