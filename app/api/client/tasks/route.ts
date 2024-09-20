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

    const validationErrors = validateParamsErrors(createTaskValidationSchema, data)
    if (validationErrors) return validationErrors;

    try {
        const taskCategory = await prisma.task.create({ data });
        return new ResponseClass(taskCategory, true).created();
    } catch (error) {
        return new ResponseClass(null, false, 'Error creating data').custom(500);
    }
}