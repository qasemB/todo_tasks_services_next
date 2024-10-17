import httpService from '@/lib/httpService';
import { TasksListItemsType } from '@/types/task';
import { TaskCategoryListItemsType } from '@/types/taskCategory';
import { convertMiladi2Jalali, getDatesInRange } from '@/utils/dateUtils';
import React, { useEffect, useState } from 'react';
import { IoIosRepeat } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';
import { MdOutlineMoveDown } from 'react-icons/md';

type ListTableType = {
    taskCats: TaskCategoryListItemsType[]
    handleDeleteTaskCategory: (taskCatId: string) => Promise<false | undefined>
    handleAddTask: (date: string, taskCat: TaskCategoryListItemsType) => void
    handleChangeTaskIsDone: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, task: TasksListItemsType) => Promise<void>
    handleDeleteTask: (e: React.MouseEvent<SVGElement, MouseEvent>, task: TasksListItemsType) => Promise<false | undefined>
    dateRange: { start: number; end: number; },
    handleGetTaskCats: () => Promise<void>
}

const daysOfWeek = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
const getDayOfWeek = (date: string) => {
    const currentDate = new Date(date)
    const dayOfWeek = currentDate.getDay()
    return daysOfWeek[dayOfWeek]
}

const ListTable = ({ taskCats, handleDeleteTaskCategory, handleAddTask, handleChangeTaskIsDone, handleDeleteTask, dateRange, handleGetTaskCats }: ListTableType) => {
    const [dates, setDates] = useState<string[]>([])
    const [selectedTaskoMove, setSelectedTaskoMove] = useState<TasksListItemsType>()

    const handleDatesInRange = () => {
        const datesArr = getDatesInRange(dateRange.start, dateRange.end)
        setDates(datesArr)
    }

    const handleMoveTask = async (date: string, taskCat: TaskCategoryListItemsType) => {
        const d = new Date(date)
        const data = { taskCategoryId: taskCat.id, startedAt: d }        
        const res = await httpService(`/client/tasks/${selectedTaskoMove?.id}`, "patch", data)
        if (res.status === 200) handleGetTaskCats()
    }

    useEffect(() => {
        handleDatesInRange()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskCats])

    useEffect(() => {
        setTimeout(() => {
            setSelectedTaskoMove(undefined)
        }, 5000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTaskoMove])
    return (
        <table className="table [&>*]:text-center">
            <thead>
                <tr className="my-5 text-gray-500 dark:text-gray-200">
                    <th>تاریخ</th>
                    <th>روز</th>
                    {taskCats.map(taskCat => (
                        <th key={taskCat.id} className="relative group min-w-44">
                            {taskCat?.title}
                            <IoCloseCircle className="text-red-400 absolute -top-2 m-auto cursor-pointer size-5 opacity-0 group-hover:opacity-100 transition-all"
                                onClick={() => handleDeleteTaskCategory(taskCat.id)}
                            />
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    dates.map(date => (
                        <tr key={date} className={`my-5 border-none hover:bg-gray-300 dark:hover:bg-gray-600 ${convertMiladi2Jalali(new Date().toString()) === convertMiladi2Jalali(date) && "bg-blue-300 dark:bg-indigo-600"}`}>
                            <th>{convertMiladi2Jalali(date, "jMM/jDD")}</th>
                            <th>{getDayOfWeek(date)}</th>
                            {taskCats.map(taskCat => (
                                <td
                                    key={"_intasks_" + taskCat.id}
                                    className="cursor-pointer hover:ring-2"
                                    onClick={() => !selectedTaskoMove ? handleAddTask(date, taskCat) : handleMoveTask(date, taskCat)}
                                >
                                    {taskCat.Task.filter(task => convertMiladi2Jalali(task.startedAt?.toString()) === convertMiladi2Jalali(date))?.map((t: TasksListItemsType) => (
                                        <div
                                            key={t.id}
                                            className={`relative w-full group tooltip  rounded-lg border dark:border-gray-300 border-gray-600 py-1 px-2 mb-1 ${t.isDone && "bg-green-400 text-indigo-600"} ${selectedTaskoMove?.id === t.id && "!border-red-400"}`}
                                            onClick={e => !selectedTaskoMove && handleChangeTaskIsDone(e, t)}
                                            data-tip={t.description || undefined}
                                        >
                                            {t.title}
                                            <IoCloseCircle className="text-red-400 absolute -top-2 m-auto cursor-pointer size-5 opacity-0 group-hover:opacity-100 transition-all"
                                                onClick={(e) => handleDeleteTask(e, t)}
                                            />
                                            <MdOutlineMoveDown className="text-sky-400 absolute -top-3 left-2 cursor-pointer size-7 opacity-0 group-hover:opacity-100 transition-all"
                                                onClick={(e) => { setSelectedTaskoMove(t); e.stopPropagation() }}
                                            />
                                            {t.repetitionItems ? (
                                                <IoIosRepeat className='text-gray-500 dark:text-gray-300 absolute top-0 left-1' />
                                            ) : null}
                                        </div>
                                    ))}
                                </td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default ListTable;