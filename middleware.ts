/* eslint-disable consistent-return */
import { NextResponse } from 'next/server';
import { auth } from './auth';

const authRoutes = ['/sign-in', '/sign-up'];
const protectedRoutes = ['/my/list'];

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(`/api/auth`);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPersnalRoute = nextUrl.pathname.startsWith(`/my`);

  if (isApiAuthRoute) {
    return;
  }

  if (isPersnalRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/sign-in', nextUrl));
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
    return;
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
