import { CalendarDay, getJalaliMonthDays } from "@/utils/dateUtils";
import { useEffect, useMemo, useState } from "react";

export const useCalendar = () => {
    const [currentDay, setCurrentDays] = useState(new Date().toString());
    const [days, setDays] = useState<CalendarDay[]>([]);

    useEffect(() => {
        setDays(getJalaliMonthDays(currentDay));
    }, [currentDay]);

    // تابع برای تبدیل روزها به هفته‌ها
    const convertDaysToWeeks = (days: CalendarDay[]) => {
        const weeks: CalendarDay[][] = [];
        let i = 0;

        for (const day of days) {
            if (weeks[i]) weeks[i].push(day);
            else weeks[i] = [day];
            if (day.dayOfWeekIndx === 6) i++;
        }

        return weeks;
    };

    // تابع برای ایجاد آرایه‌ای از هفته‌ها
    const convertWeeksToNewWeeks = (weeks: CalendarDay[][]) => {
        const newWeeks: (CalendarDay | undefined)[][] = [];
        let j = 0;

        for (const week of weeks) {
            for (let index = 0; index < 7; index++) {
                const d = week.find(q => q?.dayOfWeekIndx === index);
                if (newWeeks[j]) newWeeks[j].push(d);
                else newWeeks[j] = [d];
            }
            j++;
        }

        return newWeeks;
    };

    // محاسبه هفته‌ها و آرایه جدید هفته‌ها
    const weeks = useMemo(() => convertDaysToWeeks(days), [days]);
    const newWeeks = useMemo(() => convertWeeksToNewWeeks(weeks), [weeks]);

    const handleChangeMonth = (increment: number) => {
        const newDate = new Date(currentDay);
        newDate.setMonth(newDate.getMonth() + increment);
        setCurrentDays(newDate.toString());
    };

    const handleNextMonth = () => handleChangeMonth(1);
    const handlePrevMonth = () => handleChangeMonth(-1);
    const handleCurrentMonth = () => setCurrentDays(new Date().toString());

    return {
        currentDay,
        days,
        handleNextMonth,
        handlePrevMonth,
        handleCurrentMonth,
        weeks: newWeeks,
        currentMonthName: days[0]?.monthName,
    };
};