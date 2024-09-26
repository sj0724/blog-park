'use server';

import db from '@/lib/db';
import { hashPassword } from '@/lib/utils';
import { RegisterSchemaType } from '../(auth)/sign-up/_components/register-form';
import { LoginSchema, RegisterSchema } from '@/schema';
import { ActionType, User } from '@/type';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { LoginSchemaType } from '../(auth)/sign-in/_components/login-form';

export const register = async (
  form: RegisterSchemaType
): Promise<ActionType<User>> => {
  try {
    const validate = RegisterSchema.safeParse(form);
    console.log(validate);
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

    const user = await db.user.findUnique({
      where: { email },
    });
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
