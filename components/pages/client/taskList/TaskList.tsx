'use client'

import { useRouter } from "next/navigation";

const TaskList = () => {
    const router = useRouter();

    return (
        <div>
            <button onClick={()=>router.refresh()}>click</button>
        </div>
    );
};

export default TaskList;