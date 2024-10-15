'use client'

import { useAsyncMethod } from "@/hooks/asyncMethodsHook";
import { useCalendar } from "@/hooks/calendarHook";
import httpService from "@/lib/httpService";
import { TasksListItemsType } from "@/types/task";
import { CalendarDay } from "@/utils/dateUtils";
import { Fragment, useEffect, useMemo, useState } from "react";
import { GoDotFill } from "react-icons/go";

interface ICalendarDayIncludeData extends CalendarDay {
    tasks: TasksListItemsType[]
}

const Calendar = () => {
    const [tasks, setTasks] = useState<TasksListItemsType[]>([])
    const { days, handleCurrentMonth, handleNextMonth, handlePrevMonth, weeks, currentMonthName } = useCalendar()

    const { isLoading, runMethod: getTasksService } = useAsyncMethod(async () => {
        const startFrom = days[0].dateGregorian
        const endAt = days[days.length - 1].dateGregorian
        const res = await httpService(`/client/tasks/in-range?startFrom=${startFrom}&endAt=${endAt}`, "get")
        if (res.status === 200) {
            setTasks(res.data.data)
        }
    })

    useEffect(() => {
        if (days.length) getTasksService()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days])

    const handleCpmpareTodatByDate = (day: CalendarDay) => {
        const today = new Date().toISOString().split("T")[0]
        const selectedDate = new Date(day.dateGregorian).toISOString().split("T")[0]
        return today == selectedDate
    }

    const weeksIncludeData: (ICalendarDayIncludeData | undefined)[][] = useMemo(() => {
        const newWeeks: (ICalendarDayIncludeData | undefined)[][] = []
        for (const week of weeks) {
            const newWeek: (ICalendarDayIncludeData | undefined)[] = []
            for (const day of week) {
                if (day) {
                    const newDay: ICalendarDayIncludeData = {
                        ...day, tasks: tasks.filter(q => {
                            const taskDate = new Date(q.startedAt).toISOString().split("T")[0]
                            const dayDate = new Date(day.dateGregorian).toISOString().split("T")[0]
                            return taskDate === dayDate
                        })
                    }
                    newWeek.push(newDay)
                }
                else newWeek.push(undefined)
            }
            newWeeks.push(newWeek)
        }
        return newWeeks
    }, [weeks, tasks])

    return (
        <div className="container mx-auto py-4">
            <div className=" mb-8">
                ماه : {currentMonthName}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {/* سرستون روزهای هفته */}
                <div className="font-bold text-center text-sm">شنبه</div>
                <div className="font-bold text-center text-sm">یکشنبه</div>
                <div className="font-bold text-center text-sm">دوشنبه</div>
                <div className="font-bold text-center text-sm">سه‌شنبه</div>
                <div className="font-bold text-center text-sm">چهارشنبه</div>
                <div className="font-bold text-center text-sm">پنج‌شنبه</div>
                <div className="font-bold text-center text-sm">جمعه</div>

                {/* روزهای ماه */}
                {weeksIncludeData.map((week, index) => (
                    <Fragment key={index}>
                        {week.map((day, jindex) => day ? (
                            <div
                                className={`border tooltip tooltip-secondary border-gray-300 text-center rounded-lg relative min-h-14 cursor-pointer flex justify-center items-center ${isLoading && "animate-pulse"} ${handleCpmpareTodatByDate(day) && "border-sky-400 dark:border-sky-300 border-4"}`}
                                key={day.dateJalali}
                                data-tip={day.tasks.length ? day.tasks.map(q => q.title).join(" __ ") : undefined}
                            >
                                <span className="absolute top-1 right-3 text-gray-400">{day.day}</span>
                                <span className="absolute bottom-1 left-3 lg:hidden">{day.tasks.length}</span>
                                <span className="bottom-1 left-3 hidden lg:flex mt-4 px-1 w-full justify-end">
                                    {day.tasks.map(t => (
                                        <GoDotFill
                                            className={` ${t.isDone ? "text-green-500" : "text-gray-400"}`}
                                            key={t.id + "_tasks_dotes"}
                                        />
                                    ))}
                                </span>
                            </div>
                        ) : (
                            <div className="border border-gray-300 p-4 text-center rounded-lg min-h-14 opacity-30" key={jindex + "_empty"}>
                            </div>
                        ))}
                    </Fragment>
                ))}
            </div>

            <div className="w-full flex justify-center items-center mt-10">
                <span className="border cursor-pointer border-gray-300 select-none rounded-full px-4 py-1" onClick={handlePrevMonth}>ماه قبل</span>
                <span className="border cursor-pointer border-gray-300 select-none rounded-full px-4 py-1 mx-4" onClick={handleCurrentMonth}>ماه جاری</span>
                <span className="border cursor-pointer border-gray-300 select-none rounded-full px-4 py-1" onClick={handleNextMonth}>ماه بعد</span>
            </div>
        </div>
    );
};

export default Calendar;