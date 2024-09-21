import { GLOBAL_CONST } from "@/constants/global";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AuthLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const token = cookies().get(GLOBAL_CONST.login_token_name)?.value
    if (token && verifyToken(undefined, token)) return redirect("/client/dashboard")
    return children
}
