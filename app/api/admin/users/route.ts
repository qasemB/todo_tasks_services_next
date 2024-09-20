import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { CreateUserParamsType } from './_types';
import { getDecodedToken, hashPassword, verifyToken } from '@/lib/auth';
import { ResponseClass } from '@/utils/response';

export async function POST(request: Request) {
    const verified = verifyToken(request)
    if (!verified) return new NextResponse('Unauthorized', { status: 401 });        

    const decodedToken = getDecodedToken(request)
    if (decodedToken?.role !== "admin") return new ResponseClass().custom(403);

    const data: CreateUserParamsType = await request.json();
    data.password = await hashPassword(data.password)
    try {
        const user = await prisma.user.create({
            data,
        });
        return new ResponseClass(user, true).created;
    } catch (error) {
        return new ResponseClass(null, false, 'Error creating user').custom(500);
    }
}


export async function GET(request: Request) {
    const verified = verifyToken(request)
    if (!verified) return new NextResponse('Unauthorized', { status: 401 });

    const decodedToken = getDecodedToken(request)
    if (decodedToken?.role !== "admin") return new ResponseClass().custom(403);
    
    try {
        const users = await prisma.user.findMany();
        return new ResponseClass(users, true).success();
    } catch (error) {
        return new ResponseClass(null, false, 'Error fetching users').custom(500);
    }
}