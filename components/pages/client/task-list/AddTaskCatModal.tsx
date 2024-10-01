import React, { RefObject, SetStateAction } from 'react';

type AddTaskCatModalType = {
    createTaskCatDialogRef: RefObject<HTMLDialogElement>
    createTasCatTitle: string
    setCreateTaskCatTitle: (value: SetStateAction<string>) => void
    handleConfirmCreateTaskCat: () => Promise<void>
}

const AddTaskCatModal = ({ createTaskCatDialogRef, createTasCatTitle, setCreateTaskCatTitle, handleConfirmCreateTaskCat }: AddTaskCatModalType) => {
    return (
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
    );
};

export default AddTaskCatModal;