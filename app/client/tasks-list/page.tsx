import { getDecodedToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { convertMiladi2Jalali, getDatesInRange } from "@/utils/dateUtils";
// import { unstable_cache } from "next/cache";

export const dynamic = 'force-dynamic'

// const getTaskCats = unstable_cache(async (id) => {
//     return 
// })

const TaskListPage = async () => {
    const decodedToken = getDecodedToken()
    const taskCatss = await prisma.taskCategory.findMany({
        where: { userId: decodedToken?.id },
        include: { Task: true }
    })

    const dates = getDatesInRange(-3, 10)
    console.log(dates);

    return (
        <div>
            {/* <section className="flex flex-row gap-4">
                {tasks.map(task => (
                    <div key={task.id}>{task?.title}</div>
                ))}
            </section> */}

            <table>
                <thead>
                    <tr className="my-5">
                        <th>روز</th>
                        {taskCatss.map(taskCat => (
                            <th key={taskCat.id}>{taskCat?.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        dates.map(date => (
                            <tr key={date} className="my-5">
                                <td>{convertMiladi2Jalali(date, "jMM/jDD")}</td>
                                {taskCatss.map(taskCat => (
                                    <th key={"_intasks_" + taskCat.id}>
                                        {taskCat.Task.find(q => convertMiladi2Jalali(q.startedAt?.toString()) === convertMiladi2Jalali(date))?.title}
                                    </th>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TaskListPage;