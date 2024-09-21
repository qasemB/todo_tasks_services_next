export type CreateUserParamsType = {
    phone: string
    password: string
    email?: string
    firstName?: string
    lastName?: string
    role: "admin" | "user"
    gender: 0 | 1
}

export type UserParamsType = Omit<CreateUserParamsType, "password"> & {
    id: string,
    createdAt: any
    password?: string
}