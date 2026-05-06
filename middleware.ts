// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const expectedToken = process.env.BASELINE_ACCESS_TOKEN

  if (!expectedToken) {
    return new NextResponse('Server misconfigured', { status: 500 })
  }

  const providedToken =
    req.headers.get('x-baseline-token') ??
    req.nextUrl.searchParams.get('token')

  if (providedToken === expectedToken) {
    return NextResponse.next()
  }

  return new NextResponse('Unauthorized', { status: 401 })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}