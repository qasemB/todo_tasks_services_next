import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { CreateUserParamsType } from './_types';
import { hashPassword, verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
    const verified = verifyToken(request)
    if (!verified) return new NextResponse('Unauthorized', { status: 401 });        

    const data: CreateUserParamsType = await request.json();
    data.password = await hashPassword(data.password)
    try {
        const user = await prisma.user.create({
            data,
        });
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}


export async function GET(request: Request) {
    const verified = verifyToken(request)
    if (!verified) return new NextResponse('Unauthorized', { status: 401 });
    
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}