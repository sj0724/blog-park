'use server';

import { auth } from '@/auth';

export const getSessionUserData = async () => {
  const session = await auth();
  try {
    if (!session) return null;
    if (!session.user) throw new Error('유저 데이터가 없습니다.');
    const { email, name, id, image } = session.user;
    if (!email) throw new Error('존재하지 않는 이메일 입니다.');
    if (!name) throw new Error('존재하지 않는 이름 입니다.');
    if (!id) throw new Error('존재하지 않는 id 입니다.');

    return { email, name, id, image };
  } catch {
    throw new Error('이메일을 가져오는중에 에러가 발생하였습니다.');
  }
};
