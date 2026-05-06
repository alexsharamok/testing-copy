import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.headers.get('x-baseline-token') ||
    req.nextUrl.searchParams.get('token')

  if (token === process.env.BASELINE_ACCESS_TOKEN) {
    return NextResponse.next()
  }

  return new NextResponse('Unauthorized', { status: 401 })
}

export const config = {
  matcher: '/:path*',
}