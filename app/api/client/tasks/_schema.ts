import { ZodNum, ZodStr } from "@/utils/ZodValidation";
import { z } from "zod";

const mainValidation = {
    description: new ZodStr().alphabet().schema.optional(),
    isDone: z.boolean().optional(),
    repetitionType: new ZodNum().schema.optional(),
    repetitionItems: new ZodNum().schema.optional(),
    includeVacation: z.boolean().optional(),
    startedAt: new ZodStr().alphabet().schema.optional(),
    endedAt: new ZodStr().alphabet().schema.optional(),
}
export const createTaskValidationSchema = z.object({
    title: new ZodStr().alphabet().schema,
    taskCategoryId: new ZodStr().schema,
    ...mainValidation
});
export const updateTaskValidationSchema = z.object({
    title: new ZodStr().alphabet().schema.optional(),
    taskCategoryId: new ZodStr().schema.optional(),
    ...mainValidation
});