export type CreateUserParamsType = {
    phone:     string
    password:  string
    email?:     string
    firstName?: string
    lastName?:  string
    role:      "admin" | "user" 
    gender:    0 | 1 
}