import { useState } from "react"

export const useAsyncMethod = (callback: (params?: any) => Promise<any>)=>{
    const [isLoading, setIsLoading] = useState(false)
    const runMethod = async (params?: any)=>{
        setIsLoading(true)
        await callback(params)
        setIsLoading(false)
    }
    return{runMethod, isLoading}
}