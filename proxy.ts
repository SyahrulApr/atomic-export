import { NextRequest, NextResponse } from 'next/server'

const PROTECTED = ['/dashboard']
const LOGIN_PATH = '/login'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const session = req.cookies.get('ae_session')?.value

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p))

  if (isProtected && session !== '1') {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = LOGIN_PATH
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // redirect logged-in users away from /login
  if (pathname === LOGIN_PATH && session === '1') {
    const dashUrl = req.nextUrl.clone()
    dashUrl.pathname = '/dashboard'
    dashUrl.search = ''
    return NextResponse.redirect(dashUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
