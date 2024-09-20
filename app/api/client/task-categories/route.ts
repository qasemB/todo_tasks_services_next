import { getDecodedToken, verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import { CreateTaskCategoryParamsType } from "./_types";
import prisma from '@/lib/prisma';
import { ResponseClass } from "@/utils/response";
import { validateParamsErrors } from "@/utils/validation";
import { createTaskCategoryValidationSchema } from "./_schema";

export async function POST(request: Request) {
    const verified = verifyToken(request)
    if (!verified) return new NextResponse('Unauthorized', { status: 401 });

    const decodecToken = getDecodedToken(request)
    if (!decodecToken?.id) return new ResponseClass(null, false).unAuth()

    const data: CreateTaskCategoryParamsType = await request.json();

    const validationErrors = validateParamsErrors(createTaskCategoryValidationSchema, data)
    if (validationErrors) return validationErrors;

    try {
        const taskCategory = await prisma.taskCategory.create({
            data: {
                title: data.title,
                icon: data.icon,
                description: data.description,
                userId: decodecToken?.id,
            },
        });
        return new ResponseClass(taskCategory, true).created();
    } catch (error) {
        return new ResponseClass(null, false, 'Error creating data').custom(500);
    }
}


export async function GET(request: Request) {
    const verified = verifyToken(request)
    if (!verified) return new NextResponse('Unauthorized', { status: 401 });

    const decodecToken = getDecodedToken(request)
    if (!decodecToken?.id) return new ResponseClass(null, false).unAuth()

    try {
        const taskCategories = await prisma.taskCategory.findMany({
            where: { userId: decodecToken.id }
        });
        return new ResponseClass(taskCategories, true).success();
    } catch (error) {
        return new ResponseClass(null, false, 'Error fetching data').custom(500);
    }
}