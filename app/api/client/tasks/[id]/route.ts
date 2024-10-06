import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { ResponseClass } from '@/utils/response';
import { CreateTaskParamsType } from '../_types';
import { validateParamsErrors } from '@/utils/validation';
import { createTaskValidationSchema, updateTaskValidationSchema } from '../_schema';

type ParamsType = { params: { id: string; } }

export async function GET(request: Request, { params }: ParamsType) {
  const verified = verifyToken(request)
  if (!verified) return new ResponseClass(null, false, 'Unauthorized').unAuth()

  const id = params.id;

  if (!id) return new ResponseClass(null, false, 'ID is required').bad()

  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (task) return new ResponseClass(task, true,).success();
    else return new ResponseClass(null, false, 'task not found').bad()
  } catch (error) {
    return new ResponseClass().serverError();
  }
}

export async function PUT(request: Request, { params }: ParamsType) {
  const verified = verifyToken(request)
  if (!verified) return new ResponseClass(null, false, 'Unauthorized').unAuth()

  const id = params.id
  if (!id) return new ResponseClass(null, false, 'ID is required').bad()

  const data: CreateTaskParamsType = await request.json();

  const validationErrors = validateParamsErrors(createTaskValidationSchema, data)
  if (validationErrors) return validationErrors;

  try {
    const task = await prisma.task.update({
      where: { id },
      data: data,
    });
    return new ResponseClass(task, true,).success();
  } catch (error) {
    return new ResponseClass().serverError();
  }
}

export async function PATCH(request: Request, { params }: ParamsType) {
  const verified = verifyToken(request)
  if (!verified) return new ResponseClass(null, false, 'Unauthorized').unAuth()

  const id = params.id
  if (!id) return new ResponseClass(null, false, 'ID is required').bad()

  const data: Partial<CreateTaskParamsType> = await request.json();

  const validationErrors = validateParamsErrors(updateTaskValidationSchema, data)
  if (validationErrors) return validationErrors;

  try {
    const task = await prisma.task.update({
      where: { id },
      data,
    });
    return new ResponseClass(task, true).success()
  } catch (error) {
    return new ResponseClass().serverError();
  }
}

export async function DELETE(request: Request, { params }: ParamsType) {
  const verified = verifyToken(request)
  if (!verified) return new ResponseClass(null, false, 'Unauthorized').unAuth()

  const id = params.id

  if (!id) return new ResponseClass(null, false, 'ID is required').bad()


  try {
    await prisma.task.deleteMany({
      where: {
        OR: [
          { id },
          { groupCode: id }
        ]
      }
    });
    return new ResponseClass(null, true).success()
  } catch (error) {
    return new ResponseClass().serverError();
  }
}