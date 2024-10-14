import moment from "jalali-moment";
moment.locale("fa-IR")

export type FormatType = 'dddd، jD jMMMM jYYYY' | 'jD jMMMM jYYYY' | 'jMM/jDD' | 'jDD/jMM/jYYYY'

export const convertMiladi2Jalali = (date?: string | undefined, format: FormatType = 'jD jMMMM jYYYY') => {
    const newDate = moment(date)
    return newDate.format(format)
}

export const getDatesInRange = (startOffset: number, endOffset: number): string[] => {
    const today = new Date();
    const dates: string[] = [];

    for (let i = startOffset; i <= endOffset; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        dates.push(currentDate.toISOString().split('T')[0]);
    }

    return dates;
};



export interface CalendarDay {
    dateJalali: string; // تاریخ شمسی
    dateGregorian: string; // تاریخ میلادی
    dayOfWeek: string; // نام روز هفته,
    dayOfWeekIndx: number; // نام روز هفته,
    day: number,    
    monthName: string
}
export function getJalaliMonthDays(date?: string): CalendarDay[] {
    // اگر تاریخ ورودی وجود نداشت، تاریخ امروز را استفاده کنید
    const today = date ? moment(date) : moment();

    // دریافت اولین و آخرین روز ماه شمسی
    const firstDayOfMonth = today.clone().startOf('jMonth'); // کلون کردن برای جلوگیری از تغییر تاریخ اصلی
    const lastDayOfMonth = today.clone().endOf('jMonth'); // کلون کردن برای جلوگیری از تغییر تاریخ اصلی

    // ذخیره همه روزهای ماه در قالب آبجکت‌هایی با تاریخ شمسی، میلادی و روز هفته
    const daysOfMonth: CalendarDay[] = [];

    // حلقه برای ایجاد تمام روزهای ماه
    const currentDay = firstDayOfMonth.clone(); // استفاده از clone برای جلوگیری از تغییر شیء اصلی
    while (currentDay.isSameOrBefore(lastDayOfMonth, 'day')) {
        daysOfMonth.push({
            dateJalali: currentDay.format('jYYYY/jMM/jDD'),   // تاریخ شمسی
            dateGregorian: currentDay.format('YYYY/MM/DD'),   // تاریخ میلادی
            dayOfWeek: currentDay.format('dddd'),             // نام روز هفته
            day: currentDay.jDate(),
            dayOfWeekIndx: currentDay.jDay(),
            monthName: currentDay.format("jMMMM")
        });
        currentDay.add(1, 'day'); // رفتن به روز بعدی
    }
    return daysOfMonth; // بازگشت آرایه از آبجکت‌ها
}