'use server';

import db from '@/lib/db';
import { hashPassword } from '@/lib/utils';
import { RegisterSchemaType } from '../(auth)/sign-up/_components/register-form';
import { LoginSchema, RegisterSchema } from '@/schema';
import { ActionType, User } from '@/type';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { LoginSchemaType } from '../(auth)/sign-in/_components/login-form';
import { supabase } from '@/utils/supabase';
import { getSessionUserData } from '../data/user';

export const register = async (
  form: RegisterSchemaType
): Promise<ActionType<User>> => {
  try {
    const validate = RegisterSchema.safeParse(form);
    if (!validate.success)
      return { success: false, message: '올바른 값을 입력해 주세요.' };

    const { email, password, name } = validate.data;

    const checkExistingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (checkExistingUser)
      return { success: false, message: '이미 사용중인 이메일입니다.' };

    const hashedPassword = hashPassword(password);

    const createUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return {
      success: true,
      message: '회원가입에 성공하였습니다.',
      data: createUser,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { success: false, message: '회원가입 중에 에러가 발생하였습니다.' };
  }
};

export const login = async (
  form: LoginSchemaType
): Promise<ActionType<null>> => {
  try {
    const validate = LoginSchema.safeParse(form);
    if (!validate.success)
      return { success: false, message: '올바른 값을 입력해 주세요.' };

    const { email, password } = validate.data;

    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    const user = await supabase
      .from('users') // 테이블 이름
      .select('*') // 모든 컬럼 선택
      .eq('email', email)
      .single(); // 단일 결과만 반환

    if (!user) throw new Error('현재 유저가 존재하지 않습니다.');
    return {
      success: true,
      message: '로그인에 성공하였습니다.',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            message: '이메일이나 비밀번호가 일치하지 않습니다.',
          };
        default:
          return {
            success: false,
            message: '이메일이나 비밀번호가 일치하지 않습니다.',
          };
      }
    }
    return { success: false, message: '로그인 중에 에러가 발생하였습니다.' };
  }
};

export const logout = async (): Promise<ActionType<null>> => {
  try {
    await signOut({ redirect: false });

    return { success: true, message: '로그아웃에 성공 하였습니다.' };
  } catch {
    return { success: false, message: '로그아웃에 실패 하였습니다.' };
  }
};

export const editName = async (name: string): Promise<ActionType<null>> => {
  try {
    const session = await getSessionUserData();
    if (!session) throw Error('인증된 유저가 아닙니다.');

    const result = await supabase
      .from('users') // 테이블 이름
      .update({
        name,
      })
      .eq('id', session.id);

    if (!result) {
      return {
        success: false,
        message: '수정에 실패했습니다.',
      };
    }

    return {
      success: true,
      message: '수정에 성공하였습니다.',
    };
  } catch {
    return { success: false, message: '수정 중에 에러가 발생하였습니다.' };
  }
};

export const editEmail = async (email: string): Promise<ActionType<null>> => {
  try {
    const session = await getSessionUserData();
    if (!session) throw Error('인증된 유저가 아닙니다.');

    const result = await supabase
      .from('users') // 테이블 이름
      .update({
        email,
      })
      .eq('id', session.id);

    if (!result) {
      return {
        success: false,
        message: '수정에 실패했습니다.',
      };
    }

    return {
      success: true,
      message: '수정에 성공하였습니다.',
    };
  } catch {
    return { success: false, message: '수정 중에 에러가 발생하였습니다.' };
  }
};
