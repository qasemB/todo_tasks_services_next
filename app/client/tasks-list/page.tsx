'use client'
import AddTaskCatModal from "@/components/pages/client/task-list/AddTaskCatModal";
import AddTaskModal from "@/components/pages/client/task-list/AddTaskModal";
import ListTable from "@/components/pages/client/task-list/ListTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { GLOBAL_CONST } from "@/constants/global";
import httpService from "@/lib/httpService";
import { CreateTaskReqParamsType, TasksListItemsType } from "@/types/task";
import { TaskCategoryListItemsType } from "@/types/taskCategory";
import { confirmAlert } from "@/utils/alerts";
// import { successToast } from "@/utils/alerts";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TbCategoryPlus } from "react-icons/tb";
// import { unstable_cache } from "next/cache";

export const dynamic = 'force-dynamic'

// const getTaskCats = unstable_cache(async (id) => {
//     return 
// })

const TaskListPage = () => {
    const [taskCats, setTaskCats] = useState<TaskCategoryListItemsType[]>([])
    const [selectedTaskCat, setSelectedTaskCat] = useState<TaskCategoryListItemsType>()
    const [loading, setLoading] = useState<boolean>(false)
    const [fetching, setFetching] = useState<boolean>(false)
    // const [createTaskParams, setCreateTaskParams] = useState<CreateTaskReqParamsType>({ title: "", taskCategoryId: "" })
    const [createTasCatTitle, setCreateTaskCatTitle] = useState("")
    const dialogRef = useRef<HTMLDialogElement>(null)
    const createTaskCatDialogRef = useRef<HTMLDialogElement>(null)

    const formReturn = useForm<CreateTaskReqParamsType>({
        defaultValues:{
            description:"",
            repetitionItems:0,
            repetitionType:0
        }
    })
    const { setValue } = formReturn

    const handleLoading = (status: boolean) => {
        if (!taskCats.length) setLoading(status)
        setFetching(status)
    }

    const handleGetTaskCats = async () => {
        const range = GLOBAL_CONST.task_list_date_range
        handleLoading(true)
        const res = await httpService(`/client/task-categories/include-tasks?startFrom=${range.start}&endAt=${range.end}`, "get")
        handleLoading(false)
        setTaskCats(res.data.data)
    }

    const handleDeleteTaskCategory = async (taskCatId: string) => {
        const confirm = await confirmAlert("", "آیا از حذف اطمینان دارید؟")
        if (!confirm.isConfirmed) return false
        const res = await httpService(`/client/task-categories/${taskCatId}`, "delete")
        if (res.status === 200) handleGetTaskCats()
    }

    const handleAddTask = (date: string, taskCat: TaskCategoryListItemsType) => {
        const d = new Date(date)
        const dd = d.toISOString().split("T")[0]
        setValue("startedAt", dd)
        setValue("endedAt", dd)
        setValue("taskCategoryId", taskCat.id)
        setSelectedTaskCat(taskCat)
        // setCreateTaskParams(old => ({ ...old, startedAt: d, endedAt: d, taskCategoryId: taskCatId }))
        dialogRef.current?.showModal()
    }

    const handleConfirmCreateTask = async (values: CreateTaskReqParamsType) => {        
        const res = await httpService("/client/tasks", "post", values)
        if (res.status === 200 || res.status === 201) {
            handleGetTaskCats()
            dialogRef.current?.close()
        }
    }

    const showTaskCatDialogModal = () => {
        createTaskCatDialogRef.current?.showModal()
    }

    const handleConfirmCreateTaskCat = async () => {
        const res = await httpService("/client/task-categories", "post", { title: createTasCatTitle })
        if (res.status === 200 || res.status === 201) {
            handleGetTaskCats()
            createTaskCatDialogRef.current?.close()
            setCreateTaskCatTitle("")
        }
    }

    const handleChangeTaskIsDone = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, task: TasksListItemsType) => {
        e.stopPropagation()
        const res = await httpService(`/client/tasks/${task.id}`, "patch", { isDone: !task.isDone })
        if (res.status === 200 || res.status === 201) handleGetTaskCats()
    }

    const handleDeleteTask = async (e: React.MouseEvent<SVGElement, MouseEvent>, taskId: string) => {
        e.stopPropagation()
        const confirm = await confirmAlert("", "آیا اطمینان دارید؟")
        if (!confirm.isConfirmed) return false
        const res = await httpService(`/client/tasks/${taskId}`, "delete")
        if (res.status === 200) handleGetTaskCats()
    }

    useEffect(() => {
        handleGetTaskCats()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // const decodedToken = getDecodedToken()
    // const taskCatss = await prisma.taskCategory.findMany({
    //     where: { userId: decodedToken?.id },
    //     include: { Task: true }
    // })


    return (
        <div>
            {/* <section className="flex flex-row gap-4">
                {tasks.map(task => (
                    <div key={task.id}>{task?.title}</div>
                ))}
            </section> */}
            <div className="flex justify-start mb-5">
                <span className="flex text-blue-600 dark:text-blue-300 cursor-pointer" onClick={showTaskCatDialogModal}>
                    <span>افزودن دسته بندی</span>
                    <TbCategoryPlus className="mr-2 size-5" />
                </span>
            </div>
            {
                loading ? (<TableSkeleton />) : taskCats.length ? (
                    <div className={`${fetching && "animate-pulse"}`}>
                        <ListTable
                            handleAddTask={handleAddTask}
                            handleDeleteTaskCategory={handleDeleteTaskCategory}
                            taskCats={taskCats}
                            handleChangeTaskIsDone={handleChangeTaskIsDone}
                            handleDeleteTask={handleDeleteTask}
                            />

                        {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
                        <AddTaskModal
                            formReturn={formReturn}
                            dialogRef={dialogRef}
                            handleConfirmCreateTask={handleConfirmCreateTask}
                            selectedTaskCat={selectedTaskCat}
                        />

                    </div>
                ) : (<p className="text-center py-10">داده ای وجود ندارد</p>)
            }
            <AddTaskCatModal
                createTasCatTitle={createTasCatTitle}
                createTaskCatDialogRef={createTaskCatDialogRef}
                handleConfirmCreateTaskCat={handleConfirmCreateTaskCat}
                setCreateTaskCatTitle={setCreateTaskCatTitle}
            />
        </div>
    );
};

export default TaskListPage;