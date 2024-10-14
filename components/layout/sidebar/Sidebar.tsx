'use client'
import { useShowMenuStore } from "@/zustand/sideMenuStore";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
    const { showMenu, setShowMenu } = useShowMenuStore(state => state)

    return (
        <>
            <div
                className={`fixed w-full h-screen top-0 transition-all duration-1000 bg-[#00000065]  ${showMenu ? "" : "hidden"}`}
                onClick={() => setShowMenu(false)}
            ></div>


            <div className={`bg-white dark:bg-gray-700 shadow-inner fixed w-app_sidebar_w h-screen border-l-2 border-app_color_gray_0 dark:border-gray-600 transition-all ${showMenu ? "right-0" : "shadow-sm -right-app_sidebar_w"} ""} lg:right-0 pt-app_header_h`}>

                <div className="p-5">
                    <ul className=" ">
                        <SidebarItem href={"dashboard"} label="داشبورد"/>
                        <SidebarItem href={"tasks-list"} label="لیست تسک ها"/>
                        <SidebarItem href={"calendar"} label="تقویم"/>
                    </ul>
                </div>
            </div>

        </>
    );
};

export default Sidebar;