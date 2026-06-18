import { NextResponse } from 'next/server';
import { signJwt } from '@/lib/jwt';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email.includes('@') || password.length < 4) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
  }

  return NextResponse.json({
    token: signJwt({ sub: email, role: 'demo-user' })
  });
}
