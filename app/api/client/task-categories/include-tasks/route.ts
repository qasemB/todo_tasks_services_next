import { getDecodedToken, verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { ResponseClass } from "@/utils/response";
import { getDatesInRange } from "@/utils/dateUtils";

export async function GET(request: Request) {
    const verified = verifyToken(request)
    if (!verified) return new NextResponse('Unauthorized', { status: 401 });

    const decodecToken = getDecodedToken(request)
    if (!decodecToken?.id) return new ResponseClass(null, false).unAuth()

    const { searchParams } = new URL(request.url);
    const startFrom = parseInt(searchParams.get('startFrom') || '0', 10);
    const endAt = parseInt(searchParams.get('endAt') || '0', 10);

    if (isNaN(startFrom) || isNaN(endAt)) return new ResponseClass(null, false, 'Invalid query params').custom(400);
    const datesArr = getDatesInRange(startFrom, endAt)

    try {
        const taskCategories = await prisma.taskCategory.findMany({
            where: { userId: decodecToken.id },
            include: {
                Task: {
                    // where: {
                    //     startedAt: { gte: new Date(datesArr[0]) },
                    //     endedAt: { lte: new Date(datesArr[datesArr.length - 1]) },
                    // }
                    where: {
                        OR: [
                            {
                                repetitionItems: 0,
                                startedAt: { gte: new Date(datesArr[0]) },
                                endedAt: { lte: new Date(datesArr[datesArr.length - 1]) },
                            },
                            {
                                repetitionItems: { gt: 0 },
                                endedAt: { gte: new Date(datesArr[0]) },
                            }
                        ]
                    }
                }
            }
        });
        return new ResponseClass(taskCategories, true).success();
    } catch (error) {
        return new ResponseClass(null, false, 'Error fetching data').custom(500);
    }
}