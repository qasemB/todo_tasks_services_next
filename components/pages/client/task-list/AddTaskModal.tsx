import { CreateTaskReqParamsType } from '@/types/task';
import React, { Dispatch, RefObject, SetStateAction } from 'react';

type AddTaskModalType = {
    dialogRef: RefObject<HTMLDialogElement>
    createTaskParams: CreateTaskReqParamsType
    setCreateTaskParams: Dispatch<SetStateAction<CreateTaskReqParamsType>>
    handleConfirmCreateTask: () => Promise<void>
}

const AddTaskModal = ({ dialogRef, createTaskParams, setCreateTaskParams, handleConfirmCreateTask }: AddTaskModalType) => {
    return (
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
    );
};

export default AddTaskModal;