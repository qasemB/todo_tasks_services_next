import { CreateTaskReqParamsType } from '@/types/task';
import { TaskCategoryListItemsType } from '@/types/taskCategory';
import React, { RefObject } from 'react';
import { UseFormReturn } from 'react-hook-form';

type AddTaskModalType = {
    dialogRef: RefObject<HTMLDialogElement>
    handleConfirmCreateTask: (values: CreateTaskReqParamsType) => Promise<void>
    formReturn: UseFormReturn<CreateTaskReqParamsType, any, undefined>
    selectedTaskCat: TaskCategoryListItemsType | undefined
}

const AddTaskModal = ({ dialogRef, handleConfirmCreateTask, formReturn, selectedTaskCat }: AddTaskModalType) => {

    const { handleSubmit, register, getValues, watch } = formReturn

    const defdate = watch("startedAt")

    return (
        <dialog className="bg-[#000000ab]  w-full lg:w-1/3" ref={dialogRef}>
            <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="font-bold text-lg">افزودن تسک</h3>
                <h2 className="font-bold text-gray-400">{selectedTaskCat?.title}</h2>
                <label className="form-control w-full mt-4">
                    <div className="label">
                        <span className="label-text">عنوان تسک </span>
                    </div>
                    <input {...register("title")} placeholder="حروف و اعداد" className="input input-bordered w-full" />
                </label>
                <label className="form-control w-full mt-4">
                    <div className="label">
                        <span className="label-text">توضیحات</span>
                    </div>
                    <input {...register("description")} placeholder="حروف و اعداد" className="input input-bordered w-full" />
                </label>

                {defdate && (
                    <div className='grid grid-cols-2 gap-2'>
                        <label className="form-control w-full mt-4">
                            <div className="label">
                                <span className="label-text">تاریخ شروع</span>
                            </div>
                            <input defaultValue={getValues("startedAt")} {...register("startedAt", { valueAsDate: true })} type='date' placeholder="عدد" className="input input-bordered w-full" />
                        </label>

                        <label className="form-control w-full mt-4">
                            <div className="label">
                                <span className="label-text">تاریخ پایان</span>
                            </div>
                            <input {...register("endedAt", { valueAsDate: true })} type='date' placeholder="عدد" className="input input-bordered w-full" />
                        </label>
                    </div>
                )}


                <div className='grid grid-cols-2 gap-2'>
                    <label className="form-control w-full mt-4">
                        <div className="label">
                            <span className="label-text">تعداد تکرار</span>
                        </div>
                        <input {...register("repetitionItems", { valueAsNumber: true })} type='number' placeholder="عدد" className="input input-bordered w-full" />
                    </label>

                    <label className="form-control w-full mt-4">
                        <div className="label">
                            <span className="label-text">چند روز درمیان</span>
                        </div>
                        <input {...register("repetitionType", { valueAsNumber: true })} type='number' placeholder="عدد" className="input input-bordered w-full" />
                    </label>
                </div>


                <div className="mt-8 flex gap-2 ">
                    <button
                        className="rounded-full bg-blue-400 px-5 py-2 text-white border-none w-24"
                        onClick={handleSubmit(handleConfirmCreateTask)}
                    >
                        ثبت
                    </button>
                    <form method="dialog"><button className="rounded-full bg-gray-400 px-5 py-2 text-white border-none w-24">انصراف</button></form>
                </div>
            </div>
        </dialog>
    );
};

export default AddTaskModal;