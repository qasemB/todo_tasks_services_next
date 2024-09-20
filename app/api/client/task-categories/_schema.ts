import { ZodStr } from "@/utils/ZodValidation";
import { z } from "zod";

const mainValidation = {
    description: new ZodStr().alphabet().schema.optional(),
    icon: new ZodStr().alphabet().schema.optional()
}

export const createTaskCategoryValidationSchema = z.object({
    title: new ZodStr().alphabet().schema,
    ...mainValidation
});
export const updateTaskCategoryValidationSchema = z.object({
    title: new ZodStr().alphabet().schema.optional(),
    ...mainValidation
});