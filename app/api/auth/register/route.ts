import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { hashPassword } from '@/lib/auth';
export async function POST(request: Request) {
    const { phone, password, email, firstName, lastName } = await request.json();

    try {
        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: { phone, password: hashedPassword, email, firstName, lastName },
        });

        return NextResponse.json({ data: user, message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
    }
}