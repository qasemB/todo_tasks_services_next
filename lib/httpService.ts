import axios, { AxiosHeaderValue, AxiosHeaders, AxiosProgressEvent, AxiosResponse, RawAxiosRequestHeaders } from "axios"
// import { GLOBAL_CONST } from "../constants/global";
import { errorAlertModal } from "@/utils/alerts";
import Cookies from "universal-cookie";
// import { showToast } from "../utils/alerts";

axios.interceptors.response.use((res)=>{
    return res
},(error)=>{
    const res = error?.response
    if (!res?.status) {
        errorAlertModal(`مشکلی در ارتباط با سرور وجود دارد..`, "", "error")
        // showToast(`مشکلی در ارتباط با سرور وجود دارد..`, "error")
    }
        
    if (res?.status >= 500){
        errorAlertModal(`مشکلی از سمت سرور رخ داده است...(${res?.status})`, "", "error")
        // showToast(`مشکلی از سمت سرور رخ داده است...(${res?.status})`, "error")
    }else if (res?.status === 401) {
        errorAlertModal(`ورود غیر مجاز (${res?.status})`, "", "error")
        // showToast(`ورود غیر مجاز (${res?.status})`, "error")
    }else if (res?.status > 200) {
        const message = res?.data?.message
        if (message) {
            errorAlertModal(message, "", "error")
            // showToast(message, "error")
        }
        else {
            errorAlertModal(`در ورود اطلاعات دقت کنید (${res?.status})`, "", "error")
            // showToast(`در ورود اطلاعات دقت کنید (${res?.status})`, "error")
        }
        
    }
    return Promise.resolve(error)
})

const httpService = (

    url : string, 
    method : "post" | "get" | "patch" | "put" | "delete", 
    data ?: any, 
    onUploadProgress?: (e: AxiosProgressEvent)=>void,
    headers?: AxiosHeaders | (Partial<RawAxiosRequestHeaders & {
        Accept: AxiosHeaderValue;
        "Content-Length": AxiosHeaderValue;
        "User-Agent": AxiosHeaderValue;
        "Content-Encoding": AxiosHeaderValue;
        Authorization: AxiosHeaderValue;
    }> | undefined)
) : Promise<AxiosResponse<any, any>> =>{

    // const tokenInfo = localStorage.getItem(GLOBAL_CONST.login_token_name)
    const cookieStore = new Cookies(null, { path: "/" })
    const token = cookieStore.getAll()
    const tokenInfo = token.loginToken

    if (!headers) {
        headers = {
            Authorization : tokenInfo ? `Bearer ${tokenInfo}` : null,
            'Content-Type' : "application/json"
        }
    }else{
        headers = {
            Authorization : tokenInfo ? `Bearer ${tokenInfo}` : null,
            ...headers
        }
    }

    return axios({
        baseURL: "/api/",
        url,
        method,
        data,
        headers,
        onUploadProgress: onUploadProgress
    })
}
export default httpService