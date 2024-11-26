/* eslint-disable prefer-const */
'use client';

import { useEffect, useState } from 'react';
import Heading from './heading';

interface Props {
  content: string;
}

export default function PostHeadingList({ content }: Props) {
  const [activeHeading, setActiveHeading] = useState(0);
  const headingList = content.match(/^(#{1,3}\s.*)$/gm) || [];
  const firstHeading = headingList[0]
    ? headingList[0].replace(/#/g, '').trim()
    : '';

  useEffect(() => {
    const headings = document.querySelectorAll('h1, h2, h3');
    const observedSet = new Set(); // 감지된 요소만 저장하는 데이터
    let lastScrollTop = 0; // 이전 스크롤 위치
    if (!headings) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!observedSet.has(entry.target) && !entry.isIntersecting) {
          observedSet.add(entry.target);
          return;
        }
        const currentScrollTop =
          window.scrollY || document.documentElement.scrollTop;
        if (currentScrollTop > lastScrollTop) {
          if (!entry.isIntersecting) {
            if (entry.target.id === firstHeading) return;
            setActiveHeading((prev) => prev + 1);
          }
        } else if (currentScrollTop < lastScrollTop) {
          if (entry.isIntersecting) {
            if (entry.target.id === firstHeading) return;
            setActiveHeading((prev) => prev - 1);
          }
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
      });
    };

    const observerOptions = {
      root: null, // 뷰포트를 기준으로 감지
      rootMargin: '-80px 0px 0px 0px', // nav의 높이만큼 상단 margin추가
      threshold: 1, // 요소가 완전히 보이는 경우만 트리거, 조금이라도 가려지면 감지안됨
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        observedSet.add(heading); // 위에서 생성한 Set에 초기 요소 추가
      }
      observer.observe(heading);
    });

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [firstHeading]);

  return (
    <div className='hidden fixed top-40 left-1/2 translate-x-[420px] h-fit lg:flex w-60'>
      <ul className='flex flex-col gap-0.5'>
        {headingList.map((item, index) => {
          const headingId = item.replace(/#/g, '').trim();
          return (
            <li key={index} className='w-fit'>
              <Heading
                text={item}
                isActive={activeHeading === index}
                id={headingId}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
