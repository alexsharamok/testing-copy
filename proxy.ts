// proxy.ts
import { NextResponse } from 'next/server'

export function proxy() {
  return new NextResponse('Blocked by proxy', { status: 401 })
}