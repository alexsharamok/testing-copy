import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'baseline_access'

export function proxy(req: NextRequest) {
  const expectedToken = process.env.BASELINE_ACCESS_TOKEN

  const tokenFromHeader = req.headers.get('x-baseline-token')
  const tokenFromQuery = req.nextUrl.searchParams.get('token')
  const tokenFromCookie = req.cookies.get(COOKIE_NAME)?.value

  const providedToken = tokenFromHeader ?? tokenFromQuery ?? tokenFromCookie

  if (expectedToken && providedToken === expectedToken) {
    const res = NextResponse.next()

    // If token was provided via header/query, persist it for the browser session
    if (tokenFromHeader || tokenFromQuery) {
      res.cookies.set(COOKIE_NAME, expectedToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60, // 1 hour
      })
    }

    return res
  }

  return new NextResponse('Unauthorized', { status: 401 })
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|-/media|assets).*)',
  ],
}