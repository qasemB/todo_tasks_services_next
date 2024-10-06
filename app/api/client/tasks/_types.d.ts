export type CreateTaskParamsType = {
    title: string
    description?: string
    groupCode?: string
    isDone?: boolean
    taskCategoryId: string
    repetitionType?: number
    repetitionItems?: number
    includeVacation?: boolean
    startedAt?: string
    endedAt?: string
}