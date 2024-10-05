'use client'
import { logout } from "@/actions/auth";
import DarkmodeBotton from "@/components/DarkmodeBotton";
import { useShowMenuStore } from "@/zustand/sideMenuStore";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
    const { toggleShowMenu } = useShowMenuStore(state => state)

    const handleLogout = () => logout(); 

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
                    <span>خوش آمدید</span>
                    {/* <form action={logout}>
                        <button className="cursor-pointer" type="submit">خروج</button>
                    </form> */}
                    <button className="cursor-pointer" onClick={handleLogout} >خروج</button>
                </div>
            </div>
        </div>
    );
};

export default Header;