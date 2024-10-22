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
  const squareSize = 300;

  const total = post + commnet + like;
  const radius = 90; // 원의 반지름
  const circumference = 2 * Math.PI * radius; // 원 둘래

  const postRatio = post / total; // 각각 비율
  const commentRatio = commnet / total;
  const likeRatio = like / total;

  // 각 부분의 비율에 따른 strokeDasharray 및 strokeDashoffset 계산
  const dasharray1 = postRatio * circumference;
  const dasharray2 = commentRatio * circumference;
  const dasharray3 = likeRatio * circumference;

  const offset = circumference * 0.25; // 위치 조정을 위한 offset

  const getTextPosition = (startRatio: number, endRatio: number) => {
    const midRatio = (startRatio + endRatio) / 2; // 시작과 끝 사이의 중간 비율
    const angle = 2 * Math.PI * midRatio + offset * 1.5; // 중간 각도 계산
    const x = 150 + (radius + 30) * Math.cos(angle); // 텍스트 위치 계산 (원의 중심에서 약간 안쪽)
    const y = 150 + (radius + 35) * Math.sin(angle);
    if (y > 265 && y < 285) {
      return { x, y: y + 10 };
    }
    return { x, y };
  };

  const postPosition = getTextPosition(0, postRatio); // 첫 번째 항목
  const commentPosition = getTextPosition(postRatio, postRatio + commentRatio); // 두 번째 항목
  const likePosition = getTextPosition(
    postRatio + commentRatio,
    postRatio + commentRatio + likeRatio
  ); // 세 번째 항목

  return (
    <svg viewBox='0 0 300 300' width='250' height='250'>
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
      <text
        x={postPosition.x}
        y={postPosition.y}
        fontFamily='Arial'
        fontSize='30'
        fontWeight='600'
        fill='black'
        textAnchor='middle'
      >
        {post}
      </text>
      <text
        x={commentPosition.x}
        y={commentPosition.y}
        fontFamily='Arial'
        fontSize='30'
        fontWeight='600'
        fill='black'
        textAnchor='middle'
      >
        {commnet}
      </text>
      <text
        x={likePosition.x}
        y={likePosition.y}
        fontFamily='Arial'
        fontSize='30'
        fontWeight='600'
        fill='black'
        textAnchor='middle'
      >
        {like}
      </text>
    </svg>
  );
}
