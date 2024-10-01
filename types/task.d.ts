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

export type CreateTaskReqParamsType = { title: string, taskCategoryId: type }