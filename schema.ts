import z from 'zod';

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // 대소문자 구별 없이 알파벳과 숫자 포함하여 8자 이상

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해 주세요.' })
    .email({ message: '올바른 이메일 형식을 입력해 주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해 주세요.' }),
});

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: '닉네임을 입력해 주세요.' })
      .max(10, { message: '닉네임은 최대 10글자까지 가능합니다.' }),
    email: z.string().email({ message: '올바른 이메일 형식을 입력해 주세요.' }),
    emailCheck: z
      .string()
      .min(6, { message: '6자리 인증번호를 입력해주세요.' }),
    password: z.string().regex(PASSWORD_REGEX, {
      message:
        '비밀번호는 8자 이상이어야 하며, 알파벳과 숫자를 포함해야 합니다.',
    }),
    confirmPassword: z
      .string()
      .min(1, { message: '비밀번호를 재입력 해주세요.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });
