import { NextResponse } from "next/server"

export class ResponseClass {
    public body: { data: unknown, message?: string, success: boolean }

    constructor(data?: unknown, success?: boolean, message?: string) {
        this.body = {
            data: data || null,
            message: message || "",
            success: success || false
        }
    }

    success() {
        return NextResponse.json(this.body, { status: 200 });
    }

    created() {
        return NextResponse.json(this.body, { status: 201 });
    }

    bad() {
        return NextResponse.json(this.body, { status: 400 });
    }

    unAuth() {
        return NextResponse.json(this.body, { status: 401 });
    }

    serverError() {
        return NextResponse.json(this.body, { status: 500 });
    }

    custom(status: number) {
        return NextResponse.json(this.body, { status: status });
    }

}