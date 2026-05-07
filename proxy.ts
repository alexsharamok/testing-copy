// proxy.ts
import { NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  console.log("Proxy called");
  // if (req.nextUrl.pathname.startsWith('/-/media')) {
  //   return NextResponse.next()
  // }
  const token = req.nextUrl.searchParams.get('token')

  if (token === process.env.BASELINE_ACCESS_TOKEN) {
    return NextResponse.next()
  }

  return new NextResponse('Unauthorized', { status: 401 })
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|-/media|assets).*)',
  ],
}