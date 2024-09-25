'use server';

import db from '@/lib/db';
import { hashPassword } from '@/lib/utils';
import { RegisterSchemaType } from '../(auth)/sign-up/_components/register-form';
import { RegisterSchema } from '@/schema';
import { ActionType, User } from '@/type';

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
