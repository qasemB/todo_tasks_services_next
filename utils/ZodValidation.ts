import { regexes_patterns } from "@/constants/regexes";
import { z } from "zod"

export class ZodStr {
    public schema;
    constructor() {
        this.schema = z.string();
    }

    required() {
        this.schema = this.schema.min(1, "ورود این فیلد اجباری است");
        return this;
    }

    min(miChar: number) {
        this.schema = this.schema.min(miChar, `تعداد کاراکتر ها نباید کمتر از ${miChar} باشد`);
        return this;
    }

    length(length: number) {
        this.schema = this.schema.length(length, `تعداد کاراکتر ها  ${length} عدد باشد`);
        return this;
    }

    email() {
        this.schema = this.schema.regex(/^(\s*|\S+@\S+\.\S+)$/,"فرمت ایمیل را رعایت کنید");
        return this;
    }

    lathinAlphabet() {
        this.schema = this.schema.regex(regexes_patterns.ENGLISH_ALPHABET_NUM_CHARACTER, {
            message: "اطلاعات را کامل و با فرمت معتبر وارد کنید"
        });
        return this;
    }

    alphabet() {
        this.schema = this.schema.regex(regexes_patterns.ALL_ALPHABET, {
            message: "اطلاعات را کامل و با فرمت معتبر وارد کنید"
        });
        return this;
    }

}

export class ZodNum{
    public schema;
    constructor() {
        this.schema = z.number();
    }
    min(miChar: number) {
        this.schema = this.schema.min(miChar, `تعداد کاراکتر ها نباید کمتر از ${miChar} باشد`);
        return this;
    }

    required() {
        this.schema = this.schema.min(1, "ورود این فیلد اجباری است");
        return this;
    }

}