import { getDecodedToken, verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { ResponseClass } from "@/utils/response";

export async function GET(request: Request) {
    const verified = verifyToken(request)
    if (!verified) return new NextResponse('Unauthorized', { status: 401 });

    const decodecToken = getDecodedToken(request)
    if (!decodecToken?.id) return new ResponseClass(null, false).unAuth()

    const { searchParams } = new URL(request.url);
    const startParam = searchParams.get('startFrom')
    const endParam = searchParams.get('endAt')
    const startFrom = new Date(startParam || 0);
    const endAt = new Date(endParam || 0);

    try {
        const tasks = await prisma.task.findMany({
            where: {
                startedAt: { gte: startFrom.toISOString() },
                endedAt: { lte: endAt.toISOString() },
                taskCategory: { userId: decodecToken.id }
            },
            include: { taskCategory: true }
        });
        return new ResponseClass(tasks, true).success();
    } catch (error) {
        return new ResponseClass(null, false, 'Error fetching data').custom(500);
    }
}