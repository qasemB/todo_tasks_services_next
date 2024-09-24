'use client'
import { GLOBAL_CONST } from "@/constants/global";
import { ThemeType, useThemeStore } from "@/zustand/themeStore";
import { ComponentProps, useEffect } from "react";
import { IoMoonSharp, IoSunnyOutline } from "react-icons/io5";
type DarkmodeBottonType = ComponentProps<"label">
const DarkmodeBotton = ({ ...rest }: DarkmodeBottonType) => {
    const { theme, setTheme } = useThemeStore(state => state)

    const handleToggleTheme = () => {
        const t = theme === "dark" ? "light" : "dark"
        setTheme(t)
        localStorage.setItem(GLOBAL_CONST.theme_name, t)
    }

    useEffect(()=>{
        setTheme(localStorage.getItem(GLOBAL_CONST.theme_name) as ThemeType)
    },[])

    return (
        <>
            <label {...rest} className="grid cursor-pointer place-items-center">
                <input
                    type="checkbox"
                    value="synthwave"
                    className="toggle theme-controller bg-base-content col-span-2 col-start-1 dark:[--tglbg:theme(colors.gray.400)] row-start-1 " checked={theme === "light"} onChange={handleToggleTheme}
                />
                <IoSunnyOutline className="stroke-base-100 fill-base-100 col-start-1 row-start-1" />
                <IoMoonSharp  className=" stroke-base-100 fill-base-100 dark:stroke-gray-400 dark:fill-gray-400 col-start-2 row-start-1" />
            </label>
        </>
    );
};

export default DarkmodeBotton;