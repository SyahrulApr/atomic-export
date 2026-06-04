import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  const validUser = process.env.DEMO_USERNAME
  const validPass = process.env.DEMO_PASSWORD

  if (!validUser || !validPass) {
    return NextResponse.json({ error: 'Server misconfigured.' }, { status: 500 })
  }

  if (username !== validUser || password !== validPass) {
    return NextResponse.json({ error: 'Username atau password salah.' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('ae_session', '1', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  })
  return res
}
