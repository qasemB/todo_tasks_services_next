import { getDecodedToken, verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { ResponseClass } from "@/utils/response";
import { CreateTaskParamsType } from "./_types";
import { validateParamsErrors } from "@/utils/validation";
import { createTaskValidationSchema } from "./_schema";

export async function POST(request: Request) {
    const verified = verifyToken(request)
    if (!verified) return new NextResponse('Unauthorized', { status: 401 });

    const decodecToken = getDecodedToken(request)
    if (!decodecToken?.id) return new ResponseClass(null, false).unAuth()

    const data: CreateTaskParamsType = await request.json();

    let datas: CreateTaskParamsType[] = [data]

    if (data.repetitionItems) datas = getTaskInDates(data)

    const validationErrors = validateParamsErrors(createTaskValidationSchema, data)
    if (validationErrors) return validationErrors;

    try {
        const taskCategory = await prisma.task.createMany({ data: datas },);
        return new ResponseClass(taskCategory, true).created();
    } catch (error) {
        return new ResponseClass(null, false, 'Error creating data').custom(500);
    }
}

export async function GET(request: Request) {
    const verified = verifyToken(request)
    if (!verified) return new NextResponse('Unauthorized', { status: 401 });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const decodecToken = getDecodedToken(request)
    if (!decodecToken?.id) return new ResponseClass(null, false).unAuth()

    try {
        const tasks = await prisma.task.findMany({
            where: {
                startedAt: {
                    gte: startOfDay,
                    lte: endOfDay
                },
                taskCategory: {
                    userId: decodecToken.id
                }
            },
            include: { taskCategory: true }
        });
        return new ResponseClass(tasks, true).success();
    } catch (error) {
        return new ResponseClass(null, false, 'Error fetching data').custom(500);
    }
}


const getTaskInDates = (task: CreateTaskParamsType): CreateTaskParamsType[] => {
    const newTasks: CreateTaskParamsType[] = []
    if (task.repetitionItems) {
        const groupCode = new Date().getTime().toString()
        newTasks.push({ ...task, groupCode })
        let additionDate = 0
        for (let index = 1; index <= task.repetitionItems; index++) {
            additionDate = additionDate + (task.repetitionType! + 1)
            const startedAt = addDaysToDate(task.startedAt!, additionDate)
            const endedAt = addDaysToDate(task.startedAt!, additionDate)
            newTasks.push({
                ...task,
                groupCode,
                startedAt,
                endedAt, 
            })
        }
    } else {
        newTasks.push(task)
    }
    return newTasks
}

function addDaysToDate(dateString: string, days: number): string {
    const date = new Date(dateString); // تبدیل رشته ورودی به تاریخ
    date.setUTCDate(date.getUTCDate() + days); // اضافه کردن روز به تاریخ به صورت UTC
    return date.toISOString(); // برگرداندن تاریخ به فرمت ISO
}
