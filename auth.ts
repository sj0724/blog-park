/* eslint-disable no-param-reassign */
import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { hashPassword, verifyPassword } from './lib/utils';
import { LoginSchema } from './schema';
import { supabase } from './utils/supabase';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';

export const authConfig = {
  providers: [
    Google,
    GitHub,
    Kakao,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const validate = await LoginSchema.parseAsync(credentials);
          const { email, password } = validate;

          const { data: user } = await supabase
            .from('users') // 테이블 이름
            .select('*') // 모든 컬럼 선택
            .eq('email', email)
            .single(); // 단일 결과만 반환

          if (!user) return null;

          const passwordsMatch = verifyPassword(password, user.password);

          if (!passwordsMatch) return null;

          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === 'github' || 'google' || 'kakao') {
        try {
          const supabaseUser = await supabase // supabase에서 email같은 유저 찾기
            .from('users')
            .select('*')
            .eq('email', user.email!)
            .single();
          if (!supabaseUser.data) {
            const hashRandomPassword = hashPassword(
              String(Math.floor(10000000 + Math.random() * 90000000)) // password 8자리 랜덤 생성
            );
            const { data: newUser } = await supabase
              .from('users')
              .insert([
                // OAuth로 로그인한 계정 supabase 데이터 생성
                {
                  name: user.name,
                  image: user.image,
                  email: user.email,
                  introduction: '',
                  password: hashRandomPassword,
                  oauth_account: true,
                },
              ])
              .select('*')
              .single();

            user.id = newUser!.id; // 생성한 유저 id값 세션 id로 지정
            user.OAuth = account?.provider;
            return true;
          }
          if (supabaseUser.data && !supabaseUser.data.oauth_account) {
            user.id = supabaseUser.data.id; // OAuth로 로그인한 유저 id값 db id로 변경
            user.OAuth = account?.provider;
            return true;
          }
          user.id = supabaseUser.data.id; // OAuth로 로그인한 유저 id값 db id로 변경
          user.OAuth = account?.provider;
          return true;
        } catch {
          console.log('로그인 도중 에러가 발생했습니다. ');
          return false;
        }
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.OAuth = user.OAuth;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.OAuth = token.OAuth;
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  ...authConfig,
  trustHost: true,
});
