'use client'
import DarkmodeBotton from "@/components/DarkmodeBotton";
import { useShowMenuStore } from "@/zustand/sideMenuStore";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
    const { toggleShowMenu } = useShowMenuStore(state => state)

    return (
        <div className="dark:bg-gray-700 fixed h-app_header_h w-full shadow">
            <div className="w-full h-full flex items-center">
                {/* <Welcome /> */}
                <div className="w-full lg:w-app_sidebar_w  h-full p-5 flex items-center justify-between">
                    <GiHamburgerMenu className="size-7 lg:hidden" onClick={() => toggleShowMenu()} />
                    <span></span>
                    <DarkmodeBotton />
                </div>

                <div className="hidden lg:flex items-center bg-white dark:bg-gray-600  w-auto justify-between h-full flex-1 p-5">
                    {/* <NotificationBell />
            <AccountAvatar /> */}
                    <span>aaa</span>
                    <span>bbb</span>
                </div>
            </div>
        </div>
    );
};

export default Header;