export type CreateTaskParamsType = {
    title: string
    description?: string
    isDone?: boolean
    taskCategoryId: number
    repetitionType?: number
    repetitionItems?: number
    includeVacation?: boolean
    startedAt?: string
    endedAt?: string
}