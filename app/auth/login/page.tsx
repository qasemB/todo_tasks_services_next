'use client'
import { login } from '@/actions/auth';
import ServerSubmitButton from '@/components/ServerSubmitButton';
import { useDidUpdateEffect } from '@/hooks/reactCustomHooks';
import { errorAlertModal, successAlertModal } from '@/utils/alerts';
// import {  successToast } from '@/utils/alerts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { FiUser } from 'react-icons/fi';
import { LiaUserCheckSolid } from 'react-icons/lia';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiTodoist } from 'react-icons/si';

const LoginPage = () => {
    const [state, action] = useFormState(login, undefined)
    const router = useRouter()

    useDidUpdateEffect(() => {        
        if (state?.success) {
            successAlertModal(state.message)
            router.push("/client/dashboard")
        }else if (state){
            errorAlertModal(state?.message, "", "error")
        }
    }, [state, router])
    return (
        <div className=' h-screen grid grid-cols-1 lg:grid-cols-3 dark:text-gray-500'>
            <div className='lg:col-span-2 bg-white flex justify-center items-center'>
                <div className="grid grid-cols-1 lg:grid-cols-4 w-full">
                    <div className="lg:col-span-2 lg:col-start-2 px-4 xl:px-8">
                        <div className="flex justify-center items-center lg:hidden">
                            <SiTodoist className="text-sky-400 size-10" />
                        </div>
                        <h1 className="my-4 font-bold flex">فرم ورود  </h1>
                        <small className="text-sm text-app_color_gray_40">شماره موبایل و کلمه عبور را وارد کنید</small>
                        <div className="w-full mt-5">
                            <form action={action}>
                                <div className="border-app_color_blue_5 border rounded-full flex items-center px-5">
                                    <FiUser className="size-6" />
                                    <input name='phone' type="text" className="bg-transparent h-14 outline-none px-4 w-full" placeholder="شماره موبایل" />
                                </div>
                                {state?.errors?.phone && <small className='text-red-400 blockmt-2'>{state.errors.phone}</small>}
                                <div className="border-app_color_blue_5 border rounded-full flex items-center px-5 mt-4">
                                    <RiLockPasswordLine className="size-6" />
                                    <input name='password' type="password" className="bg-transparent h-14 outline-none px-4 w-full" placeholder="رمز عبور" />
                                </div>
                                {state?.errors?.password && <small className='text-red-400 blockmt-2'>{state.errors.password}</small>}
                                <div className="mt-6">
                                    <ServerSubmitButton label='ورود'/>
                                </div>
                                <Link href={"/auth/register"} className='mt-4 block text-blue-400'>ثبت نام نکرده ام</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-300 hidden lg:flex justify-center items-center'>
                <LiaUserCheckSolid  className='text-blue-500 size-80 transform translate-x-48 drop-shadow-2xl' />
            </div>
        </div>
    );
};

export default LoginPage;