import { CreateTaskParamsType } from "@/app/api/client/tasks/_types"

export type TasksListItemsType = {
    createdAt: string
    description: string
    endedAt: string
    id: string
    includeVacation: boolean
    isDone: boolean
    repetitionItems: number
    repetitionType: number
    startedAt: string
    taskCategoryId: string
    title: string
}

export type CreateTaskReqParamsType = Omit<CreateTaskParamsType, "startedAt" | "endedAt"> & {
    startedAt?: any;
    endedAt?: any;
}