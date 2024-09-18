import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { generateToken, verifyPassword } from '@/lib/auth';
export async function POST(request: Request) {
  const { phone, password } = await request.json();

  try {
    const user = await prisma.user.findFirst({
      where: { phone },
    });

    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken(user.id);
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
  }
}