'use client'
import { useThemeStore } from '@/zustand/themeStore';
import React from 'react';

const ThemeContainer = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    const {theme} = useThemeStore(state=>state)
    return (
        <div className={theme}>
            {children}
        </div>
    );
};

export default ThemeContainer;