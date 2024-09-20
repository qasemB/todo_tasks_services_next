import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { CreateTaskCategoryParamsType } from '../_types';
import { ResponseClass } from '@/utils/response';

type ParamsType = { params: { id: string; } }

export async function GET(request: Request, { params }: ParamsType) {
  const verified = verifyToken(request)
  if (!verified) return new ResponseClass(null, false, 'Unauthorized').unAuth()

  const id = params.id;

  if (!id) return new ResponseClass(null, false, 'ID is required').bad()  

  try {
    const taskCategory = await prisma.taskCategory.findUnique({
      where: { id: Number(id) },
    });
    if (taskCategory) {
       return new ResponseClass(taskCategory, true,).success();
    } else {
      return new ResponseClass(null, false, 'Category not found').bad()
    }
  } catch (error) {
    return new ResponseClass().serverError();
  }
}

export async function PUT(request: Request, { params }: ParamsType) {
  const verified = verifyToken(request)
  if (!verified) return new ResponseClass(null, false, 'Unauthorized').unAuth()

  const id = params.id
  const data: CreateTaskCategoryParamsType = await request.json();

  if (!id) return new ResponseClass(null, false, 'ID is required').bad()


  try {
    const taskCategory = await prisma.taskCategory.update({
      where: { id: Number(id) },
      data: data,
    });
    return new ResponseClass(taskCategory, true,).success();
  } catch (error) {
    return new ResponseClass().serverError();
  }
}

export async function PATCH(request: Request, { params }: ParamsType) {
  const verified = verifyToken(request)
  if (!verified) return new ResponseClass(null, false, 'Unauthorized').unAuth()

  const id = params.id
  const data : Partial<CreateTaskCategoryParamsType> = await request.json();

  if (!id) {
    return new ResponseClass(null, false, 'ID is required').bad()
  }

  try {
    const category = await prisma.taskCategory.update({
      where: { id: Number(id) },
      data,
    });
    return new ResponseClass(category, true).success()
  } catch (error) {
    if (typeof error === "object" && error && "code" in error && error?.code === "P2025") {
      return new ResponseClass().serverError();
    }
    return new ResponseClass().serverError();
  }
}

export async function DELETE(request: Request, { params }: ParamsType) {
  const verified = verifyToken(request)
  if (!verified) return new ResponseClass(null, false, 'Unauthorized').unAuth()

  const id = params.id

  if (!id) {
    return new ResponseClass(null, false, 'ID is required').bad()
  }

  try {
    await prisma.taskCategory.delete({
      where: { id: Number(id) },
    });
    return new ResponseClass(null, true).success()
  } catch (error) {
    return new ResponseClass().serverError();
  }
}