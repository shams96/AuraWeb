import { NextResponse, NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get('ref')
  if (ref && /^[a-f0-9]{8}$/.test(ref)) {
    const res = NextResponse.next()
    res.cookies.set('iv_ref', ref, {
      maxAge:   60 * 60 * 24 * 30, // 30 days
      path:     '/',
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    return res
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico).*)'],
}
