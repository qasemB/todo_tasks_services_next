import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { ResponseClass } from "@/utils/response";
type ParamsType = { params: { task_category_id: string; } }

export async function GET(request: Request, { params }: ParamsType) {
    const verified = verifyToken(request)
    if (!verified) return new NextResponse('Unauthorized', { status: 401 });

    const { task_category_id } = params

    try {
        const tasks = await prisma.task.findMany({
            where: { taskCategoryId: Number(task_category_id) }
        });
        return new ResponseClass(tasks, true).success();
    } catch (error) {
        return new ResponseClass(null, false, 'Error fetching data').custom(500);
    }
}