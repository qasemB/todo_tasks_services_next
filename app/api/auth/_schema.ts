import { ZodStr } from "@/utils/ZodValidation";
import { z } from "zod";

export const loginValidationSchema = z.object({
    phone: new ZodStr().min(11).schema,
    password: new ZodStr().required().schema
});
export const registerValidationSchema = loginValidationSchema