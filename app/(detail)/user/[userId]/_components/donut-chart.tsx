'use client';

import { useState } from 'react';

interface Props {
  post: number; // 첫 번째 값
  commnet: number; // 두 번째 값
  like: number; // 세 번째 값
}

export default function DonutChart({ post, commnet, like }: Props) {
  const [postHover, setPostHover] = useState(false);
  const [commentHover, setCommentHover] = useState(false);
  const [likeHover, setLikeHover] = useState(false);

  const total = post + commnet + like;
  const radius = 90; // 원의 반지름
  const circumference = 2 * Math.PI * radius; // 원 둘래

  // 0일때 제외
  const postRatio = total > 0 ? post / total : 0;
  const commentRatio = total > 0 ? commnet / total : 0;
  const likeRatio = total > 0 ? like / total : 0;

  // 각 부분의 비율에 따른 strokeDasharray 및 strokeDashoffset 계산
  const dasharray1 = postRatio * circumference;
  const dasharray2 = commentRatio * circumference;
  const dasharray3 = likeRatio * circumference;

  const offset = circumference * 0.25; // 위치 조정을 위한 offset
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

  return (
    <svg viewBox='0 0 300 300' width='250' height='250'>
      {postRatio !== 0 && (
        <circle
          cx='150'
          cy='150'
          r={radius}
          fill='none'
          stroke='#3b82f6'
          strokeWidth='20'
          strokeDasharray={`${dasharray1 - 20} ${
            circumference - dasharray1 + 20
          }`}
          strokeDashoffset={offset - 10}
          onMouseEnter={() => setPostHover(!postHover)}
          className='cursor-pointer'
          strokeLinecap='round'
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
          strokeDasharray={`${dasharray2 - 20} ${
            circumference - dasharray2 + 20
          }`}
          strokeDashoffset={offset - dasharray1 - 10}
          onMouseEnter={() => setCommentHover(!commentHover)}
          className='cursor-pointer'
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
          strokeWidth={likeHover ? 40 : 20}
          strokeDasharray={`${dasharray3 - 20} ${
            circumference - dasharray3 + 20
          }`}
          strokeDashoffset={offset - (dasharray1 + dasharray2) - 10}
          onMouseEnter={() => setLikeHover(!likeHover)}
          onMouseLeave={() => setLikeHover(!likeHover)}
          className='cursor-pointer'
          strokeLinecap='round'
        />
      )}
      {postHover && ( // hover시 해당 부분을 상단으로 올리기 위한 코드
        <circle
          cx='150'
          cy='150'
          r={radius}
          fill='none'
          stroke='#3b82f6'
          strokeWidth={postHover ? 40 : 20}
          strokeDasharray={`${dasharray1} ${circumference - dasharray1}`}
          strokeDashoffset={offset}
          onMouseLeave={() => setPostHover(!postHover)}
          className='cursor-pointer'
          strokeLinecap='round'
        />
      )}
      {commentHover && (
        <circle
          cx='150'
          cy='150'
          r={radius}
          fill='none'
          stroke='#ef4444'
          strokeWidth={commentHover ? 40 : 20}
          strokeDasharray={`${dasharray2} ${circumference - dasharray2}`}
          strokeDashoffset={offset - dasharray1}
          onMouseLeave={() => setCommentHover(!commentHover)}
          className='cursor-pointer'
          strokeLinecap='round'
        />
      )}
    </svg>
  );
}
