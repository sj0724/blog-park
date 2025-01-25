/* eslint-disable prefer-const */
'use client';

import Heading from './heading';

interface Props {
  content: string;
}

export default function PostHeadingList({ content }: Props) {
  const headingList = content.match(/^(#{1,3}\s.*)$/gm) || [];

  return (
    <div className='hidden fixed top-40 left-1/2 translate-x-[420px] h-fit max-h-[400px] xl:flex w-64 overflow-y-scroll'>
      <ul className='flex flex-col gap-0.5'>
        {headingList.map((item, index) => {
          const headingId = item.replace(/#/g, '').trim();
          return (
            <li key={index} className='w-fit'>
              <Heading text={item} id={headingId} isFirst={index === 0} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
