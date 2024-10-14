import { CalendarDay, getJalaliMonthDays } from "@/utils/dateUtils";
import { useEffect, useState } from "react";

export const useCalendar = () => {
    const [currentDay, setCurrentDays] = useState(new Date().toString())
    const [days, setDays] = useState<CalendarDay[]>([])

    useEffect(() => {
        setDays(getJalaliMonthDays(currentDay));
    }, [currentDay])

    const weeks: CalendarDay[][] = [];

    let i = 0
    for (const day of days) {
        if (weeks[i]) weeks[i].push(day)
        else weeks[i] = [day]
        if (day.dayOfWeekIndx === 6) i++
    }

    const newWeeks: (CalendarDay | undefined)[][] = [];
    let j = 0
    for (const week of weeks) {
        for (let index = 0; index < 7; index++) {
            const d = week.find(q => q?.dayOfWeekIndx === index)
            if (newWeeks[j]) newWeeks[j].push(d)
            else newWeeks[j] = [d]
        }
        j++
    }

    const handleNextMonth = () => {
        const lastDay = new Date(days[days.length - 1].dateGregorian)
        const nexDay = lastDay.setDate(lastDay.getDate() + 1);
        setCurrentDays(new Date(nexDay).toString())
    }

    const handlePrevMonth = () => {
        const lastDay = new Date(days[0].dateGregorian)
        const nexDay = lastDay.setDate(lastDay.getDate() - 1);
        setCurrentDays(new Date(nexDay).toString())
    }

    const handleCurrentMonth = () => {
        setCurrentDays(new Date().toString())
    }

    return {
        currentDay,
        days,
        handleNextMonth,
        handlePrevMonth,
        handleCurrentMonth,
        weeks: newWeeks,
        currentMonthName: days[0]?.monthName
    }
}