import NextAuth, { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      Oauth: boolean; // user 객체에 Oauth 추가
    } & DefaultSession['user']; // 기존 user 속성 유지
  }

  interface User {
    Oauth: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    Oauth: boolean;
  }
}
