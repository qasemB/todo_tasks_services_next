import { useShowMenuStore } from "@/zustand/sideMenuStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

type SidebarItemType = ComponentProps<typeof Link> & { label: string }
const SidebarItem = ({ href,label, className,...rest }: SidebarItemType) => {
    const pathname = usePathname()
    const condition = pathname.includes(href.toString())
    const { setShowMenu } = useShowMenuStore(state => state)

    return (
        <li className={`my-2  rounded-md p-2 w-full flex ${condition ? "bg-blue-200 dark:bg-gray-500" : ""}`} onClick={()=>setShowMenu(false)}>
            <Link href={href} {...rest} className={`w-full ${className}`}>{label}</Link>
        </li>
    );
};

export default SidebarItem;