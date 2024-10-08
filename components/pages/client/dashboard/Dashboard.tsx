'use client'

import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import httpService from "@/lib/httpService";
import { CreateTaskReqParamsType, TasksListItemsType } from "@/types/task";
import { convertMiladi2Jalali } from "@/utils/dateUtils";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosRepeat } from "react-icons/io";
import AddTaskModal from "../task-list/AddTaskModal";
import { useForm } from "react-hook-form";

const Dashboard = () => {

    const dialogRef = useRef<HTMLDialogElement>(null)
    const [todayTasks, setTodayTasks] = useState<TasksListItemsType[] | undefined>()

    const [today, setToday] = useState("")
    useEffect(() => {
    }, [])

    const getTodayTasksService = async () => {
        const res = await httpService("/client/tasks", "get")
        if (res.status === 200) {
            setTodayTasks(res.data.data)
        }
    }

    const handleChangeTaskIsDone = async (task: TasksListItemsType) => {
        const res = await httpService(`/client/tasks/${task.id}`, "patch", { isDone: !task.isDone })
        if (res.status === 200 || res.status === 201) getTodayTasksService()
    }

    useEffect(() => {
        getTodayTasksService()
        setToday(convertMiladi2Jalali(undefined, "dddd، jD jMMMM jYYYY"))
    }, [])

    const formReturn = useForm<CreateTaskReqParamsType>({
        defaultValues: {
            description: "",
            repetitionItems: 0,
            repetitionType: 0,
            title: "",
            endedAt: new Date(),
            startedAt: new Date(),
        }
    })
    const { setValue, reset } = formReturn


    useEffect(() => {
        const d = new Date()
        const dd = d.toISOString().split("T")[0]
        setValue("startedAt", dd)
        setValue("endedAt", dd)
    }, [setValue])

    const handleConfirmCreateTask = async (values: CreateTaskReqParamsType) => {
        const res = await httpService("/client/tasks", "post", values)
        if (res.status === 200 || res.status === 201) {
            getTodayTasksService()
            dialogRef.current?.close()
            reset()
        }
    }

    return !todayTasks ? (
        <DashboardSkeleton />
    ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-start-2">
                <h2 className="">لیست تسک های امروز</h2>
                <h4 className="mb-4 text-gray-400">{today}</h4>
                {todayTasks.map(task => (
                    <div key={task.id} className={`relative rounded-md border border-gray-500 dark:border-gray-300 p-2 mb-2 text-center cursor-pointer ${task.isDone && "bg-green-400"}`}
                        onClick={() => handleChangeTaskIsDone(task)}
                    >
                        <span className="text-gray-400">{task.taskCategory.title} : </span>
                        {task.isDone ? (<del> {task.title}</del>) : (<span> {task.title}</span>)}
                        {task.repetitionItems ? (
                            <IoIosRepeat className='text-gray-500 dark:text-gray-300 absolute top-0 left-1' />
                        ) : null}
                    </div>
                ))}

            </div>
            <div className="absolute bottom-2 h-14 flex items-center w-full lg:w-1/3 px-2 m-auto left-0 right-0">
                <button className="w-full border bg-transparent text-gray-600 border-gray-500 dark:border-gray-300  dark:text-white rounded-full py-2 flex justify-center items-center"
                    onClick={() => dialogRef.current?.showModal()}
                >
                    افزودن تسک جدید
                    <FaPlus className="mr-2" />
                </button>
            </div>

            <AddTaskModal
                formReturn={formReturn}
                dialogRef={dialogRef}
                handleConfirmCreateTask={handleConfirmCreateTask}
            />
        </div>
    );
};

export default Dashboard;