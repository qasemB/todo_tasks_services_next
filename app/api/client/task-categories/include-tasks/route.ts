import { getDecodedToken, verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { ResponseClass } from "@/utils/response";

export async function GET(request: Request) {
    const verified = verifyToken(request)
    if (!verified) return new NextResponse('Unauthorized', { status: 401 });

    const decodecToken = getDecodedToken(request)
    if (!decodecToken?.id) return new ResponseClass(null, false).unAuth()

    try {
        const taskCategories = await prisma.taskCategory.findMany({
            where: { userId: decodecToken.id },
            include: { Task: true }
        });
        return new ResponseClass(taskCategories, true).success();
    } catch (error) {
        return new ResponseClass(null, false, 'Error fetching data').custom(500);
    }
}