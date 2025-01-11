'use client';

import { useEffect, useState } from 'react';

interface Props {
  text: string;
  id: string;
  isFirst: boolean;
}

const space = {
  1: 'pl-3',
  2: 'pl-7',
  3: 'pl-12',
};

export default function Heading({ text, id, isFirst }: Props) {
  const [isActive, setIsActive] = useState(false);
  const replaceText = text.replace(/#/g, '');

  const countSpace = (heading: string) => {
    const matches = heading.match(new RegExp('#', 'g'));
    return matches ? matches.length : 0;
  };

  const scrollToElementById = () => {
    const element = document.getElementById(id);
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

  useEffect(() => {
    if (isFirst) {
      setIsActive(true);
    }
  }, [id, isFirst]);

  useEffect(() => {
    const heading = document.getElementById(id);
    if (!heading) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === id) {
            setIsActive(true);
          }
        } else {
          if (entry.target.id === id) {
            setIsActive(false);
          }
        }
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

    observer.observe(heading);

    return () => {
      observer.unobserve(heading);
    };
  }, [id]);

  return (
    <div
      className={`cursor-pointer text-[15px] ${
        space[countSpace(text) as 1 | 2 | 3]
      } hover:text-blue-500 ${
        isActive ? 'text-blue-500' : 'text-gray-500'
      } min-h-6`}
      onClick={scrollToElementById}
    >
      <p className='break-keep'>{`${replaceText}`}</p>
    </div>
  );
}
