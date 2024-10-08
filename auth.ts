/* eslint-disable no-param-reassign */
import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { verifyPassword } from './lib/utils';
import { LoginSchema } from './schema';
import db from './lib/db';
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
          const validate = LoginSchema.safeParse(credentials);
          if (validate.success) {
            const { email, password } = validate.data;

            const { data: user } = await supabase
              .from('users') // 테이블 이름
              .select('*') // 모든 컬럼 선택
              .eq('email', email)
              .single(); // 단일 결과만 반환

            if (!user) return null;

            const passwordsMatch = verifyPassword(password, user.password);

            if (passwordsMatch) return user;
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        if (user.id) token.id = user.id;
      }
      if (trigger === 'update') {
        token.name = session.user.name;
        token.id = session.user.id;
        token.email = session.user.email;
        token.picture = session.user.image;
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
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
  trustHost: true,
});
