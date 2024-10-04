'use client'

import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import httpService from "@/lib/httpService";
import { TasksListItemsType } from "@/types/task";
import { convertMiladi2Jalali } from "@/utils/dateUtils";
import { useEffect, useState } from "react";

const Dashboard = () => {

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

    return !todayTasks ? (
        <DashboardSkeleton />
    ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-start-2">
                <h2 className="">لیست تسک های امروز</h2>
                <h4 className="mb-4 text-gray-400">{today}</h4>
                {todayTasks.map(task => (
                    <div key={task.id} className={`rounded-md border border-gray-500 dark:border-gray-300 p-2 mb-2 text-center cursor-pointer ${task.isDone && "bg-green-400"}`}
                        onClick={() => handleChangeTaskIsDone(task)}
                    >
                        <span className="text-gray-400">{task.taskCategory.title} : </span>
                        {task.isDone ? (<del> {task.title}</del>) : (<span> {task.title}</span>)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;