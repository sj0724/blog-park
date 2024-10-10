/* eslint-disable no-param-reassign */
import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { verifyPassword } from './lib/utils';
import { LoginSchema } from './schema';
import { supabase } from './utils/supabase';

export const authConfig = {
  providers: [
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
    jwt({ token, user }) {
      if (user) {
        if (user.id) token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: { strategy: 'jwt' },
  ...authConfig,
  trustHost: true,
});
