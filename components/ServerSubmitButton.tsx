'use client'
import { useFormStatus } from "react-dom"

type ServerSubmitButtonType = {
    label?: string
}

const ServerSubmitButton = ({ label }: ServerSubmitButtonType) => {
    const { pending } = useFormStatus()
    return (
        <button
            disabled={pending}
            type="submit"
            className='bg-blue-500 py-3  rounded-full w-full text-white flex justify-center items-center'
        >
            {pending ? (
                <span className="loading loading-dots loading-md"></span>
            ) : (label || "ثبت")}
        </button>
    )
}
export default ServerSubmitButton