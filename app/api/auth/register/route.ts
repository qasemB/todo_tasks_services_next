import prisma from '../../../../lib/prisma';
import { hashPassword } from '@/lib/auth';
import { validateParamsErrors } from '@/utils/validation';
import { registerValidationSchema } from '../_schema';
import { ResponseClass } from '@/utils/response';
import { UserParamsType } from '../../admin/users/_types';

type RegisterUserDto = { phone: string, password: string }

export async function POST(request: Request) {
    const data: RegisterUserDto = await request.json();
    const validationErrors = validateParamsErrors(registerValidationSchema, data)
    if (validationErrors) return validationErrors;

    try {
        data.password = await hashPassword(data.password);
        const user = await prisma.user.create({ data });
        const sanitizedUser = user as UserParamsType
        delete sanitizedUser.password
        return new ResponseClass(sanitizedUser, true).created()
    } catch (error) {
        return new ResponseClass(null, false).serverError();
    }
}