import prisma from '../../../../lib/prisma';
import { generateToken, verifyPassword } from '@/lib/auth';
import { ResponseClass } from '@/utils/response';
import { loginValidationSchema } from '../_schema';
import { validateParamsErrors } from '@/utils/validation';
import { LoginUserDto } from '../_types';


export async function POST(request: Request) {
  const data: LoginUserDto = await request.json();

  const validationErrors = validateParamsErrors(loginValidationSchema, data)
  if (validationErrors) return validationErrors;

  try {
    const { phone, password } = data
    const user = await prisma.user.findFirst({
      where: { phone },
    });
    if (!user || !(await verifyPassword(password, user.password))) {
      return new ResponseClass(null, false, 'Invalid credentials').unAuth();
    }
    const token = generateToken(user.id, user.role);
    return new ResponseClass(token, true).success();

  } catch (error) {
    return new ResponseClass(null, false, 'Error logging in').custom(500);
  }
}