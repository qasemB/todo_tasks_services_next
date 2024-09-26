'use client'
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { TaskCategoryListItemsType } from "@/types/taskCategory";
import { confirmAlert } from "@/utils/alerts";
// import { successToast } from "@/utils/alerts";
import { convertMiladi2Jalali, getDatesInRange } from "@/utils/dateUtils";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import Cookies from "universal-cookie";
// import { unstable_cache } from "next/cache";

export const dynamic = 'force-dynamic'

const daysOfWeek = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
const getDayOfWeek = (date: string) => {
    const currentDate = new Date(date)
    const dayOfWeek = currentDate.getDay()
    return daysOfWeek[dayOfWeek]
}

// const getTaskCats = unstable_cache(async (id) => {
//     return 
// })

const TaskListPage = () => {
    const [taskCats, setTaskCats] = useState<TaskCategoryListItemsType[]>([])
    const [dates, setDates] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [createTaskParams, setCreateTaskParams] = useState({ title: "", taskCategoryId: "" })
    const [createTasCatTitle, setCreateTaskCatTitle] = useState("")
    const dialogRef = useRef<HTMLDialogElement>(null)
    const createTaskCatDialogRef = useRef<HTMLDialogElement>(null)

    const handleGetTaskCats = async () => {
        setLoading(true)
        const cookieStore = new Cookies(null, { path: "/" })
        const token = cookieStore.getAll()
        axios.get("/api/client/task-categories/include-tasks", {
            headers: { Authorization: `Bearer ${token.loginToken}` }
        }).then(res => {
            setTaskCats(res.data.data)
            // successToast()
        }).finally(() => {
            setLoading(false)
        })
    }
    const handleDatesInRange = () => {
        const datesArr = getDatesInRange(-3, 5)
        setDates(datesArr)
    }
    const handleDeleteTaskCategory = async (taskCatId: string) => {
        const cookieStore = new Cookies(null, { path: "/" })
        const token = cookieStore.getAll()
        const confirm = await confirmAlert("", "آیا از حذف اطمینان دارید؟")
        if (!confirm.isConfirmed) return false
        const res = await axios.delete(`/api/client/task-categories/${taskCatId}`, {
            headers: { Authorization: `Bearer ${token.loginToken}` }
        })
        if (res.status === 200) {
            handleGetTaskCats()
        }
    }
    const handleAddTask = (date: string, taskCatId: string) => {
        const d = new Date(date)
        setCreateTaskParams(old => ({ ...old, startedAt: d, taskCategoryId: taskCatId }))
        dialogRef.current?.showModal()
    }
    const handleConfirmCreateTask = async () => {
        const cookieStore = new Cookies(null, { path: "/" })
        const token = cookieStore.getAll()
        const res = await axios.post(`/api/client/tasks`, createTaskParams, {
            headers: { Authorization: `Bearer ${token.loginToken}` }
        })
        if (res.status === 200 || res.status === 201) {
            handleGetTaskCats()
            dialogRef.current?.close()
        }
    }

    const showTaskCatDialogModal = () => {
        createTaskCatDialogRef.current?.showModal()
    }
    const handleConfirmCreateTaskCat = async () => {
        const cookieStore = new Cookies(null, { path: "/" })
        const token = cookieStore.getAll()
        const res = await axios.post(`/api/client/task-categories`, { title: createTasCatTitle }, {
            headers: { Authorization: `Bearer ${token.loginToken}` }
        })
        if (res.status === 200 || res.status === 201) {
            handleGetTaskCats()
            createTaskCatDialogRef.current?.close()
            setCreateTaskCatTitle("")
        }
    }

    useEffect(() => {
        handleGetTaskCats()
        handleDatesInRange()
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
            <div className="flex justify-end mb-5">
                <span className="flex text-blue-600 dark:text-blue-300 cursor-pointer" onClick={showTaskCatDialogModal}>
                    <span>افزودن دسته بندی</span>
                    <TbCategoryPlus className="mr-2 size-5" />
                </span>
            </div>
            {
                loading ? (<TableSkeleton />) : taskCats.length ? (
                    <>
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
                                                <td key={"_intasks_" + taskCat.id} className="cursor-pointer" onClick={() => handleAddTask(date, taskCat.id)}>
                                                    {taskCat.Task.filter(task => convertMiladi2Jalali(task.startedAt?.toString()) === convertMiladi2Jalali(date))?.map((t) => (
                                                        <div key={t.id} className="rounded-lg border dark:border-gray-300 border-gray-600 py-1 px-2 mb-1">
                                                            {t.title}
                                                        </div>
                                                    ))}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
                        <dialog className="bg-[#000000ab]  w-full lg:w-1/3" ref={dialogRef}>
                            <div className="bg-white rounded-lg shadow-md p-5">
                                <h3 className="font-bold text-lg">افزودن تسک</h3>
                                <label className="form-control w-full mt-4">
                                    <div className="label">
                                        <span className="label-text">عنوان تسک رو وارد کنید؟</span>
                                    </div>
                                    <input type="text" placeholder="حروف و اعداد" className="input input-bordered w-full" value={createTaskParams.title} onChange={e => setCreateTaskParams(old => ({ ...old, title: e.target.value }))} />
                                </label>

                                <div className="mt-8 flex gap-2 ">
                                    <button className="rounded-full bg-blue-400 px-5 py-2 text-white border-none w-24" onClick={handleConfirmCreateTask}>ثبت</button>
                                    <form method="dialog"><button className="rounded-full bg-gray-400 px-5 py-2 text-white border-none w-24">انصراف</button></form>
                                </div>
                            </div>
                        </dialog>

                    </>
                ) : (<p className="text-center py-10">داده ای وجود ندارد</p>)
            }
            <dialog className="bg-[#000000ab]  w-full lg:w-1/3" ref={createTaskCatDialogRef}>
                <div className="bg-white rounded-lg shadow-md p-5">
                    <h3 className="font-bold text-lg">افزودن دسته بندی</h3>
                    <label className="form-control w-full mt-4">
                        <div className="label">
                            <span className="label-text">عنوان دسته رو وارد کنید؟</span>
                        </div>
                        <input type="text" placeholder="حروف و اعداد" className="input input-bordered w-full" value={createTasCatTitle} onChange={e => setCreateTaskCatTitle(e.target.value)} />
                    </label>

                    <div className="mt-8 flex gap-2 ">
                        <button className="rounded-full bg-blue-400 px-5 py-2 text-white border-none w-24" onClick={handleConfirmCreateTaskCat}>ثبت</button>
                        <form method="dialog"><button className="rounded-full bg-gray-400 px-5 py-2 text-white border-none w-24">انصراف</button></form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default TaskListPage;