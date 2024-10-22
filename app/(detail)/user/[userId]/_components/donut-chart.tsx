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

  const resetState = () => {
    setPostHover(false);
    setCommentHover(false);
    setLikeHover(false);
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
            strokeDasharray={`${dasharray1 - 20} ${
              circumference - dasharray1 + 20
            }`}
            strokeDashoffset={offset - 10}
            className={`${
              postHover && 'scale-125'
            } origin-center sclae-100 cursor-pointer transition-all duration-300 ease-in-out`}
            strokeLinecap='round'
            onMouseOver={() => {
              setPostHover(!postHover);
              setCommentHover(false);
              setLikeHover(false);
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
            strokeDasharray={`${dasharray2 - 20} ${
              circumference - dasharray2 + 20
            }`}
            strokeDashoffset={offset - dasharray1 - 10}
            onMouseOver={() => {
              setPostHover(false);
              setCommentHover(!commentHover);
              setLikeHover(false);
            }}
            className={`${
              commentHover && 'scale-125'
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
            strokeDasharray={`${dasharray3 - 20} ${
              circumference - dasharray3 + 20
            }`}
            strokeDashoffset={offset - (dasharray1 + dasharray2) - 10}
            onMouseOver={() => {
              setPostHover(false);
              setCommentHover(false);
              setLikeHover(!likeHover);
            }}
            className={`${
              likeHover && 'scale-125'
            } origin-center sclae-100 cursor-pointer transition-all duration-300 ease-in-out`}
            strokeLinecap='round'
          />
        )}
        {!postHover && !commentHover && !likeHover && (
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
        {(postHover || commentHover || likeHover) && (
          <text
            x='150'
            y='155'
            fontSize='20'
            fontWeight={600}
            textAnchor='middle'
          >
            {postHover && `포스트 ${post}회`}
            {commentHover && `댓글 ${commnet}회`}
            {likeHover && `좋아요 ${like}회`}
          </text>
        )}
      </svg>
    </div>
  );
}
