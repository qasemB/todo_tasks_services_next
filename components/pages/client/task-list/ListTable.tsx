import { GLOBAL_CONST } from '@/constants/global';
import { TasksListItemsType } from '@/types/task';
import { TaskCategoryListItemsType } from '@/types/taskCategory';
import { convertMiladi2Jalali, getDatesInRange } from '@/utils/dateUtils';
import React, { useEffect, useState } from 'react';
import { IoIosRepeat } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';

type ListTableType = {
    taskCats: TaskCategoryListItemsType[]
    handleDeleteTaskCategory: (taskCatId: string) => Promise<false | undefined>
    handleAddTask: (date: string, taskCat: TaskCategoryListItemsType) => void
    handleChangeTaskIsDone: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, task: TasksListItemsType) => Promise<void>
    handleDeleteTask: (e: React.MouseEvent<SVGElement, MouseEvent>, task: TasksListItemsType) => Promise<false | undefined>
}

const daysOfWeek = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
const getDayOfWeek = (date: string) => {
    const currentDate = new Date(date)
    const dayOfWeek = currentDate.getDay()
    return daysOfWeek[dayOfWeek]
}

const ListTable = ({ taskCats, handleDeleteTaskCategory, handleAddTask, handleChangeTaskIsDone, handleDeleteTask }: ListTableType) => {
    const [dates, setDates] = useState<string[]>([])

    const handleDatesInRange = () => {
        const range = GLOBAL_CONST.task_list_date_range
        const datesArr = getDatesInRange(range.start, range.end)
        setDates(datesArr)
    }

    useEffect(() => {
        handleDatesInRange()
    }, [])
    return (
        <table className="table [&>*]:text-center">
            <thead>
                <tr className="my-5 text-gray-500 dark:text-gray-200">
                    <th>تاریخ</th>
                    <th>روز</th>
                    {taskCats.map(taskCat => (
                        <th key={taskCat.id} className="relative group min-w-32">
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
                                    onClick={() => handleAddTask(date, taskCat)}
                                >
                                    {taskCat.Task.filter(task => convertMiladi2Jalali(task.startedAt?.toString()) === convertMiladi2Jalali(date))?.map((t: TasksListItemsType) => (
                                        <div
                                            key={t.id}
                                            className={`relative group rounded-lg border dark:border-gray-300 border-gray-600 py-1 px-2 mb-1 ${t.isDone && "bg-green-400 text-indigo-600"}`}
                                            onClick={e => handleChangeTaskIsDone(e, t)}
                                        >
                                            {t.title}
                                            <IoCloseCircle className="text-red-400 absolute -top-2 m-auto cursor-pointer size-5 opacity-0 group-hover:opacity-100 transition-all"
                                                onClick={(e) => handleDeleteTask(e, t)}
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