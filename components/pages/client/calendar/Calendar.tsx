'use client'

import { useCalendar } from "@/hooks/calendarHook";
import { Fragment } from "react";

const Calendar = () => {
    const { handleCurrentMonth, handleNextMonth, handlePrevMonth, weeks, currentMonthName } = useCalendar()

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
                {weeks.map((week, index) => (
                    <Fragment key={index}>
                        {week.map((day, jindex) => day ? (
                            <div className="border border-gray-300 p-4 text-center rounded-lg relative min-h-14 cursor-pointer" key={day.dateJalali}>
                                <span className="rounded-full absolute top-1 right-3">{day.day}</span>
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