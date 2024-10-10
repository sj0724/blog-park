'use server';

import { auth } from '@/auth';
import { SeesionData } from '@/type';
import { supabase } from '@/utils/supabase';

export const getSessionUserData = async (): Promise<SeesionData | null> => {
  const session = await auth();
  try {
    if (!session) return null;
    if (!session.user) throw new Error('유저 데이터가 없습니다.');
    const { email, name, id, image, Oauth } = session.user;
    if (!email) throw new Error('존재하지 않는 이메일 입니다.');
    if (!name) throw new Error('존재하지 않는 이름 입니다.');
    if (!id) throw new Error('존재하지 않는 id 입니다.');
    if (image === undefined) throw new Error('존재하지 않는 이미지 입니다.');

    return { email: email, name: name, id: id, image: image, Oauth };
  } catch {
    throw new Error('이메일을 가져오는중에 에러가 발생하였습니다.');
  }
};

export const getUserById = async (userId: string) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (!user) throw new Error('유저가 없습니다.');

    return user;
  } catch {
    throw new Error('유저 정보를 가져오는중에 에러가 발생하였습니다.');
  }
};
