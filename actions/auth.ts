'use server'
import { UserParamsType } from "@/app/api/admin/users/_types";
import { loginValidationSchema, registerValidationSchema } from "@/app/api/auth/_schema";
import { GLOBAL_CONST } from "@/constants/global";
import { generateToken, hashPassword, verifyPassword } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormState = {
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
    }
    message?: string,
    success: boolean
} | undefined
export async function signup(state: FormState, formData: FormData) {

    // 1- validating -------------
    const phone = formData.get("phone")
    const password = formData.get("password")
    const validationFields = registerValidationSchema.safeParse({ phone, password })
    if (!validationFields.success) return { errors: validationFields.error.flatten().fieldErrors, success: false }

    if (!password || !phone) return { success: false }

    try {
        const hashedPassword = await hashPassword(password.toString());
        const user = await prisma.user.create({
            data: {
                phone: phone.toString(),
                password: hashedPassword,
            }
        });
        const sanitizedUser = user as UserParamsType
        delete sanitizedUser.password
        return { message: "ثبتنام با موفقیت انجام شد", success: true }
    } catch (error) {
        return { success: false, message: "عملیات ذخیره سازی با خطا مواجه شد" }
    }
}
export async function login(state: FormState, formData: FormData) {

    // 1- validating -------------
    const phone = formData.get("phone")
    const password = formData.get("password")
    const validationFields = loginValidationSchema.safeParse({ phone, password })
    if (!validationFields.success) return { errors: validationFields.error.flatten().fieldErrors, success: false }

    if (!password || !phone) return { success: false }

    try {
        const user = await prisma.user.findFirst({
          where: { phone: phone.toString() },
        });
        if (!user || !(await verifyPassword(password.toString(), user.password))) {
           return { message: "کاربر یافت نشد", success: false }
        }
        const token = generateToken(user.id, user.role);
        cookies().set(GLOBAL_CONST.login_token_name, token)

        return { message: "ورود با موفقیت انجام شد", success: true }
        
    } catch (error) {
        return { success: false, message: "عملیات ورود با خطا مواجه شد" }
    }
}

export const logout = async ()=>{
    cookies().delete(GLOBAL_CONST.login_token_name)
    redirect("/auth/login")
}