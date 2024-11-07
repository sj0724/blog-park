'use client';

import { useState } from 'react';

interface Props {
  post: number; // 첫 번째 값
  commnet: number; // 두 번째 값
  like: number; // 세 번째 값
}

type HoverArea = 'post' | 'comment' | 'like' | 'all';

export default function DonutChart({ post, commnet, like }: Props) {
  const [isHover, setIsHover] = useState<HoverArea>('all');

  const total = post + commnet + like;
  const radius = 90; // 원의 반지름
  const circumference = 2 * Math.PI * radius; // 원 둘래

  // 0일때 제외
  const postRatio = total > 0 ? post / total : 0;
  const commentRatio = total > 0 ? commnet / total : 0;
  const likeRatio = total > 0 ? like / total : 0;

  // 각 부분의 비율에 따른 strokeDasharray - round 값 20
  const dasharray1 = postRatio * circumference - 20;
  const dasharray2 = commentRatio * circumference - 20;
  const dasharray3 = likeRatio * circumference - 20;

  const offset = circumference * 0.25 - 10; // 위치 조정을 위한 offset

  if (total === 0) {
    return (
      <svg viewBox='0 0 300 300' width='250' height='250'>
        <circle
          cx='150'
          cy='150'
          r={radius}
          fill='none'
          stroke='#d1d5db'
          strokeWidth='20'
          className='cursor-pointer'
          strokeLinecap='round'
        />
      </svg>
    );
  }

  const handleHover = (area: HoverArea) => {
    setIsHover(area);
  };

  const resetState = () => {
    setIsHover('all');
  };

  return (
    <div onMouseLeave={resetState}>
      <svg viewBox='0 0 300 300' width='250' height='250'>
        {postRatio !== 0 && (
          <circle
            cx='150'
            cy='150'
            r={radius}
            fill='none'
            stroke='#3b82f6'
            strokeWidth='20'
            strokeDasharray={`${dasharray1} ${circumference - dasharray1}`}
            strokeDashoffset={offset}
            className={`${
              isHover === 'post' && 'scale-125'
            } origin-center sclae-100 cursor-pointer transition-all duration-300 ease-in-out`}
            strokeLinecap='round'
            onMouseOver={() => {
              handleHover('post');
            }}
          />
        )}
        {commentRatio !== 0 && (
          <circle
            cx='150'
            cy='150'
            r={radius}
            fill='none'
            stroke='#ef4444'
            strokeWidth='20'
            strokeDasharray={`${dasharray2} ${circumference - dasharray2}`}
            strokeDashoffset={offset - (dasharray1 + 20)} // round 값 추가 적용
            onMouseOver={() => {
              handleHover('comment');
            }}
            className={`${
              isHover === 'comment' && 'scale-125'
            } origin-center sclae-100 cursor-pointer transition-all duration-300 ease-in-out`}
            strokeLinecap='round'
          />
        )}
        {likeRatio !== 0 && (
          <circle
            cx='150'
            cy='150'
            r={radius}
            fill='none'
            stroke='#10b981'
            strokeWidth='20'
            strokeDasharray={`${dasharray3} ${circumference - dasharray3}`}
            strokeDashoffset={offset - (dasharray1 + dasharray2 + 40)} // round 값 추가 적용
            onMouseOver={() => {
              handleHover('like');
            }}
            className={`${
              isHover === 'like' && 'scale-125'
            } origin-center sclae-100 cursor-pointer transition-all duration-300 ease-in-out`}
            strokeLinecap='round'
          />
        )}
        {isHover !== 'all' ? (
          <text
            x='150'
            y='155'
            fontSize='20'
            fontWeight={600}
            textAnchor='middle'
          >
            {isHover === 'post' && `포스트 ${post}회`}
            {isHover === 'comment' && `댓글 ${commnet}회`}
            {isHover === 'like' && `좋아요 ${like}회`}
          </text>
        ) : (
          <text
            x='150'
            y='155'
            fontSize='20'
            fontWeight={600}
            fill='#4b5563'
            textAnchor='middle'
          >
            전체 {total}회
          </text>
        )}
      </svg>
    </div>
  );
}
