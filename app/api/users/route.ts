import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { CreateUserParamsType } from './_types';

export async function POST(request: Request) {
    const data: CreateUserParamsType = await request.json();
    try {
        const user = await prisma.user.create({
            data,
        });
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}


export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }
}