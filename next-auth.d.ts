import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Profile {
    login: string;
  }
  interface Session {
    user: {
      OAuth?: string;
      OAuthId?: string;
    } & DefaultSession['user'];
  }

  interface User {
    OAuth?: string;
    OAuthId?: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    OAuth?: string;
    OAuthId?: string;
  }
}
