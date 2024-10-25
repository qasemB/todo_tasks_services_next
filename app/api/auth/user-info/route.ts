import { getDecodedToken, verifyToken } from '@/lib/auth';
import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const verified = verifyToken(request)
    if (!verified) return new NextResponse('Unauthorized', { status: 401 });
  
    const decodedToken = getDecodedToken(request)    
    const id = decodedToken?.id
  
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (user) {
        return NextResponse.json(user, { status: 200 });
      } else {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    } catch (error) {
      return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
    }
  }