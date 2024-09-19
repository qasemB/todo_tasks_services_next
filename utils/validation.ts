import { ZodObject } from "zod";
import { ResponseClass } from "./response";

export const validateParamsErrors = <T>(validationSchema: ZodObject<any>, data: T)=>{
    const result = validationSchema.safeParse(data);
    if (!result.success) {
      const resData = {
        errors: result.error.flatten().fieldErrors,
        success: false,
      }
      return new ResponseClass(resData, false).bad();
    }
    return null
}