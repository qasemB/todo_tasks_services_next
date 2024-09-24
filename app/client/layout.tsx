import Content from "@/components/layout/content/Content";
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { GLOBAL_CONST } from "@/constants/global";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const token = cookies().get(GLOBAL_CONST.login_token_name)?.value
    if (!token || !verifyToken(undefined, token)) return redirect("/auth/login")
    return (
        <div>
            <Content>{children}</Content>
            <Sidebar />
            <Header />
        </div>
    )
}
