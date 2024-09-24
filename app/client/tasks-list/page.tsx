import TaskList from "@/components/pages/client/taskList/TaskList";
import { getDecodedToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
// import { unstable_cache } from "next/cache";

export const dynamic = 'force-dynamic'

// const getTaskCats = unstable_cache(async (id) => {
//     return 
// })

const TaskListPage = async () => {
    const decodedToken = getDecodedToken()
    const tasks = await prisma.taskCategory.findMany({
        where: { userId: decodedToken?.id }
    })
    return (
        <div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task?.title}</li>
                ))}
            </ul>
            <TaskList/>
        </div>
    );
};

export default TaskListPage;